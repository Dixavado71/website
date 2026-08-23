export interface Language {
  code: string;
  name: string;
  flag: string;
}

export type TranslationKey = 
  | 'common.save'
  | 'common.cancel'
  | 'common.edit'
  | 'common.delete'
  | 'common.search'
  | 'common.filter'
  | 'common.export'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.close'
  | 'common.back'
  | 'common.next'
  | 'nav.overview'
  | 'nav.orders'
  | 'nav.products'
  | 'nav.customers'
  | 'nav.conversations'
  | 'nav.store'
  | 'nav.automation'
  | 'nav.financial'
  | 'nav.reports'
  | 'nav.settings'
  | 'nav.help'
  | 'metrics.revenue'
  | 'metrics.orders'
  | 'metrics.customers'
  | 'metrics.conversations'
  | 'metrics.active_flows'
  | 'metrics.total_messages'
  | 'metrics.conversions'
  | 'auth.login'
  | 'auth.signup'
  | 'auth.logout'
  | 'auth.welcome_back'
  | 'auth.login_account'
  | 'auth.email'
  | 'auth.password'
  | 'auth.remember_me'
  | 'auth.forgot_password'
  | 'auth.no_account'
  | 'auth.create_account'
  | 'auth.full_name'
  | 'auth.phone'
  | 'auth.company_name'
  | 'auth.cnpj'
  | 'auth.industry'
  | 'auth.plan'
  | 'automation.title'
  | 'automation.description'
  | 'automation.flows_total'
  | 'automation.flows_active'
  | 'automation.messages_sent'
  | 'reports.title'
  | 'reports.description'
  | 'dashboard.overview'
  | 'dashboard.performance'
  | 'dashboard.recent_orders'
  | 'dashboard.top_products'
  | 'dashboard.customer_segments';

export interface Translation {
  common: {
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    search: string;
    filter: string;
    export: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    back: string;
    next: string;
  };
  nav: {
    overview: string;
    orders: string;
    products: string;
    customers: string;
    conversations: string;
    store: string;
    automation: string;
    financial: string;
    reports: string;
    settings: string;
    help: string;
  };
  metrics: {
    revenue: string;
    orders: string;
    customers: string;
    conversations: string;
    active_flows: string;
    total_messages: string;
    conversions: string;
  };
  auth: {
    login: string;
    signup: string;
    logout: string;
    welcome_back: string;
    login_account: string;
    email: string;
    password: string;
    remember_me: string;
    forgot_password: string;
    no_account: string;
    create_account: string;
    full_name: string;
    phone: string;
    company_name: string;
    cnpj: string;
    industry: string;
    plan: string;
  };
  automation: {
    title: string;
    description: string;
    flows_total: string;
    flows_active: string;
    messages_sent: string;
  };
  flow: {
    builder: string;
    save: string;
    load: string;
    export: string;
    import: string;
    validate: string;
    clear: string;
    saved: string;
    no_saved_flow: string;
    confirm_clear: string;
  };
  nodes: {
    trigger: string;
    message: string;
    condition: string;
    delay: string;
    action: string;
    webhook: string;
  };
  reports: {
    title: string;
    description: string;
  };
  dashboard: {
    overview: string;
    performance: string;
    recent_orders: string;
    top_products: string;
    customer_segments: string;
  };
}

