import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPost, getPostSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

const mdxComponents = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="display mt-12 mb-3 text-3xl font-bold text-[color:var(--color-ink)]" {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-2 text-xl font-bold text-[color:var(--color-ink)]" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-5 text-[17px] leading-8 text-[color:var(--color-ink-soft)]" {...p} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-[color:var(--color-ink-soft)]" {...p} />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-[color:var(--color-ink-soft)]" {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-8" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="ulink"
      target={p.href?.startsWith("http") ? "_blank" : undefined}
      rel={p.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...p}
    />
  ),
  blockquote: (p: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-8 border-l-2 border-[color:var(--color-flame)] pl-5 text-xl font-medium italic text-[color:var(--color-ink)]" {...p} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code className="mono rounded-sm bg-[color:var(--color-paper-2)] px-1.5 py-0.5 text-[0.88em] text-[color:var(--color-flame-ink)]" {...p} />
  ),
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-[color:var(--color-ink)]" {...p} />,
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="wrap max-w-3xl py-16">
      <Link href="/blog" className="mono mb-10 inline-flex items-center gap-1 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-flame)]">
        <ArrowLeft className="h-4 w-4" /> 返回手记
      </Link>

      <div className="mono mb-3 text-sm text-[color:var(--color-muted)]">
        <span className="text-[color:var(--color-flame)]">{post.category}</span> · {post.date}
      </div>
      <h1 className="display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] text-[color:var(--color-ink)]">
        {post.title}
      </h1>
      <p className="mt-5 text-xl text-[color:var(--color-ink-soft)]">{post.description}</p>

      <div className="mt-10 border-t border-[color:var(--color-line)] pt-8">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mt-14 border-t border-[color:var(--color-line)] pt-8">
        <p className="display text-2xl font-bold text-[color:var(--color-ink)]">想看珂的下一个作品?</p>
        <Link href="/#subscribe" className="ulink mt-3 text-[color:var(--color-ink)]">
          关注珂 <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
