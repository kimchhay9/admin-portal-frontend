const permissions = [
  {
    key: "view_users",
    description: "Allows reading user profiles, statuses, and account details.",
  },
  {
    key: "create_users",
    description: "Allows creating new system users and assigning initial roles.",
  },
  {
    key: "edit_devices",
    description: "Allows updating device metadata, configuration, and assignment.",
  },
  {
    key: "manage_regions",
    description: "Allows creating, editing, and organizing operational regions.",
  },
];

export default function PermissionsPage() {
  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_rgba(255,255,255,0)_58%),linear-gradient(120deg,_#0f172a,_#0ea5a0)] p-6 text-white shadow-[0_18px_36px_rgba(15,23,42,0.32)]">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/90">
            Manage Permissions
          </p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">System Permissions</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-teal-100/90">
            Define what actions each role can perform across the platform.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-24 h-44 w-44 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">UI</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-strong)]">
              Permission directory
            </p>
          </div>
          <div className="rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            {permissions.length} permissions
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Permission</th>
                <th className="px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.key} className="border-t border-slate-200/70">
                  <td className="px-4 py-3 font-medium text-[var(--text-strong)]">
                    <code>{permission.key}</code>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{permission.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
