"use client";

import { useMemo, useState } from "react";

type DeviceTypeRecord = {
  id: string;
  name: string;
  defaultFirmware: string;
  defaultConfig: string;
  region: string;
  updatedAt: string;
};

type DeviceFormState = {
  name: string;
  defaultFirmware: string;
  defaultConfig: string;
  region: string;
};

const configOptions = ["Standard", "Table Pay", "Self-Order", "Dine-in", "Delivery"] as const;
const regionOptions = ["Global", "Phnom Penh", "Siem Reap", "China"] as const;

const initialDeviceTypes: DeviceTypeRecord[] = [
  {
    id: "device-1001",
    name: "POS Machine",
    defaultFirmware: "POS-4.2.1",
    defaultConfig: "Standard",
    region: "Global",
    updatedAt: "Jan 30, 2026",
  },
  {
    id: "device-1002",
    name: "QR Device",
    defaultFirmware: "QR-2.1.0",
    defaultConfig: "Table Pay",
    region: "Phnom Penh",
    updatedAt: "Feb 12, 2026",
  },
  {
    id: "device-1003",
    name: "Kiosk",
    defaultFirmware: "KIOSK-6.0.3",
    defaultConfig: "Self-Order",
    region: "Siem Reap",
    updatedAt: "Feb 19, 2026",
  },
  {
    id: "device-1004",
    name: "Table",
    defaultFirmware: "TABLE-1.3.5",
    defaultConfig: "Dine-in",
    region: "China",
    updatedAt: "Feb 24, 2026",
  },
];

const emptyForm: DeviceFormState = {
  name: "",
  defaultFirmware: "",
  defaultConfig: "Standard",
  region: "Global",
};

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());
}

export default function DeviceSettingsPage() {
  const [deviceTypes, setDeviceTypes] = useState<DeviceTypeRecord[]>(initialDeviceTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [editingDevice, setEditingDevice] = useState<DeviceTypeRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formState, setFormState] = useState<DeviceFormState>(emptyForm);

  const filteredDeviceTypes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return deviceTypes.filter((device) => {
      const matchesRegion =
        selectedRegion === "All Regions" || device.region === selectedRegion;
      const matchesQuery =
        !query ||
        device.name.toLowerCase().includes(query) ||
        device.defaultFirmware.toLowerCase().includes(query) ||
        device.defaultConfig.toLowerCase().includes(query) ||
        device.region.toLowerCase().includes(query);
      return matchesRegion && matchesQuery;
    });
  }, [deviceTypes, searchQuery, selectedRegion]);

  const regionsInUse = Array.from(new Set(deviceTypes.map((device) => device.region)));
  const lastUpdated = deviceTypes
    .map((device) => new Date(device.updatedAt))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  function openCreateModal() {
    setEditingDevice(null);
    setIsCreating(true);
    setFormState(emptyForm);
  }

  function openEditModal(device: DeviceTypeRecord) {
    setEditingDevice(device);
    setIsCreating(false);
    setFormState({
      name: device.name,
      defaultFirmware: device.defaultFirmware,
      defaultConfig: device.defaultConfig,
      region: device.region,
    });
  }

  function closeModal() {
    setEditingDevice(null);
    setIsCreating(false);
  }

  function handleSave() {
    const fallbackName = formState.name || "New Device Type";
    const fallbackFirmware = formState.defaultFirmware || "FW-1.0.0";

    if (isCreating) {
      const newDevice: DeviceTypeRecord = {
        id: `device-${Date.now()}`,
        name: fallbackName,
        defaultFirmware: fallbackFirmware,
        defaultConfig: formState.defaultConfig,
        region: formState.region,
        updatedAt: formatToday(),
      };
      setDeviceTypes((prev) => [newDevice, ...prev]);
      closeModal();
      return;
    }

    if (!editingDevice) return;

    setDeviceTypes((prev) =>
      prev.map((device) =>
        device.id === editingDevice.id
          ? {
              ...device,
              name: fallbackName,
              defaultFirmware: fallbackFirmware,
              defaultConfig: formState.defaultConfig,
              region: formState.region,
              updatedAt: formatToday(),
            }
          : device
      )
    );
    closeModal();
  }

  function handleClone(device: DeviceTypeRecord) {
    setDeviceTypes((prev) => [
      {
        ...device,
        id: `device-${Date.now()}`,
        name: `${device.name} Copy`,
        updatedAt: formatToday(),
      },
      ...prev,
    ]);
  }

  function handleArchive(deviceId: string) {
    setDeviceTypes((prev) => prev.filter((device) => device.id !== deviceId));
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_rgba(255,255,255,0)_60%),linear-gradient(120deg,_#0f172a,_#f97316)] p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.3)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/90">
            Manage Device Settings
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
            Device Type Defaults
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-orange-100/90">
            Define device types, default firmware, and baseline configurations per region.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2.1fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Overview</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                {deviceTypes.length} device types configured
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Keep firmware and default config aligned across regions and channels.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Regions</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {regionsInUse.length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Last Update</p>
                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {lastUpdated ? formatToday() : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <input
                type="search"
                placeholder="Search device type, firmware, or config"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300"
              />
            </div>
            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              {["All Regions", ...regionOptions].map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <button
              onClick={openCreateModal}
              className="inline-flex h-10 items-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add Device Type
            </button>
            <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
              Showing {filteredDeviceTypes.length} of {deviceTypes.length}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Config Packs</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
                Default config library
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              {configOptions.length} presets
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {configOptions.map((config) => (
              <div
                key={config}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-700">{config}</p>
                  <p className="text-xs text-slate-500">Baseline policy template</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  Default
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-xs text-slate-500">
            Assign a config pack to set payments, UI, and service flow defaults.
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Device Types</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Default configuration matrix
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            Showing {filteredDeviceTypes.length} types
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/70">
          <table className="min-w-[820px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Device type name</th>
                <th className="px-4 py-3 font-semibold">Default firmware</th>
                <th className="px-4 py-3 font-semibold">Default config</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeviceTypes.map((device) => (
                <tr key={device.id} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    {device.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{device.defaultFirmware}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      {device.defaultConfig}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{device.region}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(device)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleClone(device)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Clone
                      </button>
                      <button
                        onClick={() => handleArchive(device.id)}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDeviceTypes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    No device types match the current search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {(editingDevice || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_48px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {isCreating ? "Add Device Type" : "Edit Device Type"}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--text-strong)]">
                  {isCreating ? "Create device defaults" : "Update device defaults"}
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
                Device type name
                <input
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="Device type name"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Default firmware
                <input
                  value={formState.defaultFirmware}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, defaultFirmware: event.target.value }))
                  }
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  placeholder="Firmware version"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Default config
                  <select
                    value={formState.defaultConfig}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, defaultConfig: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  >
                    {configOptions.map((config) => (
                      <option key={config} value={config}>
                        {config}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Region
                  <select
                    value={formState.region}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, region: event.target.value }))
                    }
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  >
                    {regionOptions.map((region) => (
                      <option key={region} value={region}>
                        {region}
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
