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
      <div className="flex flex-col h-screen relative min-h-screen">
      <Header/>
      <div className="flex-grow">
      <Component {...pageProps}/>
      </div>
      <Footer/>
      </div>
    </SessionProvider>
  );
}
