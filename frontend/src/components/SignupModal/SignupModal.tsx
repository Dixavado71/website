import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, User, Mail, Phone, Building, CreditCard } from 'lucide-react';
import { cn } from '../../lib/utils';
import { plans } from '../../data/plans';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'account' | 'business' | 'plan' | 'success';

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    cnpj: '',
    industry: '',
  });

  const steps = [
    { id: 'account', label: 'Conta', icon: User },
    { id: 'business', label: 'Empresa', icon: Building },
    { id: 'plan', label: 'Plano', icon: CreditCard },
  ];

  const handleNext = () => {
    if (currentStep === 'account') {
      setCurrentStep('business');
    } else if (currentStep === 'business') {
      setCurrentStep('plan');
    } else if (currentStep === 'plan' && selectedPlan) {
      setCurrentStep('success');
    }
  };

  const handleBack = () => {
    if (currentStep === 'business') {
      setCurrentStep('account');
    } else if (currentStep === 'plan') {
      setCurrentStep('business');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isAccountValid = formData.fullName && formData.email && formData.phone;
  const isBusinessValid = formData.companyName && formData.cnpj && formData.industry;
  const canProceed = (currentStep === 'account' && isAccountValid) ||
                     (currentStep === 'business' && isBusinessValid) ||
                     (currentStep === 'plan' && selectedPlan);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Crie sua conta</h3>
              <p className="text-gray-400">Comece preenchendo seus dados pessoais</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full bg-surfaceAlt border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="João Silva"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full bg-surfaceAlt border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="joao@empresa.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full bg-surfaceAlt border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Dados da Empresa</h3>
              <p className="text-gray-400">Conte-nos mais sobre o seu negócio</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome da Empresa
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="w-full bg-surfaceAlt border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Sua Empresa Ltda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => updateFormData('cnpj', e.target.value)}
                  className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Segmento
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full bg-surfaceAlt border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                >
                  <option value="">Selecione o segmento</option>
                  <option value="varejo">Varejo</option>
                  <option value="servicos">Serviços</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Escolha seu Plano</h3>
              <p className="text-gray-400">Selecione o plano ideal para o seu negócio</p>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={cn(
                    'cursor-pointer p-4 rounded-xl border transition-all duration-200',
                    selectedPlan === plan.name
                      ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                      : 'bg-surfaceAlt border-white/10 hover:border-white/20'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white">{plan.name}</h4>
                      <p className="text-sm text-gray-400">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary">{plan.price}</span>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={14} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {selectedPlan === plan.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 flex items-center gap-2 text-primary text-sm font-medium"
                    >
                      <Check size={16} />
                      Plano selecionado
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check size={40} className="text-primary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Cadastro Realizado!</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Bem-vindo ao DIixWhatsApp! Enviamos um e-mail de confirmação para <strong className="text-white">{formData.email}</strong>.
            </p>
            <p className="text-sm text-gray-500">
              Você será redirecionado para o dashboard em instantes...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">D</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">DIixWhatsApp</h2>
                    <p className="text-xs text-gray-400">Comece agora gratuitamente</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Progress Steps */}
              {currentStep !== 'success' && (
                <div className="px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = currentStep === step.id;
                      const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                      return (
                        <div key={step.id} className="flex items-center">
                          <div
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
                              isActive && 'bg-primary/10',
                              isCompleted && 'text-primary'
                            )}
                          >
                            <div
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                                isActive || isCompleted
                                  ? 'bg-primary text-black'
                                  : 'bg-white/10 text-gray-400'
                              )}
                            >
                              {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                            </div>
                            <span
                              className={cn(
                                'text-sm font-medium hidden sm:inline',
                                isActive ? 'text-white' : 'text-gray-400',
                                isCompleted && 'text-primary'
                              )}
                            >
                              {step.label}
                            </span>
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={cn(
                                'w-8 h-px mx-1',
                                isCompleted ? 'bg-primary' : 'bg-white/10'
                              )}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-96">
                {renderStepContent()}
              </div>

              {/* Footer */}
              {currentStep !== 'success' && (
                <div className="flex items-center justify-between p-6 border-t border-white/10">
                  <button
                    onClick={currentStep === 'account' ? onClose : handleBack}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {currentStep === 'account' ? 'Cancelar' : 'Voltar'}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={cn(
                      'px-8 py-3 rounded-lg font-semibold transition-all duration-200',
                      canProceed
                        ? 'bg-primary hover:bg-primary/90 text-black shadow-lg shadow-primary/20'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    )}
                  >
                    {currentStep === 'plan' ? 'Finalizar Cadastro' : 'Continuar'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
