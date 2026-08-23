import { motion } from 'framer-motion';
import { ChevronDown, MessageSquare, Building2, ShoppingCart, Users, Package, ClipboardList, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { SectionTitle } from '../UI/SectionTitle';
import { GlassCard } from '../UI/GlassCard';

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

const faqData: FAQItem[] = [
  {
    question: 'O que é o DIixWhatsApp?',
    answer: 'O DIixWhatsApp é uma plataforma SaaS completa para gestão empresarial, vendas, atendimento e automação através do WhatsApp. Conectamos loja virtual, WhatsApp, vendas, atendimento, automação, clientes, produtos, pedidos e gestão em um único lugar.',
    icon: 'MessageSquare',
  },
  {
    question: 'O que é Multi-Tenant?',
    answer: 'Multi-Tenant é uma arquitetura onde múltiplas empresas (tenants) operam de forma independente na mesma plataforma. Cada empresa tem seus dados completamente isolados, sua própria configuração e seus próprios recursos, mas todas compartilham a mesma infraestrutura.',
    icon: 'Building2',
  },
  {
    question: 'Posso ter minha própria loja virtual?',
    answer: 'Sim! O DIixWhatsApp permite que você crie e gerencie sua própria loja online completa. Você pode cadastrar produtos, controlar preços e disponibilidade, e vender diretamente pelo WhatsApp.',
    icon: 'ShoppingCart',
  },
  {
    question: 'Posso vender pelo WhatsApp?',
    answer: 'Com certeza! Transforme conversas do WhatsApp em pedidos e vendas reais. Nossa plataforma automatiza todo o processo, desde o primeiro contato até o fechamento da venda.',
    icon: 'MessageSquare',
  },
  {
    question: 'O atendimento é automatizado?',
    answer: 'Sim! Oferecemos fluxos inteligentes de automação que conversam, entendem e vendem por você. Mensagens automáticas, respostas a perguntas frequentes, criação de pedidos e transferência para atendente humano quando necessário.',
    icon: 'Users',
  },
  {
    question: 'Quais planos existem?',
    answer: 'Temos três planos: Starter (R$ 49,90/mês) ideal para pequenos negócios, Business (R$ 99,90/mês) nosso plano mais escolhido com recursos avançados, e Enterprise (R$ 199,90/mês) com automação avançada e suporte dedicado.',
    icon: 'Package',
  },
  {
    question: 'Posso mudar de plano?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A cobrança é ajustada proporcionalmente e as mudanças são aplicadas imediatamente.',
    icon: 'TrendingUp',
  },
];

const iconMap: Record<string, React.ElementType> = {
  MessageSquare,
  Building2,
  ShoppingCart,
  Users,
  Package,
  ClipboardList,
  TrendingUp,
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan/5 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="FAQ"
          title="Perguntas Frequentes"
          subtitle="Tire suas dúvidas sobre o DIixWhatsApp."
        />

        <div className="space-y-4 mt-12">
          {faqData.map((faq, idx) => {
            const IconComponent = iconMap[faq.icon || 'MessageSquare'];
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard glow="none" className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-surfaceAlt/30 transition-colors duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <IconComponent size={20} className="text-primary" />
                      </div>
                      <span className="font-semibold text-white">{faq.question}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    id={`faq-answer-${idx}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Ainda tem dúvidas?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <MessageSquare size={18} />
            Fale conosco no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
