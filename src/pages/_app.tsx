import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@app/components/Header"
import Footer from "@app/components/Footer"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  );
}
