import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "./layout";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = ["", "/works", "/skills", "/blog", "/legal", "/solo", "/training", "/zhongkao", "/k12", "/news", "/about"].map(
    (r) => ({
      url: `${base}${r}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    }),
  );
  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...routes, ...posts];
}
