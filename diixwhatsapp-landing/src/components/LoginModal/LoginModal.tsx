import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login(email);
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      setIsLoading(false);
      onClose();
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md glass rounded-2xl p-8 border border-white/10 glow-green animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            {t('auth.welcome_back')}
          </h2>
          <p className="text-gray-400 text-sm">
            {t('auth.login_account')}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-surface/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-surface/50 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="ml-2 text-sm text-gray-400">{t('auth.remember_me')}</span>
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
              {t('auth.forgot_password')}
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all duration-200 glow-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? `${t('common.loading')}` : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {t('auth.no_account')}{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
              {t('auth.create_account')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
