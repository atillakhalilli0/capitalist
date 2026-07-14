import { Article, ArticleStatus } from "@/types/article";
import { categories } from "../categories";
import { tags } from "../tags";
import { users } from "../users";
import { createTipTapContent, createdAt, updatedAt } from "../helpers";

export const featuredArticles: Article[] = [
  {
    id: "article-1",
    title: "Azərbaycan iqtisadiyyatında yeni inkişaf mərhələsi başlayır",
    slug: "azerbaycan-iqtisadiyyatinda-yeni-inkisaf-merhelesi",
    subtitle: "Son illərin ən böyük iqtisadi layihələri həyata keçirilir.",
    excerpt:
      "Yeni investisiya proqramları və strateji layihələr ölkə iqtisadiyyatına ciddi təsir göstərəcək.",
    content: createTipTapContent(
      "Bu məqalə mock data məqsədilə hazırlanmışdır."
    ),
    coverImage: "https://www.rasameel.com/wp-content/uploads/2021/10/report.jpg",
    author: users[0],
    editor: users[1],
    category: categories[7],
    tags: [tags[0], tags[2], tags[11]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 6,
    viewCount: 12487,
    isFeatured: true,
    isBreaking: false,
    publishedAt: "2026-07-10T09:30:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Azərbaycan iqtisadiyyatında yeni inkişaf mərhələsi",
      description:
        "İqtisadi inkişaf və yeni investisiya layihələri haqqında geniş məqalə.",
      keywords: ["iqtisadiyyat", "investisiya", "biznes"],
      image: "https://www.rasameel.com/wp-content/uploads/2021/10/report.jpg",
    },
    createdAt,
    updatedAt,
  }
];
