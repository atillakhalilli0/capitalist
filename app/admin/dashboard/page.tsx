"use client";

import {
  Clock3,
  Eye,
  Newspaper,
  TrendingUp,
} from "lucide-react";

import AdminStatCard from "@/components/admin/layout/AdminStatCard";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import RecentArticles from "@/components/admin/dashboard/RecentArticles";

import { useDashboardStats } from "@/hooks/useArticles";

export default function AdminDashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Dashboard yüklənir...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        Dashboard məlumatları yüklənmədi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Redaksiyanın ümumi statistikası və son aktivlik.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Ümumi məqalə"
          value={data.totalArticles}
          description="Sistemdə olan məqalələr"
          icon={<Newspaper className="h-7 w-7" />}
        />

        <AdminStatCard
          title="Dərc olunub"
          value={data.publishedArticles}
          description="Aktiv məqalələr"
          icon={<TrendingUp className="h-7 w-7" />}
        />

        <AdminStatCard
          title="Qaralama"
          value={data.draftArticles}
          description="Redaktə gözləyən"
          icon={<Clock3 className="h-7 w-7" />}
        />

        <AdminStatCard
          title="Ümumi baxış"
          value={data.totalViews.toLocaleString()}
          description="Bütün məqalələr"
          icon={<Eye className="h-7 w-7" />}
        />
      </section>

      <DashboardCharts />

      <RecentArticles />
    </div>
  );
}