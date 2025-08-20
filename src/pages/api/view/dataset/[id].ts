import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import * as fsPromise from "fs/promises";
import { checkPermission } from "@app/utils/permissions";
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

// API route handler for viewing dataset details & downloading dataset file
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle only GET requests
  if (req.method === "GET") {
    // Get user session
    //@ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
    const session = await getServerSession(req, res, authOptions);

    // If no session, return unauthorized error
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = session.user?.id;

    // Check if user has permission to read
    let hasPermission = await checkPermission(userId, "READ");

    // If no permission, return forbidden error
    if (!hasPermission) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const { id } = req.query;
    const type = req.query.type as string;

    // Fetch dataset details from the database
    const dataset = await prisma.dataset.findFirst({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        datasetFilePath: true,
        mappingFilePath: true,
        reportFilePath: true,
        sampleFilePath: true,
      },
    });

    if (dataset) {
      if (type !== "spss") {
        // Read dataset mapping file (JSON format)
        const mapping = await fsPromise.readFile(
          path.join(process.cwd(), `/${dataset.mappingFilePath}`), "utf-8"
        );

        // Read dataset report file (TXT format)
        const report = await fsPromise.readFile(
          path.join(process.cwd(), `/${dataset.reportFilePath}`), "utf-8"
        );

        // Read dataset sample file (JSON format)
        const sample = await fsPromise.readFile(
          path.join(process.cwd(), `/${dataset.sampleFilePath}`), "utf-8"
        );

        // Attach mapping, report and sample data to dataset object
        const datasetFinal = {
          ...dataset,
          mapping: JSON.parse(mapping.toString()),
          report: report,
          sample: JSON.parse(sample.toString()),
        }
        
        // Return success response with dataset details
        res.status(200).json(datasetFinal);
        return;
      } else {
        // Check if user has permission to download
        hasPermission = await checkPermission(userId, "DOWNLOAD");
        if (!hasPermission) {
          res.status(403).json({ error: "Forbidden" });
          return;
        }

        // Define file path for download
        const filePath = path.join(
          process.cwd(),
          `/${dataset.datasetFilePath}`
        );
        const stat = fs.statSync(filePath);

        // Set response headers for file download
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Length": stat.size,
          "Content-Disposition": `inline; filename="${dataset.id}.sav"`,
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
      // If dataset not found, return not found error
      res.status(404).json({ error: "Dataset not found." });
    }
  } else {
    // Handle non-GET requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
