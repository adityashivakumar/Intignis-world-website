/**
 * CENTRAL COMPANY CONFIGURATION
 * ------------------------------------------------------------
 * Every contact detail, nav label and footer string on the site
 * is pulled from this one file. Edit here, it updates everywhere.
 * ------------------------------------------------------------
 */

export const company = {
  brandName: "INTIGNIS WORLD",
  parentCompany: "INTIGNIS INDUSTRIES PRIVATE LIMITED",
  domain: "intignisworld.com",
  tagline: "One Company. Two Worlds of Solutions.",
  foundedYear: 2017,
  madeInIndia: "100% Made in India",

  // Sourced from intignisindustries.com — confirm these are still current before launch.
  contact: {
    corporateOffice: {
      label: "Corporate Office",
      lines: [
        "B – 302, Venus Pahel,",
        "Old United Ways Garba Ground,",
        "O. P. Road, Nr. Reliance Mega Mall,",
        "Vadodara, Gujarat 390015, India",
      ],
    },
    regionalOffice: {
      label: "Regional Office",
      lines: [
        "C – 7/8, M-Cube Business Hub,",
        "N.H. 48, Nr. Bombay Restaurant,",
        "Balitha, Vapi, Gujarat – 396195, India",
      ],
    },
    phones: ["+91 78179 26565", "+91 81408 81324"],
    emails: ["info@intignisindustries.com", "office@intignisindustries.com"],
  },

  social: {
    // TODO: add real social links
    linkedin: "",
    instagram: "",
  },

  copyright: `© ${new Date().getFullYear()} INTIGNIS WORLD, a division of INTIGNIS INDUSTRIES PRIVATE LIMITED. All rights reserved.`,
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Human Consumables", href: "/human-consumables" },
  { label: "Industrial Solutions", href: "/industrial-solutions" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
] as const;

export const headerCta = { label: "Contact", href: "/contact" } as const;

export const footerLinkGroups = [
  {
    title: "Divisions",
    links: [
      { label: "Human Consumables", href: "/human-consumables" },
      { label: "Industrial Solutions", href: "/industrial-solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Quality", href: "/quality" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const aboutContent = {
  intro: `${company.parentCompany} was founded in Vadodara in 2017 by a small team spanning product development, marketing and process chemistry, with a founding focus on chemical manufacturing.`,
  focus: `That original focus grew in two directions. On one side, we built an export business sourcing premium natural and organic ingredients from across India — spices, botanical extracts, dairy powders and more. On the other, we developed Fire-Sol®, our own line of boiler chemistry products aimed at making industrial combustion more fuel-efficient and less polluting.`,
  quality: `Every product that leaves Intignis — whether a food ingredient or a boiler treatment — goes through standard quality testing, screening and verification before it ships. On the industrial side, Fire-Sol®'s combustion improvements have been checked against calorific value, ignition temperature and differential scanning calorimetry, alongside real-world measures like steam output, ash quality and coal consumption.`,
  growth: `Today Intignis serves customers across both divisions with the same underlying commitment: consistent quality, honest information about what a product can and can't do, and long-term relationships over one-off orders.`,
  team: `Our team brings together people from commerce, boiler operations and the sciences. On the industrial side, engineers visit customer sites directly to run trials, demonstrate Fire-Sol® in the customer's own boiler, and hand over the finished system.`,
  vision:
    "To become a globally trusted partner in specialty chemicals, natural products, and industrial performance solutions, recognized for quality, innovation, reliability, and customer success across international markets.",
  mission:
    "To deliver high-quality, innovative, and sustainable chemical and specialty product solutions that create value for our customers while contributing towards a cleaner, safer, and more efficient world.",
  coreValues: [
    { title: "Quality", description: "Standard testing, screening and verification on every product before it ships." },
    { title: "Purity", description: "Natural sourcing with no unnecessary additives, wherever the source material confirms it." },
    { title: "Reliability", description: "Consistent supply and long-term business relationships over one-off transactions." },
    { title: "Customer Focus", description: "Engineers who visit site and run trials, not just a product on a page." },
  ],
  timeline: [
    {
      year: "2017",
      title: "Foundation in chemical manufacturing",
      description: "Intignis Industries Private Limited is established with a strong foundation in the chemical manufacturing industry.",
    },
    {
      year: "Since",
      title: "Diversification into natural products",
      description: "The company evolves into a diversified organization, expanding into the export of premium-quality natural and organic products sourced across India.",
    },
    {
      year: "Since",
      title: "Industrial performance solutions",
      description: "Development of Fire-Sol®, a range of boiler chemistry solutions aimed at improving combustion efficiency and reducing environmental impact.",
    },
    {
      year: "Ongoing",
      title: "International market expansion",
      description: "Continued growth of a global customer base with a focus on export-ready, quality-tested products across both business divisions.",
    },
  ],
} as const;

/** As displayed on intignisindustries.com's Certifications section. */
export const certifications = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015 Certification",
    category: "ISO",
    issuer: "International Quality Management Standard",
    description: "Certified for standardized quality management systems, manufacturing screening, and operational verification.",
    image: "/images/certifications/iso-9001.jpg",
  },
  {
    id: "startup-india",
    title: "DPIIT Certificate of Recognition",
    category: "Government",
    issuer: "Department for Promotion of Industry and Internal Trade (#startupindia)",
    description: "Official recognition by the Government of India for chemical and specialty materials development.",
    image: "/images/certifications/startup-india.jpg",
  },
  {
    id: "iso-management",
    title: "ISO Environmental & Standards Compliance",
    category: "ISO",
    issuer: "Accredited Quality & Safety Registration",
    description: "Demonstrating adherence to international processing, traceability, and export manufacturing criteria.",
    image: "/images/certifications/iso-management.jpg",
  },
] as const;
