import { Github, Mail, ArrowUpRight } from "lucide-react";

export default function Subscribe() {
  return (
    <section id="subscribe" className="bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="wrap grid gap-12 py-20 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div>
          <p className="eyebrow mb-6 !text-[color:var(--color-paper)]/60">保持联系 / STAY IN TOUCH</p>
          <h2 className="display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02]">
            关注珂,<br />一起玩 <span className="flame">AI</span>
          </h2>
          <p className="mt-6 max-w-md text-[color:var(--color-paper)]/70">
            我会持续在这里放新作品和造物记。想第一时间看到、也想认识一群认真玩 AI 的人,用下面任意方式跟上珂。
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="mailto:wang.manmonth@gmail.com?subject=在珂以这样玩AI看到你"
              className="inline-flex items-center gap-2 border-b border-[color:var(--color-flame)] pb-1 font-semibold transition-colors hover:text-[color:var(--color-flame)]"
            >
              <Mail className="h-4 w-4" /> 写信给珂 <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/manmonthW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-[color:var(--color-paper)]/30 pb-1 font-semibold transition-colors hover:border-[color:var(--color-flame)] hover:text-[color:var(--color-flame)]"
            >
              <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="flex md:justify-end">
          <div className="w-full max-w-[15rem] bg-white p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wechat-qr.png"
              alt="王珂 · 微信二维码"
              className="w-full"
              loading="lazy"
            />
            <p className="mono py-1 text-center text-xs tracking-wide text-slate-500">
              微信 · 扫码加珂为好友
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
