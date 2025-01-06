import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { StatusTypes } from "@prisma/client";
import { getSession } from "next-auth/react";
import { checkPermission } from "@app/utils/permissions";

// Disable body parsing by Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler for file uploads
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle only POST requests
  if (req.method === "POST") {
    // Get user session
    const session = await getSession({ req });

    // If no session, return unauthorized error
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = session.user?.id;

    // Check if user has permission to upload
    const hasPermission = await checkPermission(userId, "WRITE");

    // If no permission, return forbidden error
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "/uploads/datasets");
    const form = new formidable.IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      // Instead of generating a new filename for the file, use old one.
      // @ts-expect-error - Types provided by package (node-formidable) are incorrect. originalFilename property is never null in this case.
      filename: (_name, _ext, part) => {
        return part.originalFilename;
      },
    });

    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      // Handle form parsing errors
      if (err) {
        res.status(500).json({ error: "Failed to parse form data" });
        return;
      }

      const { title, description, keyWords } = fields;
      const file = files.file;

      // If no file is uploaded, return bad request error
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      // Extract file name without extension
      // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
      const fileNameWithoutExtension = path.parse(file.originalFilename).name;
      const newDir = path.join(uploadDir, fileNameWithoutExtension);
      // Define new file path
      // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
      const newFilePath = path.join(newDir, file.newFilename);

      // Create a new directory for the file
      await fs.mkdir(newDir, { recursive: true });

      // Move the file to the new directory
      // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
      await fs.rename(file.filepath, newFilePath);

      // Send a request to parse the uploaded file
      const parseReq = await fetch("http://localhost:5000/parse/spss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
          path: `uploads/datasets/${fileNameWithoutExtension}/${file.newFilename}`,
        }),
      });

      // Handle parsing errors
      if (parseReq.status !== 200) {
        res.status(500).json({ error: "Failed to parse dataset" });
        return;
      }

      // Create a new status entry in the database
      const newStatus = await prisma.status.create({
        data: {
          type: StatusTypes.PENDING,
        },
      });

      // Create a new dataset entry in the database
      await prisma.dataset.create({
        data: {
          title: title as unknown as string,
          description: description as unknown as string,
          // @ts-expect-error - Result is of type string not string[].
          keywords: keyWords ? keyWords.split(",") : "",
          // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
          datasetFilePath: `uploads/datasets/${fileNameWithoutExtension}/${file.newFilename}`,
          mappingFilePath: `uploads/datasets/${fileNameWithoutExtension}/mapping-${fileNameWithoutExtension}.json`,
          sampleFilePath: `uploads/datasets/${fileNameWithoutExtension}/sample-${fileNameWithoutExtension}.json`,
          reportFilePath: `uploads/datasets/${fileNameWithoutExtension}/report-${fileNameWithoutExtension}.txt`,
          statusId: newStatus.id,
          userId: "cm5h0xmtq0000u8qlkg4yw8fj",
        },
      });

      // Return success response
      res.status(200).json({ message: "File uploaded successfully" });
    });
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
