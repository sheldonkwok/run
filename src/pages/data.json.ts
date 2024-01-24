import { z } from "zod";

// Doesn't seem to have rain data

const ZGeometry = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

const ZForecast = z.object({
  geometry: ZGeometry,
});

const ZONES = {
  "Nob Hill": { x: 86, y: 106 },
  "Marina/Pac Heights": { x: 85, y: 106 },
  GGP: { x: 83, y: 105 },
  Headlands: { x: 83, y: 108 },
  "Land's End": { x: 82, y: 106 },
} as const;

type ZoneName = keyof typeof ZONES;

const URL = "https://api.weather.gov/gridpoints/MTR/82,106/forecast/hourly";

async function getWeather(zone: ZoneName): Promise<z.infer<typeof ZForecast>> {
  const { x, y } = ZONES[zone];

  const response = await fetch(
    `https://api.weather.gov/gridpoints/MTR/${x},${y}/forecast/hourly`
  );

  const json = await response.json();
  const parsed = ZForecast.parse(json);

  return parsed;
}

// { params, request }
export async function GET() {
  const forecast = await getWeather("GGP");

  return new Response(JSON.stringify(forecast));
}
