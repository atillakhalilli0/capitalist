"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

import { useProfile } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { ROLES, canAccessRoute } from "@/constants/roles";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/register"];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ADMIN_ROUTES.includes(pathname);

  const { hydrated, accessToken, isAuthenticated, user, logout } = useAuthStore();

  const { data, isSuccess, isError } = useProfile({
    enabled: hydrated && !isPublicRoute && !!accessToken,
  });

  useEffect(() => {
    if (!hydrated) return;
    if (isPublicRoute) return;

    if (!accessToken || !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [hydrated, accessToken, isAuthenticated, isPublicRoute, router]);

  useEffect(() => {
    if (isSuccess && data) {
      useAuthStore.setState({ user: data });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!hydrated) return;

    if (isError) {
      logout();
      router.replace("/admin/login");
    }
  }, [hydrated, isError, logout, router]);

  // Role-based access: Registered Users have no admin-panel access at all;
  // everyone else is checked against the section they're trying to reach.
  useEffect(() => {
    if (!hydrated || isPublicRoute || !user) return;

    if (user.roleName === ROLES.REGISTERED_USER) {
      toast.error("Bu bölməyə giriş icazəniz yoxdur");
      router.replace("/");
      return;
    }

    if (!canAccessRoute(user.roleName, pathname)) {
      toast.error("Bu bölməyə giriş icazəniz yoxdur");
      router.replace("/admin");
    }
  }, [hydrated, isPublicRoute, user, pathname, router]);

  if (!hydrated) return null;
  if (isPublicRoute) return children;
  if (!accessToken || !isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}