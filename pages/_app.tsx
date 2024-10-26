// pages/_app.tsx
import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Head from "next/head";
import { useTranslation } from "@/contexts/LanguageContext";

Amplify.configure(outputs);

function AppContent({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("home.title")}</title>
      </Head>
      <h1>{t("home.title")} - SYDE</h1>
      <Authenticator>
        <Component {...pageProps} />
      </Authenticator>
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <LanguageProvider>
      <AppContent {...props} />
    </LanguageProvider>
  );
}
