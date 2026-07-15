"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/useProjects";

export default function CreateProjectPage() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [layoutData, setLayoutData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !layoutData.trim()) {
      toast.error("Başlıq və layout məlumatı daxil edilməlidir");
      return;
    }

    createProject(
      {
        title,
        description: description || null,
        layoutData,
      },
      {
        onSuccess: () => {
          toast.success("Layihə uğurla yaradıldı");
          router.push("/admin/projects");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Layihə yaradıla bilmədi: ${detail}`);
        },
      }
    );
  };

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

          <h1 className="text-3xl font-bold">Yeni xüsusi layihə</h1>
          <p className="mt-2 text-muted-foreground">Sayta yeni xüsusi layihə əlavə edin.</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Saxla
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Başlıq</label>
          <Input
            placeholder="Məs: 2026 İllik Hesabat"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Təsvir</label>
          <Textarea
            rows={4}
            placeholder="Layihə haqqında qısa məlumat..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Layout (JSON / HTML)</label>
          <Textarea
            rows={10}
            placeholder="Layihənin layout məlumatı..."
            value={layoutData}
            onChange={(e) => setLayoutData(e.target.value)}
            required
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Bu sahə backend-in `layoutData` sahəsinə birbaşa göndərilir — formatı backend komandası ilə dəqiqləşdirin.
          </p>
        </div>
      </div>
    </form>
  );
}
