"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Send, ImagePlus } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCategories } from "@/hooks/useCategories";
import { useCreateArticle } from "@/hooks/useArticles";
import { useUploadMedia } from "@/hooks/useMedia";
import { useAuthStore } from "@/store/authStore";
import { ContentType } from "@/types/article";

const CONTENT_TYPE_OPTIONS = [
  { label: "Məqalə", value: ContentType.ARTICLE },
  { label: "Xəbər", value: ContentType.NEWS },
  { label: "Rəy", value: ContentType.OPINION },
  { label: "Video", value: ContentType.VIDEO },
];

export default function CreateArticlePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { mutateAsync: createArticle, isPending: isSaving } = useCreateArticle();
  const { mutateAsync: uploadMedia, isPending: isUploading } = useUploadMedia();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [contentType, setContentType] = useState<ContentType>(ContentType.ARTICLE);
  const [tagsInput, setTagsInput] = useState("");
  const [coverImageId, setCoverImageId] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const parseTags = () =>
    tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const media = await uploadMedia({ file, altText: title || file.name });
      setCoverImageId(media.id);
      setCoverImagePreview(media.url);
      toast.success("Şəkil yükləndi");
    } catch (error: any) {
      const detail = error?.response?.data?.detail || "Xəta baş verdi";
      toast.error(`Şəkil yüklənə bilmədi: ${detail}`);
    }
  };

  const handleSubmit = async (publishImmediately: boolean) => {
    if (!title.trim() || !content.trim()) {
      toast.error("Başlıq və məzmun daxil edilməlidir");
      return;
    }

    if (!categoryId) {
      toast.error("Kateqoriya seçilməlidir");
      return;
    }

    if (!user?.id) {
      toast.error("Müəllif müəyyən edilə bilmədi, yenidən daxil olun");
      return;
    }

    try {
      const article = await createArticle({
        title,
        content,
        summary: summary || null,
        contentType,
        authorId: user.id,
        categoryId,
        coverImageId,
        sponsorId: null,
        tags: parseTags(),
      });

      toast.success("Məqalə uğurla yaradıldı");

      if (publishImmediately) {
        const { articleService } = await import("@/services/article.service");
        await articleService.publish(article.id, { publish: true });
        toast.success("Məqalə dərc edildi");
      }

      router.push("/admin/articles");
    } catch (error: any) {
      const detail = error?.response?.data?.detail || "Xəta baş verdi";
      toast.error(`Məqalə yaradıla bilmədi: ${detail}`);
    }
  };

  const isPending = isSaving || isUploading;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/articles"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Məqalələrə qayıt
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Yeni məqalə</h1>

          <p className="mt-2 text-muted-foreground">
            Yeni məqalə yaradın və redaksiyaya göndərin.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSubmit(false)}
            className="inline-flex items-center rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Qaralama saxla
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => handleSubmit(true)}
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Dərc et
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-lg font-semibold">Məqalə məlumatları</h2>

            <div className="space-y-5">
              <Input
                placeholder="Başlıq"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Textarea
                rows={3}
                placeholder="Qısa təsvir (Summary)"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />

              <Textarea
                rows={16}
                placeholder="Məqalə məzmunu..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center hover:bg-muted/50">
            {coverImagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImagePreview}
                alt="Cover"
                className="mb-4 max-h-48 rounded-xl object-cover"
              />
            ) : (
              <ImagePlus className="mb-3 h-8 w-8 text-muted-foreground" />
            )}

            <p className="font-medium">Cover şəkli</p>

            <p className="mt-2 text-sm text-muted-foreground">
              {isUploading ? "Yüklənir..." : "Şəkil seçmək üçün klikləyin"}
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Kateqoriya</h3>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isCategoriesLoading}
              className="w-full rounded-xl border border-input bg-background px-4 py-3"
            >
              <option value="">Seçin</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Məzmun növü</h3>

            <select
              value={contentType}
              onChange={(e) => setContentType(Number(e.target.value) as ContentType)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3"
            >
              {CONTENT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Teqlər</h3>

            <Input
              placeholder="AI, Startup, Finance..."
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Vergüllə ayırın (məs: AI, Startup)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
