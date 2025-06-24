import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@app/components/Header";
import Footer from "@app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import NextApp ,{ AppContext } from "next/app";
import { useRouter } from "next/router";

type Props = AppProps & {
  messages: any;
};

export default function App({
  Component,
  messages,
  pageProps: { session, ...pageProps },
}: Props) {
  const router = useRouter();
  console.log("App Component Rendered");
  console.log(messages)
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={router.locale} messages={messages}>
        <div
          className="flex flex-col h-screen relative min-h-screen"
          dir={router.locale === "ar" ? "rtl" : "ltr"}
        >
          <Header />
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async function getInitialProps(context: AppContext) {
  const {locale} = context.router;
  return {
    ...(await NextApp.getInitialProps(context)),
    messages: locale ? require(`../../public/locales/${locale}/clientTranslation.json`) : undefined
  };
};