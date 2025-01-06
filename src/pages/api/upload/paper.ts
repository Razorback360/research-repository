import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import { getSession } from "next-auth/react";
import { checkPermission } from "@app/utils/permissions";
import { StatusTypes } from "@prisma/client";
import { generateApa7Citation, generateChicagoCitation } from "@app/utils/citations";

// Disable body parsing by Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler for uploading paper details & file
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
    const uploadDir = path.join(process.cwd(), "/uploads/papers");
    const form = new formidable.IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      // Use old filename for the file instead of genrating a new one
      // @ts-expect-error - Types provided by package (node-formidable) are incorrect. originalFilename property is never null in this case.
      filename: (_name, _ext, part) => {
        return part.originalFilename;
      }
    });

    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      // Handle form parsing errors
      if (err) {
        res.status(500).json({ error: "Failed to parse form data" });
        return;
      }

      const {
        journal,
        title,
        authors,
        date,
        issue,
        volume,
        startPage,
        endPage,
        doiLink,
        abstract,
        keyWords,
      } = fields;
      const file = files.file;

      // Handle dynamic fields for authors
      const authorFields: { authorFirst: string; authorMiddle?: string; authorLast: string }[] = [];
      const initialAuthor = session.user?.name?.split(" ") || "";
      if (initialAuthor.length > 2) {
        authorFields.push({
          authorFirst: initialAuthor[0],
          authorMiddle: initialAuthor[1],
          authorLast: initialAuthor[2],
        });
      } else {
        authorFields.push({
          authorFirst: initialAuthor[0],
          authorLast: initialAuthor[1],
        });
      }

      // Process additional author fields
      for (const [key, value] of Object.entries(fields)) {
        if (
          !["title", "abstract", "doiLink", "keyWords"].includes(key) &&
          key.includes("author")
        ) {
          // @ts-expect-error - Result is of type string not string[].
          const splitAuthor = value?.split(" ");
          if (splitAuthor.length > 2) {
            authorFields.push({
              authorFirst: splitAuthor[0],
              authorMiddle: splitAuthor[1],
              authorLast: splitAuthor[2],
            });
          } else {
            authorFields.push({
              authorFirst: splitAuthor[0],
              authorLast: splitAuthor[1],
            });
          }
        }
      }

      // If no file is uploaded, return bad request error
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      // Generate citations
      const apaCitation = generateApa7Citation({
        authors: authorFields,
        title: title as unknown as string,
        journal: journal as unknown as string,
        volume: volume as unknown as string,
        issue: issue as unknown as string,
        startPage: startPage as unknown as string,
        endPage: endPage as unknown as string,
        publishDate: new Date(date as unknown as string),
        doiLink: doiLink as unknown as string,
      });

      const chicagoCitation = generateChicagoCitation({
        authors: JSON.parse(authors as unknown as string),
        title: title as unknown as string,
        journal: journal as unknown as string,
        volume: volume as unknown as string,
        issue: issue as unknown as string,
        startPage: startPage as unknown as string,
        endPage: endPage as unknown as string,
        publishDate: new Date(date as unknown as string),
        doiLink: doiLink as unknown as string,
      });

      // Save file information and form fields to the database
      const newStatus = await prisma.status.create({
        data: {
          type: StatusTypes.PENDING,
        },
      });
      await prisma.paper.create({
        data: {
          userId: userId as unknown as string,
          journal: journal as unknown as string,
          title: title as unknown as string,
          authors: authorFields,
          publishDate: new Date(date as unknown as string),
          issue: issue as unknown as string,
          volume: volume as unknown as string,
          startPage: startPage as unknown as string,
          endPage: endPage as unknown as string,
          doiLink: doiLink as unknown as string,
          abstract: abstract as unknown as string,
          // @ts-expect-error - Result is of type string not string[].
          keywords: (keyWords ? keyWords.split(",") : []),
          // @ts-expect-error - Types provided by package (node-formidable) are incorrect. Property is available.
          paperFilePath: file.filepath,
          apaCitation,
          chicagoCitation,
          statusId: newStatus.id
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