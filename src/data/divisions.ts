import type { Division } from "../types/division";

export const divisions: Division[] = [
  {
    id: "industrial-solutions",
    slug: "industrial-solutions",
    name: "Industrial Solutions",
    tagline: "Optimized Combustion. Higher Efficiency.",
    shortDescription: "Boiler chemistry and combustion optimization solutions for industrial fuel and steam efficiency.",
    description:
      "Our Industrial Solutions division is built around Fire-Sol®, a range of combustion and boiler chemistry products tailored to boiler type, fuel type and customer requirements.",
    themeColor: "ind-navy",
    heroImage: "/images/hero/hero-industrial.jpg",
    keywords: ["boiler", "combustion", "fuel", "coal", "biomass", "steam", "industrial", "fire-sol"],
  },
  {
    id: "human-consumables",
    slug: "human-consumables",
    name: "Human Consumables",
    tagline: "Pure Ingredients. Better Nutrition.",
    shortDescription: "Natural ingredients, nutrition and wellness products for global food, beverage and nutraceutical markets.",
    description:
      "From export-grade spices and botanical extracts to infant nutrition and premium sweeteners, our Human Consumables division sources and delivers natural, quality-tested ingredients to customers around the world.",
    themeColor: "hc-green",
    heroImage: "/images/hero/hero-consumables.jpg",
    keywords: ["natural", "ingredients", "nutrition", "wellness", "food", "spices", "milk powder", "sweetener", "turmeric"],
  },
];

export function getDivision(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}
