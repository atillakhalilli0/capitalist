import { Article, ArticleStatus } from "@/types/article";
import { categories } from "../categories";
import { createTipTapContent, createdAt, updatedAt } from "../helpers";
import { tags } from "../tags";
import { users } from "../users";

export const popularArticles: Article[] = [
  {
    id: "article-5",
    title: "Azərbaycanın ixrac göstəriciləri rekord həddə çatıb",
    slug: "azerbaycanin-ixrac-gostericileri-rekord-hedd",
    subtitle: "Qeyri-neft sektoru əsas artım mənbəyi olub.",
    excerpt:
      "Son statistik göstəricilərə əsasən ixrac həcmi ötən illə müqayisədə əhəmiyyətli dərəcədə artıb.",
    content: createTipTapContent(
      "İxrac göstəricilərinə dair mock məqalə."
    ),
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4SQX3zQBIcCC9H0SD1EbAyUH2O5jWEAfbI2IJyLmWlDnOqksVR7NSMUpB&s=10",
    author: users[0],
    editor: users[1],
    category: categories[7],
    tags: [tags[0], tags[14], tags[11]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 6,
    viewCount: 28431,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-08T09:00:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Azərbaycanın ixrac göstəriciləri rekord həddə çatıb",
      description: "İxrac göstəricilərinin artımı haqqında ətraflı.",
      keywords: ["ixrac", "iqtisadiyyat", "biznes"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4SQX3zQBIcCC9H0SD1EbAyUH2O5jWEAfbI2IJyLmWlDnOqksVR7NSMUpB&s=10",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-6",
    title: "Bank sektorunda rəqəmsal xidmətlər genişlənir",
    slug: "bank-sektorunda-reqemsal-xidmetler",
    subtitle: "Mobil bankçılıq istifadəçilərinin sayı artır.",
    excerpt:
      "Banklar yeni rəqəmsal məhsullar təqdim etməyə davam edir.",
    content: createTipTapContent(
      "Bank sektoru haqqında mock məqalə."
    ),
    coverImage: "https://www.mindinventory.com/blog/wp-content/uploads/2024/04/digital-transformation-banking.webp",
    author: users[1],
    editor: users[0],
    category: categories[1],
    tags: [tags[1], tags[5]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 5,
    viewCount: 22147,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-07T14:15:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Bank sektorunda rəqəmsal xidmətlər",
      description: "Rəqəmsal bankçılıq sahəsində yeniliklər.",
      keywords: ["bank", "fintech", "rəqəmsal"],
      image: "https://www.mindinventory.com/blog/wp-content/uploads/2024/04/digital-transformation-banking.webp",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-7",
    title: "Yaşıl enerji layihələrinə investisiya artır",
    slug: "yasil-enerji-layihelerine-investisiya",
    subtitle: "Bərpa olunan enerji sektorunda yeni mərhələ.",
    excerpt:
      "Ölkədə günəş və külək enerjisi layihələri genişlənməkdə davam edir.",
    content: createTipTapContent(
      "Yaşıl enerji haqqında mock məqalə."
    ),
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IaSZjokZ2Oqi940MbrJlCGxmRCpvW5cB3fIJvidAgg&s=10",
    author: users[3],
    editor: users[1],
    category: categories[4],
    tags: [tags[6], tags[8]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 7,
    viewCount: 19763,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-06T11:45:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Yaşıl enerji layihələrinə investisiya artır",
      description: "Enerji sektorundakı yeni investisiyalar.",
      keywords: ["enerji", "yaşıl enerji"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IaSZjokZ2Oqi940MbrJlCGxmRCpvW5cB3fIJvidAgg&s=10",
    },
    createdAt,
    updatedAt,
  },
  {
    id: "article-8",
    title: "Daşınmaz əmlak bazarında qiymətlər sabit qalır",
    slug: "dasinmaz-emlak-bazarinda-qiymetler",
    subtitle: "Ekspertlər bazardakı son vəziyyəti qiymətləndirir.",
    excerpt:
      "Əmlak bazarında tələb artsa da, qiymətlərdə kəskin dəyişiklik müşahidə olunmur.",
    content: createTipTapContent(
      "Əmlak bazarı haqqında mock məqalə."
    ),
    coverImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    author: users[2],
    editor: users[0],
    category: categories[5],
    tags: [tags[9], tags[12]],
    status: ArticleStatus.PUBLISHED,
    readingTime: 5,
    viewCount: 17684,
    isFeatured: false,
    isBreaking: false,
    publishedAt: "2026-07-05T16:30:00.000Z",
    scheduledAt: undefined,
    seo: {
      title: "Daşınmaz əmlak bazarında qiymətlər",
      description: "Əmlak bazarının son vəziyyəti.",
      keywords: ["əmlak", "daşınmaz əmlak"],
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    createdAt,
    updatedAt,
  },
];