import { Article, ArticleStatus } from "@/types/article";
import { categories } from "../categories";
import { createTipTapContent, createdAt, updatedAt } from "../helpers";
import { tags } from "../tags";
import { users } from "../users";

export const editorPickArticles: Article[] = [
  {
    id: "article-9",
    title: "Azərbaycanın fintech ekosistemi yeni inkişaf mərhələsinə daxil olur",
    slug: "azerbaycan-fintech-ekosistemi",
    subtitle: "Yeni ödəniş həlləri bazarda rəqabəti artırır.",
    excerpt:
      "Fintech şirkətlərinin sayı artdıqca banklarla əməkdaşlıq imkanları da genişlənir.",
    content: createTipTapContent(
      "Fintech sektoru haqqında mock məqalə."
    ),
    coverImage: "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmludGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    author: users[4],
    editor: users[1],
    category: categories[1],
    tags: [tags[1], tags[3], tags[5]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 8,
    viewCount: 13840,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-04T10:00:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Azərbaycanın fintech ekosistemi",
      description: "Fintech bazarındakı son yeniliklər.",
      keywords: ["fintech", "bank", "ödəniş"],
      image: "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmludGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-10",
    title: "Kiçik və orta biznes üçün yeni dövlət dəstəyi proqramı elan edildi",
    slug: "kob-dovlet-desteyi-proqrami",
    subtitle: "Proqram minlərlə sahibkarı əhatə edəcək.",
    excerpt:
      "Yeni maliyyə mexanizmləri KOB subyektlərinin inkişafına əlavə imkanlar yaradacaq.",
    content: createTipTapContent(
      "KOB dəstəyi haqqında mock məqalə."
    ),
    coverImage: "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW5jaWFsJTIwc3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D",
    author: users[0],
    editor: users[2],
    category: categories[7],
    tags: [tags[0], tags[10], tags[11]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 6,
    viewCount: 11870,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-03T13:15:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "KOB üçün yeni dövlət dəstəyi proqramı",
      description: "Sahibkarlar üçün yeni imkanlar.",
      keywords: ["KOB", "biznes", "sahibkarlıq"],
      image: "https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW5jaWFsJTIwc3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-11",
    title: "Süni intellekt media sektorunda iş proseslərini dəyişdirir",
    slug: "ai-media-sektoru",
    subtitle: "Redaksiyalar AI alətlərindən daha aktiv istifadə edir.",
    excerpt:
      "Media qurumları məzmun istehsalında yeni texnologiyalara üstünlük verir.",
    content: createTipTapContent(
      "Media və AI haqqında mock məqalə."
    ),
    coverImage: "https://www.csohate.org/wp-content/uploads/2024/10/AI.png",
    author: users[5],
    editor: users[0],
    category: categories[3],
    tags: [tags[4], tags[5], tags[13]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 9,
    viewCount: 10425,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-02T09:45:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "AI media sektorunda",
      description: "Süni intellektin media sənayesinə təsiri.",
      keywords: ["AI", "media", "texnologiya"],
      image: "https://www.csohate.org/wp-content/uploads/2024/10/AI.png",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-12",
    title: "Qlobal bazarlarda neft qiymətlərində dəyişiklik davam edir",
    slug: "qlobal-neft-qiymetleri",
    subtitle: "Enerji bazarında qeyri-müəyyənlik qalmaqdadır.",
    excerpt:
      "Analitiklər neft qiymətlərinin yaxın aylarda da dəyişkən olacağını bildirirlər.",
    content: createTipTapContent(
      "Neft bazarı haqqında mock məqalə."
    ),
    coverImage: "https://economymiddleeast.com/wp-content/uploads/2026/06/IMF-global-growth-forecast-oil-prices-2026-1-1.jpg",
    author: users[3],
    editor: users[2],
    category: categories[4],
    tags: [tags[6], tags[7], tags[8]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 7,
    viewCount: 9620,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-01T11:30:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Qlobal neft qiymətləri",
      description: "Enerji bazarında son vəziyyət.",
      keywords: ["neft", "enerji", "iqtisadiyyat"],
      image: "https://economymiddleeast.com/wp-content/uploads/2026/06/IMF-global-growth-forecast-oil-prices-2026-1-1.jpg",
    },
    createdAt,
    updatedAt,
  },
];