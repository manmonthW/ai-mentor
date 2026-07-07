import { NextResponse } from "next/server";
import { fetchAINews } from "@/lib/news";

export const runtime = "nodejs";
export const revalidate = 1800; // 30 分钟

export async function GET() {
  const result = await fetchAINews();
  return NextResponse.json(result, {
    status: result.ok ? 200 : 502,
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=600" },
  });
}
