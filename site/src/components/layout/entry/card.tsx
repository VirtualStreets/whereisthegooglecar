import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TopText } from "~/components/layout/entry/topText";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspect-ratio";

import twemoji from "twemoji";
import { env } from "~/env";
import { Badge } from "~/components/ui/badge";
import { HomeSkeleton } from "./skeleton";
import { convertDate } from "~/utils/date";
import { LocationButton, SourceButton, TextBluePrint } from "./output";
import { useState } from "react";

import { ImagePreview } from "~/components/layout/entry/image";

export const SpottingCard = (props: cardProps) => {
  // format date
  const date = convertDate(props.date);

  // handle aspect ratio (for mobile)
  const [aspectRatio, setAspectRatio] = useState(16 / 9); // default aspect ratio

  const handleLoadingComplete = ({
    naturalWidth,
    naturalHeight,
  }: {
    // type definitions
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    // if on pc, stay with 16/9
    if (window.innerWidth >= 1024) {
      return;
    }

    setAspectRatio(naturalWidth / naturalHeight);
  };

  return (
    <div className="w-96 lg:w-[402px]">
      <Card className="-space-y-4">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full flex-row justify-between gap-20">
              <h2 className="flex items-center justify-start text-3xl font-semibold">
                {date}
              </h2>

              <div className="flex items-center justify-end">
                <span
                  dangerouslySetInnerHTML={{
                    __html: twemoji.parse(props.countryEmoji, {
                      folder: "svg",
                      ext: ".svg",
                    }),
                  }}
                  className="w-12 lg:w-9"
                />
              </div>
            </div>
          </CardTitle>
          <CardDescription className="flex items-center justify-between gap-2">
            <TextBluePrint text={props.town} size="base" />

            {props.company && (
              <Badge variant={"secondary"} className="h-5 w-24">
                <p className="w-full text-center">
                  {props.company.charAt(0).toUpperCase() +
                    props.company.slice(1)}
                </p>
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImagePreview
            url={`${env.NEXT_PUBLIC_CDN_URL}/${props.imageUrl}`}
            alt={`Picture of a Google Car spotted in ${props.town} on ${date}.`}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <SourceButton url={props.sourceUrl} size="sm" />
            {props.locationUrl && (
              <LocationButton url={props.locationUrl} size="sm" />
            )}
          </div>
          <div className="flex items-center md:w-1/3">
            <Button className="flex h-full w-full items-center" asChild>
              <Link prefetch={false} href={`/spotting/${props.id}`}>
                Info
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const CardSet = (props: cardSetProps) => {
  if (props.info.length === 0) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <TopText title={props.month} right={props.year} />
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
        {props.info.map((item: cardProps) => (
          <SpottingCard
            id={item.message_id}
            key={item.id}
            date={item.date}
            town={item.town}
            countryEmoji={item.countryEmoji}
            imageUrl={item.imageUrl}
            sourceUrl={item.sourceUrl}
            locationUrl={item.locationUrl}
            company={props.showCompany ? item.company : undefined}
          />
        ))}
      </div>
    </div>
  );
};
