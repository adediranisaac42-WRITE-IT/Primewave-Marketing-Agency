import { requireAdmin } from "@/lib/admin";
import { signOut } from "@/app/admin/actions";
import { Sidebar } from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="lg:pl-64">
      <Sidebar email={user.email ?? ""} signOut={signOut} />
      <main className="mx-auto max-w-7xl p-5 md:p-10">{children}</main>
    </div>
  );
}
