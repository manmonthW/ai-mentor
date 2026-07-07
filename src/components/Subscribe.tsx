import { Github, Mail, QrCode } from "lucide-react";

export default function Subscribe() {
  return (
    <section id="subscribe" className="container-page py-16">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-fuchsia-500 p-8 text-white sm:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">关注珂,一起玩 AI</h2>
            <p className="mt-4 max-w-md text-white/90">
              我会持续在这里放新作品和造物记。想第一时间看到、也想认识一群认真玩 AI 的人,
              就用下面任意方式跟上珂。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:wang.manmonth@gmail.com?subject=在珂以这样玩AI看到你"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                <Mail className="h-4 w-4" /> 写信给珂
              </a>
              <a
                href="https://github.com/manmonthW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <div className="rounded-2xl bg-white/95 p-5 text-center text-slate-700">
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400">
                <QrCode className="h-12 w-12" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">微信公众号</p>
              <p className="text-xs text-slate-500">扫码关注「珂以这样玩AI」</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
