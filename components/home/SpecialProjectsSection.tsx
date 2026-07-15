"use client";

import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";

import { useProjects } from "@/hooks/useProjects";

export default function SpecialProjectsSection() {
  const { data: projects = [], isLoading } =
    useProjects();

  if (isLoading) return null;

  if (!projects.length) return null;

  const project = projects[0];

  return (
    <section className="py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-lg border border-accent/30 bg-card transition-all duration-300 hover:border-accent">
          <div className="grid lg:grid-cols-12">
            <div className="flex min-h-[300px] items-center justify-center bg-muted lg:col-span-6">
              <Building className="h-20 w-20 text-muted-foreground" />
            </div>

            <div className="flex flex-col justify-between space-y-6 p-8 lg:col-span-6 lg:p-14">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded bg-accent/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                  <Building className="h-3 w-3" />
                  Xüsusi Layihə
                </span>

                <h2 className="font-sans text-3xl font-black leading-tight text-foreground md:text-4xl">
                  {project.title}
                </h2>

                <p className="font-sans text-sm leading-6 text-muted-foreground">
                  {project.description ??
                    "Təsvir əlavə edilməyib."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border/80 pt-6">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Special Project
                  </div>

                  <div className="mt-1 text-sm font-extrabold uppercase tracking-wider text-foreground">
                    ENews
                  </div>
                </div>

                <Link
                  href={`/layihe/${
                    project.slug ?? project.id
                  }`}
                  className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-foreground transition hover:opacity-90"
                >
                  Layihəyə bax
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}