import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateArticlePage() {
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

          <h1 className="text-3xl font-bold tracking-tight">
            Yeni məqalə
          </h1>

          <p className="mt-2 text-muted-foreground">
            Yeni məqalə yaradın və redaksiyaya göndərin.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="#"
            className="inline-flex items-center rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            <Save className="mr-2 h-4 w-4" />
            Qaralama saxla
          </Link>

          <Link
            href="#"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Send className="mr-2 h-4 w-4" />
            Dərc et
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-lg font-semibold">
              Məqalə məlumatları
            </h2>

            <div className="space-y-5">
              <Input placeholder="Başlıq" />

              <Input placeholder="Slug" />

              <Textarea
                rows={3}
                placeholder="Qısa təsvir (Excerpt)"
              />

              <Textarea
                rows={16}
                placeholder="Məqalə məzmunu..."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-medium">
              Cover şəkli
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Drag & Drop və ya şəkil seçin
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              Kateqoriya
            </h3>

            <select className="w-full rounded-xl border border-input bg-background px-4 py-3">
              <option>Biznes</option>
              <option>Maliyyə</option>
              <option>İqtisadiyyat</option>
              <option>Startap</option>
              <option>Marketing</option>
              <option>Texnologiya</option>
            </select>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              Teqlər
            </h3>

            <Input placeholder="AI, Startup, Finance..." />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              SEO
            </h3>

            <div className="space-y-4">
              <Input placeholder="SEO Title" />

              <Textarea
                rows={4}
                placeholder="SEO Description"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              Status
            </h3>

            <select className="w-full rounded-xl border border-input bg-background px-4 py-3">
              <option>Draft</option>
              <option>In Review</option>
              <option>Published</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}