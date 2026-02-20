import { slugify } from "../../../utils/slugify";

/**
 * Build the public venue detail URL.
 * Format: /venues/:id/:slug
 */
export const getVenueDetailUrl = (id: string, name: string): string =>
  `/venues/${id}/${slugify(name)}`;
