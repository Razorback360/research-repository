import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";

// Disable body parsing by Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "/uploads");
    const form = new formidable.IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Failed to parse form data" });
        return;
      }

      const file = files.file;
      
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      file[0].newFilename = `${Date.now()}-${file[0].originalFilename}`;
      const filePath = path.join(uploadDir, file[0].newFilename);
      // Save file information to the database if needed
      // await prisma.file.create({
      //   data: {
      //     name: file.originalFilename,
      //     path: filePath,
      //   },
      // });

      res.status(200).json({ message: "File uploaded successfully", filePath });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}