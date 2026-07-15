"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

import { useProfile } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const PUBLIC_ADMIN_ROUTES = [
  "/admin/login",
  "/admin/register",
];

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute =
    PUBLIC_ADMIN_ROUTES.includes(pathname);

  const {
    hydrated,
    accessToken,
    isAuthenticated,
    logout,
  } = useAuthStore();

  const {
    data,
    isSuccess,
    isError,
  } = useProfile({
    enabled:
      hydrated &&
      !isPublicRoute &&
      !!accessToken,
  });

  useEffect(() => {
    if (!hydrated) return;

    if (isPublicRoute) return;

    if (!accessToken || !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [
    hydrated,
    accessToken,
    isAuthenticated,
    isPublicRoute,
    router,
  ]);

  useEffect(() => {
    if (isSuccess && data) {
      useAuthStore.setState({
        user: data,
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!hydrated) return;

    if (isError) {
      logout();
      router.replace("/admin/login");
    }
  }, [
    hydrated,
    isError,
    logout,
    router,
  ]);

  if (!hydrated) {
    return null;
  }

  if (isPublicRoute) {
    return children;
  }

  if (!accessToken || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}