"use client";

import { useMemo, useState } from "react";

type FirmwareRecord = {
  id: string;
  version: string;
  deviceType: string;
  status: "Active" | "Staged" | "Deprecated";
  releasedAt: string;
  checksum: string;
};

type RuleRecord = {
  id: string;
  name: string;
  scope: string;
  status: "Enabled" | "Paused";
  lastTriggered: string;
};

const initialFirmwares: FirmwareRecord[] = [
  {
    id: "fw-1001",
    version: "POS-4.3.0",
    deviceType: "POS Machine",
    status: "Active",
    releasedAt: "Feb 23, 2026",
    checksum: "1f2a-9d3b-44c8",
  },
  {
    id: "fw-1002",
    version: "POS-4.2.5",
    deviceType: "POS Machine",
    status: "Deprecated",
    releasedAt: "Jan 14, 2026",
    checksum: "3e1a-7c9d-1b02",
  },
  {
    id: "fw-1003",
    version: "QR-2.2.1",
    deviceType: "QR Device",
    status: "Staged",
    releasedAt: "Feb 20, 2026",
    checksum: "7b3c-0a1e-6c11",
  },
  {
    id: "fw-1004",
    version: "KIOSK-6.1.0",
    deviceType: "Kiosk",
    status: "Active",
    releasedAt: "Feb 18, 2026",
    checksum: "9f4b-22de-88a1",
  },
  {
    id: "fw-1005",
    version: "TABLE-1.4.0",
    deviceType: "Table",
    status: "Staged",
    releasedAt: "Feb 24, 2026",
    checksum: "aa11-5c3e-22d0",
  },
];

const initialRules: RuleRecord[] = [
  {
    id: "rule-01",
    name: "Route updates to staging",
    scope: "All device types",
    status: "Enabled",
    lastTriggered: "Today 09:12",
  },
  {
    id: "rule-02",
    name: "Block downgrade attempts",
    scope: "POS Machine",
    status: "Enabled",
    lastTriggered: "Yesterday 18:41",
  },
  {
    id: "rule-03",
    name: "Delay rollout after peak hours",
    scope: "QR Device, Table",
    status: "Paused",
    lastTriggered: "Feb 21, 2026",
  },
  {
    id: "rule-04",
    name: "Auto-expire deprecated builds",
    scope: "All device types",
    status: "Enabled",
    lastTriggered: "Feb 19, 2026",
  },
];

const statusStyles: Record<FirmwareRecord["status"], string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Staged: "border-amber-200 bg-amber-50 text-amber-700",
  Deprecated: "border-rose-200 bg-rose-50 text-rose-600",
};

export default function FirmwaresPage() {
  const [firmwares, setFirmwares] = useState<FirmwareRecord[]>(initialFirmwares);
  const [rules, setRules] = useState<RuleRecord[]>(initialRules);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredFirmwares = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return firmwares.filter((firmware) => {
      const matchesStatus =
        selectedStatus === "All Status" || firmware.status === selectedStatus;
      const matchesQuery =
        !query ||
        firmware.version.toLowerCase().includes(query) ||
        firmware.deviceType.toLowerCase().includes(query) ||
        firmware.checksum.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [firmwares, searchQuery, selectedStatus]);

  const activeCount = firmwares.filter((firmware) => firmware.status === "Active")
    .length;
  const stagedCount = firmwares.filter((firmware) => firmware.status === "Staged")
    .length;
  const deprecatedCount = firmwares.filter(
    (firmware) => firmware.status === "Deprecated"
  ).length;

  function activateFirmware(firmwareId: string) {
    setFirmwares((prev) =>
      prev.map((firmware) =>
        firmware.id === firmwareId
          ? { ...firmware, status: "Active" }
          : firmware.status === "Active" && firmware.deviceType ===
              prev.find((record) => record.id === firmwareId)?.deviceType
            ? { ...firmware, status: "Staged" }
            : firmware
      )
    );
  }

  function toggleRule(ruleId: string) {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === "Enabled" ? "Paused" : "Enabled" }
          : rule
      )
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_rgba(255,255,255,0)_60%),linear-gradient(120deg,_#0f172a,_#06b6d4)] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">
            Manage Firmwares & Rules (EMQX)
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Firmware version control
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-cyan-100/90">
            Track firmware history, promote staged builds, and enforce rollout
            rules across device fleets.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2.15fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Firmware Library
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                {firmwares.length} versions tracked
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Promote a build to active and monitor staged deployments before
                rollouts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Active
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {activeCount}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Staged
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {stagedCount}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Deprecated
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {deprecatedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <input
                type="search"
                placeholder="Search version, device type, checksum"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              {["All Status", "Active", "Staged", "Deprecated"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="inline-flex h-10 items-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800">
              Upload firmware
            </button>
            <button className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Activate version
            </button>
            <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
              Showing {filteredFirmwares.length} of {firmwares.length}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                EMQX Rules
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                Rollout guardrails
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              {rules.length} rules
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{rule.name}</p>
                    <p className="text-xs text-slate-500">{rule.scope}</p>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      rule.status === "Enabled"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    {rule.status}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Last triggered: {rule.lastTriggered}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-xs text-slate-500">
            Rules sync with EMQX to prevent unsafe rollouts and enforce update
            sequencing.
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Firmware Versions
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Firmware version control matrix
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredFirmwares.length} versions
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/70">
          <table className="min-w-[860px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Version</th>
                <th className="px-4 py-3 font-semibold">Device Type</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Released</th>
                <th className="px-4 py-3 font-semibold">Checksum</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFirmwares.map((firmware) => (
                <tr key={firmware.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    {firmware.version}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{firmware.deviceType}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[firmware.status]}`}
                    >
                      {firmware.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{firmware.releasedAt}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-500">
                    {firmware.checksum}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                        View
                      </button>
                      <button
                        onClick={() => activateFirmware(firmware.id)}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredFirmwares.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                    No firmware versions match the current search.
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
