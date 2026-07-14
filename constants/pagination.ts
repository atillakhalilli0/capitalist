export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
] as const;

export const MAX_PAGE_SIZE = 100;

export const DEFAULT_SORT_DIRECTION =
  "desc";

export const PAGINATION_LABELS = {
  previous: "Əvvəlki",

  next: "Növbəti",

  first: "İlk",

  last: "Son",

  showing: "Göstərilir",

  of: "/",

  results: "nəticə",
} as const;