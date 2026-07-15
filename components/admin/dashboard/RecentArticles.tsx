"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import { useArticles } from "@/hooks/useArticles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RecentArticles() {
  const { data, isLoading, isError } = useArticles({
    pageNumber: 1,
    pageSize: 8,
  });

  const articles = data?.items || [];

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h2 className="text-xl font-bold">
            Son məqalələr
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Son əlavə olunan və redaktə edilən məqalələr
          </p>
        </div>

        <Link
          href="/admin/articles"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Hamısına bax
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex h-48 items-center justify-center text-destructive text-sm">
          Məqalələr yüklənə bilmədi.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlıq</TableHead>
              <TableHead>Kateqoriya</TableHead>
              <TableHead>Müəllif</TableHead>
              <TableHead>Baxış</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Məqalə tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="hover:text-emerald-600"
                    >
                      {article.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    {article.category?.name || "-"}
                  </TableCell>

                  <TableCell>
                    {article.author?.name || "-"}
                  </TableCell>

                  <TableCell>
                    {(article.viewCount || 0).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {article.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}