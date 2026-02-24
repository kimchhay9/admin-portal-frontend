"use client";

import { useMemo, useState } from "react";

const permissions = ["Dashboard", "Users", "Devices", "Payments"] as const;

type Permission = (typeof permissions)[number];

type RoleRecord = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  assignedTo: number;
  scope: string;
  permissions: Permission[];
};

const initialRoles: RoleRecord[] = [
  {
    id: "role-001",
    name: "Super Admin",
    description: "Full platform control, overrides, and audit management.",
    createdAt: "Jan 12, 2025",
    assignedTo: 6,
    scope: "Global",
    permissions: ["Dashboard", "Users", "Devices", "Payments"],
  },
  {
    id: "role-002",
    name: "Region Admin",
    description: "Manages users, payments, and device fleets in a region.",
    createdAt: "Mar 03, 2025",
    assignedTo: 14,
    scope: "Regional",
    permissions: ["Dashboard", "Users", "Devices", "Payments"],
  },
  {
    id: "role-003",
    name: "Operator",
    description: "Runs daily device operations and shift reporting.",
    createdAt: "Jun 20, 2024",
    assignedTo: 42,
    scope: "Location",
    permissions: ["Dashboard", "Devices"],
  },
  {
    id: "role-004",
    name: "Sale Manager",
    description: "Owns revenue KPIs, payment flows, and sales insights.",
    createdAt: "Sep 18, 2024",
    assignedTo: 9,
    scope: "Regional",
    permissions: ["Dashboard", "Payments"],
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRecord[]>(initialRoles);
  const [activeRoleId, setActiveRoleId] = useState<string>(initialRoles[0]?.id ?? "");

  const activeRole = useMemo(
    () => roles.find((role) => role.id === activeRoleId) ?? roles[0],
    [activeRoleId, roles]
  );

  function togglePermission(permission: Permission) {
    if (!activeRole) return;
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== activeRole.id) return role;
        const hasPermission = role.permissions.includes(permission);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter((item) => item !== permission)
            : [...role.permissions, permission],
        };
      })
    );
  }

  function handleClone(role: RoleRecord) {
    setRoles((prev) => [
      {
        ...role,
        id: `role-${Date.now()}`,
        name: `${role.name} Copy`,
        createdAt: "Feb 24, 2026",
        assignedTo: 0,
      },
      ...prev,
    ]);
  }

  function handleArchive(roleId: string) {
    setRoles((prev) => {
      const next = prev.filter((role) => role.id !== roleId);
      if (activeRoleId === roleId) {
        setActiveRoleId(next[0]?.id ?? "");
      }
      return next;
    });
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_rgba(255,255,255,0)_55%),linear-gradient(120deg,_#0f172a,_#0ea5e9)] p-6 text-white shadow-[0_18px_36px_rgba(15,23,42,0.32)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">
            Manage Roles
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Role Management</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-cyan-100/90">
            Define access layers for system teams and assign permissions with clarity.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-24 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2.1fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Special UI</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                Role impact snapshot
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Track assignment coverage and operational scope for every role.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Total Roles</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">{roles.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Assignments</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {roles.reduce((sum, role) => sum + role.assignedTo, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRoleId(role.id)}
                className={`flex flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left transition ${
                  activeRole?.id === role.id
                    ? "border-cyan-400/60 bg-cyan-50 text-slate-900 shadow-[0_10px_20px_rgba(14,165,233,0.18)]"
                    : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-sm font-semibold text-[var(--text-strong)]">{role.name}</span>
                <span className="text-xs text-slate-500">{role.scope} coverage</span>
                <span className="text-xs font-semibold text-slate-500">
                  {role.assignedTo} members assigned
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Permission Assignment
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                {activeRole?.name ?? "Select a role"}
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              {activeRole?.permissions.length ?? 0} enabled
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {permissions.map((permission) => {
              const checked = activeRole?.permissions.includes(permission) ?? false;
              return (
                <label
                  key={permission}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    checked
                      ? "border-cyan-200/80 bg-cyan-50 text-slate-800"
                      : "border-slate-200/70 bg-white text-slate-600"
                  }`}
                >
                  <span className="font-medium">{permission}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePermission(permission)}
                    className="h-4 w-4 accent-cyan-600"
                  />
                </label>
              );
            })}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Assign permissions to align role access with operational scope.
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Roles</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Role directory
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {roles.length} roles
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Role Name</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Created date</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className={`border-t border-slate-200/70 ${
                    activeRole?.id === role.id ? "bg-cyan-50/60" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    {role.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{role.description}</td>
                  <td className="px-4 py-3 text-slate-500">{role.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveRoleId(role.id)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleClone(role)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Clone
                      </button>
                      <button
                        onClick={() => handleArchive(role.id)}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {roles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-slate-500">
                    No roles created yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
