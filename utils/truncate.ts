export function truncate(
  text: string,
  length = 120,
  suffix = "..."
) {
  if (!text) return "";

  if (text.length <= length) {
    return text;
  }

  return (
    text.slice(0, length).trimEnd() +
    suffix
  );
}

export function truncateWords(
  text: string,
  words = 20,
  suffix = "..."
) {
  if (!text) return "";

  const list = text
    .trim()
    .split(/\s+/);

  if (list.length <= words) {
    return text;
  }

  return (
    list.slice(0, words).join(" ") +
    suffix
  );
}