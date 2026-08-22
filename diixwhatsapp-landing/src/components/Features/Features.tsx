import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { features } from '../../data/features';

const Features = () => {
  return (
    <section id="features" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Uma Plataforma. <span className="gradient-text">Todo o Seu Negócio.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            O DIixWhatsApp conecta as principais operações do seu negócio em uma única plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-surfaceAlt/50 border border-white/5 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-neon-green"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {IconComponent && <IconComponent size={24} className="text-primary" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
