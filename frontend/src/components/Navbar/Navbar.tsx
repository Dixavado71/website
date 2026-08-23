import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import LoginModal from '../LoginModal/LoginModal';

interface NavbarProps {
  onOpenSignup: () => void;
}

const Navbar = ({ onOpenSignup }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" className="text-2xl font-bold gradient-text">
                DIixWhatsApp
              </a>
            </div>

            {/* Desktop Navigation */}
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

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
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
            </div>

            {/* Mobile menu button */}
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

        {/* Mobile Menu */}
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
              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
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
