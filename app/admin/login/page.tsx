"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(params.get("error") === "not_authorised" ? "This account does not have admin access." : "");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError("");
    const f = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    setLoading(false);
    if (error) return setError("Incorrect email or password.");
    router.replace("/admin"); router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl bg-surface p-8 shadow-lift">
      <Image src="/images/primewave-mark.png" alt="" width={44} height={44} />
      <h1 className="mt-6 text-2xl font-bold text-white">Admin sign in</h1>
      <p className="mt-1 text-sm text-muted">Primewave CRM — authorised users only.</p>
      <label className="mt-6 block"><span className="label">Email</span><input name="email" type="email" required autoComplete="email" className="field" /></label>
      <label className="mt-4 block"><span className="label">Password</span><input name="password" type="password" required autoComplete="current-password" className="field" /></label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 font-semibold text-deep hover:bg-accent-600 disabled:opacity-60">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}Sign in
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-4">
      <Suspense><LoginForm /></Suspense>
    </main>
  );
}
