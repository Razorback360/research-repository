import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index"; // Adjust the import according to your project structure
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { checkPermission } from "@app/utils/permissions";

// API route handler for papers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  // Get user session
  //@ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
  const session = await getServerSession(req, res, authOptions);

  // If no session, return unauthorized error
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  switch (method) {
    case "PUT":
      if (!(await checkPermission(session.user?.id, "ADMIN_MODERATE"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        const { action, comment } = req.body;

        if (!id || !action) {
          return res.status(400).json({ error: "ID and action are required" });
        }

        let updatedStatus;

        switch (action) {
          case "approve":
            updatedStatus = await prisma.status.update({
              where: { id: Number(id) },
              data: { type: "APPROVED", comment: null },
            });
            break;

          case "deny":
            if (!comment) {
              return res
                .status(400)
                .json({ error: "Comment is required for deny action" });
            }
            updatedStatus = await prisma.status.update({
              where: { id: Number(id) },
              data: { type: "DENIED", comment },
            });
            break;

          case "requestEdit":
            if (!comment) {
              return res
                .status(400)
                .json({ error: "Comment is required for request edit action" });
            }
            updatedStatus = await prisma.status.update({
              where: { id: Number(id) },
              data: { type: "REQUEST_FOR_EDIT", comment },
            });
            break;

          default:
            return res.status(400).json({ error: "Invalid action" });
        }

        res.status(200).json(updatedStatus);
      } catch (err){
        console.log(`${err}`)
        res.status(500).json({ error: "Failed to update status" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
