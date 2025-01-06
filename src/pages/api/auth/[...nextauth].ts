import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@db/index"
import LinkedInProvider from "next-auth/providers/linkedin"
import AzureAdProvider from "next-auth/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
// const ORCID_CLIENT_ID = process.env.ORCID_CLIENT_ID
// const ORCID_CLIENT_SECRET = process.env.ORCID_CLIENT_SECRET
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string
const AZURE_AD_CLIENT_ID = process.env.AZURE_AD_CLIENT_ID as string
const AZURE_AD_CLIENT_SECRET = process.env.AZURE_AD_CLIENT_SECRET as string
const AZURE_AD_TENANT_ID = process.env.AZURE_AD_TENANT_ID as string
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        LinkedInProvider({ clientId: LINKEDIN_CLIENT_ID, clientSecret: LINKEDIN_CLIENT_SECRET }),
        AzureAdProvider({ clientId: AZURE_AD_CLIENT_ID, clientSecret: AZURE_AD_CLIENT_SECRET, tenantId: AZURE_AD_TENANT_ID }),
        GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
        CredentialsProvider({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" }
            }
        }
        )
    ],
    adapter: PrismaAdapter(prisma)
}

export default NextAuth(authOptions)