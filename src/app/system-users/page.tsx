"use client";

import { useMemo, useState } from "react";

const initialAdmins = [
  {
    id: "adm-1001",
    name: "Olivia Hart",
    email: "olivia.hart@saat.com",
    role: "Super Admin",
    region: "North America",
    status: "Active",
    createdAt: "Jan 14, 2025",
  },
  {
    id: "adm-1002",
    name: "Mateo Rios",
    email: "mateo.rios@saat.com",
    role: "Operations",
    region: "Latin America",
    status: "Active",
    createdAt: "Feb 03, 2025",
  },
  {
    id: "adm-1003",
    name: "Sana Patel",
    email: "sana.patel@saat.com",
    role: "Compliance",
    region: "Europe",
    status: "Active",
    createdAt: "Mar 22, 2025",
  },
  {
    id: "adm-1004",
    name: "Ethan Brooks",
    email: "ethan.brooks@saat.com",
    role: "Support Lead",
    region: "North America",
    status: "Disabled",
    createdAt: "May 09, 2024",
  },
  {
    id: "adm-1005",
    name: "Linh Nguyen",
    email: "linh.nguyen@saat.com",
    role: "Regional Admin",
    region: "Asia Pacific",
    status: "Active",
    createdAt: "Nov 18, 2024",
  },
  {
    id: "adm-1006",
    name: "Amir Hassan",
    email: "amir.hassan@saat.com",
    role: "Security",
    region: "Middle East",
    status: "Active",
    createdAt: "Dec 02, 2024",
  },
];

const roleOptions = [
  "All roles",
  "Super Admin",
  "Operations",
  "Compliance",
  "Support Lead",
  "Regional Admin",
  "Security",
];

const statusStyles: Record<string, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Disabled: "border-slate-200 bg-slate-100 text-slate-500",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
};

type AdminUser = (typeof initialAdmins)[number];

type AdminFormState = {
  name: string;
  email: string;
  role: string;
  region: string;
  status: string;
};

const emptyForm: AdminFormState = {
  name: "",
  email: "",
  role: "Operations",
  region: "North America",
  status: "Active",
};

export default function SystemUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [formState, setFormState] = useState<AdminFormState>(emptyForm);
  const [isCreating, setIsCreating] = useState(false);

  const filteredAdmins = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return admins.filter((admin) => {
      const matchesRole = roleFilter === "All roles" || admin.role === roleFilter;
      const matchesQuery =
        !query ||
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query) ||
        admin.region.toLowerCase().includes(query);

      return matchesRole && matchesQuery;
    });
  }, [admins, roleFilter, searchQuery]);

  const totalActive = admins.filter((admin) => admin.status === "Active").length;

  function openEditModal(admin: AdminUser) {
    setEditingAdmin(admin);
    setFormState({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      region: admin.region,
      status: admin.status,
    });
    setIsCreating(false);
  }

  function openCreateModal() {
    setEditingAdmin(null);
    setFormState(emptyForm);
    setIsCreating(true);
  }

  function closeModal() {
    setEditingAdmin(null);
    setIsCreating(false);
  }

  function handleSave() {
    if (isCreating) {
      const newAdmin: AdminUser = {
        id: `adm-${Date.now()}`,
        name: formState.name || "New Admin",
        email: formState.email || "new.admin@saat.com",
        role: formState.role,
        region: formState.region,
        status: formState.status,
        createdAt: "Feb 24, 2026",
      };
      setAdmins((prev) => [newAdmin, ...prev]);
    } else if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === editingAdmin.id
            ? {
                ...admin,
                name: formState.name,
                email: formState.email,
                role: formState.role,
                region: formState.region,
                status: formState.status,
              }
            : admin
        )
      );
    }

    closeModal();
  }

  function handleDisable(adminId: string) {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === adminId
          ? { ...admin, status: admin.status === "Disabled" ? "Active" : "Disabled" }
          : admin
      )
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_rgba(255,255,255,0)_58%),linear-gradient(120deg,_#0f172a,_#1d4ed8)] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/90">
            Manage System Users
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Admin Users</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-blue-100/90">
            Control access to the admin portal, manage roles, and keep audit-ready records of
            every administrator.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Overview</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                {admins.length} total administrators
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Active</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">{totalActive}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Disabled</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {admins.length - totalActive}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="search"
                placeholder="Search name, email, or region"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>
            <div className="min-w-[180px]">
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Add Admin
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Access Control</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
            Role-based permissions
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Assign admins to scoped roles to keep operational, compliance, and security actions
            fully segmented.
          </p>
          <div className="mt-5 space-y-3">
            {roleOptions.slice(1, 5).map((role) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">{role}</span>
                <span className="text-xs font-semibold text-slate-500">
                  {admins.filter((admin) => admin.role === role).length} admins
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">System Users</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Admin directory
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredAdmins.length} of {admins.length}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created date</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    {admin.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{admin.email}</td>
                  <td className="px-4 py-3 text-slate-600">{admin.role}</td>
                  <td className="px-4 py-3 text-slate-600">{admin.region}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[admin.status] ??
                        "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{admin.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(admin)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDisable(admin.id)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        {admin.status === "Disabled" ? "Enable" : "Disable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-500">
                    No admins match the current search or filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {(editingAdmin || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {isCreating ? "Add Admin" : "Edit Admin"}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                  {isCreating ? "Create new system user" : "Update system user"}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="Full name"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="name@saat.com"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Role
                  <select
                    value={formState.role}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, role: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  >
                    {roleOptions.slice(1).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Region
                  <input
                    value={formState.region}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, region: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                    placeholder="Region"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Status
                <select
                  value={formState.status}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, status: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                >
                  {["Active", "Disabled", "Pending"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                onClick={closeModal}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
