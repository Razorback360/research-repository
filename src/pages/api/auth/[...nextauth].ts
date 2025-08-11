/* eslint-disable */
//@ts-nocheck
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@db/index";
import LinkedInProvider from "next-auth/providers/linkedin";
import AzureAdProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "@app/utils/hash";
import { randomUUID, verify } from "crypto";
import { encode as defaultEncode } from "next-auth/jwt";
import { Permission } from "@prisma/client";
import { env } from "@app/utils/env"
import { signIn } from "next-auth/react";

// const ORCID_CLIENT_ID = env.ORCID_CLIENT_ID;
// const ORCID_CLIENT_SECRET = env.ORCID_CLIENT_SECRET;
const LINKEDIN_CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const AZURE_AD_CLIENT_ID = env.AZURE_AD_CLIENT_ID;
const AZURE_AD_CLIENT_SECRET = env.AZURE_AD_CLIENT_SECRET;
const AZURE_AD_TENANT_ID = env.AZURE_AD_TENANT_ID;
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
    }),
    AzureAdProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (credentials?.email && credentials?.password) {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (user && user.passHash) {
            const result = await compare(credentials.password, user.passHash);
            console.log(result);
            if (result) {
              return {
                id: user?.id,
                username: user?.name,
                image: user?.image,
                email: user?.email,
              };
            } else return null;
          } else return null;
        } else return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  jwt: {
    async encode(params) {
      if (params.token.credentials) {
        const sessionToken = randomUUID();
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
        if (!params.token.sub) {
          throw new Error("No user id found in token");
        }
        const session = await prisma.session.create({
          data: {
            sessionToken,
            userId: params.token.sub,
            expires,
          },
        });

        if (!session) {
          throw new Error("Failed to create session");
        }
        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user }) {
      const perms = await prisma.permission.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (perms) {
        return true;
      } else {
        await prisma.permission.create({
          data: {
            userId: user.id,
          },
        });
      }
      return true;
    },
    async jwt({ account, token }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, user }) {
      if (!session.user) return session;
      const permissions = await prisma.permission.findFirst({
        where: {
          userId: user.id,
        },
        select: {
          READ: true,
          WRITE: true,
          EDIT: true,
          ADMIN_BAN: true,
          ADMIN_DELETE_USER: true,
          ADMIN_READ: true,
          ADMIN_WRITE: true,
          ADMIN_EDIT_USER: true,
          ADMIN_MODERATE: true,
          DOWNLOAD: true,
        },
      });

      const use = {
        id: user.id,
        name: session.user.name,
        email: session.user.email,
        image: user.image,
        permissions: permissions
      };
      session.user = use;
      return session;
    },
  },
  pages: {
    signIn: "/auth/auth/login",
    error: "/404",
    newUser: "/auth/onboarding",
    verifyRequest: "/auth/verify",
  }
};

export default NextAuth(authOptions);
