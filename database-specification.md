# Especificação do Banco de Dados - Dashboard DiixWhatsApp

Este documento descreve todas as entidades, campos, tipos de dados e relacionamentos identificados no frontend do dashboard para criação do banco de dados no backend.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Entidades do Banco de Dados](#entidades-do-banco-de-dados)
3. [Diagrama Entidade-Relacionamento](#diagrama-entidade-relacionamento)
4. [Enums e Valores Pré-definidos](#enums-e-valores-pré-definidos)
5. [Exemplos de Dados](#exemplos-de-dados)

---

## Visão Geral

O sistema possui **10 entidades principais** identificadas:

| Entidade | Descrição | Campos Principais |
|----------|-----------|-------------------|
| `users` | Usuários do sistema | id, name, email, phone, avatar, role |
| `companies` | Empresas/tenants | id, name, cnpj, address, website |
| `customers` | Clientes da loja | id, name, email, phone, segment, status |
| `products` | Produtos do catálogo | id, name, description, price, cost, stock |
| `orders` | Pedidos de compra | id, customer_id, total, status, payment_method |
| `order_items` | Itens dos pedidos | id, order_id, product_id, quantity, unit_price |
| `conversations` | Conversas com clientes | id, customer_id, channel, last_message, unread_count |
| `messages` | Mensagens das conversas | id, conversation_id, text, sender_type, status |
| `automation_flows` | Fluxos de automação | id, name, type, messages_count, conversions, active |
| `transactions` | Transações financeiras | id, description, type, value, category, status |

---

## Entidades do Banco de Dados

### 1. `users` - Usuários do Sistema

Tabela que armazena os usuários que acessam o dashboard.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do usuário |
| `name` | VARCHAR | 255 | ❌ | - | Nome completo do usuário |
| `email` | VARCHAR | 255 | ❌ | - | E-mail para login e contato |
| `phone` | VARCHAR | 20 | ✅ | NULL | Telefone/WhatsApp |
| `avatar_url` | VARCHAR | 500 | ✅ | NULL | URL da foto de perfil |
| `password_hash` | VARCHAR | 255 | ❌ | - | Hash da senha |
| `role` | ENUM/VARCHAR | 50 | ❌ | 'admin' | Cargo (admin, manager, operator) |
| `language` | VARCHAR | 10 | ❌ | 'pt-BR' | Idioma preferido |
| `timezone` | VARCHAR | 50 | ❌ | 'America/Sao_Paulo' | Fuso horário |
| `is_active` | BOOLEAN | - | ❌ | TRUE | Status da conta |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |
| `last_login_at` | TIMESTAMP | - | ✅ | NULL | Último acesso |

**Índices:**
- PRIMARY KEY (`id`)
- UNIQUE (`email`)
- INDEX (`role`, `is_active`)

---

### 2. `companies` - Empresas/Tenants

Tabela para suporte multi-tenant (múltiplas empresas).

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único da empresa |
| `name` | VARCHAR | 255 | ❌ | - | Nome fantasia da empresa |
| `trade_name` | VARCHAR | 255 | ✅ | NULL | Razão social |
| `cnpj` | VARCHAR | 18 | ✅ | NULL | CNPJ formatado |
| `address_street` | VARCHAR | 255 | ✅ | NULL | Logradouro |
| `address_number` | VARCHAR | 20 | ✅ | NULL | Número |
| `address_complement` | VARCHAR | 100 | ✅ | NULL | Complemento |
| `address_city` | VARCHAR | 100 | ✅ | NULL | Cidade |
| `address_state` | VARCHAR | 2 | ✅ | NULL | Estado (UF) |
| `address_zip` | VARCHAR | 10 | ✅ | NULL | CEP |
| `website` | VARCHAR | 255 | ✅ | NULL | Site da empresa |
| `description` | TEXT | - | ✅ | NULL | Descrição da empresa |
| `logo_url` | VARCHAR | 500 | ✅ | NULL | URL do logo |
| `is_active` | BOOLEAN | - | ❌ | TRUE | Empresa ativa |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de cadastro |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- UNIQUE (`cnpj`)
- INDEX (`is_active`)

---

### 3. `customers` - Clientes

Tabela que armazena os clientes da loja.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do cliente |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa (multi-tenant) |
| `name` | VARCHAR | 255 | ❌ | - | Nome completo |
| `email` | VARCHAR | 255 | ❌ | - | E-mail |
| `phone` | VARCHAR | 20 | ❌ | - | Telefone/WhatsApp |
| `segment` | ENUM/VARCHAR | 20 | ❌ | 'new' | Segmento do cliente |
| `status` | ENUM/VARCHAR | 20 | ❌ | 'active' | Status do cliente |
| `total_orders` | INTEGER | - | ❌ | 0 | Total de pedidos realizados |
| `total_spent` | DECIMAL(12,2) | - | ❌ | 0.00 | Valor total gasto |
| `last_purchase_date` | DATE | - | ✅ | NULL | Data da última compra |
| `registered_at` | DATE | - | ❌ | - | Data de cadastro |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- INDEX (`segment`, `status`)
- INDEX (`email`, `phone`)
- INDEX (`company_id`)

---

### 4. `products` - Produtos

Catálogo de produtos da loja.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do produto |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `name` | VARCHAR | 255 | ❌ | - | Nome do produto |
| `description` | TEXT | - | ✅ | NULL | Descrição detalhada |
| `category` | VARCHAR | 100 | ❌ | - | Categoria do produto |
| `price` | DECIMAL(10,2) | - | ❌ | 0.00 | Preço de venda |
| `cost` | DECIMAL(10,2) | - | ❌ | 0.00 | Custo de aquisição |
| `stock` | INTEGER | - | ❌ | 0 | Quantidade em estoque |
| `min_stock` | INTEGER | - | ❌ | 10 | Estoque mínimo alerta |
| `total_sales` | INTEGER | - | ❌ | 0 | Total de unidades vendidas |
| `total_revenue` | DECIMAL(12,2) | - | ❌ | 0.00 | Receita total gerada |
| `status` | ENUM/VARCHAR | 20 | ❌ | 'active' | Status do produto |
| `image_url` | VARCHAR | 500 | ✅ | NULL | URL da imagem principal |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de cadastro |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- INDEX (`category`, `status`)
- INDEX (`company_id`)
- INDEX (`stock`, `min_stock`) - para alertas de estoque baixo

---

### 5. `orders` - Pedidos

Pedidos de compra realizados pelos clientes.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do pedido |
| `order_number` | VARCHAR | 20 | ❌ | - | Número do pedido (ex: #ORD-001) |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `customer_id` | VARCHAR/UUID | 36 | ❌ | - | FK para cliente |
| `status` | ENUM/VARCHAR | 20 | ❌ | 'pending' | Status do pedido |
| `payment_method` | ENUM/VARCHAR | 30 | ❌ | - | Forma de pagamento |
| `subtotal` | DECIMAL(12,2) | - | ❌ | 0.00 | Subtotal dos itens |
| `discount` | DECIMAL(10,2) | - | ❌ | 0.00 | Desconto aplicado |
| `shipping_cost` | DECIMAL(10,2) | - | ❌ | 0.00 | Frete |
| `total` | DECIMAL(12,2) | - | ❌ | 0.00 | Valor total do pedido |
| `shipping_address` | TEXT | - | ❌ | - | Endereço de entrega completo |
| `notes` | TEXT | - | ✅ | NULL | Observações do pedido |
| `order_date` | DATE | - | ❌ | - | Data do pedido |
| `completed_at` | TIMESTAMP | - | ✅ | NULL | Data de conclusão |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- UNIQUE (`order_number`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- FOREIGN KEY (`customer_id`) REFERENCES `customers(id)`
- INDEX (`status`, `order_date`)
- INDEX (`customer_id`)
- INDEX (`company_id`, `order_date`)

---

### 6. `order_items` - Itens do Pedido

Itens individuais de cada pedido.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do item |
| `order_id` | VARCHAR/UUID | 36 | ❌ | - | FK para pedido |
| `product_id` | VARCHAR/UUID | 36 | ❌ | - | FK para produto |
| `quantity` | INTEGER | - | ❌ | 1 | Quantidade comprada |
| `unit_price` | DECIMAL(10,2) | - | ❌ | 0.00 | Preço unitário no momento |
| `unit_cost` | DECIMAL(10,2) | - | ❌ | 0.00 | Custo unitário |
| `subtotal` | DECIMAL(12,2) | - | ❌ | 0.00 | Subtotal (quantity * unit_price) |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`order_id`) REFERENCES `orders(id)` ON DELETE CASCADE
- FOREIGN KEY (`product_id`) REFERENCES `products(id)`
- INDEX (`order_id`)

---

### 7. `conversations` - Conversas

Conversas com clientes através de diversos canais.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único da conversa |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `customer_id` | VARCHAR/UUID | 36 | ✅ | NULL | FK para cliente (pode ser null se não cadastrado) |
| `channel` | ENUM/VARCHAR | 20 | ❌ | 'whatsapp' | Canal de origem |
| `contact_name` | VARCHAR | 255 | ❌ | - | Nome do contato |
| `contact_phone` | VARCHAR | 20 | ✅ | NULL | Telefone do contato |
| `last_message` | TEXT | - | ✅ | NULL | Conteúdo da última mensagem |
| `last_message_at` | TIMESTAMP | - | ✅ | NULL | Horário da última mensagem |
| `unread_count` | INTEGER | - | ❌ | 0 | Quantidade de mensagens não lidas |
| `is_pinned` | BOOLEAN | - | ❌ | FALSE | Conversa fixada |
| `is_archived` | BOOLEAN | - | ❌ | FALSE | Conversa arquivada |
| `assigned_to` | VARCHAR/UUID | 36 | ✅ | NULL | Atendente responsável (FK users) |
| `status` | ENUM/VARCHAR | 20 | ❌ | 'open' | Status da conversa |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de início |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- FOREIGN KEY (`customer_id`) REFERENCES `customers(id)` SET NULL
- FOREIGN KEY (`assigned_to`) REFERENCES `users(id)` SET NULL
- INDEX (`channel`, `status`)
- INDEX (`unread_count`, `is_pinned`)
- INDEX (`company_id`)

---

### 8. `messages` - Mensagens

Mensagens individuais dentro das conversas.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único da mensagem |
| `conversation_id` | VARCHAR/UUID | 36 | ❌ | - | FK para conversa |
| `sender_type` | ENUM/VARCHAR | 10 | ❌ | - | Tipo de remetente |
| `sender_id` | VARCHAR/UUID | 36 | ✅ | NULL | ID do remetente (user ou customer) |
| `message_type` | ENUM/VARCHAR | 20 | ❌ | 'text' | Tipo da mensagem |
| `content` | TEXT | - | ❌ | - | Conteúdo da mensagem |
| `media_url` | VARCHAR | 500 | ✅ | NULL | URL de mídia (imagem, áudio, arquivo) |
| `status` | ENUM/VARCHAR | 15 | ❌ | 'sent' | Status de entrega |
| `is_read` | BOOLEAN | - | ❌ | FALSE | Mensagem lida |
| `read_at` | TIMESTAMP | - | ✅ | NULL | Quando foi lida |
| `sent_at` | TIMESTAMP | - | ❌ | NOW() | Quando foi enviada |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`conversation_id`) REFERENCES `conversations(id)` ON DELETE CASCADE
- INDEX (`conversation_id`, `created_at`)
- INDEX (`sender_type`, `status`)
- INDEX (`is_read`, `created_at`)

---

### 9. `automation_flows` - Fluxos de Automação

Fluxos automatizados de atendimento via chatbot.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único do fluxo |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `name` | VARCHAR | 100 | ❌ | - | Nome do fluxo |
| `type` | ENUM/VARCHAR | 30 | ❌ | - | Tipo de fluxo |
| `description` | TEXT | - | ✅ | NULL | Descrição do fluxo |
| `icon_emoji` | VARCHAR | 10 | ✅ | NULL | Emoji representativo |
| `messages_count` | INTEGER | - | ❌ | 0 | Quantidade de mensagens no fluxo |
| `total_conversions` | INTEGER | - | ❌ | 0 | Total de conversões realizadas |
| `conversion_rate` | DECIMAL(5,2) | - | ✅ | NULL | Taxa de conversão (%) |
| `growth_percentage` | DECIMAL(5,2) | - | ✅ | NULL | Crescimento vs período anterior |
| `is_active` | BOOLEAN | - | ❌ | TRUE | Fluxo ativo |
| `config_json` | JSON/TEXT | - | ✅ | NULL | Configurações do fluxo em JSON |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- INDEX (`type`, `is_active`)
- INDEX (`company_id`, `is_active`)

---

### 10. `transactions` - Transações Financeiras

Transações de receitas e despesas.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único da transação |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `order_id` | VARCHAR/UUID | 36 | ✅ | NULL | FK para pedido (se for receita de venda) |
| `description` | VARCHAR | 255 | ❌ | - | Descrição da transação |
| `type` | ENUM/VARCHAR | 10 | ❌ | - | Tipo: income ou expense |
| `category` | VARCHAR | 100 | ❌ | - | Categoria da transação |
| `value` | DECIMAL(12,2) | - | ❌ | 0.00 | Valor da transação |
| `status` | ENUM/VARCHAR | 20 | ❌ | 'completed' | Status da transação |
| `payment_method` | ENUM/VARCHAR | 30 | ✅ | NULL | Forma de pagamento (se aplicável) |
| `transaction_date` | DATE | - | ❌ | - | Data da transação |
| `due_date` | DATE | - | ✅ | NULL | Data de vencimento |
| `paid_at` | TIMESTAMP | - | ✅ | NULL | Data do pagamento |
| `notes` | TEXT | - | ✅ | NULL | Observações |
| `attachment_url` | VARCHAR | 500 | ✅ | NULL | URL de comprovante/anexo |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

**Índices:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`company_id`) REFERENCES `companies(id)`
- FOREIGN KEY (`order_id`) REFERENCES `orders(id)` SET NULL
- INDEX (`type`, `status`, `transaction_date`)
- INDEX (`category`, `transaction_date`)
- INDEX (`company_id`, `transaction_date`)

---

### 11. `quick_replies` - Respostas Rápidas (Opcional)

Modelo de respostas rápidas para atendentes.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `shortcut` | VARCHAR | 50 | ❌ | - | Atalho/nome |
| `message_text` | TEXT | - | ❌ | - | Texto da resposta |
| `created_by` | VARCHAR/UUID | 36 | ✅ | NULL | FK para usuário criador |
| `usage_count` | INTEGER | - | ❌ | 0 | Quantidade de usos |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |
| `updated_at` | TIMESTAMP | - | ❌ | NOW() | Última atualização |

---

### 12. `notifications` - Notificações do Sistema

Notificações para usuários do dashboard.

| Campo | Tipo | Tamanho | Nullable | Default | Descrição |
|-------|------|---------|----------|---------|-----------|
| `id` | VARCHAR/UUID | 36 | ❌ | - | Identificador único |
| `user_id` | VARCHAR/UUID | 36 | ❌ | - | FK para usuário destinatário |
| `company_id` | VARCHAR/UUID | 36 | ❌ | - | FK para empresa |
| `type` | ENUM/VARCHAR | 30 | ❌ | - | Tipo de notificação |
| `title` | VARCHAR | 100 | ❌ | - | Título da notificação |
| `message` | TEXT | - | ❌ | - | Conteúdo da notificação |
| `is_read` | BOOLEAN | - | ❌ | FALSE | Lida ou não |
| `related_entity_type` | VARCHAR | 50 | ✅ | NULL | Tipo de entidade relacionada |
| `related_entity_id` | VARCHAR/UUID | 36 | ✅ | NULL | ID da entidade relacionada |
| `created_at` | TIMESTAMP | - | ❌ | NOW() | Data de criação |

---

## Diagrama Entidade-Relacionamento

```
┌─────────────────┐       ┌─────────────────┐
│    companies    │       │      users      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ name            │       │ company_id (FK) │
│ cnpj            │       │ name            │
│ ...             │       │ email           │
└────────┬────────┘       │ ...             │
         │                └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│    customers    │       │    products     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ company_id (FK) │◄──────│ company_id (FK) │
│ name            │       │ name            │
│ email           │       │ category        │
│ phone           │       │ price           │
│ segment         │       │ cost            │
│ status          │       │ stock           │
│ total_orders    │       │ min_stock       │
│ total_spent     │       │ status          │
│ ...             │       │ ...             │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:N                     │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│     orders      │       │   order_items   │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────│ order_id (FK)   │
│ order_number    │       │ product_id (FK) │
│ company_id (FK) │       │ quantity        │
│ customer_id (FK)│       │ unit_price      │
│ status          │       │ subtotal        │
│ payment_method  │       └─────────────────┘
│ total           │
│ shipping_address│       ┌─────────────────┐
│ order_date      │       │  conversations  │
│ ...             │       ├─────────────────┤
└─────────────────┘       │ id (PK)         │
                          │ company_id (FK) │
         ┌────────────────│ customer_id (FK)│
         │                │ channel         │
         │                │ last_message    │
         │                │ unread_count    │
         │                │ is_pinned       │
         │                │ status          │
         │                │ ...             │
         │                └────────┬────────┘
         │                         │ 1:N
         │                         ▼
         │                ┌─────────────────┐
         │                │    messages     │
         │                ├─────────────────┤
         │                │ id (PK)         │
         │                │ conversation_id │
         │                │ sender_type     │
         │                │ content         │
         │                │ message_type    │
         │                │ status          │
         │                │ is_read         │
         │                │ ...             │
         │                └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│ automation_flows│       │  transactions   │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ company_id (FK) │       │ company_id (FK) │
│ name            │       │ order_id (FK)   │
│ type            │       │ description     │
│ messages_count  │       │ type            │
│ conversions     │       │ category        │
│ is_active       │       │ value           │
│ ...             │       │ status          │
└─────────────────┘       │ ...             │
                          └─────────────────┘
```

---

## Enums e Valores Pré-definidos

### `customer_segment`
Valores possíveis para o segmento de clientes:

| Valor | Descrição | Cor Sugerida |
|-------|-----------|--------------|
| `vip` | Cliente VIP, alto valor gasto | #FFD700 (Dourado) |
| `frequent` | Cliente frequente | #00E5FF (Ciano) |
| `occasional` | Cliente ocasional | #7B61FF (Roxo) |
| `new` | Cliente novo | #00FF88 (Verde) |

### `customer_status` / `user_status`
| Valor | Descrição |
|-------|-----------|
| `active` | Ativo |
| `inactive` | Inativo |

### `product_status`
| Valor | Descrição |
|-------|-----------|
| `active` | Produto ativo e disponível |
| `inactive` | Produto inativo |
| `low_stock` | Estoque abaixo do mínimo |

### `order_status`
| Valor | Descrição | Ícone |
|-------|-----------|-------|
| `pending` | Pendente de processamento | ⚠️ AlertCircle |
| `processing` | Em processamento | ⏰ Clock |
| `completed` | Concluído/Entregue | ✅ CheckCircle |
| `cancelled` | Cancelado | ❌ XCircle |

### `payment_method`
| Valor | Descrição | Label Display |
|-------|-----------|---------------|
| `credit_card` | Cartão de Crédito | Cartão de Crédito |
| `debit_card` | Cartão de Débito | Cartão de Débito |
| `pix` | PIX | PIX |
| `boleto` | Boleto Bancário | Boleto |
| `whatsapp_pay` | WhatsApp Pay | WhatsApp Pay |

### `conversation_channel`
| Valor | Descrição | Ícone/Emoji |
|-------|-----------|-------------|
| `whatsapp` | WhatsApp | 📱 |
| `instagram` | Instagram Direct | 📸 |
| `facebook` | Facebook Messenger | 📘 |
| `site` | Chat do Site | 🌐 |

### `conversation_status`
| Valor | Descrição |
|-------|-----------|
| `open` | Aberta |
| `closed` | Fechada |
| `waiting` | Aguardando cliente |

### `message_sender_type`
| Valor | Descrição |
|-------|-----------|
| `user` | Atendente/usuário do sistema |
| `customer` | Cliente |
| `bot` | Bot/automação |

### `message_type`
| Valor | Descrição |
|-------|-----------|
| `text` | Mensagem de texto |
| `image` | Imagem |
| `file` | Arquivo/anexo |
| `audio` | Áudio |

### `message_status`
| Valor | Descrição | Ícone |
|-------|-----------|-------|
| `sent` | Enviada | ✓ Check |
| `delivered` | Entregue | ✓✓ CheckCheck (opaco) |
| `read` | Lida | ✓✓ CheckCheck (azul) |

### `automation_flow_type`
| Valor | Descrição | Badge Color |
|-------|-----------|-------------|
| `vendas` | Fluxo de vendas | Verde |
| `suporte` | Fluxo de suporte | Ciano |
| `marketing` | Fluxo de marketing | Roxo |

### `transaction_type`
| Valor | Descrição | Ícone |
|-------|-----------|-------|
| `income` | Receita (entrada) | ArrowUpRight |
| `expense` | Despesa (saída) | ArrowDownRight |

### `transaction_status`
| Valor | Descrição |
|-------|-----------|
| `pending` | Pendente |
| `completed` | Concluído/Pago |

### `notification_type`
| Valor | Descrição |
|-------|-----------|
| `order` | Novo pedido |
| `message` | Nova mensagem |
| `payment` | Pagamento confirmado |
| `stock` | Estoque baixo |
| `automation` | Evento de automação |

### `user_role`
| Valor | Descrição | Permissões |
|-------|-----------|------------|
| `admin` | Administrador | Acesso total |
| `manager` | Gerente | Acesso quase total |
| `operator` | Operador | Acesso limitado |

---

## Exemplos de Dados

### Customers (clientes)

```json
{
  "id": "1",
  "name": "Maria Silva",
  "email": "maria.silva@email.com",
  "phone": "(11) 98765-4321",
  "segment": "vip",
  "status": "active",
  "total_orders": 12,
  "total_spent": 4567.00,
  "last_purchase_date": "2026-01-15",
  "registered_at": "2025-03-10"
}
```

### Products (produtos)

```json
{
  "id": "1",
  "name": "Kit Skincare Premium",
  "description": "Kit completo com limpador, tônico e hidratante facial",
  "category": "Beleza",
  "price": 297.00,
  "cost": 120.00,
  "stock": 45,
  "min_stock": 10,
  "total_sales": 234,
  "total_revenue": 69498.00,
  "status": "active"
}
```

### Orders (pedidos)

```json
{
  "id": "1",
  "order_number": "#ORD-001",
  "customer_id": "1",
  "customer_name": "Maria Silva",
  "customer_email": "maria.silva@email.com",
  "customer_phone": "(11) 98765-4321",
  "status": "completed",
  "payment_method": "credit_card",
  "subtotal": 297.00,
  "discount": 0.00,
  "shipping_cost": 0.00,
  "total": 297.00,
  "shipping_address": "Rua das Flores, 123 - São Paulo, SP",
  "order_date": "2026-01-15"
}
```

### Order Items (itens do pedido)

```json
{
  "id": "1",
  "order_id": "1",
  "product_id": "1",
  "product_name": "Kit Skincare Premium",
  "quantity": 1,
  "unit_price": 297.00,
  "unit_cost": 120.00,
  "subtotal": 297.00
}
```

### Conversations (conversas)

```json
{
  "id": "1",
  "customer_name": "Carlos Mendes",
  "channel": "whatsapp",
  "last_message": "Gostaria de ver os produtos disponíveis",
  "last_message_at": "2026-01-15T10:32:00Z",
  "unread_count": 2,
  "is_pinned": true,
  "status": "open",
  "messages": [
    {
      "id": "1",
      "sender_type": "customer",
      "content": "Olá! Gostaria de ver os produtos disponíveis.",
      "message_type": "text",
      "sent_at": "2026-01-15T10:32:00Z"
    },
    {
      "id": "2",
      "sender_type": "user",
      "content": "Olá! 👋 Seja bem-vindo à nossa loja.",
      "message_type": "text",
      "status": "read",
      "sent_at": "2026-01-15T10:32:00Z"
    }
  ]
}
```

### Automation Flows (fluxos de automação)

```json
{
  "id": "1",
  "name": "Boas-vindas",
  "type": "vendas",
  "icon_emoji": "🤖",
  "messages_count": 5,
  "total_conversions": 124,
  "conversion_rate": 24.8,
  "growth_percentage": 15.5,
  "is_active": true
}
```

### Transactions (transações financeiras)

```json
{
  "id": "1",
  "description": "Venda - Kit Skincare Premium",
  "type": "income",
  "category": "Vendas",
  "value": 297.00,
  "status": "completed",
  "payment_method": "credit_card",
  "transaction_date": "2026-01-15",
  "order_id": "1"
}
```

---

## Queries Úteis para Dashboard

### Métricas do Dashboard Principal

```sql
-- Faturamento total
SELECT COALESCE(SUM(total), 0) as revenue 
FROM orders 
WHERE company_id = ? AND status = 'completed';

-- Total de pedidos
SELECT COUNT(*) as total_orders 
FROM orders 
WHERE company_id = ?;

-- Total de clientes
SELECT COUNT(*) as total_customers 
FROM customers 
WHERE company_id = ? AND status = 'active';

-- Total de conversas
SELECT COUNT(*) as total_conversations 
FROM conversations 
WHERE company_id = ?;
```

### Receita Mensal

```sql
SELECT 
  DATE_FORMAT(order_date, '%Y-%m') as month,
  SUM(total) as revenue,
  COUNT(*) as orders
FROM orders
WHERE company_id = ? AND status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC
LIMIT 6;
```

### Top Produtos Mais Vendidos

```sql
SELECT 
  p.id,
  p.name,
  SUM(oi.quantity) as total_sales,
  SUM(oi.subtotal) as revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.company_id = ? AND o.status = 'completed'
GROUP BY p.id
ORDER BY total_sales DESC
LIMIT 5;
```

### Segmentação de Clientes

```sql
SELECT 
  segment,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM customers WHERE company_id = ?), 1) as percentage
FROM customers
WHERE company_id = ?
GROUP BY segment;
```

### Conversas por Canal

```sql
SELECT 
  channel,
  COUNT(*) as count
FROM conversations
WHERE company_id = ?
GROUP BY channel;
```

---

## Considerações Finais

### Multi-tenancy
Todas as tabelas principais possuem `company_id` para suportar múltiplas empresas usando o mesmo sistema.

### Moeda
Os valores monetários estão armazenados como `DECIMAL` para precisão. O formato de exibição no frontend é em Real Brasileiro (R$).

### Datas
- Use `DATE` para datas sem hora (nascimento, datas de transação)
- Use `TIMESTAMP` para datas com hora (created_at, updated_at, mensagens)
- Armazene sempre em UTC e converta no frontend conforme o timezone do usuário

### Performance
- Adicione índices nas colunas usadas em WHERE, JOIN e ORDER BY
- Considere particionamento para tabelas grandes como `messages` e `transactions`
- Implemente cache para métricas calculadas frequentemente

### Segurança
- Hash de senhas usando bcrypt ou argon2
- Validação de permissões por role
- Sanitização de inputs
- Prepared statements para evitar SQL injection

---

**Documento criado com base na análise completa do frontend do dashboard DiixWhatsApp.**

Versão: 1.0  
Data: Janeiro 2026
