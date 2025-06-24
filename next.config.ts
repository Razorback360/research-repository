import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n:{
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  }
};

export default withPayload(nextConfig);
