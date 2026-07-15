import { ArticleStatus } from "@/types/article";

export const ARTICLE_STATUS_OPTIONS = [
  {
    label: "Draft",
    value: ArticleStatus.DRAFT,
  },
  {
    label: "In Review",
    value: ArticleStatus.IN_REVIEW,
  },
  {
    label: "Published",
    value: ArticleStatus.PUBLISHED,
  },
  {
    label: "Archived",
    value: ArticleStatus.ARCHIVED,
  },
] as const;

export const ARTICLE_STATUS_COLORS = {
  [ArticleStatus.DRAFT]:
    "bg-gray-100 text-gray-700",

  [ArticleStatus.IN_REVIEW]:
    "bg-yellow-100 text-yellow-700",

  [ArticleStatus.PUBLISHED]:
    "bg-green-100 text-green-700",

  [ArticleStatus.ARCHIVED]:
    "bg-zinc-100 text-zinc-700",
} as const;