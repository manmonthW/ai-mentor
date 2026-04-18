import { trainingPrograms } from "@/data";
import { notFound } from "next/navigation";
import { GraduationCap, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return trainingPrograms.map((p) => ({ category: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const prog = trainingPrograms.find((p) => p.slug === category);
  return { title: prog?.title || "课程详情" };
}

export default async function TrainingDetailPage({ params }: Props) {
  const { category } = await params;
  const prog = trainingPrograms.find((p) => p.slug === category);
  if (!prog) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center text-white/70 text-sm mb-4">
            <Link href="/learn" className="hover:text-white">培训中心</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">{prog.title}</span>
          </div>
          <GraduationCap className="w-10 h-10 mb-4" />
          <h1 className="text-3xl font-bold mb-2">{prog.title}</h1>
          <p className="text-white/80">{prog.description}</p>
          <div className="mt-4 flex gap-3">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{prog.level}</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{prog.modules.length} 个模块</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{prog.industry}行业</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {prog.modules.map((mod, i) => (
            <div key={mod.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{mod.title}</h3>
                  <p className="text-sm text-gray-500">{mod.description}</p>
                </div>
              </div>
              <div className="ml-11 space-y-2">
                {mod.lessons.map((lesson, j) => (
                  <div key={j} className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                    {lesson}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/learn" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← 返回培训中心
          </Link>
        </div>
      </div>
    </div>
  );
}
