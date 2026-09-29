import type { DivisionId } from "./division";

export interface Brand {
  id: string;
  slug: string;
  name: string;
  division: DivisionId;
  tagline: string;
  description: string;
  sourcing: string; // quality/sourcing paragraph shown on brand pages
  logo: string;
  heroImage: string;
  cardImage: string;
}
