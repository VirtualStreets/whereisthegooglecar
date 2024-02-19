import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure.query(async () => {
    // simulate a slow db call
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return db.spottings.create({
      data: {
        date: new Date(),
        town: "Bogota, Colombias",
        country: "Colombia",
        countryEmoji: "🇨🇴",
        imageUrl:
          "https://cdn.discordapp.com/attachments/774703077172838430/1139459856332496966/IMG_1732.png",
        sourceUrl: "#",
        // locationUrl: input.locationUrl,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.spottings.findMany({
      orderBy: { date: "desc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return db.spottings.findUnique({
        where: { id: input.id },
      });
    }),
});
