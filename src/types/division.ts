export type DivisionId = "human-consumables" | "industrial-solutions";

export interface Division {
  id: DivisionId;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  themeColor: string; // CSS variable name for this division's accent
  heroImage: string;
  keywords: string[]; // used by search
}
