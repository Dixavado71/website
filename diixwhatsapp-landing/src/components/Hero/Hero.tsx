import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyberpunk-grid pt-20">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 border border-white/10 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">DIixWhatsApp — Your Business. Automated.</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Transforme seu WhatsApp em uma{' '}
            <span className="gradient-text">máquina de vendas</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            Uma plataforma SaaS completa para automatizar atendimento, vendas, loja virtual e gestão do seu negócio em um único lugar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group px-8 py-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all duration-200 glow-green flex items-center gap-2">
              Começar agora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-surface/50 hover:bg-surface border border-white/10 text-white font-semibold rounded-lg transition-all duration-200">
              Conhecer a plataforma
            </button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Glow effect behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-accentAlt rounded-2xl blur opacity-20" />
              
              {/* Main preview container */}
              <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Browser-like header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surfaceAlt/50 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-background/50 rounded-md text-xs text-gray-500">
                      <MessageSquare size={12} />
                      DIixWhatsApp Dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard content mockup */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stats cards */}
                  <div className="bg-background/50 rounded-xl p-4 border border-white/5">
                    <div className="text-2xl font-bold text-white">R$ 24.590</div>
                    <div className="text-sm text-gray-400">Faturamento</div>
                    <div className="text-xs text-primary mt-1">+12.5%</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-white/5">
                    <div className="text-2xl font-bold text-white">1.234</div>
                    <div className="text-sm text-gray-400">Pedidos</div>
                    <div className="text-xs text-primary mt-1">+8.3%</div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-white/5">
                    <div className="text-2xl font-bold text-white">3.456</div>
                    <div className="text-sm text-gray-400">Clientes</div>
                    <div className="text-xs text-primary mt-1">+15.2%</div>
                  </div>
                </div>

                {/* Chart placeholder */}
                <div className="px-6 pb-6">
                  <div className="h-48 bg-gradient-to-t from-primary/10 to-transparent rounded-xl border border-white/5 flex items-end justify-around p-4">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                      <div
                        key={i}
                        className="w-8 bg-primary/60 rounded-t transition-all hover:bg-primary"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
