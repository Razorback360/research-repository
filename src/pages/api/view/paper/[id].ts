import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
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
  if (req.method === "GET") {
    // Get user session
    const session = await getSession({ req });

    // If no session, return unauthorized error
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = session.user?.id;

    // Check if user has permission to upload
    const hasPermission = await checkPermission(userId, "READ");

    // If no permission, return forbidden error
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const { id } = req.query;
    const type = req.query.type as string;
    const paper = await prisma.paper.findFirst({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        title: true,
        authors: true,
        journal: true,
        publishDate: true,
        abstract: true,
        apaCitation: true,
        chicagoCitation: true,
        startPage: true,
        endPage: true,
        issue: true,
        paperFilePath: true,
      },
    });
    if (paper) {
      if (type !== "pdf") {
        // Return success response
        res.status(200).json(paper);
        return;
      } else {
        const filePath = path.join(process.cwd(), `/${paper.paperFilePath}`);
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Length": stat.size,
          "Content-Disposition": 'inline; filename="paper.pdf"',
        });
        const fileStream = fs.createReadStream(filePath);

        await new Promise(function (resolve) {
          fileStream.pipe(res);
          fileStream.on("end", resolve);
        });
        return;
      }
    } else {
      res.status(404).json({ error: "Paper not found." });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
