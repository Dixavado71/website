import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Globe } from 'lucide-react';
import { navItems } from '../../data/navigation';
import LoginModal from '../LoginModal/LoginModal';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

interface NavbarProps {
  onOpenSignup: () => void;
  onOpenLogin?: () => void;
  isAuthenticated?: boolean;
}

const Navbar = ({ onOpenSignup, onOpenLogin, isAuthenticated = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { logout } = useAuth();
  const { language, setLanguage, languages: availableLanguages } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#home" className="text-2xl font-bold gradient-text">
                DIixWhatsApp
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Globe size={20} />
                </button>
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-surface border border-white/10 rounded-lg shadow-lg overflow-hidden">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 text-sm font-medium bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={onOpenSignup}
                    className="px-6 py-2.5 text-sm font-medium bg-primary hover:bg-primary/90 text-black rounded-lg transition-all duration-200 glow-green"
                  >
                    Começar agora
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <p className="px-4 text-xs text-gray-500 mb-2">Idioma</p>
                <div className="flex gap-2 px-4">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-primary/20 text-primary'
                          : 'bg-white/5 text-gray-300'
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                {isAuthenticated ? (
                  <>
                    <a
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      Entrar
                    </button>
                    <button
                      onClick={() => {
                        onOpenSignup();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-sm font-medium bg-primary hover:bg-primary/90 text-black rounded-lg transition-all duration-200 glow-green"
                    >
                      Começar agora
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Navbar;
