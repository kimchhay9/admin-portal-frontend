"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/system-users": "System Users",
};

function toLabel(segment: string) {
  if (!segment) {
    return "Home";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getCrumbs(pathname: string) {
  if (pathname === "/") {
    return ["Home"];
  }

  const segments = pathname.split("/").filter(Boolean);
  return ["Home", ...segments.map(toLabel)];
}

export function TopBar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Overview";
  const crumbs = getCrumbs(pathname);
  const showCrumbs = !(crumbs.length === 1 && crumbs[0] === title);

  return (
    <header className="sticky top-0 z-10 mx-3 mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="shrink-0 " />
          <div className="min-w-0">
            {showCrumbs ? (
              <div className="truncate text-xs text-slate-500">
                {crumbs.join(" / ")}
              </div>
            ) : null}
            <h1 className="truncate text-sm font-semibold text-slate-900">{title}</h1>
          </div>
        </div>

        <div className="hidden min-w-[220px] flex-1 md:block">
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
          />
        </div>

        <details className="relative ml-auto">
          <summary className="list-none cursor-pointer rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            Admin
          </summary>
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white p-1 shadow-lg">
            <button className="block w-full rounded px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-100">
              Profile
            </button>
            <button className="block w-full rounded px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-100">
              Settings
            </button>
            <button className="block w-full rounded px-2 py-1.5 text-left text-xs text-red-600 hover:bg-red-50">
              Logout
            </button>
          </div>
        </details>
      </div>
    </header>
  );
}
