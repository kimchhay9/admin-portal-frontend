"use client";

import { useMemo, useState } from "react";

type RuleRecord = {
  id: string;
  region: string;
  salesPercent: number;
  agencyPercent: number;
  platformPercent: number;
  updatedAt: string;
  status: "Active" | "Paused";
};

type RuleFormState = {
  region: string;
  salesPercent: string;
  agencyPercent: string;
  platformPercent: string;
  status: RuleRecord["status"];
};

const initialRules: RuleRecord[] = [
  {
    id: "rule-1001",
    region: "Phnom Penh",
    salesPercent: 55,
    agencyPercent: 25,
    platformPercent: 20,
    updatedAt: "Feb 20, 2026",
    status: "Active",
  },
  {
    id: "rule-1002",
    region: "Siem Reap",
    salesPercent: 50,
    agencyPercent: 30,
    platformPercent: 20,
    updatedAt: "Feb 12, 2026",
    status: "Active",
  },
  {
    id: "rule-1003",
    region: "Battambang",
    salesPercent: 60,
    agencyPercent: 20,
    platformPercent: 20,
    updatedAt: "Jan 30, 2026",
    status: "Paused",
  },
];

const emptyForm: RuleFormState = {
  region: "",
  salesPercent: "0",
  agencyPercent: "0",
  platformPercent: "0",
  status: "Active",
};

const statusStyles: Record<RuleRecord["status"], string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Paused: "border-amber-200 bg-amber-50 text-amber-700",
};

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
}

function toNumber(value: string) {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), 100);
}

export default function MatchingRulesPage() {
  const [rules, setRules] = useState<RuleRecord[]>(initialRules);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRule, setEditingRule] = useState<RuleRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<RuleFormState>(emptyForm);

  const filteredRules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rules;
    return rules.filter(
      (rule) =>
        rule.region.toLowerCase().includes(query) ||
        rule.status.toLowerCase().includes(query)
    );
  }, [rules, searchQuery]);

  const totalPercent =
    toNumber(formState.salesPercent) +
    toNumber(formState.agencyPercent) +
    toNumber(formState.platformPercent);

  const canSave = formState.region.trim().length > 0 && totalPercent === 100;

  function openCreateModal() {
    setEditingRule(null);
    setIsCreating(true);
    setFormState(emptyForm);
  }

  function openEditModal(rule: RuleRecord) {
    setEditingRule(rule);
    setIsCreating(false);
    setFormState({
      region: rule.region,
      salesPercent: String(rule.salesPercent),
      agencyPercent: String(rule.agencyPercent),
      platformPercent: String(rule.platformPercent),
      status: rule.status,
    });
  }

  function closeModal() {
    setEditingRule(null);
    setIsCreating(false);
  }

  function handleSave() {
    if (!canSave) return;
    if (isCreating) {
      const newRule: RuleRecord = {
        id: `rule-${Date.now()}`,
        region: formState.region || "New Region",
        salesPercent: toNumber(formState.salesPercent),
        agencyPercent: toNumber(formState.agencyPercent),
        platformPercent: toNumber(formState.platformPercent),
        updatedAt: formatToday(),
        status: formState.status,
      };
      setRules((prev) => [newRule, ...prev]);
      closeModal();
      return;
    }

    if (!editingRule) return;

    setRules((prev) =>
      prev.map((rule) =>
        rule.id === editingRule.id
          ? {
              ...rule,
              region: formState.region,
              salesPercent: toNumber(formState.salesPercent),
              agencyPercent: toNumber(formState.agencyPercent),
              platformPercent: toNumber(formState.platformPercent),
              updatedAt: formatToday(),
              status: formState.status,
            }
          : rule
      )
    );
    closeModal();
  }

  function handleToggleStatus(ruleId: string) {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === "Paused" ? "Active" : "Paused" }
          : rule
      )
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_rgba(255,255,255,0)_55%),linear-gradient(120deg,_#0f172a,_#14b8a6)] p-6 text-white shadow-[0_18px_36px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/90">
            Manage Matching Rules &amp; Policy
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Commission Rules</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-teal-100/90">
            Standardize revenue splits per region while keeping sales, agency, and platform
            allocations aligned.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-20 h-44 w-44 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Commission rules
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
              {rules.length} matching rules
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Active</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                {rules.filter((rule) => rule.status === "Active").length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Paused</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                {rules.filter((rule) => rule.status === "Paused").length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <input
              type="search"
              placeholder="Search region or status"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300"
            />
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex h-10 items-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create rule
          </button>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredRules.length} of {rules.length}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="overflow-x-auto rounded-2xl border border-slate-200/70">
          <table className="min-w-[780px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Sales %</th>
                <th className="px-4 py-3 font-semibold">Agency %</th>
                <th className="px-4 py-3 font-semibold">Platform %</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Last updated</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    {rule.region}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{rule.salesPercent}%</td>
                  <td className="px-4 py-3 text-slate-600">{rule.agencyPercent}%</td>
                  <td className="px-4 py-3 text-slate-600">{rule.platformPercent}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[rule.status]
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{rule.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(rule)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(rule.id)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        {rule.status === "Paused" ? "Activate" : "Pause"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-500">
                    No matching rules found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {(editingRule || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {isCreating ? "Create rule" : "Edit rule"}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                  {isCreating ? "Create matching rule" : "Update matching rule"}
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
                Region
                <input
                  value={formState.region}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, region: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="Region name"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="block text-sm font-medium text-slate-700">
                  Sales %
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formState.salesPercent}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, salesPercent: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Agency %
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formState.agencyPercent}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, agencyPercent: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Platform %
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formState.platformPercent}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, platformPercent: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                <span>Total allocation</span>
                <span className={totalPercent === 100 ? "text-emerald-600" : "text-rose-500"}>
                  {totalPercent.toFixed(0)}% (must equal 100%)
                </span>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Status
                <select
                  value={formState.status}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      status: event.target.value as RuleRecord["status"],
                    }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                >
                  {["Active", "Paused"].map((status) => (
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
                disabled={!canSave}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
                  canSave ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-400"
                }`}
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
