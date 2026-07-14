import { Article, ArticleStatus } from "@/types/article";
import { categories } from "../categories";
import { createTipTapContent, createdAt, updatedAt } from "../helpers";
import { tags } from "../tags";
import { users } from "../users";

export const latestArticles: Article[] = [
  {
    id: "article-2",
    title: "Azərbaycan Mərkəzi Bankı faiz dəhlizini sabit saxladı",
    slug: "amb-faiz-dehlizini-sabit-saxladi",
    subtitle: "Qərar pul siyasətinin cari istiqamətini qoruyur.",
    excerpt:
      "Mərkəzi Bank uçot dərəcəsi ilə bağlı növbəti qərarını açıqlayıb.",
    content: createTipTapContent(
      "Bu məqalə mock məqsədilə hazırlanmış məzmundur."
    ),
    coverImage: "https://vergiler.az/media/2019/09/13/merkezi_bank.jpg",
    author: users[1],
    editor: users[0],
    category: categories[1],
    tags: [tags[1], tags[2]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 4,
    viewCount: 5342,
    isFeatured: false,
    isBreaking: true,
    publishedAt: "2026-07-10T10:00:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "AMB faiz dəhlizini sabit saxladı",
      description: "Mərkəzi Bankın son qərarı haqqında.",
      keywords: ["AMB", "faiz", "bank"],
      image: "https://vergiler.az/media/2019/09/13/merkezi_bank.jpg",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-3",
    title: "Azərbaycan startapları üçün yeni investisiya fondu yaradılıb",
    slug: "azerbaycan-startap-investisiya-fondu",
    subtitle: "Fond erkən mərhələli layihələri maliyyələşdirəcək.",
    excerpt:
      "Yeni fond innovativ ideyaların inkişafına dəstək verməyi hədəfləyir.",
    content: createTipTapContent(
      "Startap ekosistemi ilə bağlı mock məqalə."
    ),
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPECdBrm26vy9zCjosTGPo8Xv1WFWNvLr87yX2w6Xs8lUET1d4ViVrYU&s=10",
    author: users[2],
    editor: users[1],
    category: categories[2],
    tags: [tags[3], tags[2]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 5,
    viewCount: 3871,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-10T11:20:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Yeni startap investisiya fondu",
      description: "Startaplar üçün yaradılan yeni fond.",
      keywords: ["startap", "investisiya"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPECdBrm26vy9zCjosTGPo8Xv1WFWNvLr87yX2w6Xs8lUET1d4ViVrYU&s=10",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-4",
    title: "Süni intellekt Azərbaycan şirkətlərində tətbiqini sürətləndirir",
    slug: "suni-intellekt-sirketlerde",
    subtitle: "Şirkətlər AI həllərinə daha çox investisiya edir.",
    excerpt:
      "Rəqəmsal transformasiya biznes sektorunda əsas istiqamətlərdən birinə çevrilib.",
    content: createTipTapContent(
      "Texnologiya üzrə mock məqalə."
    ),
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdbQdeejJ4tRDGrTNR1uZQbzm4AaltjEa6kcYdB-gSrWLwus_63inO78&s=10",
    author: users[4],
    editor: users[0],
    category: categories[3],
    tags: [tags[4], tags[5]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 7,
    viewCount: 6915,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-10T12:10:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Süni intellekt şirkətlərdə",
      description: "AI texnologiyalarının tətbiqi genişlənir.",
      keywords: ["AI", "texnologiya"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdbQdeejJ4tRDGrTNR1uZQbzm4AaltjEa6kcYdB-gSrWLwus_63inO78&s=10",
    },
    createdAt,
    updatedAt,
  },
];
