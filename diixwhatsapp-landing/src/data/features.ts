export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: "Store",
    title: "Loja Virtual",
    description: "Crie e gerencie sua própria loja online.",
  },
  {
    icon: "MessageSquare",
    title: "Vendas pelo WhatsApp",
    description: "Transforme conversas em pedidos e vendas.",
  },
  {
    icon: "Bot",
    title: "Atendimento Automatizado",
    description: "Automatize perguntas, respostas e processos.",
  },
  {
    icon: "Users",
    title: "Gestão de Clientes",
    description: "Centralize informações e histórico dos seus clientes.",
  },
  {
    icon: "Package",
    title: "Gestão de Produtos",
    description: "Controle produtos, preços e disponibilidade.",
  },
  {
    icon: "ClipboardList",
    title: "Pedidos",
    description: "Gerencie pedidos em um fluxo centralizado.",
  },
];
