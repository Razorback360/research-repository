import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index"; // Adjust the import according to your project structure
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { checkPermission } from "@app/utils/permissions";

// API route handler for papers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  // Get user session
  // @ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
  const session = await getServerSession(req, res, authOptions);

  // If no session, return unauthorized error
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  switch (method) {
    case "GET":
      if (!(await checkPermission(session.user?.id, "ADMIN_READ"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        // Get all papers
        const papers = await prisma.paper.findMany({
          select: {
            title: true,
            status: {
              select: {
                type: true,
                id: true
              },
            },
            id: true,
            abstract: true,
            user: {
              select: {
                email: true,
                name: true
              }
            },
            type: true
          },
        });
        res.status(200).json(papers);
      } catch {
        res.status(500).json({ error: "Failed to fetch papers" });
      }
      break;

    case "DELETE":
      if (!(await checkPermission(session.user?.id, "ADMIN_WRITE"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        // Delete paper by ID
        await prisma.paper.delete({
          where: { id: String(id) },
        });
        res.status(200).json({ message: "Paper deleted successfully" });
      } catch {
        res.status(500).json({ error: "Failed to delete paper" });
      }
      break;

    case "PUT":
      if (
        !(await checkPermission(session.user?.id, "ADMIN_WRITE")) ||
        !(await checkPermission(session.user?.id, "EDIT"))
      ) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        const {
          title,
          abstract,
          journal,
          volume,
          issue,
          startPage,
          endPage,
          publishDate,
          doiLink,
        } = req.body;
        // Edit paper by ID
        const updatedPaper = await prisma.paper.update({
          where: { id: String(id) },
          data: {
            title,
            abstract,
            journal,
            volume,
            issue,
            startPage,
            endPage,
            publishDate: new Date(publishDate),
            doiLink,
          },
        });
        res.status(200).json(updatedPaper);
      } catch {
        res.status(500).json({ error: "Failed to update paper" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
