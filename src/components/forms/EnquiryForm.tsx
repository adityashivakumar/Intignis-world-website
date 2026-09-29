import { useMemo, useState } from "react";

interface ProductOption {
  slug: string;
  name: string;
  division: string;
}

interface Props {
  products: ProductOption[];
  defaultDivision?: string;
}

const DIVISIONS = [
  { value: "human-consumables", label: "Human Consumables" },
  { value: "industrial-solutions", label: "Industrial Solutions" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryForm({ products, defaultDivision }: Props) {
  const [division, setDivision] = useState(defaultDivision || DIVISIONS[0].value);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const productOptions = useMemo(
    () => products.filter((p) => p.division === division),
    [products, division]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-sm border border-hc-green/30 bg-hc-green/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-brand-ink">Thank you.</h3>
        <p className="mt-2 text-sm text-brand-ink/70">
          Your enquiry has been sent. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      {/* Honeypot — hidden from real visitors via CSS, bots tend to fill every field. */}
      <label className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <Field label="Name" name="name" required />
      <Field label="Company" name="company" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Country" name="country" />

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Division
        <select
          name="division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="rounded-sm border border-black/15 bg-white px-3 py-2.5 text-sm"
        >
          {DIVISIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Product
        <select name="product" className="rounded-sm border border-black/15 bg-white px-3 py-2.5 text-sm">
          <option value="">General enquiry</option>
          {productOptions.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <Field label="Quantity" name="quantity" placeholder="e.g. 500 kg / month" />

      <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
        Message
        <textarea
          name="message"
          rows={5}
          required
          className="rounded-sm border border-black/15 bg-white px-3 py-2.5 text-sm"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-sm bg-brand-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-ink">
      {label}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-sm border border-black/15 bg-white px-3 py-2.5 text-sm"
      />
    </label>
  );
}
