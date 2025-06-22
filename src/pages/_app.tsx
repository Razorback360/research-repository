import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@app/components/Header";
import Footer from "@app/components/Footer";
import "@app/pages/i18n";
import { useTranslation } from "react-i18next";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { i18n } = useTranslation();
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col h-screen relative min-h-screen" dir={i18n.dir()}>
        <Header />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
