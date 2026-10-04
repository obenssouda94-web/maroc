import { NextResponse } from "next/server";
import { destroySession, getSession, audit } from "@/lib/auth";

export async function POST() {
  const session = await getSession();
  if (session) {
    await audit(session.sub, "logout", "user", session.sub);
  }
  await destroySession();
  return NextResponse.json({ ok: true });
}
