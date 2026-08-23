import { motion } from 'framer-motion';
import { Store, Package, Users, ClipboardList, Building2, Shield, TrendingUp, Settings, LayoutDashboard } from 'lucide-react';
import { SectionTitle } from '../UI/SectionTitle';
import { GlassCard } from '../UI/GlassCard';

interface TenantFeatures {
  name: string;
  features: string[];
}

const tenantData: TenantFeatures[] = [
  {
    name: 'EMPRESA A',
    features: ['Loja', 'Produtos', 'Clientes', 'Pedidos'],
  },
  {
    name: 'EMPRESA B',
    features: ['Loja', 'Produtos', 'Clientes', 'Pedidos'],
  },
  {
    name: 'EMPRESA C',
    features: ['Loja', 'Produtos', 'Clientes', 'Pedidos'],
  },
];

const featureIcons: Record<string, React.ElementType> = {
  Loja: Store,
  Produtos: Package,
  Clientes: Users,
  Pedidos: ClipboardList,
};

const MultiTenant = () => {
  return (
    <section id="multi-tenant" className="py-24 bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Multi-Tenant Architecture"
          title="Um Ecossistema. Múltiplas Empresas."
          subtitle="Cada empresa opera de forma independente na mesma plataforma."
        />

        {/* Architecture Diagram */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Admin Box */}
            <div className="relative mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan to-purple rounded-xl blur opacity-30" />
              <div className="relative px-8 py-4 bg-surfaceAlt border border-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <Building2 size={24} className="text-primary" />
                  <div>
                    <h3 className="font-bold text-white">DIixWhatsApp</h3>
                    <p className="text-xs text-gray-400">Administrador da Plataforma</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="relative w-full max-w-2xl h-16 mb-8">
              {/* Vertical line from admin */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-8 bg-gradient-to-b from-primary to-cyan opacity-60" />
              
              {/* Horizontal distribution line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
              
              {/* Vertical lines to tenants */}
              <div className="absolute left-1/4 top-8 w-0.5 h-8 bg-gradient-to-b from-cyan to-purple opacity-60" />
              <div className="absolute left-1/2 top-8 w-0.5 h-8 bg-gradient-to-b from-cyan to-purple opacity-60" />
              <div className="absolute right-1/4 top-8 w-0.5 h-8 bg-gradient-to-b from-cyan to-purple opacity-60" />
            </div>

            {/* Tenant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {tenantData.map((tenant, idx) => (
                <motion.div
                  key={tenant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <GlassCard glow={idx === 1 ? 'purple' : 'none'} className="hover:scale-105">
                    <div className="text-center mb-4">
                      <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                        idx === 0 ? 'bg-primary/10' :
                        idx === 1 ? 'bg-magenta/10' :
                        'bg-cyan/10'
                      }`}>
                        <Building2 
                          size={24} 
                          className={
                            idx === 0 ? 'text-primary' :
                            idx === 1 ? 'text-magenta' :
                            'text-cyan'
                          } 
                        />
                      </div>
                      <h4 className="font-bold text-white">{tenant.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Ambiente Isolado</p>
                    </div>

                    <div className="space-y-2">
                      {tenant.features.map((feature) => {
                        const IconComponent = featureIcons[feature] || Store;
                        return (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <IconComponent size={14} className="text-primary" />
                            <span>{feature}</span>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Isolamento Total',
              description: 'Cada empresa tem seus dados completamente isolados.',
              icon: 'Shield',
            },
            {
              title: 'Escalabilidade',
              description: 'Adicione novas empresas sem impactar as existentes.',
              icon: 'TrendingUp',
            },
            {
              title: 'Customização',
              description: 'Cada tenant pode ter configurações personalizadas.',
              icon: 'Settings',
            },
            {
              title: 'Gestão Centralizada',
              description: 'Administre tudo de um único painel.',
              icon: 'LayoutDashboard',
            },
          ].map((benefit, idx) => {
            const IconComponent = 
              benefit.icon === 'Shield' ? Shield :
              benefit.icon === 'TrendingUp' ? TrendingUp :
              benefit.icon === 'Settings' ? Settings :
              LayoutDashboard;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-surfaceAlt/30 border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300"
              >
                <IconComponent size={28} className="text-primary mb-4" />
                <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MultiTenant;
