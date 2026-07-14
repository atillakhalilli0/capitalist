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

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  const pathname = usePathname();

  const router = useRouter();
  const PUBLIC_ADMIN_ROUTES = [
    "/admin/login",
    "/admin/register",
  ];

  const isPublicRoute =
    PUBLIC_ADMIN_ROUTES.includes(pathname);

  const { accessToken, isAuthenticated, logout } =
    useAuthStore();

  const {
    data,
    isSuccess,
    isError,
  } = useProfile({
    enabled: !isPublicRoute && !!accessToken,
  });

  useEffect(() => {
    if (isPublicRoute) {
      return;
    }

    if (!accessToken || !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [
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
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      logout();

      router.replace("/admin/login");
    }
  }, [
    isError,
    logout,
    router,
  ]);

  if (pathname === "/admin/login") {
    return children;
  }

  if (isPublicRoute) {
    return children;
  }

  if (!accessToken) {
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