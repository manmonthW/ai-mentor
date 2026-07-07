import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  accent?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "1970-01-01",
        category: data.category ?? "手记",
        tags: data.tags ?? [],
        accent: data.accent,
        content,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return readAll().map(({ content: _content, ...meta }) => {
    void _content;
    return meta;
  });
}

export function getPost(slug: string): Post | null {
  return readAll().find((p) => p.slug === slug) ?? null;
}

export function getPostSlugs(): string[] {
  return readAll().map((p) => p.slug);
}
