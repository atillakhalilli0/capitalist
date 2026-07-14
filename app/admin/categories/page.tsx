"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, FolderTree, Pencil, Plus, Search, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();
  const [search, setSearch] = useState("");

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" kateqoriyasını silmək istədiyinizdən əminsiniz?`)) {
      deleteCategory(id, {
        onSuccess: () => {
          toast.success("Kateqoriya uğurla silindi");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Kateqoriya silinə bilmədi: ${detail}`);
        },
      });
    }
  };

  const filteredCategories = categories?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

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
        Kateqoriyalar yüklənərkən xəta baş verdi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Kateqoriyalar
          </h1>

          <p className="mt-2 text-muted-foreground">
            Saytdakı bütün kateqoriyaları idarə edin.
          </p>
        </div>

        <Link
          href="/admin/categories/create"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni kateqoriya
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Kateqoriya axtar..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kateqoriya</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent Kateqoriya</TableHead>
              <TableHead className="w-[140px] text-center">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Kateqoriya tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FolderTree className="h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="font-semibold">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {category.slug}
                  </TableCell>

                  <TableCell>
                    {category.parentCategoryName || "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="rounded-lg bg-destructive p-2 text-destructive-foreground transition hover:opacity-90"
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
      </div>
    </div>
  );
}