export const translations: Record<string, Translation> = {
  pt: {
    common: {
      save: 'Salvar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Excluir',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      close: 'Fechar',
      back: 'Voltar',
      next: 'Próximo',
    },
    nav: {
      overview: 'Visão Geral',
      orders: 'Pedidos',
      products: 'Produtos',
      customers: 'Clientes',
      conversations: 'Conversas',
      store: 'Loja',
      automation: 'Automação',
      financial: 'Financeiro',
      reports: 'Relatórios',
      settings: 'Configurações',
      help: 'Ajuda',
    },
    metrics: {
      revenue: 'Faturamento',
      orders: 'Pedidos',
      customers: 'Clientes',
      conversations: 'Conversas',
      active_flows: 'Fluxos Ativos',
      total_messages: 'Mensagens Enviadas',
      conversions: 'Total de Conversões',
    },
    auth: {
      login: 'Entrar',
      signup: 'Criar Conta',
      logout: 'Sair',
      welcome_back: 'Bem-vindo de volta',
      login_account: 'Acesse sua conta para continuar',
      email: 'E-mail',
      password: 'Senha',
      remember_me: 'Lembrar de mim',
      forgot_password: 'Esqueci minha senha',
      no_account: 'Não tem uma conta?',
      create_account: 'Criar conta',
      full_name: 'Nome Completo',
      phone: 'Telefone / WhatsApp',
      company_name: 'Nome da Empresa',
      cnpj: 'CNPJ',
      industry: 'Segmento',
      plan: 'Plano',
    },
    automation: {
      title: 'Automação',
      description: 'Crie e gerencie fluxos automatizados de atendimento',
      flows_total: 'Total de Fluxos',
      flows_active: 'Fluxos Ativos',
      messages_sent: 'Mensagens Enviadas',
    },
    flow: {
      builder: 'Construtor de Fluxo',
      save: 'Salvar',
      load: 'Carregar',
      export: 'Exportar',
      import: 'Importar',
      validate: 'Validar',
      clear: 'Limpar',
      saved: 'Fluxo salvo com sucesso!',
      no_saved_flow: 'Nenhum fluxo salvo encontrado',
      confirm_clear: 'Tem certeza que deseja limpar o fluxo atual?',
    },
    nodes: {
      trigger: 'Gatilho',
      message: 'Mensagem',
      condition: 'Condição',
      delay: 'Atraso',
      action: 'Ação',
      webhook: 'Webhook',
    },
    reports: {
      title: 'Relatórios',
      description: 'Analise o desempenho do seu negócio',
    },
    dashboard: {
      overview: 'Visão Geral',
      performance: 'Desempenho',
      recent_orders: 'Pedidos Recentes',
      top_products: 'Produtos Mais Vendidos',
      customer_segments: 'Segmentos de Clientes',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      back: 'Back',
      next: 'Next',
    },
    nav: {
      overview: 'Overview',
      orders: 'Orders',
      products: 'Products',
      customers: 'Customers',
      conversations: 'Conversations',
      store: 'Store',
      automation: 'Automation',
      financial: 'Financial',
      reports: 'Reports',
      settings: 'Settings',
      help: 'Help',
    },
    metrics: {
      revenue: 'Revenue',
      orders: 'Orders',
      customers: 'Customers',
      conversations: 'Conversations',
      active_flows: 'Active Flows',
      total_messages: 'Messages Sent',
      conversions: 'Total Conversions',
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      welcome_back: 'Welcome back',
      login_account: 'Sign in to continue',
      email: 'Email',
      password: 'Password',
      remember_me: 'Remember me',
      forgot_password: 'Forgot password',
      no_account: "Don't have an account?",
      create_account: 'Create account',
      full_name: 'Full Name',
      phone: 'Phone / WhatsApp',
      company_name: 'Company Name',
      cnpj: 'Tax ID',
      industry: 'Industry',
      plan: 'Plan',
    },
    automation: {
      title: 'Automation',
      description: 'Create and manage automated service flows',
      flows_total: 'Total Flows',
      flows_active: 'Active Flows',
      messages_sent: 'Messages Sent',
    },
    flow: {
      builder: 'Flow Builder',
      save: 'Save',
      load: 'Load',
      export: 'Export',
      import: 'Import',
      validate: 'Validate',
      clear: 'Clear',
      saved: 'Flow saved successfully!',
      no_saved_flow: 'No saved flow found',
      confirm_clear: 'Are you sure you want to clear the current flow?',
    },
    nodes: {
      trigger: 'Trigger',
      message: 'Message',
      condition: 'Condition',
      delay: 'Delay',
      action: 'Action',
      webhook: 'Webhook',
    },
    reports: {
      title: 'Reports',
      description: 'Analyze your business performance',
    },
    dashboard: {
      overview: 'Overview',
      performance: 'Performance',
      recent_orders: 'Recent Orders',
      top_products: 'Top Products',
      customer_segments: 'Customer Segments',
    },
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      back: 'Volver',
      next: 'Siguiente',
    },
    nav: {
      overview: 'Visión General',
      orders: 'Pedidos',
      products: 'Productos',
      customers: 'Clientes',
      conversations: 'Conversaciones',
      store: 'Tienda',
      automation: 'Automatización',
      financial: 'Financiero',
      reports: 'Informes',
      settings: 'Configuración',
      help: 'Ayuda',
    },
    metrics: {
      revenue: 'Ingresos',
      orders: 'Pedidos',
      customers: 'Clientes',
      conversations: 'Conversaciones',
      active_flows: 'Flujos Activos',
      total_messages: 'Mensajes Enviados',
      conversions: 'Total de Conversiones',
    },
    auth: {
      login: 'Iniciar Sesión',
      signup: 'Crear Cuenta',
      logout: 'Cerrar Sesión',
      welcome_back: 'Bienvenido de nuevo',
      login_account: 'Accede a tu cuenta para continuar',
      email: 'Correo electrónico',
      password: 'Contraseña',
      remember_me: 'Recuérdame',
      forgot_password: 'Olvidé mi contraseña',
      no_account: '¿No tienes una cuenta?',
      create_account: 'Crear cuenta',
      full_name: 'Nombre Completo',
      phone: 'Teléfono / WhatsApp',
      company_name: 'Nombre de la Empresa',
      cnpj: 'NIF',
      industry: 'Sector',
      plan: 'Plan',
    },
    automation: {
      title: 'Automatización',
      description: 'Crea y gestiona flujos automatizados de atención',
      flows_total: 'Total de Flujos',
      flows_active: 'Flujos Activos',
      messages_sent: 'Mensajes Enviados',
    },
    flow: {
      builder: 'Constructor de Flujo',
      save: 'Guardar',
      load: 'Cargar',
      export: 'Exportar',
      import: 'Importar',
      validate: 'Validar',
      clear: 'Limpiar',
      saved: '¡Flujo guardado con éxito!',
      no_saved_flow: 'No se encontró ningún flujo guardado',
      confirm_clear: '¿Está seguro de que desea limpiar el flujo actual?',
    },
    nodes: {
      trigger: 'Disparador',
      message: 'Mensaje',
      condition: 'Condicional',
      delay: 'Retraso',
      action: 'Acción',
      webhook: 'Webhook',
    },
    reports: {
      title: 'Informes',
      description: 'Analiza el rendimiento de tu negocio',
    },
    dashboard: {
      overview: 'Visión General',
      performance: 'Rendimiento',
      recent_orders: 'Pedidos Recientes',
      top_products: 'Productos Más Vendidos',
      customer_segments: 'Segmentos de Clientes',
    },
  },
};

export const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export type LanguageCode = 'pt' | 'en' | 'es';
