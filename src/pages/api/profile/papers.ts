
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

// API route handler for fetching the authenticated user's papers
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Only allow GET
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	// @ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	try {
		// Get all papers for the authenticated user
		const papers = await prisma.paper.findMany({
			where: { userId: session.user.id },
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
		res.status(500).json({ error: "Failed to fetch user's papers" });
	}
}
