import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getPost, getPostSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    <h2 className="mt-10 mb-3 text-2xl font-bold text-slate-900" {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-7 mb-2 text-xl font-bold text-slate-900" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-8 text-slate-700" {...p} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-slate-700" {...p} />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-slate-700" {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
      target={p.href?.startsWith("http") ? "_blank" : undefined}
      rel={p.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...p}
    />
  ),
  blockquote: (p: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-brand-400 bg-brand-50/60 py-1 pl-4 pr-2 text-lg font-medium italic text-slate-700"
      {...p}
    />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-brand-700" {...p} />
  ),
  strong: (p: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-slate-900" {...p} />
  ),
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="container-page max-w-3xl py-14">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> 返回手记
      </Link>

      <div className="mb-2 flex items-center gap-3 text-sm text-slate-400">
        <span className="font-medium text-brand-700">{post.category}</span>
        <time>{post.date}</time>
      </div>
      <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{post.description}</p>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-500 p-6 text-white">
        <p className="text-lg font-bold">想第一时间看到珂的下一个作品?</p>
        <p className="mt-1 text-white/90">关注我,和一群想认真玩 AI 的人待在一起。</p>
        <Link
          href="/#subscribe"
          className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700"
        >
          关注珂 →
        </Link>
      </div>
    </article>
  );
}
