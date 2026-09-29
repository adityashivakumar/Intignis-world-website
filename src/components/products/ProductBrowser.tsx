import { useMemo, useState } from "react";
import type { SearchableProduct } from "../../lib/products";

interface FilterGroup {
  label: string;
  key: "brand" | "boilerTypeCode" | "category";
  options: { value: string; label: string }[];
}

interface Props {
  products: SearchableProduct[];
  filterGroups: FilterGroup[];
  basePath: string; // e.g. "/human-consumables/products" or "/industrial-solutions/products"
  accent?: "green" | "steel";
}

export default function ProductBrowser({ products, filterGroups, basePath, accent = "green" }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.applications.some((a) => a.toLowerCase().includes(q)) ||
        (p.fuelTypes ?? []).some((f) => f.toLowerCase().includes(q));

      const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;
        if (key === "boilerTypeCode") return p.boilerTypeCode === value;
        // @ts-expect-error dynamic key access on a narrow union of known keys
        return p[key] === value;
      });

      return matchesQuery && matchesFilters;
    });
  }, [products, query, activeFilters]);

  const accentClass = accent === "green" ? "focus:border-hc-green" : "focus:border-ind-steel";
  const chipActive = accent === "green" ? "bg-hc-green text-white border-hc-green" : "bg-ind-steel text-white border-ind-steel";

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, brands, applications…"
          aria-label="Search products"
          className={`w-full sm:max-w-sm rounded-sm border border-black/15 px-4 py-2.5 text-sm outline-none ${accentClass}`}
        />
        <p className="text-sm text-brand-ink/50 whitespace-nowrap">{filtered.length} products</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        {filterGroups.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-ink/40">{group.label}</span>
            <button
              type="button"
              onClick={() => setActiveFilters((f) => ({ ...f, [group.key]: "" }))}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                !activeFilters[group.key] ? chipActive : "border-black/15 text-brand-ink/70"
              }`}
            >
              All
            </button>
            {group.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActiveFilters((f) => ({ ...f, [group.key]: opt.value }))}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  activeFilters[group.key] === opt.value ? chipActive : "border-black/15 text-brand-ink/70"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <a
            key={p.slug}
            href={`${basePath}/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-black/10 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className={`text-xs font-semibold uppercase tracking-wide ${accent === "green" ? "text-hc-green" : "text-ind-steel"}`}>
                {p.boilerTypeCode ?? p.category}
              </p>
              <h3 className="mt-1.5 font-display text-base font-bold text-brand-ink">{p.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-brand-ink/65">{p.shortDescription}</p>
              <span className={`mt-4 text-sm font-semibold group-hover:text-brand-orange ${accent === "green" ? "text-hc-green" : "text-ind-steel"}`}>
                View Details ›
              </span>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-brand-ink/50">
            No products match your search. Try a different term or clear the filters.
          </p>
        )}
      </div>
    </div>
  );
}
