import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { LayoutDashboard, Package, LogOut } from "lucide-react";

export const metadata = {
  title: "Admin — Qurbaniya",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-black text-text-primary">
              <LayoutDashboard size={18} className="text-gold" />
              <span className="uppercase tracking-wider text-sm">Admin Qurbaniya</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/admin" className="text-text-muted hover:text-text-primary transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-xs text-text-muted-light">
            <span className="hidden sm:inline">{user.email}</span>
            <Link href="/" className="flex items-center gap-1 hover:text-urgency transition-colors">
              <Package size={14} />
              Site
            </Link>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="flex items-center gap-1 hover:text-urgency transition-colors">
                <LogOut size={14} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
