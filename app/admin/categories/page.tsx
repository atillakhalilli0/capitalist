import Link from "next/link";
import { Eye, FolderTree, Pencil, Plus, Search } from "lucide-react";

import { categories } from "@/mocks/categories";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminCategoriesPage() {
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
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
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
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kateqoriya</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Sıra</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px]">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FolderTree className="h-4 w-4 text-emerald-600" />

                    <div>
                      <p className="font-semibold">
                        {category.name}
                      </p>

                      {category.description && (
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {category.slug}
                </TableCell>

                <TableCell>
                  {category.order}
                </TableCell>

                <TableCell>
                  {category.isActive ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                      Aktiv
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-400">
                      Passiv
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="rounded-lg border border-border p-2 transition hover:bg-muted"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}