import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { cache,retrieve } from '@app/utils/redis';
import { sendResetPasswordEmail } from '@app/utils/mail';
import { env } from '@app/utils/env';
import { randomUUID } from 'crypto';
import { hash } from '@app/utils/hash';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Missing or invalid reset token' });
    }

    const email = await retrieve(`reset:${token}`);

    if (!email) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Missing or invalid new password' });
    }
    const passHash = await hash(password as string);

    await prisma.user.update({
      where: { email: email },
      data: { passHash: passHash }
    });

    return res.status(200).json({ message: 'Password reset successfully' });

  } else if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });
    

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const verificationToken = randomUUID();

    await sendResetPasswordEmail(
      email,
      `${env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`,
      user.name || undefined
    );

    // Cache the verification token with a TTL of 60 minutes/1 hour
    await cache(`reset:${verificationToken}`, email, 60 * 60);
    return res.status(200).json({ message: "Reset email sent" });
  }

}
