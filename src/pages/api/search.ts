import { prisma } from "@db/index";
import type { NextApiRequest, NextApiResponse } from "next";

// API route handler for searching datasets, papers, and users
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle only GET requests
  if (req.method === "GET") {
    const type = req.query.type as string;
    const query = req.query.query as string;
    const normalizedQuery = query.replace(/[\s\n\t]/g, "_");
    switch (type) {
      case "dataset":
        // Search for datasets with relevance to the query
        const datasets = await prisma.dataset.findMany({
          where: {
            status: {
              type: "APPROVED",
            },
            OR: [
                {
                  title: {
                    search: normalizedQuery,
                  },
                },
                {
                  description: {
                    search: normalizedQuery,
                  },
                },
              ],
          },
          orderBy: {
            _relevance: {
              fields: ["title", "description", "keywords"],
              search: normalizedQuery,
              sort: "asc",
            },
          },
          select: {
            id: true,
            title: true,
            description: true,
            keywords: true,
          },
        });
        res.status(200).json({ datasets: datasets, papers: [] });
        break;
      case "paper":
        // Search for papers with relevance to the query

        const papers = await prisma.paper.findMany({
          where: {
            status: {
              type: "APPROVED",
            },
            OR: [
                {
                  title: {
                    search: normalizedQuery,
                  },
                },
                {
                  abstract: {
                    search: normalizedQuery,
                  },
                },
              ],
          },
          orderBy: {
            _relevance: {
              fields: ["title", "abstract", "keywords"],
              search: normalizedQuery,
              sort: "asc",
            },
          },
          select: {
            id: true,
            title: true,
            publishDate: true,
            keywords: true,
            abstract: true,
          },
        });
        res.status(200).json({ papers: papers, datasets: [] });
        break;

      case "user":
        // Search for users with relevance to the query
        const users = await prisma.user.findMany({
          where: {
            bannedAt: null,
          },
          orderBy: {
            _relevance: {
              fields: ["name", "email"],
              search: query,
              sort: "asc",
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
        res.status(200).json({ results: users });
        break;
      default:
        // Default case: search for both papers and datasets
        const papersDefault = await prisma.paper.findMany({
          where: {
            status: {
              type: "APPROVED",
            },
            OR: [
                {
                  title: {
                    search: normalizedQuery,
                  },
                },
                {
                  abstract: {
                    search: normalizedQuery,
                  },
                },
              ],
          },
          orderBy: {
            _relevance: {
              fields: ["title", "abstract", "keywords"],
              search: normalizedQuery,
              sort: "asc",
            },
          },
          select: {
            id: true,
            title: true,
            publishDate: true,
            abstract: true,
            keywords: true,
          },
        });
        const datasetsDefault = await prisma.dataset.findMany({
          where: {
            status: {
              type: "APPROVED",
            },
            OR: [
              {
                title: {
                  search: normalizedQuery,
                },
              },
              {
                description: {
                  search: normalizedQuery,
                },
              },
            ],
          },
          orderBy: {
            _relevance: {
              fields: ["title", "description", "keywords"],
              search: normalizedQuery,
              sort: "asc",
            },
          },
          select: {
            id: true,
            title: true,
            description: true,
            keywords: true,
          },
        });
        res.status(200).json({
          papers: papersDefault,
          datasets: datasetsDefault,
        });
    }
  } else {
    // Handle non-GET requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
