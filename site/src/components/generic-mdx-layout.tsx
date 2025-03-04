import Head from "next/head";
import Image from "next/image";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { TopText } from "~/components/layout/entry/topText";
import headerImage from "~/../public/about.webp";

interface FrontMatter {
  title: string;
}

interface GenericMdxLayoutProps {
  children: React.ReactNode;
  frontmatter: FrontMatter;
}

export default function GenericMdxLayout({ children, frontmatter }: GenericMdxLayoutProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} - WhereIsTheGoogleCar</title>
        <meta property="og:title" content="Privacy Policy - WhereIsTheGoogleCar" />
      </Head>

      <div className="flex flex-col gap-2">
        <TopText title={frontmatter.title} />

        {/* dont ask how i came up with that aspect ratio it was */}
        {/* a rookie incident */}
        <AspectRatio ratio={32 / 9} className="bg-muted">
          <Image src={headerImage} alt="Google Street View Car" fill className="rounded-md object-cover" />
        </AspectRatio>

        <div className="text-background-foreground space-y-3.5 leading-7 [&:not(:first-child)]:mt-6">{children}</div>
      </div>
    </>
  );
}
