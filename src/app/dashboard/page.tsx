"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  { label: "Total Users", value: "48,920", trend: "+6.4%" },
  { label: "Total Businesses", value: "3,184", trend: "+3.1%" },
  { label: "Total Devices", value: "12,740", trend: "+9.8%" },
  { label: "Total Revenue", value: "$1.28M", trend: "+12.2%" },
];

const revenueSeries = [
  { month: "Jan", value: 128 },
  { month: "Feb", value: 142 },
  { month: "Mar", value: 136 },
  { month: "Apr", value: 158 },
  { month: "May", value: 149 },
  { month: "Jun", value: 167 },
  { month: "Jul", value: 160 },
  { month: "Aug", value: 179 },
  { month: "Sep", value: 171 },
  { month: "Oct", value: 190 },
  { month: "Nov", value: 184 },
  { month: "Dec", value: 205 },
];

const deviceMix = [
  { name: "Online", value: 10482, color: "#10b981" },
  { name: "Offline", value: 2258, color: "#f43f5e" },
];

const deviceTrend = [
  { name: "Mon", online: 9800, offline: 2400 },
  { name: "Tue", online: 10020, offline: 2300 },
  { name: "Wed", online: 10110, offline: 2290 },
  { name: "Thu", online: 10320, offline: 2220 },
  { name: "Fri", online: 10482, offline: 2258 },
];

const activityRows = [
  {
    event: "New business onboarded",
    subject: "Marina District Clinic",
    time: "12 min ago",
    status: "Approved",
  },
  {
    event: "Device firmware update",
    subject: "Edge Hub 21",
    time: "38 min ago",
    status: "Completed",
  },
  {
    event: "User access review",
    subject: "L. Nguyen",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    event: "Revenue payout processed",
    subject: "Westside Mobility",
    time: "5 hours ago",
    status: "Completed",
  },
  {
    event: "Offline device alert",
    subject: "Sensor Grid 04",
    time: "Yesterday",
    status: "Investigating",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-200/60 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_rgba(255,255,255,0)_55%),linear-gradient(120deg,_#0f3a8a,_#00a3c8)] p-6 text-white shadow-[0_18px_40px_rgba(15,58,138,0.35)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">
            System Overview
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-cyan-50/90">
            Snapshot of platform growth, device health, and revenue momentum across your
            network.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-24 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_24px_rgba(13,42,74,0.1)]"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-700">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text-strong)]">{item.value}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-600">{item.trend} this month</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Revenue Trend</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">Monthly revenue</p>
            </div>
            <div className="rounded-full border border-cyan-200/70 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              Jan - Dec
            </div>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ stroke: "#bae6fd", strokeWidth: 2 }}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Devices Online/Offline</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">Live fleet status</p>
          <div className="mt-6 grid gap-6">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                  >
                    {deviceMix.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: "#e2e8f0",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {deviceMix.map((device) => (
                <div key={device.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="font-medium text-slate-600">{device.name}</span>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {device.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Uptime</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--text-strong)]">98.7%</p>
              <p className="mt-1 text-xs text-slate-500">Last 30 days average</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Device Health</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Online vs offline trend
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Last 5 days
          </div>
        </div>
        <div className="mt-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deviceTrend}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "#e2e8f0",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
                }}
              />
              <Bar dataKey="online" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              <Bar dataKey="offline" fill="#f43f5e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">Recent Activity</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">Latest operational events</p>
          </div>
          <button className="rounded-full border border-cyan-200/70 bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700">
            View all activity
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Event</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {activityRows.map((row) => (
                <tr key={`${row.event}-${row.subject}`} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">{row.event}</td>
                  <td className="px-4 py-3 text-slate-600">{row.subject}</td>
                  <td className="px-4 py-3 text-slate-500">{row.time}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
