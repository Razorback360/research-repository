import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { getSession } from "next-auth/react";
import { checkPermission } from "@app/utils/permissions";

// API route handler for viewing paper details & downloading paper file
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle only GET requests
  if (req.method === "GET") {
    // Get user session
    const session = await getSession({ req });

    // If no session, return unauthorized error
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = session.user?.id;

    // Check if user has permission to read
    const hasPermission = await checkPermission(userId, "READ");

    // If no permission, return forbidden error
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const { id } = req.query;
    const type = req.query.type as string;

    // Fetch paper details from the database
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
        doiLink: true
      },
    });

    if (paper) {
      if (type !== "pdf") {
        // Return success response with paper details
        res.status(200).json(paper);
        return;
      } else {
        // Define file path for download
        const filePath = path.join(process.cwd(), `/${paper.paperFilePath}`);
        const stat = fs.statSync(filePath);

        // Set response headers for file download
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Length": stat.size,
          "Content-Disposition": 'inline; filename="paper.pdf"',
        });

        // Create a read stream and pipe it to the response
        const fileStream = fs.createReadStream(filePath);

        await new Promise(function (resolve) {
          fileStream.pipe(res);
          fileStream.on("end", resolve);
        });
        return;
      }
    } else {
      // If paper not found, return not found error
      res.status(404).json({ error: "Paper not found." });
    }
  } else {
    // Handle non-GET requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
