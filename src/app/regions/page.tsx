"use client";

import { useMemo, useState } from "react";

type RegionStatus = "Active" | "Disabled";

type RegionItem = {
  id: string;
  name: string;
  currency: string;
  status: RegionStatus;
  createdAt: string;
};

type RegionFormState = {
  name: string;
  currency: string;
  status: RegionStatus;
};

const initialRegions: RegionItem[] = [
  {
    id: "reg-1001",
    name: "Phnom Penh",
    currency: "USD",
    status: "Active",
    createdAt: "Jan 15, 2025",
  },
  {
    id: "reg-1002",
    name: "Siem Reap",
    currency: "KHR",
    status: "Active",
    createdAt: "Feb 02, 2025",
  },
  {
    id: "reg-1003",
    name: "Thailand",
    currency: "THB",
    status: "Disabled",
    createdAt: "Mar 11, 2025",
  },
];

const emptyForm: RegionFormState = {
  name: "",
  currency: "USD",
  status: "Active",
};

const statusStyles: Record<RegionStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Disabled: "border-slate-200 bg-slate-100 text-slate-600",
};

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<RegionItem[]>(initialRegions);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRegion, setEditingRegion] = useState<RegionItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<RegionFormState>(emptyForm);

  const filteredRegions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return regions;
    return regions.filter(
      (region) =>
        region.name.toLowerCase().includes(query) ||
        region.currency.toLowerCase().includes(query) ||
        region.status.toLowerCase().includes(query)
    );
  }, [regions, searchQuery]);

  const activeCount = regions.filter((region) => region.status === "Active").length;

  function openCreateModal() {
    setEditingRegion(null);
    setIsCreating(true);
    setFormState(emptyForm);
  }

  function openEditModal(region: RegionItem) {
    setEditingRegion(region);
    setIsCreating(false);
    setFormState({
      name: region.name,
      currency: region.currency,
      status: region.status,
    });
  }

  function closeModal() {
    setEditingRegion(null);
    setIsCreating(false);
  }

  function handleSave() {
    if (isCreating) {
      const newRegion: RegionItem = {
        id: `reg-${Date.now()}`,
        name: formState.name || "New Region",
        currency: formState.currency || "USD",
        status: formState.status,
        createdAt: formatToday(),
      };
      setRegions((prev) => [newRegion, ...prev]);
      closeModal();
      return;
    }

    if (!editingRegion) return;

    setRegions((prev) =>
      prev.map((region) =>
        region.id === editingRegion.id
          ? {
              ...region,
              name: formState.name,
              currency: formState.currency,
              status: formState.status,
            }
          : region
      )
    );
    closeModal();
  }

  function handleToggleStatus(regionId: string) {
    setRegions((prev) =>
      prev.map((region) =>
        region.id === regionId
          ? {
              ...region,
              status: region.status === "Disabled" ? "Active" : "Disabled",
            }
          : region
      )
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_rgba(255,255,255,0)_58%),linear-gradient(120deg,_#0f172a,_#0f766e)] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/90">
            Manage Regions
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Region Management</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-teal-100/90">
            Regions control system separation across operation zones, permissions, and reporting.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Overview</p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
              {regions.length} total regions
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Active</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{activeCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Disabled</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                {regions.length - activeCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <input
              type="search"
              placeholder="Search region, currency, or status"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300"
            />
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex h-10 items-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add Region
          </button>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredRegions.length} of {regions.length}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="overflow-x-auto rounded-2xl border border-slate-200/70">
          <table className="min-w-[760px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Region name</th>
                <th className="px-4 py-3 font-semibold">Currency</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created date</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.map((region) => (
                <tr key={region.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">{region.name}</td>
                  <td className="px-4 py-3 text-slate-600">{region.currency}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[region.status]
                      }`}
                    >
                      {region.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{region.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(region)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(region.id)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        {region.status === "Disabled" ? "Enable" : "Disable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRegions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    No regions match the current search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {(editingRegion || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {isCreating ? "Add Region" : "Edit Region"}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                  {isCreating ? "Create new region" : "Update region"}
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
                Region name
                <input
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="Region name"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Currency
                  <select
                    value={formState.currency}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, currency: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  >
                    {["USD", "KHR", "THB", "VND", "SGD", "MYR"].map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Status
                  <select
                    value={formState.status}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        status: event.target.value as RegionStatus,
                      }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  >
                    {["Active", "Disabled"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
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
