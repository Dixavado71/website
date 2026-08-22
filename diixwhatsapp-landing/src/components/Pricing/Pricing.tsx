import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionTitle } from '../UI/SectionTitle';
import { GlassCard } from '../UI/GlassCard';
import { plans } from '../../data/plans';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-magenta/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Planos e Preços"
          title="Escolha o Plano Ideal para o Seu Negócio"
          subtitle="Soluções flexíveis que crescem com sua empresa."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-magenta to-purple rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                    Mais Escolhido
                  </div>
                </div>
              )}

              <GlassCard
                glow={plan.highlighted ? 'magenta' : 'none'}
                className={`h-full ${
                  plan.highlighted 
                    ? 'border-magenta/50 bg-surfaceAlt/70 scale-105' 
                    : 'border-white/10'
                }`}
              >
                {/* Plan Header */}
                <div className="text-center mb-6 pb-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold gradient-text">{plan.price}</div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Icons.CheckCircle 
                        size={18} 
                        className={plan.highlighted ? 'text-magenta shrink-0' : 'text-primary shrink-0'} 
                      />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-magenta to-purple hover:from-magenta/90 hover:to-purple/90 text-white shadow-[0_0_20px_rgba(255,46,209,0.4)]'
                      : 'bg-primary hover:bg-primary/90 text-black shadow-neon-green'
                  }`}
                >
                  Escolher plano
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Tem dúvidas?{' '}
            <a href="#faq" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Veja nosso FAQ
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
