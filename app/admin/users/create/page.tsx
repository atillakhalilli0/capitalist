import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateUserPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/users"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            İstifadəçilərə qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Yeni istifadəçi
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sistemə yeni istifadəçi əlavə edin.
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
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Ad
            </label>

            <Input placeholder="Atilla" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Soyad
            </label>

            <Input placeholder="Xəlilli" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Şifrə
            </label>

            <Input
              type="password"
              placeholder="********"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Rol
            </label>

            <select className="w-full rounded-xl border border-input bg-background px-4 py-3">
              <option>AUTHOR</option>
              <option>EDITOR</option>
              <option>CHIEF_EDITOR</option>
              <option>SUPERADMIN</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Avatar URL
            </label>

            <Input placeholder="https://..." />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Bio
            </label>

            <Textarea
              rows={5}
              placeholder="İstifadəçi haqqında qısa məlumat..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Website
            </label>

            <Input placeholder="https://example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Facebook
            </label>

            <Input placeholder="https://facebook.com/..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              LinkedIn
            </label>

            <Input placeholder="https://linkedin.com/in/..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              X (Twitter)
            </label>

            <Input placeholder="https://x.com/..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Instagram
            </label>

            <Input placeholder="https://instagram.com/..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              YouTube
            </label>

            <Input placeholder="https://youtube.com/..." />
          </div>
        </div>
      </div>
    </div>
  );
}