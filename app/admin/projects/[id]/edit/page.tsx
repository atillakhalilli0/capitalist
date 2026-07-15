"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProject, useUpdateProject } from "@/hooks/useProjects";
import { SpecialProjectStatus } from "@/types/project";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data: project, isLoading, isError } = useProject(id);
  const { mutate: updateProject, isPending } = useUpdateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [layoutData, setLayoutData] = useState("");
  const [status, setStatus] = useState<SpecialProjectStatus>(SpecialProjectStatus.DRAFT);

  useEffect(() => {
    if (!project) return;

    setTitle(project.title);
    setDescription(project.description || "");
    setLayoutData(project.layoutData);
    setStatus(project.status);
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !layoutData.trim()) {
      toast.error("Başlıq və layout məlumatı daxil edilməlidir");
      return;
    }

    updateProject(
      {
        id,
        data: {
          title,
          description: description || null,
          layoutData,
          status,
        },
      },
      {
        onSuccess: () => {
          toast.success("Layihə uğurla yeniləndi");
          router.push("/admin/projects");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Layihə yenilənə bilmədi: ${detail}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        Layihə tapılmadı.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Layihələrə qayıt
          </Link>

          <h1 className="text-3xl font-bold">Layihəni redaktə et</h1>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Yadda saxla
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Başlıq</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Təsvir</label>
          <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Layout (JSON / HTML)</label>
          <Textarea rows={10} value={layoutData} onChange={(e) => setLayoutData(e.target.value)} required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value) as SpecialProjectStatus)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3"
          >
            <option value={SpecialProjectStatus.DRAFT}>Draft</option>
            <option value={SpecialProjectStatus.PUBLISHED}>Published</option>
            <option value={SpecialProjectStatus.ARCHIVED}>Archived</option>
          </select>
        </div>
      </div>
    </form>
  );
}
