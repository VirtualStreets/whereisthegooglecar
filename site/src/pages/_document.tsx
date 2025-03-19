import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9669677049263987"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
