"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useCategories, useCreateCategory } from "@/hooks/useCategories";

export default function CreateCategoryPage() {
  const router = useRouter();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Kateqoriya adı daxil edilməlidir");
      return;
    }

    createCategory(
      {
        name,
        parentCategoryId: parentCategoryId || null,
      },
      {
        onSuccess: () => {
          toast.success("Kateqoriya uğurla yaradıldı");
          router.push("/admin/categories");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Kateqoriya yaradıla bilmədi: ${detail}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/categories"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kateqoriyalara qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Yeni kateqoriya
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sayta yeni kateqoriya əlavə edin.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Saxla
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Kateqoriya adı
            </label>

            <Input
              placeholder="Məs: Biznes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Parent Kateqoriya
            </label>

            <select
              value={parentCategoryId || ""}
              onChange={(e) => setParentCategoryId(e.target.value || null)}
              disabled={isCategoriesLoading}
              className="w-full rounded-xl border border-input bg-background px-4 py-3"
            >
              <option value="">Yoxdur</option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}