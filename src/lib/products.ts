import type { Product } from "../types/product";
import { humanConsumablesProducts } from "../data/humanConsumables";
import { industrialProducts } from "../data/industrialSolutions";

export const allProducts: Product[] = [...humanConsumablesProducts, ...industrialProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

/** Lightweight shape sent to the client-side search/filter islands. */
export interface SearchableProduct {
  slug: string;
  name: string;
  brand: string;
  division: string;
  category: string;
  shortDescription: string;
  image: string;
  applications: string[];
  boilerTypeCode?: string;
  fuelTypes?: string[];
}

export function toSearchable(p: Product): SearchableProduct {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    division: p.division,
    category: p.category,
    shortDescription: p.shortDescription,
    image: p.image,
    applications: p.applications,
    ...(p.division === "industrial-solutions"
      ? { boilerTypeCode: p.boilerTypeCode, fuelTypes: p.fuelTypes }
      : {}),
  };
}
