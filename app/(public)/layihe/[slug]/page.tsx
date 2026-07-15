import { notFound } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

import { projectService } from "@/services/project.service";
import { SpecialProjectStatus } from "@/types/project";
import { getProjectSlug } from "@/utils/publicHelpers";

type SpecialProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpecialProjectPage({ params }: SpecialProjectPageProps) {
  const { slug } = await params;

  // The backend never returns a slug for special projects, so the list is
  // fetched and matched against a slug derived from the title (or the id).
  const projects = await projectService.getAll();

  const project = projects.find(
    (item) =>
      item.status === SpecialProjectStatus.PUBLISHED &&
      (getProjectSlug(item) === slug || item.id === slug)
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-muted">
        <div className="flex min-h-[420px] items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-14">
            <span className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Special Project
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {project.title}
            </h1>

            {project.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>
            )}

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Xüsusi Layihə
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>Layihə haqqında</h2>

              <p>{project.description ?? "Layihə haqqında məlumat əlavə edilməyib."}</p>

              <pre className="mt-8 overflow-x-auto whitespace-pre-wrap rounded-xl bg-muted p-6 text-sm">
                {project.layoutData}
              </pre>
            </div>

            <div className="mt-12 rounded-2xl bg-muted p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Capitalist</p>

                  <h3 className="mt-2 text-2xl font-bold">Special Project</h3>
                </div>

                <Link
                  href="/elaqe"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Əlaqə saxla
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
