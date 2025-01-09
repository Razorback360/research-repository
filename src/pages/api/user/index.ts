import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index"; // Adjust the import according to your project structure
import { authOptions } from "../auth/[...nextauth]";
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
    case "GET":
      if (!(await checkPermission(session.user?.id, "ADMIN_READ"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        // Get all users
        const users = await prisma.user.findMany({
          select: {
            name: true,
            id: true,
            email: true,
            bannedAt: true,
            permissions: true
          },
        });
        res.status(200).json(users);
      } catch {
        res.status(500).json({ error: "Failed to fetch users" });
      }
      break;

    case "DELETE":
      if (!(await checkPermission(session.user?.id, "ADMIN_DELETE_USER"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        // Delete user by ID
        await prisma.user.delete({
          where: { id: String(id) },
        });
        res.status(200).json({ message: "User deleted successfully" });
      } catch {
        res.status(500).json({ error: "Failed to delete user" });
      }
      break;

    case "PUT":
      if (!(await checkPermission(session.user?.id, "ADMIN_BAN"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        const { action } = req.body;

        if (action === "ban") {
          // Ban user by ID
          const bannedUser = await prisma.user.update({
            where: { id: String(id) },
            data: { bannedAt: new Date() },
          });
          res.status(200).json(bannedUser);
        } else if (action === "unban") {
          // Unban user by ID
          const unbannedUser = await prisma.user.update({
            where: { id: String(id) },
            data: { bannedAt: null },
          });
          res.status(200).json(unbannedUser);
        } else {
          res.status(400).json({ error: "Invalid action" });
        }
      } catch {
        res.status(500).json({ error: "Failed to update user" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
