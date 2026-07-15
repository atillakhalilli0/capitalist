import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Eye } from "lucide-react";
import type { User } from "@/types/user";
import {
  getAuthorAvatar,
  getAuthorFullName,
  getAuthorRoleLabel,
  getAuthorSlug,
} from "@/utils/publicHelpers";

type AuthorBoxProps = {
  author: User;
  articleCount?: number;
  totalReads?: number;
};

export default function AuthorBox({
  author,
  articleCount = 0,
  totalReads = 0,
}: AuthorBoxProps) {
  const fullName = getAuthorFullName(author);
  const authorSlug = getAuthorSlug(author);
  const authorRole = getAuthorRoleLabel(author);

  return (
    <section className="mt-16 overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300">
      <div className="p-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Avatar */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted border border-border">
            <Image src={getAuthorAvatar(author)} alt={fullName} fill className="object-cover" />
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            {/* Info header */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">{fullName}</h2>

              {authorRole && (
                <span className="rounded bg-accent/15 px-2.5 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-accent">
                  {authorRole}
                </span>
              )}
            </div>

            {/* Bio */}
            {author.bio && (
              <p className="font-sans text-sm leading-6 text-muted-foreground">{author.bio}</p>
            )}

            {/* Stats Dashboard */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-border bg-card/45 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                    Məqalələr
                  </span>
                </div>
                <div className="font-mono text-xl font-black text-foreground">
                  {articleCount.toLocaleString()}
                </div>
              </div>

              <div className="rounded border border-border bg-card/45 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                    Ümumi baxış
                  </span>
                </div>
                <div className="font-mono text-xl font-black text-foreground">
                  {totalReads.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Links and CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/muellif/${authorSlug}`}
                className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-colors ml-auto"
              >
                Bütün Yazıları
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
