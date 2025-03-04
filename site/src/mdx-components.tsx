import type { MDXComponents } from "mdx/types";
import { TopText } from "./components/layout/entry/topText";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <TopText title={children?.toString() ?? ""} />,
    h2: ({ children }) => (
      <h2 className="w-full scroll-m-20 text-left text-4xl font-extrabold leading-[normal] md:text-5xl">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="border-p scroll-m-20 text-3xl font-extrabold tracking-tight">{children}</h3>,
    a: (props) => (
      <a href={props.href} className="font-medium text-primary underline underline-offset-4">
        {props.children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc font-medium text-primary underline underline-offset-4 [&>li]:mt-2">
        {children}
      </ul>
    ),
  };
}
