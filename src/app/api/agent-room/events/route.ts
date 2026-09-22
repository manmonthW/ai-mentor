import { readHermesEvents } from "@/lib/hermes-event-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function numberParam(value: string | null, fallback: number, max: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(0, parsed)) : fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const since = numberParam(url.searchParams.get("since"), 0, Number.MAX_SAFE_INTEGER);
  const limit = numberParam(url.searchParams.get("limit"), 200, 500);
  const stream = url.searchParams.get("stream") === "1";

  if (!stream) {
    const snapshot = await readHermesEvents(since, limit);
    return Response.json(snapshot, {
      status: snapshot.connected ? 200 : 503,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  const encoder = new TextEncoder();
  let closed = false;
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let cursor = since;
      const send = (event: string, data: unknown) => controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      const push = async () => {
        if (closed) return;
        const snapshot = await readHermesEvents(cursor, limit);
        if (snapshot.events.length) cursor = snapshot.events[snapshot.events.length - 1].sequence;
        send("snapshot", snapshot);
      };
      await push();
      const interval = setInterval(() => void push(), 2000);
      const heartbeat = setInterval(() => {
        if (!closed) controller.enqueue(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
      }, 15000);
      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        clearInterval(heartbeat);
        try { controller.close(); } catch { /* client already disconnected */ }
      });
    },
    cancel() { closed = true; },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
