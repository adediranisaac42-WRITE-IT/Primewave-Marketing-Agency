import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-deep px-6 text-center text-white">
      <p className="font-display text-8xl font-extrabold text-gradient">404</p>
      <h1 className="mt-6 text-3xl font-bold">This page couldn&apos;t be found.</h1>
      <p className="mt-3 text-white/60">The link may be broken or the page may have moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-cta px-6 py-3 font-semibold text-white hover:bg-cta-600">Back to home</Link>
    </main>
  );
}
