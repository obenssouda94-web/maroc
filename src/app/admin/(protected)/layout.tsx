import { requireUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { LogoutButton } from "@/components/admin/logout-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-5 py-3 backdrop-blur">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[var(--color-muted)]">
              {user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip hidden bg-[var(--color-surface-3)] sm:inline-flex">{user.role}</span>
            <ThemeToggle />
            <LogoutButton label="Sign out" />
          </div>
        </header>
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
