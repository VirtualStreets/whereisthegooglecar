import { env } from "~/env";

export const runtime = "experimental-edge";

export default async function handler() {
  // removes slash at the end of next_public_vercel_url
  // an extrah slash is added in production
  let url = env.NEXT_PUBLIC_VERCEL_URL;
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  // get all spotting ids for sitemap
  const startTime = performance.now();
  const spottingIds: SpottingsArrayID = await get_spottings();
  const endTime = performance.now();
  console.log(endTime - startTime);

  // generate sitemap
  const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  
  ${generateUrlAttribute(`${url}/`, new Date().toISOString(), "always", "1.0")}
  ${generateUrlAttribute(`${url}/services/apple`, undefined, "always", "0.9")}
  ${generateUrlAttribute(`${url}/services/yandex`, undefined, "always", "0.9")}
  ${generateUrlAttribute(`${url}/services/others`, undefined, "always", "0.9")}
  ${generateUrlAttribute(`${url}/about`, undefined, "monthly", "0.9")}
  
  ${spottingIds.map((spotting) => generateUrlAttribute(`${url}/spotting/${spotting.id}`, spotting.date)).join("")}
  </urlset>`;

  // set response content & headers
  const res = new Response(createSitemap());
  res.headers.set("Content-Type", "application/xml");
  res.headers.set("Cache-control", "stale-while-revalidate, s-maxage=3600");

  return res;
}

function generateUrlAttribute(url: string, date?: string, changeFreq?: string, priority?: string) {
  return `
    <url>
      <loc>${url}</loc>
      ${date ? `<lastmod>${date}</lastmod>` : ""}
      ${changeFreq ? `<changefreq>${changeFreq}</changefreq>` : ""}
      ${priority ? `<priority>${priority}</priority>` : ""}
    </url>
  `;
}

async function get_spottings(): Promise<SpottingsArrayID> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/spottings/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: SpottingsArrayID = await response.json();
  return data;
}
