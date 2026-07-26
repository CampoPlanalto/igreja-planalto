# Igreja Planalto - Plataforma de Campanhas

Plataforma para criação e gestão de campanhas com formulários dinâmicos e QR codes para igrejas.

## Stack

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript 5.4
- **Estilização:** Tailwind CSS 3.4 + custom design system (lucide-react, clsx, tailwind-merge)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Formulários:** Custom dynamic forms com 11 tipos de campo + lógica condicional
- **Gráficos:** Recharts
- **QR Code:** qrcode + jsPDF
- **Testes:** Vitest + Testing Library + jsdom
- **Deploy:** Render (Docker com standalone output)

## Funcionalidades

- CRUD completo de campanhas com formulários dinâmicos
- Construtor de formulários (11 tipos de campo: text, textarea, select, checkbox, radio, date, phone, email, number, file, hidden + lógica condicional + regras de validação)
- Geração de QR codes individuais e em lote
- Dashboard com gráficos e estatísticas de visitas e conversão
- Autenticação com RBAC (3 níveis: super_admin, church_admin, member)
- Multi-igreja (multi-tenancy via tabela `churches`)
- Rastreamento UTM em respostas
- Exportação de dados
- Upload de imagens (Supabase Storage)
- Design responsivo mobile-first

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Lint (Next.js) |
| `npm run type-check` | Verificação de tipos TypeScript |
| `npm run test` | Testes (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com cobertura (mín. 70%) |
| `npm run prettier` | Verificação de formatação |
| `npm run prettier:fix` | Formatação de código |

## Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://cnwhabqttufexuwzgkeq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://igrejaplanalto.onrender.com
NEXT_PUBLIC_CHURCH_NAME=Assembleia de Deus - Igreja Campo do Planalto
NEXT_PUBLIC_CHURCH_CITY=Laranjal do Jari
NEXT_PUBLIC_CHURCH_STATE=AP
NEXT_PUBLIC_CHURCH_PHONE=(96) 99166-2185
```

## Deploy

O deploy é automatizado via Render com Docker:
1. Push na branch `main`
2. Render detecta o Dockerfile, builda a imagem e faz deploy
3. A aplicação roda como Node.js standalone server (`output: 'standalone'`)

## Estrutura do Projeto

```
src/
  app/              # Rotas e páginas (Next.js App Router)
    admin/          # Administração de igrejas
    api/            # API routes
    auth/           # Login, registro
    c/              # Rotas públicas de campanhas
    campanhas/      # Landing pages de campanhas
    dashboard/      # Painel administrativo
  components/
    admin/          # Componentes de administração
    campaigns/      # Componentes de campanha
    dashboard/      # Componentes do dashboard
    forms/          # Componentes de formulário
    layout/         # Layout e navegação
    ui/             # Design system
  lib/
    hooks/          # Hooks personalizados
    supabase/       # Clientes Supabase (browser, server, admin)
    utils/          # Utilitários
  styles/           # Estilos globais
  types/            # Tipos TypeScript
  __tests__/        # Testes (Vitest)
  middleware.ts     # Middleware de autenticação
supabase/
  schema.sql        # Schema completo do banco de dados
  migrations/       # Migrations incrementais
```

## Schema do Banco

- **churches** - Igrejas/organizações (multi-tenancy)
- **profiles** - Perfis de usuário vinculados ao auth.users
- **campaigns** - Campanhas com configurações JSON
- **campaign_fields** - Campos de formulário com lógica condicional
- **responses** - Respostas com rastreamento UTM
- **campaign_views** - Visualizações para analytics
- **user_roles** - RBAC (controle de acesso)

## Licença

MIT