import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { tags } from "@/mocks/tags";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditTagPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTagPage({
  params,
}: EditTagPageProps) {
  const { id } = await params;

  const tag = tags.find((item) => item.id === id);

  if (!tag) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/tags"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Teqlərə qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Teqi redaktə et
          </h1>

          <p className="mt-2 text-muted-foreground">
            Teq məlumatlarını yeniləyin.
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

      <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Teq adı
          </label>

          <Input defaultValue={tag.name} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Slug
          </label>

          <Input defaultValue={tag.slug} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Açıqlama
          </label>

          <Textarea
            rows={5}
            defaultValue={
              tag.description ?? ""
            }
          />
        </div>
      </div>
    </div>
  );
}