"use client";

import { useState } from "react";
import Link from "next/link";
import { FileStack, Pencil, Plus, Search, Trash2, Loader2 } from "lucide-react";
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
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import { SpecialProjectStatus } from "@/types/project";

export default function AdminProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const [search, setSearch] = useState("");

  const handleDelete = (id: string, title: string) => {
    if (confirm(`"${title}" layihəsini silmək istədiyinizdən əminsiniz?`)) {
      deleteProject(id, {
        onSuccess: () => toast.success("Layihə uğurla silindi"),
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Layihə silinə bilmədi: ${detail}`);
        },
      });
    }
  };

  const filteredProjects =
    projects?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) || [];

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
        Layihələr yüklənərkən xəta baş verdi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Xüsusi layihələr</h1>
          <p className="mt-2 text-muted-foreground">Bütün xüsusi layihələri idarə edin.</p>
        </div>

        <Link
          href="/admin/projects/create"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni layihə
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Layihə axtar..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlıq</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px] text-center">Əməliyyat</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  Layihə tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileStack className="h-4 w-4 text-emerald-600" />
                      <p className="font-semibold">{project.title}</p>
                    </div>
                  </TableCell>

                  <TableCell>{SpecialProjectStatus[project.status]}</TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(project.id, project.title)}
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
