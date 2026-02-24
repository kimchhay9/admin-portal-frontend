export default function DashboardPage() {
  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-cyan-200/70 bg-gradient-to-r from-[#0f3a8a] to-[#00a3c8] p-6 text-white shadow-[0_16px_34px_rgba(15,58,138,0.3)]">
        <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm font-medium text-cyan-100/90">Track financial health and daily operations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_24px_rgba(13,42,74,0.1)]">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-700">Revenue</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-strong)]">$128,450</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_24px_rgba(13,42,74,0.1)]">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-700">Orders</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-strong)]">2,184</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_24px_rgba(13,42,74,0.1)]">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-700">Tickets</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-strong)]">26 open</p>
        </div>
      </div>
    </section>
  );
}
