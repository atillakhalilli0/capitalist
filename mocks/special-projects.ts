import { ArticleStatus, type Article } from "@/types/article";
import { UserRole } from "@/types/user";

export const specialProjects: Article[] = [
  {
    id: "sp-1",
    createdAt: "2026-07-08T10:00:00Z",
    updatedAt: "2026-07-08T10:00:00Z",

    title: "Azərbaycanın Yaşıl Enerji Strategiyası",
    slug: "azerbaycanin-yasil-enerji-strategiyasi",

    excerpt:
      "Xəzərdən Avropaya uzanan yeni enerji xəritəsi və qarşıdakı illərin investisiya imkanları.",

    content: {
      type: "doc",
      content: [],
    },

    coverImage: "https://picsum.photos/1600/900?random=601",

    author: {
      id: "user-1",
      createdAt: "",
      updatedAt: "",

      name: "Capitalist",
      surname: "Studio",
      email: "studio@capitalist.az",

      role: UserRole.EDITOR,

      avatar: "https://i.pravatar.cc/200?img=41",
      bio: "Editorial Team",
    },

    category: {
      id: "cat-special",
      createdAt: "",
      updatedAt: "",

      name: "Special Project",
      slug: "special-project",

      order: 1,
      isActive: true,
    },

    tags: [],

    status: ArticleStatus.PUBLISHED,

    readingTime: 12,

    viewCount: 8421,

    isFeatured: true,

    isBreaking: false,

    publishedAt: "2026-07-08T10:00:00Z",

    seo: {
      title: "Azərbaycanın Yaşıl Enerji Strategiyası",
      description:
        "Azərbaycanın yaşıl enerji strategiyası və investisiya imkanları.",
      keywords: [
        "enerji",
        "green energy",
        "azerbaijan",
      ],
    },
  },
];