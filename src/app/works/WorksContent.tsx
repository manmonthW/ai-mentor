"use client";

import { useState } from "react";
import { works, workGroups, worksCount, totalShippedApprox } from "@/data/works";
import WorkCard from "@/components/WorkCard";

export default function WorksContent() {
  const [active, setActive] = useState<string>("全部");
  const tabs = ["全部", ...workGroups];
  const list = active === "全部" ? works : works.filter((w) => w.group === active);

  return (
    <div className="wrap py-16">
      <header className="max-w-3xl border-b border-[color:var(--color-line)] pb-10">
        <p className="eyebrow mb-4">作品墙 / SELECTED WORK — {String(worksCount).padStart(2, "0")}</p>
        <h1 className="display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1] text-[color:var(--color-ink)]">
          珂造的东西
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
          精选收录 {worksCount} 个,实际造过、上线过的有 {totalShippedApprox}+。有的很正经,有的纯为好玩——都是「珂这样玩 AI」的证据。
        </p>
      </header>

      <div className="my-8 flex flex-wrap gap-x-6 gap-y-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`mono pb-1 text-sm transition-colors ${
              active === t
                ? "border-b-2 border-[color:var(--color-flame)] text-[color:var(--color-ink)]"
                : "border-b-2 border-transparent text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-px bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <WorkCard key={w.id} work={w} index={i} />
        ))}
      </div>
    </div>
  );
}
