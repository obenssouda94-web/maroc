import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

const ROLE_VARIANT: Record<string, "red" | "gold" | "green" | "outline" | "default"> = {
  SUPER_ADMIN: "red",
  ADMIN: "gold",
  REVIEWER: "green",
  TRANSLATOR: "outline",
  EDITOR: "default",
};

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: [{ createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      _count: { select: { articles: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">
          {users.length} registered user{users.length === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="card-surface overflow-x-auto p-2 sm:p-4">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left">
              {["User", "Role", "Status", "Articles", "Last login", "Created"].map((heading) => (
                <th
                  key={heading}
                  className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-2)]/60"
              >
                <td className="px-3 py-3">
                  <p className="font-medium">{user.email}</p>
                  {user.name && (
                    <p className="mt-0.5 text-xs text-[var(--color-muted)]">{user.name}</p>
                  )}
                </td>
                <td className="px-3 py-3">
                  <Badge variant={ROLE_VARIANT[user.role] ?? "outline"}>{user.role}</Badge>
                </td>
                <td className="px-3 py-3">
                  {user.isActive ? (
                    <span className="text-sm font-medium text-[var(--color-moroccan-green)]">
                      Active
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-[var(--color-muted)]">Disabled</span>
                  )}
                </td>
                <td className="px-3 py-3 text-sm text-[var(--color-muted)]">
                  {user._count.articles}
                </td>
                <td className="px-3 py-3 text-xs text-[var(--color-muted)]">
                  {user.lastLoginAt
                    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(
                        user.lastLoginAt,
                      )
                    : "Never"}
                </td>
                <td className="px-3 py-3 text-xs text-[var(--color-muted)]">
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
