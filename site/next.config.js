import { withPlausibleProxy } from "next-plausible";
import withMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import "./src/env.js";

const config = withMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
})(
  withPlausibleProxy({
    customDomain: "https://analytics.shmugo.co",
  })({
    reactStrictMode: true,

    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },

    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.whereisthegooglecar.com", // works for now :P
        },
      ],
    },
  }),
);

export default config;
