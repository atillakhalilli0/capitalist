import HeroSection from "@/components/home/HeroSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import EditorsPickSection from "@/components/home/EditorsPickSection";
import MostReadSection from "@/components/home/MostReadSection";
import CategoryBlock from "@/components/home/CategoryBlock";
import PodcastBlock from "@/components/home/PodcastBlock";
import NewsletterForm from "@/components/home/NewsletterForm";
import SpecialProjectsSection from "@/components/home/SpecialProjectsSection";
import { categories } from "@/mocks/categories";
import { getArticlesByCategory } from "@/mocks/articles";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <LatestNewsSection />

      <EditorsPickSection />

      <MostReadSection />

      <div className="container mx-auto px-4 py-14">
        <h4 className="text-4xl underline font-bold">Kategoriyalar</h4>
        {
          categories
            .filter((category) => category.isActive)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((category) => (
              <CategoryBlock
                key={category.id}
                title={category.name}
                slug={category.slug}
                articles={getArticlesByCategory(category.slug)}
              />
            ))}
      </div>

      <PodcastBlock />

      <SpecialProjectsSection />

      <NewsletterForm />
    </>
  );
}