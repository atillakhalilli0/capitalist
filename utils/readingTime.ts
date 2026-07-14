const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(
  text: string
) {
  if (!text) return 1;

  const words = text
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(
    1,
    Math.ceil(words / WORDS_PER_MINUTE)
  );
}

export function readingTimeLabel(
  minutes: number
) {
  return `${minutes} dəq. oxu`;
}