import 'dotenv/config'

const unvalidatedEnv = {
    // Database (Not used, for validation purposes.)
    DATABASE_URL: process.env.DATABASE_URL,
    // ORCID OAuth
    ORCID_CLIENT_ID: process.env.ORCID_CLIENT_ID,
    ORCID_CLIENT_SECRET: process.env.ORCID_CLIENT_SECRET,
    // LinkedIn OAuth
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    // Azure AD OAuth
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    // Google OAuth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // Email Configuration
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_SERVER_URL: process.env.EMAIL_SERVER_URL,
    EMAIL_SSL: process.env.EMAIL_SSL,
    EMAIL_SMTP_PORT: process.env.EMAIL_SMTP_PORT,
    // CMS Configuration
    NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CMS_READ_ONLY_API_KEY: process.env.NEXT_PUBLIC_CMS_READ_ONLY_API_KEY
};

for (const [key, value] of Object.entries(unvalidatedEnv)) {
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
}

export const env = unvalidatedEnv as { [K in keyof typeof unvalidatedEnv]: string };