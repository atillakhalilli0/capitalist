import ArticleCard from "@/components/article/ArticleCard";
import MostReadSection from "@/components/home/MostReadSection";

import { articles as allArticles } from "@/mocks/articles";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  const query = q.trim().toLowerCase();

  const results = query
    ? allArticles.filter((article) => {
        const text = [
          article.title,
          article.subtitle,
          article.excerpt,
          article.category.name,
          article.author.name,
          article.author.surname,
          ...article.tags.map((tag) => tag.name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(query);
      })
    : [];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-black">Axtarış</h1>

          <p className="mt-3 text-muted-foreground">
            Məqalə, müəllif və ya mövzu üzrə axtarış edin.
          </p>

          <form
            action="/axtaris"
            className="mt-8"
          >
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Məsələn: Süni intellekt"
              className="h-14 w-full rounded-2xl border border-border bg-background px-5 outline-none transition focus:border-emerald-600"
            />
          </form>
        </div>

        {query && (
          <p className="mb-8 text-sm text-muted-foreground">
            <strong>{results.length}</strong> nəticə tapıldı: "{q}"
          </p>
        )}

        {!query && (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center">
            <h2 className="text-2xl font-bold">
              Axtarışa başlayın
            </h2>

            <p className="mt-3 text-muted-foreground">
              Yuxarıdakı sahəyə açar söz daxil edin.
            </p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center">
            <h2 className="text-2xl font-bold">
              Heç nə tapılmadı
            </h2>

            <p className="mt-3 text-muted-foreground">
              Başqa açar sözlə yenidən cəhd edin.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {results.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
        )}
          <MostReadSection />
      </div>
    </section>
  );
}