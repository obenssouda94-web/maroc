"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Languages,
  BookMarked,
  Users,
  ScrollText,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/translations", label: "Translations", icon: Languages },
  { href: "/admin/sources", label: "Sources", icon: BookMarked },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/audit", label: "Audit logs", icon: ScrollText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-e border-[var(--color-border)] bg-[var(--color-surface)] lg:h-screen lg:w-64">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-5 py-4 lg:justify-start">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-moroccan-red)] font-serif text-sm font-bold text-white">
            M
          </span>
          <span className="font-serif text-lg font-bold tracking-tight">MAROC</span>
        </Link>
        <span className="chip bg-[var(--color-surface-3)] lg:hidden">{role}</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {NAV.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--color-moroccan-red-soft)] text-[var(--color-moroccan-red)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-foreground)]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-[var(--color-border)] px-5 py-4 lg:block">
        <Link
          href="/"
          className="text-xs font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
