import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CalendarDays } from "lucide-react";

import { specialProjects } from "@/mocks/special-projects";

type SpecialProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpecialProjectPage({
  params,
}: SpecialProjectPageProps) {
  const { slug } = await params;

  const project = specialProjects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[55vh] min-h-[420px]">
          <Image
            src={project.coverImage ?? "/images/placeholder.jpg"}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-4 pb-14">
              <span className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Special Project
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                {project.title}
              </h1>

              {project.excerpt && (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                  {project.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Sponsor layihə
                </span>

                {project.publishedAt && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(project.publishedAt).toLocaleDateString("az-AZ")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Layihə haqqında</h2>

              <p>
                {project.excerpt}
              </p>

              <p>
                Bu səhifə xüsusi sponsor layihələri üçün hazırlanmış premium
                template-dir. CMS-dən gələn bloklar (hero, video, qalereya,
                statistika, komanda, FAQ, CTA və s.) burada dinamik şəkildə
                render olunacaq.
              </p>

              <blockquote>
                Premium branded content istifadəçi təcrübəsini pozmadan,
                redaksiya keyfiyyətini qoruyaraq təqdim edilir.
              </blockquote>

              <h3>Layihənin məqsədi</h3>

              <p>
                Azərbaycan biznes ekosistemində uğurlu şirkətlər, innovasiya,
                investisiya və texnologiya mövzularını daha dərin formatda
                təqdim etmək.
              </p>
            </div>

            <div className="mt-12 rounded-2xl bg-muted p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">
                    Sponsor
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Capitalist Business Studio
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Brendiniz üçün xüsusi media layihələri hazırlayırıq.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
                  Əlaqə saxla
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}