import { MetadataRoute } from "next";
import providers from "@/lib/mock-api/data/providers.json";
import taxonomy from "@/lib/mock-api/data/taxonomy.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://senura-d.github.io/myhitch-connect";

  // 1. Static Pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/search",
    "/category",
    "/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Category Pages
  const categoryPages = taxonomy.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 3. Dynamic Provider Pages
  const providerPages = providers.map((prov) => ({
    url: `${baseUrl}/provider/${prov.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...providerPages];
}
