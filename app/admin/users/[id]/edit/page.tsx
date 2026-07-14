import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { users } from "@/mocks/users";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({
  params,
}: EditUserPageProps) {
  const { id } = await params;

  const user = users.find((item) => item.id === id);

  if (!user) {
    notFound();
  }

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
            İstifadəçini redaktə et
          </h1>

          <p className="mt-2 text-muted-foreground">
            İstifadəçi məlumatlarını yeniləyin.
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
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Ad
            </label>

            <Input defaultValue={user.name} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Soyad
            </label>

            <Input defaultValue={user.surname} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              defaultValue={user.email}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Yeni şifrə
            </label>

            <Input
              type="password"
              placeholder="Boş saxlayın"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Rol
            </label>

            <select
              defaultValue={user.role}
              className="w-full rounded-xl border border-input bg-background px-4 py-3"
            >
              <option value="AUTHOR">AUTHOR</option>
              <option value="EDITOR">EDITOR</option>
              <option value="CHIEF_EDITOR">
                CHIEF_EDITOR
              </option>
              <option value="SUPERADMIN">
                SUPERADMIN
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Avatar URL
            </label>

            <Input defaultValue={user.avatar} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Bio
            </label>

            <Textarea
              rows={5}
              defaultValue={user.bio}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Website
            </label>

            <Input
              defaultValue={user.socialLinks?.website}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Facebook
            </label>

            <Input
              defaultValue={user.socialLinks?.facebook}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              LinkedIn
            </label>

            <Input
              defaultValue={user.socialLinks?.linkedin}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              X (Twitter)
            </label>

            <Input
              defaultValue={user.socialLinks?.twitter}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Instagram
            </label>

            <Input
              defaultValue={user.socialLinks?.instagram}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              YouTube
            </label>

            <Input
              defaultValue={user.socialLinks?.youtube}
            />
          </div>
        </div>
      </div>
    </div>
  );
}