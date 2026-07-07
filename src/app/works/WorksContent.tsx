"use client";

import { useState } from "react";
import { works, workGroups, worksCount, totalShippedApprox } from "@/data/works";
import WorkCard from "@/components/WorkCard";

export default function WorksContent() {
  const [active, setActive] = useState<string>("全部");
  const tabs = ["全部", ...workGroups];
  const list = active === "全部" ? works : works.filter((w) => w.group === active);

  return (
    <div className="container-page py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-black text-slate-900">作品墙</h1>
        <p className="mt-3 text-lg text-slate-600">
          这里精选收录了 {worksCount} 个作品;实际造过、上线过的应用有 {totalShippedApprox}+。
          有的很正经,有的纯为好玩——都是「珂这样玩 AI」的证据。
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === t
                ? "bg-brand-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
      </div>
    </div>
  );
}
