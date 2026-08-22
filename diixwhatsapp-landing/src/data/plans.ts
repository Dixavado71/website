export interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    name: "STARTER",
    description: "Para pequenos negócios.",
    price: "R$ 97/mês",
    features: [
      "Até 1.000 contatos",
      "Loja virtual básica",
      "Automação simples",
      "Suporte por email",
      "1 número WhatsApp",
    ],
    highlighted: false,
  },
  {
    name: "BUSINESS",
    description: "Para empresas em crescimento.",
    price: "R$ 197/mês",
    features: [
      "Até 10.000 contatos",
      "Loja virtual completa",
      "Automação avançada",
      "Suporte prioritário",
      "3 números WhatsApp",
      "Relatórios avançados",
      "Multi-usuários",
    ],
    highlighted: true,
  },
  {
    name: "ENTERPRISE",
    description: "Para operações maiores.",
    price: "R$ 397/mês",
    features: [
      "Contatos ilimitados",
      "Loja virtual premium",
      "Automação ilimitada",
      "Suporte 24/7",
      "Números WhatsApp ilimitados",
      "Relatórios customizados",
      "API dedicada",
      "Gerente de conta",
    ],
    highlighted: false,
  },
];
