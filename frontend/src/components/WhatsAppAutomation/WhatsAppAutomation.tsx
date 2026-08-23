import { motion } from 'framer-motion';
import { MessageSquare, Send, Bot, CheckCircle } from 'lucide-react';
import { SectionTitle } from '../UI/SectionTitle';
import { GlassCard } from '../UI/GlassCard';
import { chatMessages, automationSteps, automationFeatures } from '../../data/automation';

const WhatsAppAutomation = () => {
  return (
    <section id="automation" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="WhatsApp Automation"
          title="Atendimento Automatizado no WhatsApp"
          subtitle="Fluxos inteligentes que conversam, entendem e vendem por você."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="green" className="p-0 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-surfaceAlt/80 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                  <MessageSquare size={20} className="text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">DIixWhatsApp Store</h4>
                  <p className="text-xs text-primary">Online agora</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[300px] bg-gradient-to-b from-surfaceAlt/30 to-background">
                {chatMessages.map((message, idx) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.3 }}
                    className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.sender === 'client'
                          ? 'bg-purple/20 border border-purple/30 text-white rounded-br-sm'
                          : 'bg-primary/10 border border-primary/30 text-white rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, optIdx) => (
                            <button
                              key={optIdx}
                              className="w-full text-left px-3 py-2 bg-surfaceAlt hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {message.timestamp && (
                        <p className="text-xs text-gray-500 mt-2 text-right">{message.timestamp}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Automation Flow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-heading">
              Como Funciona a Automação
            </h3>

            <div className="relative">
              {automationSteps.map((step, idx) => {
                const IconComponent = 
                  step.icon === 'MessageSquare' ? MessageSquare :
                  step.icon === 'Bot' ? Bot :
                  step.icon === 'Send' ? Send :
                  CheckCircle;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative flex items-start gap-4 mb-6 last:mb-0"
                  >
                    {/* Connection Line */}
                    {idx < automationSteps.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-12 bg-gradient-to-b from-primary via-cyan to-transparent opacity-50" />
                    )}
                    
                    {/* Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <IconComponent size={20} className="text-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {automationFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="p-4 bg-surfaceAlt/30 border border-white/5 rounded-lg"
                >
                  <h5 className="text-sm font-semibold text-white mb-1">{feature.title}</h5>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-surfaceAlt/30 border border-white/10 rounded-2xl"
        >
          {[
            { value: '24/7', label: 'Atendimento' },
            { value: '<1s', label: 'Resposta' },
            { value: '+40%', label: 'Vendas' },
            { value: '-70%', label: 'Custos' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppAutomation;
