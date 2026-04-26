import { ImageResponse } from "next/og";
import { defaultDescription, siteName } from "@/lib/seo";

export const alt = `${siteName} beauty marketplace`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "78px",
          color: "#241114",
          background:
            "linear-gradient(135deg, #fff8f5 0%, #f8e7e1 46%, #e9f4ef 100%)",
        }}
      >
        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            width: 136,
            height: 8,
            marginTop: 30,
            marginBottom: 34,
            background: "#c15b62",
          }}
        />
        <div
          style={{
            maxWidth: 870,
            fontSize: 38,
            fontWeight: 500,
            lineHeight: 1.24,
          }}
        >
          {defaultDescription}
        </div>
      </div>
    ),
    size
  );
}
