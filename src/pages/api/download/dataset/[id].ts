import {prisma} from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const file = await prisma.dataset.findFirst({
      where: {
        id: id as string
      }
    })

    if (file) {
      res.setHeader('Content-Disposition', `attachment; filename=${file.datasetFilePath}`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(fs.readFile(process.cwd() + "/uploads" + file.datasetFilePath));
    } else {
      res.status(404).json("File not found.")
    }
  }
}