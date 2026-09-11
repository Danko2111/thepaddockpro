import { services } from "./services";

export const mainNav = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.navLabel,
      href: `/services/${s.slug}`,
      detail: s.tagline,
      index: s.index,
    })),
  },
  { label: "Work", href: "/gallery" },
  { label: "Process", href: "/process" },
  { label: "Cost guide", href: "/cost-guide" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  {
    heading: "Services",
    links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    heading: "Shop",
    links: [
      { label: "Completed work", href: "/gallery" },
      { label: "Our process", href: "/process" },
      { label: "Materials we use", href: "/process#materials" },
      { label: "What a wrap costs", href: "/cost-guide" },
      { label: "About the shop", href: "/about" },
    ],
  },
] as const;
