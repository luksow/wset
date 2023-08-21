import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Script from 'next/script'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>WSET 2 cheat sheet by @luksow</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="WSET 2 cheat sheet by @luksow" />
        <link rel="canonical" href="https://wset.luksow.com" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-1938LGDNQD" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-1938LGDNQD');
        `}
      </Script>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            table: { "page-break-after": "always" },
            tr:    { "page-break-inside": "avoid", "page-break-after": "auto" },
            td:    { "page-break-inside": "avoid", "page-break-after": "auto" },
            thead: { "display": "table-header-group" },
            tfoot: { "display": "table-footer-group" }
          }),
          /** Put your mantine theme override here */
          // colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
