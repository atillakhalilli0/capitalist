"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderTree,
  Users,
  Mic2,
  FileStack,
  Tags,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

const items = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Məqalələr", href: "/admin/articles", icon: Newspaper },
  { title: "Kateqoriyalar", href: "/admin/categories", icon: FolderTree },
  { title: "Teqlər", href: "/admin/tags", icon: Tags },
  { title: "Müəlliflər", href: "/admin/users", icon: Users },
  { title: "Podkastlar", href: "/admin/podcasts", icon: Mic2 },
  { title: "Xüsusi layihələr", href: "/admin/projects", icon: FileStack },
  { title: "Parametrlər", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: logoutRequest, isPending } = useLogout();
  const { refreshToken, logout: clearLocalAuth } = useAuthStore();

  const handleLogout = () => {
    // Best-effort call to the backend (revokes the refresh token server-side).
    // We clear local auth regardless of whether this call succeeds, so the
    // admin is never stuck logged-in on the client after clicking logout.
    logoutRequest(
      { refreshToken: refreshToken || "" },
      {
        onSettled: () => {
          clearLocalAuth();
          toast.success("Uğurla çıxış edildi");
          router.replace("/admin/login");
        },
      }
    );
  };

  return (
    <aside className="flex  h-screen w-72 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-6">
        <Link href="/admin" className="text-2xl font-black tracking-tight">
          Capitalist
          <span className="ml-2 rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold uppercase text-white">
            CMS
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/20"
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
          Çıxış
        </button>
      </div>
    </aside>
  );
}
