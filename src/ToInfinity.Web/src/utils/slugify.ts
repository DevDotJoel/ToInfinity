/**
 * Convert a string into a URL-friendly slug.
 * Handles accented characters (common in Portuguese names).
 *
 * @example slugify("Quinta da Serra & Vinha") → "quinta-da-serra-vinha"
 */
export const slugify = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → dash
    .replace(/^-+|-+$/g, "") // trim leading/trailing dashes
    .replace(/-{2,}/g, "-"); // collapse multiple dashes
