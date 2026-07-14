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
    label: "Revision Requested",
    value: ArticleStatus.REVISION_REQUESTED,
  },
  {
    label: "Approved",
    value: ArticleStatus.APPROVED,
  },
  {
    label: "Scheduled",
    value: ArticleStatus.SCHEDULED,
  },
  {
    label: "Published",
    value: ArticleStatus.PUBLISHED,
  },
  {
    label: "Archived",
    value: ArticleStatus.ARCHIVED,
  },
  {
    label: "Rejected",
    value: ArticleStatus.REJECTED,
  },
] as const;

export const ARTICLE_STATUS_COLORS = {
  [ArticleStatus.DRAFT]:
    "bg-gray-100 text-gray-700",

  [ArticleStatus.IN_REVIEW]:
    "bg-yellow-100 text-yellow-700",

  [ArticleStatus.REVISION_REQUESTED]:
    "bg-orange-100 text-orange-700",

  [ArticleStatus.APPROVED]:
    "bg-sky-100 text-sky-700",

  [ArticleStatus.SCHEDULED]:
    "bg-indigo-100 text-indigo-700",

  [ArticleStatus.PUBLISHED]:
    "bg-green-100 text-green-700",

  [ArticleStatus.ARCHIVED]:
    "bg-zinc-100 text-zinc-700",

  [ArticleStatus.REJECTED]:
    "bg-red-100 text-red-700",
} as const;