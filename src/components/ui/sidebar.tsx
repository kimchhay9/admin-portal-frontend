"use client";

import * as React from "react";
import { FiAlignJustify } from "react-icons/fi";

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const value = React.useContext(SidebarContext);
  if (!value) {
    throw new Error("Sidebar components must be used inside SidebarProvider");
  }
  return value;
}

export function useSidebar() {
  return useSidebarContext();
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      <div className="flex min-h-screen w-full bg-slate-50">{children}</div>
    </SidebarContext.Provider>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex min-w-0 flex-1 flex-col">{children}</div>;
}

export function Sidebar({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "inset" | "sidebar";
}) {
  const { open } = useSidebarContext();

  return (
    <aside
      className={cx(
        "h-screen shrink-0 border-r border-slate-200 bg-white transition-[width] duration-200",
        open ? "w-64" : "w-16",
        variant === "inset" && "m-3 h-[calc(100vh-1.5rem)] rounded-xl",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebarContext();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle sidebar"
      className={cx(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
        className
      )}
    >
      <FiAlignJustify className="h-4 w-4" />
    </button>
  );
}

export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("flex h-full flex-col overflow-y-auto p-3", className)}>{children}</div>;
}

export function SidebarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cx("space-y-2", className)}>{children}</section>;
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cx("px-2 text-xs font-medium uppercase tracking-wide text-slate-500", className)}>
      {children}
    </h2>
  );
}

export function SidebarGroupContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("space-y-1", className)}>{children}</div>;
}

export function SidebarMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cx("space-y-1", className)}>{children}</ul>;
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={className}>{children}</li>;
}

export function SidebarMenuButton({
  children,
  className,
  isActive,
  asChild,
}: {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  asChild?: boolean;
}) {
  const buttonClassName = cx(
    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900",
    isActive &&
      "bg-gradient-to-r from-[#0f3a8a] to-[#00a3c8] text-white hover:from-[#0f3a8a] hover:to-[#00a3c8] hover:text-white",
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.ComponentPropsWithoutRef<"a">>;
    return React.cloneElement(child, {
      className: cx(buttonClassName, child.props.className),
    });
  }

  return <button className={buttonClassName}>{children}</button>;
}
