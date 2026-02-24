export default function Home() {
  return (
    <section className="grid gap-5 md:grid-cols-5">
      <div className="md:col-span-3 rounded-3xl border border-slate-200/80 bg-white/85 p-7 shadow-[0_16px_34px_rgba(13,42,74,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Overview</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-strong)] md:text-4xl">
          Smart control for Saat Admin BO
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)]">
          View operational performance, revenue flow, and team efficiency in one modern back-office workspace.
        </p>
      </div>
      <div className="md:col-span-2 rounded-3xl border border-cyan-200/70 bg-gradient-to-br from-[#0f3a8a] via-[#1156a9] to-[#00a3c8] p-7 text-white shadow-[0_18px_34px_rgba(13,58,138,0.35)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Key Metrics</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
            <div className="text-2xl font-bold">$1.28M</div>
            <div className="text-xs text-cyan-50">Monthly Volume</div>
          </div>
          <div className="rounded-xl bg-white/15 p-3 backdrop-blur">
            <div className="text-2xl font-bold">99.2%</div>
            <div className="text-xs text-cyan-50">Service Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
