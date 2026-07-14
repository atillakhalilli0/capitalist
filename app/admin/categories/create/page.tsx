import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCategoryPage() {
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
            Yeni kateqoriya
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sayta yeni kateqoriya əlavə edin.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Save className="mr-2 h-4 w-4" />
          Saxla
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Kateqoriya adı
            </label>

            <Input placeholder="Məs: Biznes" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Slug
            </label>

            <Input placeholder="biznes" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Təsvir
            </label>

            <Textarea
              rows={4}
              placeholder="Kateqoriya haqqında qısa məlumat..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Şəkil URL
            </label>

            <Input placeholder="https://..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Sıralama
            </label>

            <Input
              type="number"
              defaultValue={1}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Parent Kateqoriya
            </label>

            <select className="w-full rounded-xl border border-input bg-background px-4 py-3">
              <option>Yoxdur</option>
              <option>Biznes</option>
              <option>Maliyyə</option>
              <option>Startap</option>
              <option>Texnologiya</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="active"
              type="checkbox"
              defaultChecked
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