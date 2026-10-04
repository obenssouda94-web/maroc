"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zellige-dense px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/40 via-[var(--color-background)]/70 to-[var(--color-background)]" />
      <div className="relative w-full max-w-md">
        <div className="card-surface p-8 sm:p-10">
          <div className="text-center">
            <p className="font-serif text-3xl font-bold tracking-tight">MAROC</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-moroccan-red)]">
              The Digital Kingdom
            </p>
          </div>

          <h1 className="mt-8 text-center font-serif text-xl font-bold">
            Sign in to the admin panel
          </h1>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-[var(--color-moroccan-red)]/25 bg-[var(--color-moroccan-red-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-moroccan-red)]"
              >
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          Administration · authorized personnel only
        </p>
      </div>
    </div>
  );
}
