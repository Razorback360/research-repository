import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { prisma } from "@db/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get user session
        //@ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ verified: false, error: 'Unauthorized' });
        }

        // Check if the user's email is verified
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { emailVerified: true }
        });

        return res.status(200).json({
            verified: user?.emailVerified ? true : false
        });

    } catch (error) {
        return res.status(500).json({ verified: false, error: 'Internal server error' });
    }
}