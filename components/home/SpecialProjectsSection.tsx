import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building } from "lucide-react";
import { specialProjects } from "@/mocks/special-projects";

export default function SpecialProjectsSection() {
  if (!specialProjects.length) return null;

  const project = specialProjects[0];

  return (
    <section className="py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-lg border border-accent/30 bg-card hover:border-accent transition-all duration-300">
          <div className="grid lg:grid-cols-12">
            {/* Image banner */}
            <div className="relative aspect-[16/10] lg:col-span-6 bg-muted min-h-[300px]">
              <Image
                src={project.coverImage ?? "/images/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Pitch */}
            <div className="flex flex-col justify-between p-8 lg:p-14 lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded bg-accent/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                  <Building className="h-3 w-3" />
                  Xüsusi Layihə
                </span>

                <h2 className="font-sans text-3xl font-black leading-tight text-foreground md:text-4xl">
                  {project.title}
                </h2>

                <p className="font-sans text-sm leading-6 text-muted-foreground">
                  {project.excerpt}
                </p>
              </div>

              {/* Sponsor & CTA footer */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border/80">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Presented by
                  </div>
                  <div className="mt-1 text-sm font-extrabold uppercase tracking-wider text-foreground">
                    Capitalist Studio
                  </div>
                </div>

                <Link
                  href={`/layihe/${project.slug}`}
                  className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Layihəyə bax
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}