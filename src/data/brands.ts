import type { Brand } from "../types/brand";

export const brands: Brand[] = [
  {
    id: "earth-blend",
    slug: "earth-blend",
    name: "Earth Blend",
    division: "human-consumables",
    tagline: "Natural ingredients, export-ready quality.",
    description:
      "Earth Blend is a natural food and wellness ingredient brand by INTIGNIS INDUSTRIES PRIVATE LIMITED, delivering premium-quality ingredients with a strong focus on purity, freshness, consistency, and reliable sourcing.",
    sourcing:
      "Our products undergo careful quality checks to ensure natural goodness and export-ready standards for global markets.",
    logo: "/images/brands/earth-blend-logo.svg",
    heroImage: "/images/hero/earth-blend-hero.jpg",
    cardImage: "/images/brands/earth-blend-card.jpg",
  },
  {
    id: "lactonest",
    slug: "lactonest",
    name: "LactoNest",
    division: "human-consumables",
    tagline: "Trusted milk powder and infant nutrition.",
    description:
      "LactoNest is a premium milk powder and infant nutrition brand by INTIGNIS INDUSTRIES PRIVATE LIMITED, offering high-quality dairy nutrition solutions for global markets.",
    sourcing:
      "With a strong focus on purity, safety, nutritional quality, consistency, and stringent quality standards, LactoNest delivers reliable, export-ready products for families and international customers.",
    logo: "/images/brands/lactonest-logo.svg",
    heroImage: "/images/hero/lactonest-hero.jpg",
    cardImage: "/images/brands/lactonest-card.jpg",
  },
  {
    id: "sucrowin",
    slug: "sucrowin",
    name: "Sucrowin",
    division: "human-consumables",
    tagline: "Premium high-purity sweetener.",
    description:
      "Sucrowin is a premium sweetener brand by INTIGNIS INDUSTRIES PRIVATE LIMITED, offering high-quality Sucralose for food, beverage, nutraceutical, and other applications.",
    sourcing:
      "The brand focuses on consistent quality, reliable sourcing, export-ready packaging, and solutions tailored to international market requirements.",
    logo: "/images/brands/sucrowin-logo.svg",
    heroImage: "/images/hero/sucrowin-hero.jpg",
    cardImage: "/images/brands/sucrowin-card.jpg",
  },
  {
    id: "bionoids",
    slug: "bionoids",
    name: "Bionoids",
    division: "human-consumables",
    tagline: "Everyday wellness, backed by science.",
    description:
      "Bionoids is a wellness and nutraceutical brand by INTIGNIS INDUSTRIES PRIVATE LIMITED, offering high-quality nutritional solutions for everyday wellness.",
    sourcing:
      "With a strong focus on quality, innovation, purity, and science-backed nutrition, Bionoids delivers effective and convenient wellness solutions designed for modern lifestyles.",
    logo: "/images/brands/bionoids-logo.svg",
    heroImage: "/images/hero/bionoids-hero.jpg",
    cardImage: "/images/brands/bionoids-card.jpg",
  },
  {
    id: "fire-sol",
    slug: "fire-sol",
    name: "Fire-Sol®",
    division: "industrial-solutions",
    tagline: "Solution to sustainability.",
    description:
      "Fire-Sol® is Intignis Industries' range of composition metallic salt technologies that improve the efficiency of combustion at large boilers, tailored and modified according to boiler type, fuel type and customer requirements.",
    sourcing:
      "Each grade of Fire-Sol® is engineered around the boiler and fuel it will run on. Where a customer has a special requirement, a custom formulation can also be produced.",
    logo: "/images/brands/fire-sol-logo.svg",
    heroImage: "/images/hero/fire-sol-hero.jpg",
    cardImage: "/images/brands/fire-sol-card.jpg",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandsByDivision(division: string): Brand[] {
  return brands.filter((b) => b.division === division);
}
