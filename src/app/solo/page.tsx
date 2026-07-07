import type { Metadata } from "next";
import { ArrowUpRight, Building2, CheckCircle2 } from "lucide-react";
import { opcServices } from "@/data/opc";

export const metadata: Metadata = {
  title: "一人公司",
  description:
    "一个人也能开公司、也能把公司跑好。珂用 AI 给一人公司(OPC)配齐装备:报税、合同、合规、业务。",
};

const statusColor: Record<string, string> = {
  已上线: "bg-emerald-100 text-emerald-700",
  开发中: "bg-amber-100 text-amber-700",
  规划中: "bg-slate-100 text-slate-500",
};

export default function SoloPage() {
  return (
    <div className="container-page py-14">
      <header className="mb-10 max-w-2xl">
        <span className="badge mb-4 bg-emerald-100 text-emerald-700">
          <Building2 className="mr-1 h-3.5 w-3.5" /> OPC
        </span>
        <h1 className="text-4xl font-black text-slate-900">一人公司 · AI 装备</h1>
        <p className="mt-3 text-lg text-slate-600">
          一个人也能开公司、也能把公司跑好。不懂财税、合同、合规?那正是 AI 该替你扛的活。
          这是我给一人公司(OPC)创始人配的一套装备。
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {opcServices.map((s) => (
          <div key={s.id} className="card flex flex-col p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="badge bg-slate-100 text-slate-600">{s.category}</span>
              <span className={`badge ${statusColor[s.status]}`}>{s.status}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{s.description}</p>
            <ul className="mt-4 space-y-1.5">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                了解 <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
