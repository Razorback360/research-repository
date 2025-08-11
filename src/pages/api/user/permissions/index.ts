import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { addPermission, checkPermission, removePermission } from "@app/utils/permissions";

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
      if (!(await checkPermission(session.user?.id, "ADMIN_BAN"))) {
        res.status(403).json({ error: "Forbidden" });
        break;
      }
      try {
        const { id } = req.query;
        const { action, permission } = req.body;

        if (action === "remove") {
          // Ban user by ID
          removePermission(String(id), permission);
          res.status(200).json({ message: "Permission removed successfully" });
        } else if (action === "add") {
          // Unban user by ID
          addPermission(String(id), permission);
          res.status(200).json({ message: "Permission added successfully" });
        } else {
          res.status(400).json({ error: "Invalid action" });
        }
      } catch {
        res.status(500).json({ error: "Failed to update permissions" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
