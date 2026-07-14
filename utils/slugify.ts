const AZ_MAP: Record<string, string> = {
  ə: "e",
  Ə: "e",
  ö: "o",
  Ö: "o",
  ü: "u",
  Ü: "u",
  ğ: "g",
  Ğ: "g",
  ş: "s",
  Ş: "s",
  ç: "c",
  Ç: "c",
  ı: "i",
  I: "i",
  İ: "i",
};

export function slugify(text: string) {
  return text
    .split("")
    .map((char) => AZ_MAP[char] ?? char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}