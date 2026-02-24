"use client";

import { useMemo, useState } from "react";

type PlatformUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  walletBalance: number;
  status: "Active" | "Suspended";
  createdAt: string;
};

const initialUsers: PlatformUser[] = [
  {
    id: "usr-1001",
    name: "Ava Thompson",
    phone: "+1 (202) 555-0178",
    email: "ava.thompson@example.com",
    walletBalance: 482.75,
    status: "Active",
    createdAt: "Jan 12, 2025",
  },
  {
    id: "usr-1002",
    name: "Noah Williams",
    phone: "+1 (415) 555-0164",
    email: "noah.williams@example.com",
    walletBalance: 95.2,
    status: "Active",
    createdAt: "Feb 03, 2025",
  },
  {
    id: "usr-1003",
    name: "Mia Garcia",
    phone: "+1 (312) 555-0107",
    email: "mia.garcia@example.com",
    walletBalance: 0,
    status: "Suspended",
    createdAt: "Mar 21, 2025",
  },
  {
    id: "usr-1004",
    name: "Liam Johnson",
    phone: "+1 (718) 555-0113",
    email: "liam.johnson@example.com",
    walletBalance: 1380.45,
    status: "Active",
    createdAt: "Apr 08, 2025",
  },
  {
    id: "usr-1005",
    name: "Sophia Brown",
    phone: "+1 (646) 555-0149",
    email: "sophia.brown@example.com",
    walletBalance: 74.9,
    status: "Suspended",
    createdAt: "May 19, 2025",
  },
  {
    id: "usr-1006",
    name: "James Miller",
    phone: "+1 (305) 555-0196",
    email: "james.miller@example.com",
    walletBalance: 261.3,
    status: "Active",
    createdAt: "Jun 27, 2025",
  },
];

const statusStyles: Record<PlatformUser["status"], string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Suspended: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function UsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailUser, setDetailUser] = useState<PlatformUser | null>(null);
  const [notice, setNotice] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [searchQuery, users]);

  const suspendedCount = users.filter((user) => user.status === "Suspended").length;

  function handleSuspend(userId: string) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Suspended" ? "Active" : "Suspended" }
          : user
      )
    );
    setNotice("User status updated.");
  }

  function handleResetPassword(user: PlatformUser) {
    setNotice(`Password reset link sent to ${user.email}.`);
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_rgba(255,255,255,0)_58%),linear-gradient(120deg,_#0f172a,_#2563eb)] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/90">
            Manage Users
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Platform Users</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-blue-100/90">
            Review account details, monitor wallet balances, and manage user access.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Overview</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
              {users.length} total users
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Active</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                {users.length - suspendedCount}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Suspended</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{suspendedCount}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="search"
              placeholder="Search name, phone, or email"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300"
            />
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredUsers.length} of {users.length}
          </div>
        </div>
        {notice ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {notice}
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="overflow-x-auto rounded-2xl border border-slate-200/70">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Wallet balance</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created date</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">{user.name}</td>
                  <td className="px-4 py-3 text-slate-600">{user.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{formatUsd(user.walletBalance)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[user.status]
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{user.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDetailUser(user)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        View detail
                      </button>
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                      >
                        {user.status === "Suspended" ? "Unsuspend user" : "Suspend user"}
                      </button>
                      <button
                        onClick={() => handleResetPassword(user)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Reset password
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-500">
                    No users match the current search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {detailUser ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">User Detail</p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                  {detailUser.name}
                </h2>
              </div>
              <button
                onClick={() => setDetailUser(null)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Name</dt>
                <dd className="font-medium text-slate-800">{detailUser.name}</dd>
              </div>
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Phone</dt>
                <dd className="font-medium text-slate-800">{detailUser.phone}</dd>
              </div>
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium text-slate-800">{detailUser.email}</dd>
              </div>
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Wallet balance</dt>
                <dd className="font-medium text-slate-800">
                  {formatUsd(detailUser.walletBalance)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-medium text-slate-800">{detailUser.status}</dd>
              </div>
              <div className="flex justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-slate-500">Created date</dt>
                <dd className="font-medium text-slate-800">{detailUser.createdAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </section>
  );
}
