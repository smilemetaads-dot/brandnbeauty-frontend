import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const coreRoutes = ["/", "/products", "/brands", "/category", "/concern"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return coreRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
