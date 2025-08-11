import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index"
import { randomUUID } from "crypto";
import { sendOtpEmail } from "@app/utils/mail"
import { env } from "@app/utils/env";
import { cache, retrieve, invalidate } from "@app/utils/redis";
import { authOptions } from "@app/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId,
                emailVerified: null
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found or already verified" });
        }
        if (!user.email) {
            return res.status(400).json({ error: "User is an OAuth2 user" });
        }

        // Generate a verification token to be sent as a magic link
        const verificationToken = randomUUID();

        await sendOtpEmail(
            user.email,
            `${env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`,
            user.name || undefined
        );

        // Cache the verification token with a TTL of 60 minutes/1 hour
        await cache(`verify:${userId}`, verificationToken, 60 * 60);
        return res.status(200).json({ message: "Verification email sent" });
    } else if (req.method === "GET") {
        const { token } = req.query;
        //@ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
        const session = await getServerSession(req, res, authOptions);

        // If no session, return unauthorized error
        if (!session) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        const storedToken = await retrieve(`verify:${session.user.id}`)
        if (!storedToken || storedToken !== token) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }
        // Update the user's email verification status
        await prisma.user.update({
            where: { id: session.user.id },
            data: { emailVerified: new Date() }
        });

        // Clear the cached token
        await invalidate(`verify:${session.user.id}`);

        return res.status(200).json({ message: "Email verified successfully" });
    }
    return res.status(405).json({ error: "Method not allowed" });
}
