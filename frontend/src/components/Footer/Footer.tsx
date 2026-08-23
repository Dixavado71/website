import { MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                <MessageSquare size={20} className="text-black" />
              </div>
              <span className="text-xl font-bold gradient-text">DIixWhatsApp</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Automação, vendas e gestão em um só lugar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Plataforma</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-gray-400 hover:text-primary transition-colors">Recursos</a></li>
              <li><a href="#automation" className="text-sm text-gray-400 hover:text-primary transition-colors">Automação</a></li>
              <li><a href="#multi-tenant" className="text-sm text-gray-400 hover:text-primary transition-colors">Multi-Tenant</a></li>
              <li><a href="#pricing" className="text-sm text-gray-400 hover:text-primary transition-colors">Planos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-sm text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} DIixWhatsApp. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-2.028 1.029-2.716-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.688 1.028 1.623 1.028 2.716 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
