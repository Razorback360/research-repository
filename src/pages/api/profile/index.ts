import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/index";
import { authOptions } from "@app/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { hash } from "@app/utils/hash";
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

// API route handler for the authenticated user's profile
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // @ts-expect-error - Types provided by package (next-auth) are incorrect. getServerSession accepts the arguments.
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    switch (req.method) {
        case "GET":
            try {
                // Get the authenticated user's details
                const user = await prisma.user.findUnique({
                    where: { id: session.user.id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        bannedAt: true,
                    },
                });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                } else {
                    res.status(200).json(user);
                }
            } catch {
                res.status(500).json({ error: "Failed to fetch user details" });
            }
            break;

        case "PATCH":
            try {
                const form = formidable({
                    uploadDir: path.join(process.cwd(), 'public/uploads/profiles'),
                    maxFiles: 1,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                    filter: ({ mimetype }) => mimetype ? mimetype.includes('image') : false,
                    filename: (name, ext) => `${session.user.id}${ext}`,
                });

                const [fields, files] = await form.parse(req);
                const name = fields.name?.[0];
                const password = fields.password?.[0];
                const uploadedImage = files.image?.[0];

                // Construct the update data
                const updateData: any = {};
                if (name) updateData.name = name;
                if (password) updateData.passHash = await hash(password);
                
                let newImagePath: string | undefined;
                if (uploadedImage) {
                    // Convert Windows path to URL path
                    newImagePath = uploadedImage.filepath
                        .split('public')[1]
                        .replace(/\\/g, '/');
                    updateData.image = newImagePath;
                }

                const updatedUser = await prisma.user.update({
                    where: { id: session.user.id },
                    data: updateData,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        bannedAt: true
                    }
                });

                // Delete old profile image if it exists and we're uploading a new one
                if (uploadedImage && updatedUser.image && updatedUser.image !== newImagePath) {
                    const oldImagePath = path.join(process.cwd(), 'public', updatedUser.image);
                    await fs.unlink(oldImagePath).catch(() => {}); // Ignore errors if file doesn't exist
                }

                res.status(200).json(updatedUser);
            } catch (error) {
                console.error('Profile update error:', error);
                res.status(500).json({ error: "Failed to update user details" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PATCH"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
