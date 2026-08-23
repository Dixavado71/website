import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type Language = 'pt' | 'en' | 'es';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    dashboard: 'Dashboard',
    customers: 'Clientes',
    products: 'Produtos',
    orders: 'Pedidos',
    conversations: 'Conversas',
    automation: 'Automação',
    financial: 'Financeiro',
    store: 'Loja Virtual',
    reports: 'Relatórios',
    settings: 'Configurações',
    help: 'Ajuda',
    welcome: 'Bem-vindo de volta!',
    saving: 'Salvando...',
    saved: 'Salvo com sucesso!',
    error: 'Ocorreu um erro.',
    offline: 'Você está offline',
    online: 'Online',
  },
  en: {
    dashboard: 'Dashboard',
    customers: 'Customers',
    products: 'Products',
    orders: 'Orders',
    conversations: 'Conversations',
    automation: 'Automation',
    financial: 'Financial',
    store: 'Virtual Store',
    reports: 'Reports',
    settings: 'Settings',
    help: 'Help',
    welcome: 'Welcome back!',
    saving: 'Saving...',
    saved: 'Saved successfully!',
    error: 'An error occurred.',
    offline: 'You are offline',
    online: 'Online',
  },
  es: {
    dashboard: 'Tablero',
    customers: 'Clientes',
    products: 'Productos',
    orders: 'Pedidos',
    conversations: 'Conversaciones',
    automation: 'Automatización',
    financial: 'Financiero',
    store: 'Tienda Virtual',
    reports: 'Informes',
    settings: 'Configuración',
    help: 'Ayuda',
    welcome: '¡Bienvenido de nuevo!',
    saving: 'Guardando...',
    saved: '¡Guardado con éxito!',
    error: 'Ocurrió un error.',
    offline: 'Estás desconectado',
    online: 'En línea',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLang = localStorage.getItem('language') as Language;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, setLanguage: changeLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
