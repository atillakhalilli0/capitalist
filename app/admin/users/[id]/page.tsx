import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Pencil,
  User2,
  Globe,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";

import { users } from "@/mocks/users";
import { articles as allArticles } from "@/mocks/articles";

type UserPreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserPreviewPage({
  params,
}: UserPreviewPageProps) {
  const { id } = await params;

  const user = users.find((item) => item.id === id);

  if (!user) {
    notFound();
  }

  const articles = allArticles.filter(
    (article) => article.author.id === user.id
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
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
            İstifadəçi məlumatı
          </h1>
        </div>

        <Link
          href={`/admin/users/${user.id}/edit`}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Redaktə et
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User2 className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {user.name} {user.surname}
                </h2>

                <p className="mt-2 text-muted-foreground">
                  {user.role}
                </p>
              </div>

              {user.bio && (
                <p className="max-w-2xl text-muted-foreground">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-6 text-xl font-semibold">
              Əlaqə məlumatları
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user.email}</span>
              </div>

              {user.socialLinks?.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span>{user.socialLinks.website}</span>
                </div>
              )}

              {user.socialLinks?.facebook && (
                <div className="flex items-center gap-3">
                  <FaFacebook className="h-5 w-5 text-muted-foreground" />
                  <span>{user.socialLinks.facebook}</span>
                </div>
              )}

              {user.socialLinks?.instagram && (
                <div className="flex items-center gap-3">
                  <FaInstagram className="h-5 w-5 text-muted-foreground" />
                  <span>{user.socialLinks.instagram}</span>
                </div>
              )}

              {user.socialLinks?.linkedin && (
                <div className="flex items-center gap-3">
                  <FaLinkedin className="h-5 w-5 text-muted-foreground" />
                  <span>{user.socialLinks.linkedin}</span>
                </div>
              )}

              {user.socialLinks?.youtube && (
                <div className="flex items-center gap-3">
                  <FaYoutube className="h-5 w-5 text-muted-foreground" />
                  <span>{user.socialLinks.youtube}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-6 text-xl font-semibold">
              Son məqalələr
            </h3>

            <div className="space-y-4">
              {articles.length ? (
                articles.slice(0, 5).map((article) => (
                  <Link
                    key={article.id}
                    href={`/admin/articles/${article.id}`}
                    className="block rounded-xl border border-border p-4 transition hover:bg-muted"
                  >
                    <h4 className="font-semibold">
                      {article.title}
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.viewCount.toLocaleString()} baxış
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground">
                  Bu istifadəçinin hələ məqaləsi yoxdur.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Statistika
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Rol</span>
                <span className="font-semibold">
                  {user.role}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Məqalə sayı</span>
                <span className="font-semibold">
                  {articles.length}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}