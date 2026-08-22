export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Início", href: "#home" },
  { label: "Recursos", href: "#features" },
  { label: "Automação", href: "#automation" },
  { label: "Multi-Tenant", href: "#multi-tenant" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Planos", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
