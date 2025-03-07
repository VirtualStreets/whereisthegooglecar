import React from "react";
import { NextSeo } from "next-seo";
import { type InferGetServerSidePropsType } from "next";

import { PageComponent } from "~/components/layout/entry/page";
import { convertDate } from "~/utils/date";
import { env } from "~/env";
import { axiosInstance } from "~/utils/api/swrFetcher";

import { type z } from "zod";
import { type SearchIDSchema } from "~/utils/api/schemas/input_schema";

export const runtime = "experimental-edge";

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.data) {
    // format date
    const dateFormatted = convertDate(props.data.date);

    // format service for SEO
    const SERVICE = (() => {
      switch (props.data.service) {
        case "google":
          return "Google Street View";
        case "apple":
          return "Apple Maps";
        case "others":
          return "Street View";
        default:
          return (
            // capitalize first letter
            props.data.service.charAt(0).toUpperCase() + props.data.service.slice(1)
          );
      }
    })();

    // seo data
    const TITLE = `${props.data.town} in ${SERVICE} - WhereIsTheGoogleCar`;
    const DESCRIPTION = `${SERVICE} Car in ${props.data.town} on ${dateFormatted}.`;

    const OG_IMG_ENCODED = encodeURIComponent(`${env.NEXT_PUBLIC_CDN_URL}/${props.data.image}`);
    const OG_IMG_OPTIMIZED = encodeURIComponent(
      `${env.NEXT_PUBLIC_VERCEL_URL}/_next/image?url=${OG_IMG_ENCODED}&w=1920&q=75`,
    );
    const OPENGRAPH_IMAGE = `${env.NEXT_PUBLIC_VERCEL_URL}/api/og?img=${OG_IMG_OPTIMIZED}`;

    return (
      <>
        <NextSeo
          title={TITLE}
          description={DESCRIPTION}
          openGraph={{
            type: "website",
            title: TITLE,
            description: DESCRIPTION,
            images: [
              {
                url: OPENGRAPH_IMAGE,
                width: 1200,
                height: 630,
                alt: TITLE,
              },
            ],
            site_name: "Where Is The Google Car",
          }}
        />

        <div>
          <PageComponent dateFormatted={dateFormatted} data={props.data} />
        </div>
      </>
    );
  }
}

export const getServerSideProps = async ({ params }: { params: z.infer<typeof SearchIDSchema> }) => {
  // get id from query
  const id_query = params.id;
  if (id_query) {
    try {
      const response = await axiosInstance.get<SpottingMetadata>(`/spottings/${id_query}`);
      const data: SpottingMetadata = response.data;

      if (data) {
        return {
          props: { data },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};
