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
    description: "Ideal para pequenos negócios.",
    price: "R$ 49,90/mês",
    features: [
      "Loja Virtual",
      "Vendas via WhatsApp",
      "Atendimento automatizado",
      "Até 1 usuário",
      "Suporte por e-mail",
    ],
    highlighted: false,
  },
  {
    name: "BUSINESS",
    description: "Para empresas em crescimento.",
    price: "R$ 99,90/mês",
    features: [
      "Tudo do Starter",
      "Mais automações",
      "Relatórios avançados",
      "Multi-usuário",
      "Suporte prioritário",
    ],
    highlighted: true,
  },
  {
    name: "ENTERPRISE",
    description: "Para operações maiores.",
    price: "R$ 199,90/mês",
    features: [
      "Tudo do Business",
      "Automação avançada",
      "Integrações",
      "Recursos prioritários",
      "Suporte dedicado",
    ],
    highlighted: false,
  },
];
