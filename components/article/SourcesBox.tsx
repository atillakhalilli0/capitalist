import { ExternalLink, ShieldCheck } from "lucide-react";

type SourcesBoxProps = {
  sources: {
    title: string;
    url: string;
  }[];
};

export default function SourcesBox({ sources }: SourcesBoxProps) {
  if (!sources.length) return null;

  return (
    <section className="mt-16 rounded-lg border border-border bg-card p-6 md:p-8 transition-colors duration-300">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-accent/15">
          <ShieldCheck className="h-5 w-5 text-accent" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground">Mənbələr</h2>
          <p className="text-xs text-muted-foreground">
            Məqalənin hazırlanmasında istifadə olunan rəsmi istinadlar.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <a
            key={`${source.url}-${index}`}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded border border-border p-4 hover:border-accent hover:bg-secondary/40 transition-all duration-250"
          >
            <div className="min-w-0">
              <p className="font-sans text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                {source.title}
              </p>
              <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
                {source.url}
              </p>
            </div>

            <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}