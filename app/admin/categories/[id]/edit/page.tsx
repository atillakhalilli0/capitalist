import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { categories } from "@/mocks/categories";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const category = categories.find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
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

        <Link
          href="#"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Save className="mr-2 h-4 w-4" />
          Dəyişiklikləri saxla
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Kateqoriya adı
            </label>

            <Input defaultValue={category.name} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Slug
            </label>

            <Input defaultValue={category.slug} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Təsvir
            </label>

            <Textarea
              rows={4}
              defaultValue={category.description}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Şəkil URL
            </label>

            <Input defaultValue={category.image} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Sıralama
            </label>

            <Input
              type="number"
              defaultValue={category.order}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Parent Kateqoriya
            </label>

            <select
              defaultValue={category.parentId ?? ""}
              className="w-full rounded-xl border border-input bg-background px-4 py-3"
            >
              <option value="">Yoxdur</option>

              {categories
                .filter((item) => item.id !== category.id)
                .map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="active"
              type="checkbox"
              defaultChecked={category.isActive}
              className="h-4 w-4"
            />

            <label
              htmlFor="active"
              className="text-sm font-medium"
            >
              Aktiv kateqoriya
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}