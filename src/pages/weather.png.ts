import type { APIContext } from "astro";
import { z } from "zod";

function setPrecision(num: number): number {
  return Number(num.toFixed(4));
}

const FORT_MASON_LAT = 37.8067;
const FORT_MASON_LONG = -122.4308;

const ZQuery = z.object({
  lat: z.number().default(FORT_MASON_LAT).transform(setPrecision),
  long: z.number().default(FORT_MASON_LONG).transform(setPrecision),
});

export async function GET({ request }: APIContext) {
  const search = new URL(request.url).search;
  const searchP = new URLSearchParams(search);
  const qs = Object.fromEntries(searchP.entries());

  const { lat, long } = ZQuery.parse(qs);

  const url = `https://forecast.weather.gov/meteograms/Plotter.php?lat=${lat}&lon=${long}&wfo=MTR&zcode=CAZ006&gset=18&gdiff=3&unit=0&tinfo=PY8&ahour=0&pcmd=10011100100000000000000000000000000000000000000000000000000&lg=en&indu=1!1!1!&dd=&bw=&hrspan=24&pqpfhr=6&psnwhr=6`;

  const response = await fetch(url);
  return new Response(await response.arrayBuffer());
}
