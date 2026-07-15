"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, Search, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useArticles, useDeleteArticle } from "@/hooks/useArticles";

export default function AdminArticlesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, refetch } = useArticles({
    pageNumber: page,
    pageSize,
    searchQuery: search || undefined,
  });

  const { mutate: deleteArticle } = useDeleteArticle();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`"${title}" məqaləsini silmək istədiyinizdən əminsiniz?`)) {
      deleteArticle(id, {
        onSuccess: () => {
          toast.success("Məqalə uğurla silindi");
          refetch();
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Məqalə silinə bilmədi: ${detail}`);
        },
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on new search query
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        Məqalələr yüklənərkən xəta baş verdi.
      </div>
    );
  }

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;
  const totalCount = data?.totalCount || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Məqalələr
          </h1>

          <p className="mt-2 text-muted-foreground">
            Bütün məqalələri idarə edin.
          </p>
        </div>

        <Link
          href="/admin/articles/create"
          className={cn(buttonVariants())}
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni məqalə
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Məqalə axtar..."
            className="pl-10"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlıq</TableHead>
              <TableHead>Kateqoriya</TableHead>
              <TableHead>Müəllif</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Baxış</TableHead>
              <TableHead className="w-[180px] text-center">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Məqalə tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              items.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="max-w-md">
                    <div>
                      <p className="line-clamp-1 font-semibold">
                        {article.title}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {article.slug}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {article.category?.name || "-"}
                  </TableCell>

                  <TableCell>
                    {article.author?.name || "-"}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {article.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {(article.viewCount || 0).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className={cn(buttonVariants({ size: "icon" }))}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className={cn(buttonVariants({ variant: "destructive", size: "icon" }))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Toplam {totalCount} məqalədən {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, totalCount)} arası göstərilir.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "disabled:opacity-50")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">
                Səhifə {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }), "disabled:opacity-50")}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}