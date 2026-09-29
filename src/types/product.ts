import type { DivisionId } from "./division";

export interface Specification {
  label: string;
  value: string;
}

export type ProductStatus = "available" | "on-request" | "coming-soon";

interface ProductBase {
  id: string;
  slug: string;
  name: string;
  division: DivisionId;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  keyFeatures: string[];
  specifications: Specification[];
  applications: string[];
  packaging: string[];
  certifications: string[];
  relatedProducts: string[]; // slugs
  status: ProductStatus;
}

/** Human Consumables product — belongs to a brand (Earth Blend, LactoNest, Sucrowin, Bionoids) */
export interface ConsumableProduct extends ProductBase {
  division: "human-consumables";
  brand: string; // brand slug
}

/** Industrial Solutions product — Fire-Sol range, described by boiler + fuel compatibility */
export interface IndustrialProduct extends ProductBase {
  division: "industrial-solutions";
  brand: string; // brand slug, e.g. "fire-sol"
  boilerType: string;
  boilerTypeCode: string; // e.g. "AFBC"
  fuelTypes: string[];
  application: string;
  technicalBenefits: string[];
}

export type Product = ConsumableProduct | IndustrialProduct;
