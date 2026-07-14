"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useCategories, useCategory, useUpdateCategory } from "@/hooks/useCategories";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data: category, isLoading: isCategoryLoading } = useCategory(id);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const [name, setName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setParentCategoryId(category.parentCategoryId || null);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Kateqoriya adı daxil edilməlidir");
      return;
    }

    updateCategory(
      {
        id,
        data: {
          name,
          parentCategoryId: parentCategoryId || null,
        },
      },
      {
        onSuccess: () => {
          toast.success("Kateqoriya uğurla yeniləndi");
          router.push("/admin/categories");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Kateqoriya yenilənə bilmədi: ${detail}`);
        },
      }
    );
  };

  if (isCategoryLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">Kateqoriya tapılmadı</p>
        <Link href="/admin/categories" className="text-sm underline">
          Kateqoriyalara qayıt
        </Link>
      </div>
    );
  }

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
            Kateqoriyanı redaktə et
          </h1>

          <p className="mt-2 text-muted-foreground">
            Kateqoriya məlumatlarını yeniləyin.
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
          Dəyişiklikləri saxla
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Kateqoriya adı
            </label>

            <Input
              placeholder="Kateqoriya adı..."
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
              {categories
                ?.filter((item) => item.id !== id)
                .map((item) => (
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