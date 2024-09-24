import { home } from "@/constants";
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "About Betweysure";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const gilroyMedium = fetch(
    new URL("../../public/fonts/Gilroy-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {home.title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Gilroy-Medium",
          data: await gilroyMedium,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}