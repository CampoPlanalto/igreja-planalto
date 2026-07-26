# Análise e Plano de Ação - Igreja Planalto

## Seção 1: Estado Atual do Projeto
### 1.1 Estrutura e Configurações

**Nome do Projeto:** igreja-planalto
**Versão:** 1.0.0
**Tipo:** Projeto privado (Next.js 14 + TypeScript)
**Propósito:** Plataforma de campanhas e formulários com QR Code para igrejas.

---

#### Arquivos de Configuração Encontrados

| Arquivo | Caminho | Status |
|---|---|---|
| `package.json` | `/home/tork/Projetos/igreja-planalto/package.json` | Presente |
| `tsconfig.json` | `/home/tork/Projetos/igreja-planalto/tsconfig.json` | Presente |
| `next.config.js` | `/home/tork/Projetos/igreja-planalto/next.config.js` | Presente |
| `tailwind.config.js` | `/home/tork/Projetos/igreja-planalto/tailwind.config.js` | Presente |
| `postcss.config.js` | `/home/tork/Projetos/igreja-planalto/postcss.config.js` | Presente |
| `.env.example` | `/home/tork/Projetos/igreja-planalto/.env.example` | Presente |
| `.gitignore` | `/home/tork/Projetos/igreja-planalto/.gitignore` | Presente |
| `Dockerfile` | `/home/tork/Projetos/igreja-planalto/Dockerfile` | Presente |
| `.dockerignore` | `/home/tork/Projetos/igreja-planalto/.dockerignore` | Presente |
| `.github/workflows/deploy.yml` | `/home/tork/Projetos/igreja-planalto/.github/workflows/deploy.yml` | Presente |
| `README.md` | `/home/tork/Projetos/igreja-planalto/README.md` | Presente |
| `scripts/sync-env.sh` | `/home/tork/Projetos/igreja-planalto/scripts/sync-env.sh` | Presente |

**Não encontrados:** Arquivos separados de configuração para ESLint (usa `eslint-config-next` embutido no `package.json`), Prettier, Babel, Vitest, Jest, Playwright, ou qualquer outro framework de testes.

---

#### package.json

**Scripts disponíveis:**
| Script | Comando |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |
| `type-check` | `tsc --noEmit` |

**Dependências de Produção (11):**
| Pacote | Versão |
|---|---|
| `next` | `^14.2.0` |
| `react` | `^18.3.0` |
| `react-dom` | `^18.3.0` |
| `@supabase/supabase-js` | `^2.45.0` |
| `@supabase/ssr` | `^0.5.0` |
| `qrcode` | `^1.5.3` |
| `jspdf` | `^2.5.2` |
| `lucide-react` | `^1.0.0` |
| `clsx` | `^2.1.0` |
| `tailwind-merge` | `^2.2.0` |
| `recharts` | `^2.12.0` |

**Dependências de Desenvolvimento (10):**
| Pacote | Versão |
|---|---|
| `@types/node` | `^20.12.0` |
| `@types/react` | `^18.3.0` |
| `@types/react-dom` | `^18.3.0` |
| `@types/qrcode` | `^1.5.5` |
| `typescript` | `^5.4.0` |
| `tailwindcss` | `^3.4.0` |
| `postcss` | `^8.4.38` |
| `autoprefixer` | `^10.4.19` |
| `eslint` | `^8.57.0` |
| `eslint-config-next` | `^14.2.0` |

---

#### tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- **Strict mode** ativado (`"strict": true`)
- Usa `bundler` para resolução de módulos (estratégia moderna do Next.js 14)
- Path alias `@/*` mapeado para `./src/*`
- Plugin `next` para integração com o Next.js

---

#### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',       // Saída standalone para Docker
  images: { unoptimized: true }, // Imagens sem otimização (render.com)
};
module.exports = nextConfig;
```

- **Modo standalone** ativado (para deploy Docker/Render)
- **Imagens desotimizadas** (compatível com hospedagem estática)

---

#### tailwind.config.js

```js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50 a 900 }  // Paleta dourada/marrom
        church: { gold, goldLight, dark } // Cores da igreja
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- **Paleta personalizada** com tons `primary` (dourado/marrom) e `church` (dourado da igreja)
- **Font-family** definida como `Inter`
- **Sem plugins** adicionais do Tailwind

---

#### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Plugins: `tailwindcss` e `autoprefixer` (configuração padrão para projetos Next.js com Tailwind).

---

#### ESLint

Não há arquivo `.eslintrc.*` separado. O lint é configurado via:
- `eslint: ^8.57.0` como dependência de desenvolvimento
- `eslint-config-next: ^14.2.0` como preset
- Comando: `npm run lint` (executa `next lint`)

---

#### Prettier, Vitest, Jest, Playwright

**Nenhum** desses arquivos/configurações foi encontrado no projeto:
- `/.prettierrc` / `.prettierrc.json` / `.prettierrc.js` -- **Ausente**
- `/vitest.config.*` -- **Ausente**
- `/jest.config.*` -- **Ausente**
- `/playwright.config.*` -- **Ausente**

Não há configuração de formatação ou testes automatizados instalada/configurada.

---

#### .env.example (Variáveis de Ambiente)

| Variável | Exemplo de Valor | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cnwhabqttufexuwzgkeq.supabase.co` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Chave anônima do Supabase |
| `NEXT_PUBLIC_APP_URL` | `https://igrejaplanalto.onrender.com` | URL pública do app |
| `NEXT_PUBLIC_CHURCH_NAME` | `Assembleia de Deus - Igreja Campo do Planalto` | Nome da igreja |
| `NEXT_PUBLIC_CHURCH_CITY` | `Laranjal do Jari` | Cidade |
| `NEXT_PUBLIC_CHURCH_STATE` | `AP` | Estado |
| `NEXT_PUBLIC_CHURCH_PHONE` | `(96) 99166-2185` | Telefone |

---

#### .gitignore

```
node_modules/
.next/
out/
.env.local
.env*.local
*.tsbuildinfo
next-env.d.ts
.DS_Store
*.log
```

---

#### Dockerfile (Multi-stage build)

- **Base:** `node:20-alpine`
- **Stage 1 (deps):** Instala dependências de produção com `npm ci --only=production`
- **Stage 2 (builder):** Copia tudo, executa `npm run build`
- **Stage 3 (runner):** Usuário `nextjs`, expõe porta `3000`, executa `server.js` (standalone)
- Usa `standalone` output do Next.js para imagem final enxuta

---

#### .dockerignore

Exclui: `node_modules`, `.git`, `.next`, `out`, `.env`, `.env.local`, `.env.production`, `*.md`, `.DS_Store`

---

#### GitHub Actions (deploy.yml)

- **Trigger:** Push na branch `main`
- **Node:** 20 com cache npm
- **Passos:** `npm ci` -> `npm run type-check` -> `npm run build`
- **Env:** `SUPABASE_URL` e `SUPABASE_ANON_KEY` via secrets
- **Nota:** Workflow apenas faz build/type-check, sem step de deploy explícito

---

#### middleware.ts (Autenticação)

- Cria cliente Supabase SSR (server-side com cookies)
- Redireciona usuários não autenticados para `/dashboard/login`
- Redireciona usuários autenticados que estão em páginas de auth para `/dashboard`
- `matcher` configurado para `/dashboard/:path*`

---

#### scripts/sync-env.sh

Script utilitário para sincronizar variáveis de ambiente do GitHub Secrets para o Render via API REST.

---

#### Estrutura de Diretórios (src/)

```
src/
  app/                    # App Router (Next.js 14)
    layout.tsx
    page.tsx
    globals.css
    auth/callback/page.tsx
    dashboard/            # Rotas protegidas
      page.tsx
      layout.tsx
      login/page.tsx
      register/page.tsx
      logout/page.tsx
      reset-password/page.tsx
      campaigns/page.tsx
      campaigns/new/page.tsx
      campaigns/[id]/edit/page.tsx
      visitors/page.tsx
      responses/page.tsx
      qrcodes/page.tsx
      users/page.tsx
      settings/page.tsx
    c/[churchSlug]/[campaignSlug]/page.tsx  # Rotas públicas
  components/
    ui/                   # Componentes base
      Button.tsx
      Card.tsx
      Input.tsx
      Modal.tsx
      FormComponents.tsx
      ImageUpload.tsx
    campaigns/            # Componentes de campanha
      CampaignForm.tsx
      QRCodeGenerator.tsx
    layout/
      Layout.tsx
  lib/
    utils.ts              # Utilitários (cn, formatDate, slugify, etc.)
    hooks/
      useSupabase.ts      # Hooks: useCampaigns, useCampaignFields, useResponses, useDashboardStats
    supabase/
      client.ts           # Cliente browser (createBrowserClient)
      server.ts           # Cliente server (createServerClient)
      upload.ts           # Upload de imagens para Storage Supabase
  types/
    index.ts              # Tipos: Campaign, CampaignSettings, CustomField, CampaignField, FormResponse, Church, User, DashboardStats, VisitorTrend
    database.ts           # Tipos gerados do Supabase (Database, Tables, Enums)
  middleware.ts           # Proteção de rotas dashboard
```

---

#### Observações Relevantes

1. **Sem testes configurados:** Não há Jest, Vitest, Playwright, ou qualquer framework de testes. Isso representa uma lacuna significativa.
2. **Sem formatador:** Não há configuração do Prettier.
3. **ESLint básico:** Apenas o preset `eslint-config-next`, sem customizações.
4. **TypeScript estrito:** `strict: true` está ativado, o que é bom para qualidade de código.
5. **Docker pronto:** Projeto já configurado para deploy containerizado com Docker multi-stage.
6. **CI básico:** GitHub Actions faz type-check e build, mas não faz deploy automático.
7. **Supabase SSR:** Usa `@supabase/ssr` para autenticação com cookies em Server Components.
8. **QR Code e PDF:** Dependências `qrcode` e `jspdf` para geração de QR Codes e PDFs.
9. **Recharts:** Para gráficos no dashboard.
10. **Path alias `@/`:** Facilita imports a partir de `src/`.
11. **Tailwind com tema personalizado:** Paleta dourada e font Inter.

### 1.2 Rotas e Layouts
**Analisado pelo Agente 2**

---

#### ARVORE COMPLETA DE DIRETORIOS

```
src/app/
├── admin/                            (vazio)
├── api/                              (vazio)
├── auth/
│   └── callback/
│       └── page.tsx                  [66 linhas] - Callback OAuth do Supabase
├── c/
│   └── [churchSlug]/
│       └── [campaignSlug]/
│           └── page.tsx              [12 linhas] - Rota publica do formulario de campanha
├── campanhas/                        (vazio)
├── dashboard/
│   ├── campaigns/
│   │   ├── "[id]"/edit/              (vazio - duplicata estaleira com aspas no nome)
│   │   ├── [id]/edit/
│   │   │   └── page.tsx              [717 linhas] - Editor de campanha com construtor de formulario
│   │   ├── new/
│   │   │   └── page.tsx              [294 linhas] - Criacao de nova campanha
│   │   └── page.tsx                  [355 linhas] - Listagem/CRUD de campanhas
│   ├── login/
│   │   └── page.tsx                  [130 linhas] - Pagina de login
│   ├── logout/
│   │   └── page.tsx                  [38 linhas] - Logout automatico com redirect
│   ├── qrcodes/
│   │   └── page.tsx                  [229 linhas] - Gerenciamento de QR Codes
│   ├── register/
│   │   └── page.tsx                  [162 linhas] - Cadastro de usuario
│   ├── reset-password/
│   │   └── page.tsx                  [114 linhas] - Redefinicao de senha
│   ├── responses/
│   │   └── page.tsx                  [391 linhas] - Visualizacao/exportacao de respostas
│   ├── settings/
│   │   └── page.tsx                  [830 linhas] - Configuracoes multi-aba da igreja
│   ├── users/
│   │   └── page.tsx                  [512 linhas] - Gerenciamento de usuarios (super_admin)
│   ├── visitors/
│   │   └── page.tsx                  [333 linhas] - Listagem de visitantes agrupados
│   ├── layout.tsx                    [17 linhas] - Layout condicional (auth vs dashboard)
│   └── page.tsx                      [772 linhas] - Dashboard principal com graficos
├── globals.css                       [120 linhas] - Estilos globais e utilitarios Tailwind
├── layout.tsx                        [19 linhas] - Root layout
└── page.tsx                          [114 linhas] - Landing page publica

Total: 19 arquivos (3 diretorios vazios: admin/, api/, campanhas/)
Nao existem loading.tsx, error.tsx ou not-found.tsx em nenhum nivel.
---

#### DETALHAMENTO DE CADA ARQUIVO

##### 1. `/src/app/layout.tsx` (Root Layout)
- **Tipo**: Server Component (sem 'use client')
- **Metadata**: Titulo "Igreja Campo do Planalto - Laranjal do Jari - AP"
- **Estrutura**: HTML `<html lang="pt-BR">` com `<body>{children}</body>`
- **Imports**: `./globals.css`, `next/metadata`
- **Observacao**: Simples, sem fontes externas carregadas explicitamente (usa fallback `system-ui, sans-serif` do CSS)

##### 2. `/src/app/page.tsx` (Landing Page)
- **Tipo**: Client Component (`'use client'`)
- **Conteudo**: Header com logo "Planalto" + link para area administrativa; secao Hero com gradiente; botoes "Preencher minha ficha" (link para `/campanhas`) e "Area Administrativa" (link para `/dashboard/login`); secao de informacoes (cultos, localizacao, boas-vindas); footer
- **Componentes utilizados**: `Button` de `@/components/ui/Button`
- **Links**: `/campanhas` (diretorio VAZIO - sem pagina) e `/dashboard/login`
- **Problema**: O link "Preencher minha ficha" aponta para `/campanhas` que NAO possui um `page.tsx`, resultando em 404

##### 3. `/src/app/globals.css`
- **Diretivas**: `@tailwind base/components/utilities`
- **Variaveis CSS**: `--foreground-rgb`, `--background-start-rgb`, `--background-end-rgb`
- **Classes utilitarias customizadas**: `.container-custom`, `.btn`/`.btn-primary`/`.btn-secondary`/`.btn-outline`/`.btn-gold`, `.input`, `.label`, `.card`/`.card-header`/`.card-body`/`.card-footer`, `.badge`/`.badge-primary`/`.badge-success`/`.badge-warning`/`.badge-danger`/`.badge-gold`
- **Animacoes**: `fade-in-up`, `pulse-skeleton`
- **Tema**: Tons dourados/terra (primary, gold, tons pastel)

##### 4. `/src/app/dashboard/layout.tsx`
- **Tipo**: Client Component
- **Logica**: Verifica se a rota atual esta em `authRoutes` (`/dashboard/login`, `/register`, `/reset-password`, `/logout`). Se sim, renderiza `{children}` sem layout. Caso contrario, renderiza `<DashboardLayout>{children}</DashboardLayout>`.
- **Import**: `DashboardLayout` de `@/components/layout/Layout`

##### 5. `/src/app/dashboard/page.tsx` (Dashboard Principal)
- **Tipo**: Client Component
- **Funcionalidades**: 
  - Cards de estatisticas (total campanhas, visitantes, decisoes, pedidos de oracao)
  - Grafico de area (visitantes ultimos 30 dias) com Recharts
  - Grafico de barras (desempenho Top 6 campanhas)
  - Acoes rapidas (nova campanha, QR codes, visitantes, exportar, configuracoes)
  - Tabela de respostas recentes
  - Tabela de todas as campanhas com botoes de acao (QR Code, Editar, Duplicar, Arquivar/Excluir)
  - Modais: QR Code, Confirmacao de exclusao, Confirmacao de arquivamento
- **Componente auxiliar**: `StatCard` (definido no mesmo arquivo)
- **CRUD**: Delete, archive, duplicate campaigns via Supabase

##### 6. `/src/app/dashboard/login/page.tsx`
- **Tipo**: Client Component
- **Fluxo**: Formulario email/senha -> `supabase.auth.signInWithPassword` -> redireciona para `/dashboard`
- **UX**: Mostra/oculta senha, estados de loading e erro, link "Esqueceu a senha?" e "Criar conta"
- **Seguranca**: Sem protecao CSRF explicita; usa autenticacao nativa do Supabase

##### 7. `/src/app/dashboard/register/page.tsx`
- **Tipo**: Client Component
- **Fluxo**: Formulario nome/email/senha/confirmar -> `supabase.auth.signUp` com `emailRedirectTo`
- **Validacoes**: Senhas coincidem, minimo 6 caracteres, email valido
- **Estado sucesso**: Mensagem de confirmacao com link para login

##### 8. `/src/app/dashboard/reset-password/page.tsx`
- **Tipo**: Client Component
- **Fluxo**: Input email -> `supabase.auth.resetPasswordForEmail` -> estado de envio
- **Redirect**: Configurado para `window.location.origin + /auth/callback`

##### 9. `/src/app/dashboard/logout/page.tsx`
- **Tipo**: Client Component
- **Fluxo**: `useEffect` -> `supabase.auth.signOut` -> `setTimeout` 1s -> redirect `/dashboard/login`
- **Simples**: Sem confirmacao, executa automaticamente ao montar

##### 10. `/src/app/dashboard/campaigns/page.tsx`
- **Tipo**: Client Component
- **Funcionalidades**: Listagem com busca, filtro (Todas/Ativas/Inativas), tabela com acoes
- **CRUD**: Excluir, duplicar (com campos), alternar ativo/inativo
- **Tipagem**: Usa `Database['public']['Tables']['campaigns']['Row']` de `@/types/database`

##### 11. `/src/app/dashboard/campaigns/new/page.tsx`
- **Tipo**: Client Component
- **Formulario**: Titulo (auto-slug), descricao, banner (ImageUpload), datas, tipo (10 tipos pre-definidos), configuracoes do formulario
- **Fluxo**: Carrega perfil do usuario para obter `church_id` -> valida -> insere no Supabase -> redireciona para edit
- **Observacao**: Usa `generateSlug` de `@/lib/utils`

##### 12. `/src/app/dashboard/campaigns/[id]/edit/page.tsx`
- **Tipo**: Client Component
- **Construtor de Formulario**: Adicionar/editar/excluir/reordenar campos customizados (9 tipos: text, textarea, select, checkbox, radio, date, phone, email, number)
- **Suporte a opcoes**: Para tipos select/checkbox/radio com adicao/remocao de opcoes
- **Persistencia**: Campos sao salvos como `settings.custom_fields` no JSONB do Supabase
- **Estados**: Loading, NotFound (com tratamento de erro PGRST116), erro, sucesso

##### 13. `/src/app/dashboard/users/page.tsx`
- **Tipo**: Client Component
- **Protecao**: Exibe "Acesso Restrito" se `currentUserRole !== 'super_admin'`
- **CRUD**: Criar usuario (via RPC `create_user_with_role`), alterar funcao, alterar senha (via RPC `change_user_password`), excluir (via RPC `delete_user_with_role`)
- **Roles**: super_admin, church_admin, secretary, receptionist, user

##### 14. `/src/app/dashboard/visitors/page.tsx`
- **Tipo**: Client Component
- **Agrupamento**: Agrupa responses por nome/telefone/email do visitante
- **Visualizacao**: Grid de cards com iniciais, contagem de respostas, info de contato, campanhas participadas
- **Exportacao**: CSV com BOM UTF-8
- **Modal**: Detalhes do visitante com todas as respostas

##### 15. `/src/app/dashboard/responses/page.tsx`
- **Tipo**: Client Component
- **Filtros**: Busca textual, filtro por campanha, filtro por periodo (data inicio/fim)
- **Visualizacao**: Tabela (desktop) + cards (mobile)
- **Exportacao**: CSV e Excel (formato XLS com conteudo CSV)
- **Modal**: Detalhes completos da resposta com dados do formulario

##### 16. `/src/app/dashboard/qrcodes/page.tsx`
- **Tipo**: Client Component
- **Funcionalidades**: Lista campanhas com checkbox, selecao em lote, geracao individual/em lote de QR Codes
- **BASE_URL**: Hardcoded `'https://igrejaplanalto.onrender.com'`
- **Componentes**: `QRCodeGenerator` e `BatchQRCodeGenerator` de `@/components/campaigns/QRCodeGenerator`

##### 17. `/src/app/dashboard/settings/page.tsx`
- **Tipo**: Client Component
- **MAIOR ARQUIVO**: 830 linhas
- **Abas**: Perfil, Contato, Redes Sociais, Personalizacao (cores), Configuracoes, Usuarios, Meu Perfil
- **Funcionalidades**: Upload de imagem (logo, banner, avatar), seletor de cores com preview, toggle switches, convite de usuarios
- **Persistencia**: Salva por aba individualmente

##### 18. `/src/app/c/[churchSlug]/[campaignSlug]/page.tsx`
- **Tipo**: Client Component
- **Simples**: Extrai `churchSlug` e `campaignSlug` dos params e renderiza `<CampaignForm>`
- **Finalidade**: Rota publica para visitantes preencherem formularios de campanha

##### 19. `/src/app/auth/callback/page.tsx`
- **Tipo**: Client Component
- **Fluxo**: Le o `code` da URL -> `supabase.auth.exchangeCodeForSession` -> redirect para `/dashboard`
- **Seguranca**: Valida o parametro `next` para evitar open redirect (permite apenas path local)
- **Estados**: Loading com spinner, erro com mensagem e botao de retorno

---

#### ANALISE E OBSERVACOES

**Pontos Fortes:**
- Organizacao consistente com o App Router do Next.js 13+
- Uso padrao de layouts aninhados (root + dashboard condicional)
- Dashboard layout com separacao clara entre rotas auth e protegidas
- Rota publica de campanha bem estruturada com slugs aninhados
- CRUD completo implementado para campanhas, usuarios e configuracoes

**Problemas Identificados:**

1. **Rota quebrada**: O link "Preencher minha ficha" na landing page (`page.tsx`) aponta para `/campanhas`, mas este diretorio esta VAZIO (sem `page.tsx`), resultando em 404.

2. **Diretorios vazios**: `/admin/` e `/api/` estao vazios. Podem ser planejados para futuro ou sobra de estrutura inicial.

3. **Ausencia de arquivos de estado**: NENHUMA rota possui `loading.tsx`, `error.tsx` ou `not-found.tsx`. Isso significa que erros e carregamento sao tratados manualmente dentro de cada pagina (via estados `useState`), sem a experiencia fluida que o Next.js App Router oferece com esses arquivos especiais.

4. **Duplicata estranha**: Existe um diretorio `"[id]"` (com aspas duplas no nome) dentro de `campaigns/` que parece ser uma duplicata acidental/backup do diretorio `[id]`. Este diretorio esta vazio mas polui a arvore.

5. **Hardcoded URL**: Em `qrcodes/page.tsx`, a `BASE_URL` esta hardcoded como `'https://igrejaplanalto.onrender.com'`. Isso deveria vir de variavel de ambiente (`NEXT_PUBLIC_SITE_URL` ou similar).

6. **Server Components ausentes**: ABSOLUTAMENTE TODAS as paginas sao Client Components (`'use client'`). Nenhuma pagina utiliza Server Components, o que pode impactar performance (maior bundle JS, sem SSR otimizado para paginas publicas).

7. **Root layout minimalista**: O root layout define apenas html/body. Nao carrega fontes (como Inter via next/font), nao define meta tags Open Graph, nao inclui analytics ou elementos de SEO.

8. **Tipagem mista**: `campaigns/page.tsx` usa `Database['public']['Tables']['campaigns']['Row']` e estende com campos computados, enquanto `dashboard/page.tsx` define suas proprias interfaces manualmente.

9. **Exportacao Excel**: Em `responses/page.tsx`, a exportacao "Excel" gera um arquivo `.xls` mas com conteudo CSV, o que funciona mas nao e um formato Excel genuino.

10. **Tratamento de erros**: Algumas paginas usam `try/catch` com `alert()` para erros (ex: `handleDelete`, `handleDuplicate`), outras usam estado de feedback. Ha inconsistencia.


### 1.3 Componentes

**Estrutura**: 9 arquivos de componente em 4 diretórios (`campaigns/`, `ui/`, `layout/`). Os diretórios `admin/`, `dashboard/` e `forms/` estão vazios.

#### `/src/components/campaigns/CampaignForm.tsx`
- **Props**: `{ churchSlug?: string; campaignSlug?: string }`
- **Hooks**: `useState` (campaign, loading, error, formData, errors, submitting, submitted, showSuccess, viewCount), `useEffect` (fetch dos dados da campanha via Supabase, incrementa contagem de views)
- **Renderiza**: Banner da campanha, título, descrição, datas. Formulário dinâmico com campos text, textarea, select, checkbox, radio, date, phone, email. Validação por campo (obrigatório, email, phone, minLength, maxLength, pattern). Submissão para tabela `responses` do Supabase. Modal de sucesso com mensagem de agradecimento. Botão flutuante do WhatsApp. Estado de loading com skeleton. Estado de erro com mensagem "Campanha não encontrada".
- **Dependências**: `@/lib/supabase/client`, `@/lib/utils` (cn, formatDate, formatPhone), `@/components/ui/FormComponents`, `@/components/ui/Card`, `@/components/ui/Modal`, `lucide-react`

#### `/src/components/campaigns/QRCodeGenerator.tsx`
- **Props**: `QRCodeGenerator` => `{ url: string; title: string; onDownload?: (format: 'png'|'svg'|'pdf', dataUrl: string) => void }`. `BatchQRCodeGenerator` => `{ campaigns: Array<{ id: string; title: string; url: string; slug: string }> }`
- **Hooks**: `useState` (options, qrCodeDataUrl, svgString, loading, showOptions, logoFile, logoPreview), `useRef` (canvasRef, svgRef), `useEffect` (regenera QR Code ao mudar url/options/logoPreview). `BatchQRCodeGenerator` usa `useState` (selectedIds, format, generating, progress).
- **Renderiza**: Preview do QR Code com overlay de ações (copiar, baixar PNG). Modal de personalização (tamanho, margem, cores, upload de logo). Botões de download PNG, SVG e PDF. Cópia para área de transferência. Alert com dicas de uso. **Batch**: tabela com checkboxes para seleção múltipla, seletor de formato, barra de progresso.
- **Dependências**: `@/lib/utils`, `@/components/ui/Button`, `@/components/ui/Card`, `@/components/ui/Input`, `@/components/ui/Modal`, `@/components/ui/FormComponents` (Alert), `lucide-react`, `qrcode` (import dinâmico), `jspdf` (import dinâmico)

#### `/src/components/ui/ImageUpload.tsx`
- **Props**: `{ currentUrl?: string | null; onUpload: (url: string) => void; label?: string; className?: string; previewClassName?: string }`
- **Hooks**: `useState` (uid, preview, uploading, error), `useRef` (inputRef, objectUrlRef), `useEffect` (cleanup do object URL no unmount)
- **Renderiza**: Input file oculto, preview da imagem com botão de remover, dropzone para upload, indicador de loading, mensagem de erro. Upload via `uploadImage()` do `@/lib/supabase/upload`. Valida tipo imagem e tamanho máx 5MB.
- **Dependências**: `@/lib/utils`, `@/lib/supabase/upload`, `lucide-react`

#### `/src/components/ui/FormComponents.tsx`
- **Props**: Múltiplos componentes exportados:
  - `Button`: `{ variant?, size?, ...ButtonHTMLAttributes }` (redefinido, com variantes primary/secondary/outline/gold/ghost/danger e sizes sm/md/lg/xl)
  - `Input`: `{ label?, error?, hint?, ...InputHTMLAttributes }`
  - `Textarea`: `{ label?, error?, hint?, ...TextareaHTMLAttributes }`
  - `Select`: `{ label?, error?, hint?, options?, placeholder?, ...SelectHTMLAttributes }`
  - `Checkbox`: `{ label?, ...InputHTMLAttributes }`
  - `RadioGroup`: `{ label, name, options, value, onChange, error?, className? }`
  - `Label`, `Card`, `CardHeader`, `CardBody`, `CardFooter`: `{ children, className?, ...HTMLAttributes }`
  - `Badge`: `{ variant?: 'primary'|'success'|'warning'|'danger'|'gold', ...HTMLAttributes }`
  - `Alert`: `{ variant?: 'info'|'success'|'warning'|'danger', title?, onClose?, children }`
  - `Modal`: `{ isOpen, onClose, title, children, footer?, size? }` (redefinido, versão inline)
  - `DropdownMenu`: `{ trigger, items: Array<{ label, onClick, icon?, danger? }> }`
- **Hooks**: `forwardRef` (Button, Input, Textarea, Select, Checkbox), `useState` (DropdownMenu isOpen), `useEffect` (DropdownMenu click outside listener), `useRef` (DropdownMenu ref)
- **Renderiza**: Cada componente renderiza seu elemento HTML com estilos padronizados, suporte a erro/hint, acessibilidade (aria-invalid, aria-describedby, role)
- **Dependências**: `@/lib/utils` (cn)

#### `/src/components/ui/Button.tsx`
- **Props**: `Button` => `{ variant?, size?, loading?, ...ButtonHTMLAttributes }` (com loading spinner). `ButtonGroup` => `{ children, className? }`. `IconButton` => `{ 'aria-label': string, ...ButtonHTMLAttributes }`
- **Hooks**: `forwardRef`
- **Renderiza**: Botão estilizado com spinner animado de loading, variantes (primary/secondary/outline/gold/ghost/danger), tamanhos (sm/md/lg/xl). Grupo de botões como container flex. IconButton para botões ícone com padding e hover.
- **Dependências**: `@/lib/utils` (cn). **Nota**: Componente `Button` existe tanto em `Button.tsx` quanto em `FormComponents.tsx` com implementações diferentes -- possível duplicação.

#### `/src/components/ui/Modal.tsx`
- **Props**: `Modal` => `{ isOpen, onClose, title?, description?, children, size?: 'sm'|'md'|'lg'|'xl'|'full', showCloseButton?, closeOnOverlayClick?, closeOnEscape? }`. `ConfirmDialog` => `{ isOpen, onClose, onConfirm, title, message, confirmText?, cancelText?, variant?, loading? }`. `AlertDialog` => `{ isOpen, onClose, title, message, buttonText? }`
- **Hooks**: Nenhum (componentes funcionais puros)
- **Renderiza**: Overlay com backdrop semitransparente, diálogo centralizado, cabeçalho com título/descrição/botão fechar, conteúdo, suporte à tecla Escape. ConfirmDialog com botões de confirmação/cancelamento. AlertDialog com botão OK.
- **Dependências**: `@/lib/utils` (cn), `./Button`, `lucide-react` (X). **Nota**: Componente `Modal` existe também em `FormComponents.tsx` -- possível duplicação de lógica.

#### `/src/components/ui/Input.tsx`
- **Props**: Arquivo barrel de re-export. Não define componentes novos.
- **Re-exporta**: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Label` de `./FormComponents`
- **Renderiza**: N/A (apenas re-exports)

#### `/src/components/ui/Card.tsx`
- **Props**: `Card`, `CardHeader`, `CardBody`, `CardFooter` => `HTMLAttributes<HTMLDivElement>`. `Badge` => `{ variant?: 'primary'|'success'|'warning'|'danger'|'gold'|'gray', ...HTMLAttributes<HTMLSpanElement> }`. `Divider` => `HTMLAttributes<HTMLHRElement>`
- **Hooks**: `forwardRef`
- **Renderiza**: Container card com classes estilizadas, header/body/footer, badge com variantes de cor, divisor hr
- **Dependências**: `@/lib/utils` (cn). **Nota**: `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge` também existem em `FormComponents.tsx` -- duplicação.

#### `/src/components/layout/Layout.tsx`
- **Props**: `Sidebar` => `{ isOpen: boolean; onClose: () => void }`. `Header` => `{ onMenuClick: () => void }`. `DashboardLayout` => `{ children: ReactNode }`. `PublicLayout` => `{ children: ReactNode }`
- **Hooks**: `useState` (sidebarOpen, userRole), `useEffect` (busca role do usuário logado no Supabase), `usePathname` (next/navigation para link ativo)
- **Renderiza**: **Sidebar**: logo, navegação principal (Dashboard, Campanhas, QR Codes, Visitantes, Configurações), seção admin condicional para super_admin (Usuários), botão Sair. Overlay mobile. **Header**: responsivo para mobile com botão menu hamburguer. **DashboardLayout**: sidebar + header + conteúdo com padding responsivo. **PublicLayout**: header simples com link para área admin, footer com nome da igreja via env.
- **Dependências**: `next/link`, `next/navigation`, `@/lib/utils`, `@/components/ui/Button`, `@/lib/supabase/client`, `lucide-react`

#### Observações Gerais
- **Diretórios vazios**: `admin/`, `dashboard/` e `forms/` não possuem nenhum arquivo.
- **Duplicação de componentes**: `Button`, `Modal`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge` existem tanto em `FormComponents.tsx` quanto em seus arquivos dedicados (`Button.tsx`, `Modal.tsx`, `Card.tsx`), com implementações ligeiramente diferentes. Isso representa duplicação de código e possível inconsistência.
- **Import dinâmico**: `QRCodeGenerator` usa `import('qrcode')` e `import('jspdf')` dinamicamente para evitar SSR issues.
- **Acessibilidade**: A maioria dos componentes inclui `aria-label`, `aria-invalid`, `aria-describedby`, `role` para acessibilidade.
- **Client Components**: Todos os 9 arquivos são marcados com `'use client'`.

### 1.4 Libs e Utilitários
## Relatório do Agente 4 - Libs e Utilitários

### Arquivos analisados em `src/lib/`:

| # | Arquivo | Propósito |
|---|---------|-----------|
| 1 | **src/lib/utils.ts** (109 linhas) | Coleção de funções utilitárias gerais: `cn()` (merge de classes Tailwind via clsx+twMerge), `formatDate`/`formatDateTime` (formatação pt-BR), `slugify`/`generateSlug` (geração de slugs SEO-friendly), `getInitials` (iniciais de nomes), `formatPhone`/`validatePhone`/`validateEmail` (formatação e validação de contato), `truncate` (corte de texto), `getStatusColor` (mapeamento de status para badges), `formatNumber`/`calculatePercentage` (formatação numérica pt-BR), `sleep` (delay), `debounce` (controle de chamadas). |
| 2 | **src/lib/hooks/useSupabase.ts** (344 linhas) | **4 hooks React** para acesso a dados do Supabase no lado cliente. `useCampaigns(churchId?)`: CRUD completo de campanhas. `useCampaignFields(campaignId?)`: CRUD + reordenação de campos dinâmicos de formulário. `useResponses(campaignId?)`: leitura de respostas + exportação para CSV/Excel. `useDashboardStats(churchId?)`: estatísticas agregadas (totais, ativas, visitantes por período, decisões, orações, visitas, discipulado, membros) + tendências dos últimos 30 dias. **Observação**: O hook `useResponses` nomeia incorretamente a exportação como `exportToCSV` mas ela executa `exportToExcel`. |
| 3 | **src/lib/supabase/client.ts** (8 linhas) | Factory do cliente Supabase para browser. Usa `createBrowserClient` de `@supabase/ssr` com `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. |
| 4 | **src/lib/supabase/server.ts** (32 linhas) | Factory do cliente Supabase para server-side (Server Components, Route Handlers, Server Actions). Usa `createServerClient` de `@supabase/ssr` com cookie store do Next.js. Tratamento de erros minimalista (catch vazio). |
| 5 | **src/lib/supabase/upload.ts** (26 linhas) | Utilitário `uploadImage(file, path)` para upload de imagens no bucket `images` do Supabase Storage. Gera nome único com timestamp, retorna a URL pública. |

### Arquivos complementares (fora de src/lib/):

| # | Arquivo | Propósito |
|---|---------|-----------|
| 6 | **.env.example** (10 linhas) | Template de variáveis de ambiente: conexão Supabase (URL + anon key), URL da aplicação Render, dados da igreja (nome, cidade, estado, telefone). |
| 7 | **supabase/schema.sql** (350 linhas) | Schema completo do banco PostgreSQL. Define 6 tabelas principais (`churches`, `profiles`, `campaigns`, `campaign_fields`, `responses`, `campaign_views`), índices, RLS (Row Level Security) com políticas granulares, triggers de `updated_at`, trigger de criação automática de profile no signup, função `increment_campaign_views`, tabela `user_roles` para RBAC, permissões e seed data. |

### Achados e observações:

1. **Conflito de nomenclatura**: Em `useSupabase.ts`, `useResponses` retorna `exportToCSV` mas a função implementada é `exportToExcel` (cria Blob e link de download). O `exportToCSV` interno (que gera string CSV) nunca é exposto.
2. **Cliente server sem isolamento**: `server.ts` não faz distinção entre criação de cliente para Server Components vs Route Handlers vs Server Actions, o que pode causar problemas de cache/reatividade.
3. **Tratamento de erro no cookie server**: O `catch` nos métodos `set`/`remove` de cookies no server.ts está vazio, suprimindo silenciosamente possíveis erros.
4. **Bucket name hardcoded**: Em `upload.ts`, o bucket `'images'` está hardcoded; não há fallback ou configuração via env.
5. **Schema robusto**: O schema.sql possui RLS granular, triggers, índices e seed data, indicando maturidade na modelagem. Inclui suporte a multi-tenancy via `church_id` e UTM tracking nas respostas.
6. **Dependências**: O projeto usa `clsx`, `tailwind-merge`, `@supabase/ssr` e `next/headers` (App Router).
7. **Segurança**: As RLS policies estão bem definidas, separando acesso público (select em campanhas públicas, insert em responses) de acesso administrativo (CRUD completo). O schema utiliza `SECURITY DEFINER` nas funções sensíveis.

### 1.5 Dashboard (Admin)

**Estrutura de Diretorios:**
```
dashboard/
  layout.tsx           - Layout raiz do dashboard
  page.tsx             - Pagina principal (home do admin)
  login/page.tsx       - Login
  logout/page.tsx      - Logout
  register/page.tsx    - Cadastro de novos admins
  reset-password/page.tsx - Redefinicao de senha
  settings/page.tsx    - Configuracoes da igreja (multi-aba)
  users/page.tsx       - Gerenciamento de usuarios (super_admin)
  qrcodes/page.tsx     - Geracao individual e em lote de QR Codes
  visitors/page.tsx    - Lista de visitantes agrupados
  responses/page.tsx   - Lista de respostas com exportacao
  campaigns/
    page.tsx           - Lista de campanhas (CRUD)
    new/page.tsx       - Criar nova campanha
    [id]/edit/page.tsx - Editar campanha + construtor de formulario
```

**1. layout.tsx (17 linhas)**
- Usa `usePathname` (next/navigation) para detectar auth routes.
- Importa `DashboardLayout` de `@/components/layout/Layout`.
- Define authRoutes: login, register, reset-password, logout.
- Auth routes renderizam sem wrapper; demais rotas sao envolvidas em `<DashboardLayout>`.

**2. page.tsx - Dashboard Principal (772 linhas)**
- 4 interfaces: `Campaign`, `Response`, `DashboardStats`, `VisitorTrend`.
- Imports: react (useState/useEffect), next/navigation (useRouter), supabase client, componentes UI (Card, Button, Badge, Input, Modal, ConfirmDialog), 20+ icones lucide-react, recharts (AreaChart, BarChart, PieChart, Area, Bar, Line, Cell, Tooltip, ResponsiveContainer), utilitarios (cn, formatDate, formatNumber, getInitials, formatPhone), QRCodeGenerator/BatchQRCodeGenerator.
- Fetch de todas as campanhas com join church + count de responses.
- Calcula stats: total/active campaigns, total visitors.
- Fetch de trends (30 dias) da tabela responses.
- Fetch das 10 respostas mais recentes.
- CRUD completo: delete, archive, duplicate (inclui duplicacao de campaign_fields).
- 4 StatCards: Total Campanhas, Total Visitantes, Decisoes por Cristo, Pedidos de Oracao.
- Grafico AreaChart: Visitantes nos ultimos 30 dias com gradiente.
- Grafico BarChart: Top 6 campanhas por visitantes (layout vertical).
- Painel de Acoes Rapidas: 5 botoes (Nova Campanha, QR Codes, Visitantes, Exportar, Configs).
- Tabela de Respostas Recentes (10 ultimas, com avatar, campanha, telefone, email, data).
- Tabela de Todas as Campanhas com botoes por linha (QR Code, Editar, Duplicar, Arquivar/Excluir).
- Modals: QR Code generator, Confirmacao de exclusao, Confirmacao de arquivamento.
- Componente interno StatCard.

**3. login/page.tsx (130 linhas)**
- Formulario de email + senha com submit via `supabase.auth.signInWithPassword`.
- Traducao de erro "Invalid login credentials" para "Email ou senha incorretos".
- Toggle show/hide password (icones Eye/EyeOff).
- Links para "Esqueceu a senha?" e "Criar conta".

**4. logout/page.tsx (38 linhas)**
- No mount: executa `supabase.auth.signOut()`.
- Apos 1 segundo, redireciona para `/dashboard/login`.
- Spinner com mensagens: "Saindo..." e "Redirecionando...".

**5. register/page.tsx (162 linhas)**
- Formulario: nome, email, senha, confirmar senha.
- Validacoes: senhas coincidem, minimo 6 caracteres.
- Submit via `supabase.auth.signUp` com `options.data.full_name` e `emailRedirectTo`.
- Tela de sucesso com mensagem de confirmacao de email.

**6. reset-password/page.tsx (114 linhas)**
- Formulario de email para redefinicao de senha.
- Submit via `supabase.auth.resetPasswordForEmail` com `redirectTo`.
- Tela de sucesso apos envio do link.

**7. settings/page.tsx - Configuracoes (830 linhas)**
- 7 abas: Perfil, Contato, Redes Sociais, Personalizacao, Configuracoes, Usuarios, Meu Perfil.
- Carrega dados da igreja (churches) e do profile atual.
- Aba Perfil: Nome, Slug (auto-gerado por slugify com tracking de edicao manual via useRef), Slogan, Logo (ImageUpload), Banner (ImageUpload).
- Aba Contato: Endereco (Textarea), Telefone, Email, Website.
- Aba Redes Sociais: Facebook, Instagram, YouTube, WhatsApp. Salva em social_links JSON + campo whatsapp.
- Aba Personalizacao: Cores primaria/secundaria com color picker nativo + input hex + preview visual.
- Aba Configuracoes: Toggles customizados "Permitir Cadastro" e "Exigir Aprovacao" (aria-checked, switch), Email de notificacao.
- Aba Usuarios: Lista de profiles com badges de role. Modal de convite (email + select role). Remocao com confirmacao. Super admin protegido.
- Aba Meu Perfil: Nome + Avatar (ImageUpload com preview circular).
- Alertas de sucesso/erro com auto-dismiss 4s.
- Cada secao salva independentemente via funcao saveChurch(section, updates).

**8. users/page.tsx - Gerenciamento de Usuarios (512 linhas)**
- Exclusivo para super_admin: usuarios sem role super_admin veem tela "Acesso Restrito".
- Fetch de user_roles + profiles.
- 5 roles: super_admin (badge danger + icone Crown), church_admin (primary), secretary (warning), receptionist (success), user (gray).
- CRUD completo:
  - Criar: Modal com nome, email, senha, role (usa RPC create_user_with_role).
  - Editar role: Modal select (update direto em user_roles).
  - Alterar senha: Modal com nova senha (usa RPC change_user_password).
  - Excluir: ConfirmDialog (usa RPC delete_user_with_role).
  - Super admin nao pode ser excluido e recebe badge "EU" se for o proprio usuario.
- Search por nome/email.
- Feedback de sucesso/erro.

**9. qrcodes/page.tsx - QR Codes (229 linhas)**
- Fetch de campanhas com join church.slug.
- URL base hardcoded: `https://igrejaplanalto.onrender.com`.
- Lista com checkbox de selecao individual e "select all".
- BatchQRCodeGenerator no topo (renderizado condicionalmente).
- Modal individual com QRCodeGenerator.
- Search por titulo/slug via useMemo.

**10. campaigns/page.tsx - Lista de Campanhas (355 linhas)**
- Fetch com responses(count) e campaign_views(count).
- Filtros: search por titulo + botoes de status (Todas/Ativas/Inativas).
- Tabela com colunas: Nome (com periodo), Slug, Status (badge), Respostas, Visualizacoes, Criado em, Acoes.
- Acoes: Editar, Duplicar (com campos), Arquivar/Ativar (toggle), Excluir.
- Confirm dialogs para delete e archive/activate.
- Empty state com CTA "Criar Campanha".

**11. campaigns/new/page.tsx - Nova Campanha (294 linhas)**
- 10 tipos pre-definidos: Geral, Evangelismo, Congresso, Conferencia, EBF, Discipulado, Batismo, Retiro, Evento Infantil, Acao Social.
- Formulario: Titulo (auto-slug via generateSlug), Slug editavel, Descricao, Banner (ImageUpload), Data inicio/fim, Tipo, Ativa, Publica.
- Configs do formulario: Mensagem de agradecimento, URL de redirecionamento, Mostrar contagem, Permitir anonimo.
- Carrega church_id do profile do usuario autenticado.
- Validacao: titulo obrigatorio, slug obrigatorio, data final > data inicio.
- Salva em campaigns com settings como JSON.

**12. campaigns/[id]/edit/page.tsx - Editar Campanha (717 linhas)**
- Carrega campanha por ID, trata erro PGRST116 (not found).
- Mesmo formulario do new + Construtor de Formulario integrado.
- Construtor de Formulario:
  - Lista de campos (CampaignField) com id, label, type, required, options, placeholder, order.
  - 9 tipos: text, textarea, select, checkbox, radio, date, phone, email, number.
  - Modal para adicionar/editar campo com opcoes dinamicas (select/checkbox/radio).
  - Botoes up/down para reordenacao.
  - Exclusao com ConfirmDialog.
  - Campos salvos em settings.custom_fields como JSON (dentro da tabela campaigns).
  - Atualizacao otimista: state local primeiro, sync com Supabase em seguida.
- Alertas de erro/sucesso.

**13. visitors/page.tsx - Visitantes (333 linhas)**
- Fetch de responses com join campaigns(title, slug).
- Agrupa visitantes por nome/phone/email via Map (visitantes recorrentes).
- Cards em grid responsivo (1/2/3 colunas) com: initials, nome, total respostas, contato, ultima submissao, badges de campanhas (max 3 + "+N").
- Modal detalhado com: informacoes de contato, campanhas participadas, historico completo de respostas (com dados do formulario, max 4 campos + "+N").
- Export CSV com BOM UTF-8.
- Search por nome/phone/email.

**14. responses/page.tsx - Respostas (391 linhas)**
- Fetch de responses + campaigns via Promise.all.
- Filtros: search (nome/phone/email), campanha (select), data inicial/final.
- Tabela (desktop) com: avatar, nome, campanha (badge), telefone, email, data, acao (Eye).
- Cards (mobile) com: avatar, nome, campanha, telefone, email, data.
- Toggle de filtros com botoes chevron.
- Modal de detalhes com dados do formulario.
- Export CSV e Excel (.xls com BOM UTF-8, mime type Excel).
- Detecta dinamicamente todas as chaves de data do formulario.

**Observacoes Gerais:**
- Todos os componentes sao `'use client'` (Next.js App Router).
- Autenticacao via `@/lib/supabase/client` (createClient).
- Estilizacao com Tailwind CSS e funcao cn() para conditional classes.
- Tema de cores primarias (#C29560 dourado) consistente em todo o dashboard.
- URL de producao hardcoded (`https://igrejaplanalto.onrender.com`) na pagina QR Codes.
- Campos customizados de formulario armazenados como JSON em campaigns.settings (embora a pagina inicial do dashboard ainda faca duplicacao via tabela campaign_fields separada).
- Tratamento de erros basico (alert/console.error) sem sistema de notificacao unificado.
- Exportacao CSV com encoding UTF-8 BOM.
- Responsividade: grids adaptativos, tabelas com hidden em breakpoints, cards em mobile.
- Loading states com spinner Loader2 em todas as paginas.

### 1.6 Rotas Públicas e Campanhas
**Relatorio do Agente 6**

#### Estrutura de Rotas Publicas de Campanhas

A rota publica de campanhas esta definida em um unico arquivo no diretorio `/src/app/c/`, utilizando o sistema de rotas dinamicas (pasta com colchetes) do Next.js App Router. Nao ha arquivo `layout.tsx` ou `loading.tsx` dentro de `src/app/c/` -- apenas o arquivo de pagina terminal.

**Caminho absoluto:**  
`/home/tork/Projetos/igreja-planalto/src/app/c/[churchSlug]/[campaignSlug]/page.tsx`

**Arvore completa do diretorio:**
```
src/app/c/
  [churchSlug]/
    [campaignSlug]/
      page.tsx
```

Nao existe `src/app/api/` no projeto.

#### Funcionamento dos Slugs

A rota utiliza dois parametros dinamicos de URL (slugs) herdados do Next.js:

1. **`[churchSlug]`** -- Slug da igreja (ex.: `igreja-central`). Usado para buscar a igreja na tabela `churches` do Supabase, filtrando pelo campo `slug`.
2. **`[campaignSlug]`** -- Slug da campanha (ex.: `campanha-natal-2024`). Usado para buscar a campanha na tabela `campaigns`, filtrando pelo campo `slug` e pelo `church_id` obtido anteriormente.

A URL publica final tem o formato:  
`/c/{churchSlug}/{campaignSlug}`  
Exemplo: `https://site.com/c/igreja-central/campanha-natal-2024`

**Importante:** Nao ha fallback para quando `churchSlug` esta ausente. Se ambos os slugs forem fornecidos, a busca e feita em duas etapas: primeiro busca a igreja pelo slug, depois busca a campanha pelo `church_id` + `campaignSlug`. Se `churchSlug` estiver vazio, a busca tenta encontrar a campanha apenas pelo `campaignSlug` (sem filtro de igreja).

Apenas campanhas com `is_active = true` E `is_public = true` sao retornadas para o publico.

#### Fluxo de Preenchimento de Formularios (CampaignForm)

O componente principal e:
- **`/home/tork/Projetos/igreja-planalto/src/components/campaigns/CampaignForm.tsx`** (615 linhas)

Complementar:
- **`/home/tork/Projetos/igreja-planalto/src/components/campaigns/QRCodeGenerator.tsx`** (686 linhas)

O fluxo completo e:

1. **Carregamento da campanha:** Ao montar o componente (`useEffect`), dispara uma funcao `fetchCampaign` que:
   - Cria um cliente Supabase.
   - Se `churchSlug` e `campaignSlug` existem, busca a igreja pelo slug, depois usa o `church_id` para filtrar a campanha.
   - Filtra por `is_active = true` e `is_public = true`.
   - Se a campanha nao for encontrada, exibe tela de erro "Campanha nao encontrada".

2. **Contagem de visualizacoes:** Apos carregar a campanha, chama a RPC `increment_campaign_views` passando o UUID da campanha, e depois consulta a tabela `campaign_views` para exibir o contador (se `settings.show_visitor_count` estiver habilitado).

3. **Exibicao do formulario:** Os campos sao obtidos de `campaign.settings.custom_fields` (array de objetos do tipo `CampaignField`). A ordenacao e feita pelo campo `order`, e ha suporte a **logica condicional** (`conditional_logic`): campos so sao exibidos se o campo do qual dependem tiver o valor esperado (`dependsOn` / `equals`).

4. **Tipos de campos suportados:** `text`, `textarea`, `select`, `checkbox`, `radio`, `date`, `phone`, `email`. Para cada tipo, um componente de UI diferente e renderizado (Input, Textarea, Select, Checkbox, RadioGroup). Campos `phone` usam a funcao `formatPhone` para mascara automatica.

5. **Validacao:** Feita no cliente antes do envio:
   - Campos obrigatorios sao verificados.
   - Email e validado com regex.
   - Telefone e validado (10 ou 11 digitos).
   - Regras de `validation_rules` suportam `minLength`, `maxLength`, e `pattern` (regex com mensagem opcional `patternMessage`).

6. **Envio (submit):** Os dados sao montados em um objeto `responseData` contendo os pares `fieldId -> valor`. Campos especiais sao extraidos:
   - `visitor_name`: primeiro campo do tipo `text` cujo label contenha "nome".
   - `visitor_phone`: primeiro campo do tipo `phone`.
   - `visitor_email`: primeiro campo do tipo `email`.
   - O payload e inserido na tabela `responses` do Supabase.

7. **Pos-envio:**
   - Exibe mensagem de agradecimento (`settings.thank_you_message` ou padrao "Obrigado por preencher!").
   - Se `settings.redirect_url` estiver configurado, redireciona o visitante apos 3 segundos (com validacao de URL HTTP/HTTPS).
   - Um modal de sucesso tambem e exibido.

8. **WhatsApp flutuante:** Um botao fixo no canto inferior direito e exibido se a igreja tiver numero de WhatsApp ou telefone cadastrado, abrindo link `wa.me` com mensagem pre-definida.

#### Componente QRCodeGenerator

O componente `QRCodeGenerator` e usado no dashboard (nao na rota publica) para gerar QR Codes das campanhas. Suporta:
- Formatos: PNG, SVG, PDF.
- Personalizacao: cores, tamanho, margem, logo centralizada.
- Geracao em lote (`BatchQRCodeGenerator`) para multiplas campanhas em um unico PDF.

#### Banco de Dados (Tabelas Relacionadas)

Conforme `src/types/database.ts`:
- **`campaigns`** (103-151): `id`, `church_id`, `title`, `slug`, `description`, `banner_url`, `start_date`, `end_date`, `is_active`, `is_public`, `qr_code_url`, `settings` (JSON), `created_at`, `updated_at`.
- **`campaign_fields`** (153-189): `id`, `campaign_id`, `label`, `type` (enum: text, textarea, select, checkbox, radio, date, phone, email, file), `required`, `options` (array), `placeholder`, `order`, `created_at`, `updated_at`.
- **`responses`** (191-224): `id`, `campaign_id`, `data` (JSON), `visitor_name`, `visitor_phone`, `visitor_email`, `ip_address`, `user_agent`, `created_at`.
- **`campaign_views`** (226-248): `id`, `campaign_id`, `ip_address`, `user_agent`, `created_at`.
- **`churches`** (12-70): `id`, `name`, `slug`, `logo_url`, `banner_url`, `primary_color`, `secondary_color`, `whatsapp`, `phone`, `email`, etc.

#### Testes

**Nao ha nenhum arquivo de teste no projeto.** As buscas abrangeram:
- `*.test.{ts,tsx,js,jsx}` -- 0 resultados
- `*.spec.{ts,tsx,js,jsx}` -- 0 resultados
- `__tests__/` -- 0 resultados
- `test/` -- 0 resultados
- `__mocks__/` -- 0 resultados
- `jest*`, `vitest*`, `setupTests*` -- 0 resultados
- `*.test-d.*` -- 0 resultados

Nao existe configuracao de framework de testes (Jest, Vitest, etc.) instalada ou configurada. O projeto atualmente nao possui nenhuma suíte de testes automatizados.

#### Caminhos Absolutos dos Arquivos Analisados

- `/home/tork/Projetos/igreja-planalto/src/app/c/[churchSlug]/[campaignSlug]/page.tsx` (rota publica)
- `/home/tork/Projetos/igreja-planalto/src/components/campaigns/CampaignForm.tsx` (formulario principal)
- `/home/tork/Projetos/igreja-planalto/src/components/campaigns/QRCodeGenerator.tsx` (gerador de QR Code)
- `/home/tork/Projetos/igreja-planalto/src/types/database.ts` (schema do banco)
- `/home/tork/Projetos/igreja-planalto/src/lib/supabase/client.ts` (cliente Supabase)
- `/home/tork/Projetos/igreja-planalto/src/lib/utils.ts` (utilitarios: formatPhone, slugify, etc.)


### 1.7 Estilos e Tema
**Relatorio do Agente 7**

#### Arquivos de Estilo Analisados

| Arquivo | Caminho | Tamanho / Linhas |
|---------|---------|-----------------|
| `globals.css` | `/home/tork/Projetos/igreja-planalto/src/app/globals.css` | 120 linhas |
| `tailwind.config.js` | `/home/tork/Projetos/igreja-planalto/tailwind.config.js` | 35 linhas |
| `postcss.config.js` | `/home/tork/Projetos/igreja-planalto/postcss.config.js` | 6 linhas |

Nao ha arquivos SCSS, SASS, CSS Modules, ou CSS-in-JS no projeto. Todo o estilo e gerenciado exclusivamente via Tailwind CSS (diretivas `@tailwind` + classes utilitarias no JSX) com um conjunto de classes utilitarias customizadas definidas em `globals.css`.

---

#### PALETA DE CORES

O projeto define duas paletas de cores personalizadas no `tailwind.config.js`, ambas com tons quentes e terrosos (dourado/marrom/bege), alinhados a identidade visual de uma igreja:

**Paleta `primary` (dourado/marrom - 10 tons):**

| Token | Hex | Descricao |
|-------|-----|-----------|
| `primary-50` | `#FFF8F0` | Off-white quente (fundo de paginas, hover states) |
| `primary-100` | `#FDF2E3` | Bege claro (badges, headers de footer, backgrounds de alerta) |
| `primary-200` | `#FBE5C7` | Bege medio (bordas de alerta) |
| `primary-300` | `#F5D5A8` | Areia |
| `primary-400` | `#E8C08A` | Areia dourada |
| `primary-500` | `#D4A86A` | Dourado medio (borda de erro em inputs, cor secundaria padrao) |
| **`primary-600`** | **`#C29560`** | **Cor primaria principal** (botoes, icones, links, acentos) |
| `primary-700` | `#A67D4D` | Dourado escuro (hovers de botoes) |
| `primary-800` | `#866540` | Marrom (texto de badges) |
| `primary-900` | `#6B4F32` | Marrom escuro (gradiente hero) |

**Paleta `church` (3 tons):**

| Token | Hex | Descricao |
|-------|-----|-----------|
| `church-gold` | `#C2A878` | Dourado da igreja (botao gold, acentos especiais) |
| `church-goldLight` | `#F5EDE0` | Dourado claro (badge gold, fundo de skeleton) |
| `church-dark` | `#4A3728` | Marrom escuro (nao utilizado atualmente no codigo) |

**Cores adicionais (sem token personalizado, usadas diretamente):**
- `green-500` / `green-600`: Botao flutuante do WhatsApp
- `red-500` / `red-600` / `red-700`: Botoes danger, erros, remover imagem
- `gray-50` a `gray-900`: Tons de cinza para fundos, textos, bordas, hover states
- `black/50`: Overlays de modal e sidebar

**Cores dinamicas (via banco de dados):**
- A pagina de configuracoes (`settings/page.tsx`) permite que o usuario defina `primary_color` (padrao `#C29560`) e `secondary_color` (padrao `#D4A86A`) no banco de dados.
- **Problema:** Essas cores sao armazenadas na tabela `churches` mas NAO sao aplicadas dinamicamente ao CSS do projeto. Elas sao usadas apenas na pre-visualizacao dentro da propria pagina de configuracoes (via `style={{ backgroundColor: formPrimaryColor }}`). O tema real do app continua usando as cores fixas do `tailwind.config.js`.

---

#### DESIGN SYSTEM E PADROES VISUAIS

**Classes Utilitarias Customizadas (globals.css):**

| Classe | Propriedades | Uso |
|--------|-------------|-----|
| `.container-custom` | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | Container responsivo principal |
| `.btn` | `inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed` | Base para todos os botoes |
| `.btn-primary` | Fundo `primary-600`, hover `primary-700`, focus ring `primary-500` | Botao primario |
| `.btn-secondary` | Fundo `gray-100`, texto `gray-900`, hover `gray-200` | Botao secundario |
| `.btn-outline` | Borda `primary-600`, texto `primary-600`, hover `primary-50` | Botao outline |
| `.btn-gold` | Fundo `church-gold`, hover `primary-700` | Botao dourado (especial) |
| `.input` | Borda `gray-300`, focus ring `primary-500`, `rounded-lg` | Inputs, textareas, selects |
| `.label` | `text-sm font-medium text-gray-700 mb-1` | Labels de formulario |
| `.card` | `bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md` | Container de cartao |
| `.card-header` | `px-6 py-4 border-b border-gray-100` | Cabecalho de cartao |
| `.card-body` | `p-6` | Corpo de cartao |
| `.card-footer` | `px-6 py-4 border-t border-gray-100 bg-gray-50` | Rodape de cartao |
| `.badge` | `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium` | Badge base |
| `.badge-primary` | Fundo `primary-100`, texto `primary-800` | Badge primario |
| `.badge-success` | Fundo `green-100`, texto `green-800` | Badge sucesso |
| `.badge-warning` | Fundo `yellow-100`, texto `yellow-800` | Badge alerta |
| `.badge-danger` | Fundo `red-100`, texto `red-800` | Badge perigo |
| `.badge-gold` | Fundo `church-goldLight`, texto `primary-800` | Badge dourado |

**Componentes e Variantes:**

Os componentes UI seguem um sistema de variantes consistente:

- **Button** (6 variantes): `primary`, `secondary`, `outline`, `gold`, `ghost`, `danger`
- **Button sizes** (4): `sm` (px-3 py-1.5 text-sm), `md` (px-4 py-2 text-base), `lg` (px-6 py-3 text-lg), `xl` (px-8 py-4 text-xl)
- **Badge** (6 variantes): `primary`, `success`, `warning`, `danger`, `gold`, `gray`
- **Alert** (4 variantes): `info`, `success`, `warning`, `danger` -- **ATENCAO**: Todas as 4 variantes usam exatamente as mesmas classes (`bg-primary-50 border-primary-200 text-primary-800`). Isso e provavelmente um bug - as variantes deveriam ter cores distintas.
- **Modal sizes** (5): `sm` (max-w-md), `md` (max-w-lg), `lg` (max-w-2xl), `xl` (max-w-4xl), `full` (max-w-[90vw])
- **Card**: Estrutura composta por `Card` + `CardHeader` + `CardBody` + `CardFooter`

**Animacoes:**

| Animacao | Propriedade | Uso |
|----------|-------------|-----|
| `fade-in-up` | Opacity 0->1, translateY 20->0, 0.5s ease-out | Transicoes de conteudo |
| `pulse-skeleton` | Opacity 0.4->0.8, 1.5s infinite | Loading skeleton |
| `animate-spin` | (Tailwind nativo) | Spinner de loading em botoes |

**Duplicacao de Componentes:**
- `Button`, `Modal`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge` existem TANTO em `FormComponents.tsx` quanto em arquivos dedicados (`Button.tsx`, `Modal.tsx`, `Card.tsx`).
- As implementacoes sao ligeiramente diferentes (ex: `Button.tsx` usa as classes `.btn`/`.btn-primary` do globals.css, enquanto `FormComponents.tsx` usa classes Tailwind diretamente).
- Isso representa duplicacao de codigo e risco de inconsistencia.

**Tipografia:**
- Fonte padrao: `Inter`, com fallback `system-ui, sans-serif`
- **Problema:** A fonte `Inter` NAO e carregada via `next/font` (Google Fonts). Ela e apenas referenciada como string `font-family` no CSS. Isso significa que:
  - Pode nao ser carregada em alguns ambientes
  - Perde-se otimizacao de fonts do Next.js
  - Pode causar CLS (Cumulative Layout Shift)
- Tamanhos de fonte seguem o sistema Tailwind padrao (`text-xs` a `text-6xl`)
- Pesos: `font-light` (300), `font-medium` (500), `font-semibold` (600), `font-bold` (700)

**Espacamento (Spacing):**
- Usa o sistema de espacamento padrao do Tailwind (4px base, multiplos de 4: `p-4` = 16px, `p-6` = 24px, `gap-4` = 16px)
- Nao ha customizacao de spacing no `tailwind.config.js`
- Container padrao: `max-w-7xl` (1280px)
- Larguras de formulario: `max-w-3xl` (768px), `max-w-md` (448px)

---

#### RESPONSIVIDADE (Mobile-First)

O projeto adota uma abordagem **mobile-first** consistente:

**Padrao de Breakpoints:**
| Breakpoint | Min-width | Uso |
|-----------|-----------|-----|
| `sm` | 640px | Ajustes de padding (`sm:px-6`), typography (`sm:text-5xl`), grid cols |
| `md` | 768px | Grid de 2-3 colunas (`md:grid-cols-2/3`), ajustes de padding e altura |
| `lg` | 1024px | Sidebar visivel (`lg:translate-x-0`, `lg:pl-64`), header escondido (`lg:hidden`) |
| `xl` | 1280px | Typography (`xl:text-6xl`), padding (`xl:px-8`) |

**Padroes de Layout Responsivo:**

1. **Sidebar (Dashboard):**
   - Mobile: sidebar oculta (`-translate-x-full`), overlay preto 50%, header com botao hamburguer
   - Desktop (`lg`): sidebar fixa `w-64` com `lg:translate-x-0`, conteudo principal com `lg:pl-64`
   - Transicao: `transform transition-transform duration-300 ease-in-out`

2. **Grids:**
   - Landpage: `grid-cols-1 md:grid-cols-3` (cards de 1 col em mobile, 3 em desktop)
   - QR Code Generator: `grid-cols-1 md:grid-cols-2` (opcoes lado a lado em desktop)
   - Configuracoes: `grid-cols-1 md:grid-cols-2` (formulario em 2 colunas no desktop)
   - Batch QR Codes: `grid-cols-1 sm:grid-cols-3` (3 colunas em tablet+)
   - Visitantes: grid responsivo com 1/2/3 colunas

3. **Typography Responsiva:**
   - Hero title: `text-4xl sm:text-5xl lg:text-6xl`
   - Hero subtitle: `text-xl sm:text-2xl`
   - Campaign title: `text-3xl md:text-4xl`

4. **Hero Section (Landpage):**
   - Padding vertical: `py-20 sm:py-28 lg:py-36`
   - Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

5. **Formulario de Campanha:**
   - Banner: `h-64 md:h-80`
   - Conteudo: `-mt-6 md:-mt-10` (sobreposicao maior em desktop)
   - Padding: `py-8 md:py-12`

**Ausencias de Responsividade:**
- Nao existem `loading.tsx`, `error.tsx`, ou `not-found.tsx` em nenhum nivel do App Router
- Tabelas em mobile usam `hidden` em vez de layout alternativo (cards) - exceto `responses/page.tsx` que tem cards para mobile
- DropdownMenu nao tem tratamento mobile especifico

---

#### ACESSIBILIDADE VISUAL

**Pontos Fortes:**
- **ARIA attributes**: `aria-label` em icones e botoes, `aria-invalid` em campos com erro, `aria-describedby` para mensagens de erro/hint, `role="alert"` em erros, `role="dialog"`/`aria-modal` em modais
- **Focus indicators**: `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500` em botoes, inputs e switches
- **Switch toggle**: Usa `role="switch"` e `aria-checked` (padrao WAI-ARIA)
- **Labels associadas**: Todos os inputs tem `<label>` com `htmlFor`
- **Cores de erro**: Mensagens em `text-primary-600` ou `text-red-600` com contraste adequado contra fundos claros

**Pontos Fracos:**
- **Sem suporte a Dark Mode**: Nao ha qualquer implementacao de `prefers-color-scheme`, classes `dark:`, ou variaveis CSS para tema escuro
- **Sem alto contraste**: Nao ha suporte a `prefers-contrast`
- **Contraste de cores**: A paleta primary-50 (#FFF8F0) usada como fundo de pagina tem contraste insuficiente com texto `text-gray-600` (#4B5563) - razao de contraste aproximada de 5.5:1, no limite do WCAG AA para texto normal
- **Font-size relativo**: Todos os tamanhos usam unidades fixas (rem/px do Tailwind), sem `clamp()` ou valores fluidos
- **Fonte Inter nao carregada**: Se a fonte Inter nao estiver disponivel, o fallback `system-ui` pode alterar significativamente o layout
- **Sem `prefers-reduced-motion`**: As animacoes `fade-in-up` e `pulse-skeleton` nao respeitam preferencias de movimento reduzido

---

#### DARK/LIGHT MODE

**Nao ha suporte a dark mode no projeto.** Nao foram encontrados:
- Variaveis CSS para tema escuro (`prefers-color-scheme`)
- Classes `dark:` em nenhum componente
- Estado de tema em React Context ou localStorage
- Toggle de tema na interface
- CSS custom properties para troca de cores

O projeto e exclusivamente **light mode** com fundo `primary-50` (off-white quente) e elementos em `bg-white`.

---

#### ORGANIZACAO CSS

**Estrutura:**
```
src/app/
  globals.css          (120 linhas) - Unico arquivo de estilo
src/
  components/           (estilos inline com Tailwind + cn())
  lib/utils.ts          (funcao cn() para merge de classes)
tailwind.config.js     (35 linhas) - Configuracao do tema
postcss.config.js      (6 linhas) - Plugins Tailwind + Autoprefixer
```

**Fluxo de Estilizacao:**
1. `tailwind.config.js` define paletas personalizadas (`primary`, `church`) e fonte (`Inter`)
2. `globals.css` importa diretivas Tailwind + define classes utilitarias customizadas
3. Componentes React usam classes Tailwind diretamente no JSX + classes customizadas do globals.css
4. A funcao `cn()` (clsx + tailwind-merge) gerencia classes condicionais e evita conflitos
5. `postcss.config.js` processa o CSS com Tailwind e Autoprefixer

**Observacoes sobre a Organizacao:**
- **Ausencia de CSS Modules**: Nao ha escopo de estilos por componente
- **Ausencia de CSS-in-JS**: Nao ha styled-components, emotion, ou similar
- **Classes customizadas vs Tailwind direto**: Ha inconsistencia - `Button.tsx` usa classes customizadas (`.btn`, `.btn-primary`), enquanto `FormComponents.tsx` usa classes Tailwind diretamente (`bg-primary-600 text-white hover:bg-primary-700`)
- **Variaveis CSS subutilizadas**: `--foreground-rgb`, `--background-start-rgb`, `--background-end-rgb` sao definidas mas usadas apenas no `body` (landpage); o resto do projeto ignora essas variaveis
- **Skeleton como CSS inline**: A classe `.skeleton` e definida como `background: linear-gradient(...)` com animacao, mas nao ha um componente Skeleton reutilizavel
- **Hardcoded border color**: Em `page.tsx` e `Layout.tsx`, a cor `#e5dcc8` (tom de bege) aparece hardcoded em bordas de footer, em vez de usar um token do Tailwind

---

#### RESUMO DE ACHADOS E RECOMENDACOES

| Item | Status | Severidade |
|------|--------|------------|
| Paleta de cores consistente (primary/church) | Ok | - |
| Dark mode ausente | Ausente | Media |
| Fonte Inter nao carregada via next/font | Problema | Alta |
| Alert component com variantes identicas | Bug | Media |
| Duplicacao de componentes UI (Button, Card, Modal) | Problema | Alta |
| Cores do banco nao aplicadas ao tema | Problema | Media |
| Variaveis CSS subutilizadas | Problema | Baixa |
| Cores hardcoded (#e5dcc8) | Problema | Baixa |
| Responsividade mobile-first | Ok | - |
| Acessibilidade ARIA | Ok | - |
| Sem `prefers-reduced-motion` | Ausente | Baixa |
| Sem CSS Modules / escopo de estilos | Ausente | Media |
| Skeleton sem componente reutilizavel | Problema | Baixa |

### 1.8 Imports e Dependências
*(Agente 8) - Relatório completo de análise de dependências*

#### ANÁLISE DE DEPENDÊNCIAS DO PROJETO

**Data:** 26/07/2026
**Arquivo base:** `/home/tork/Projetos/igreja-planalto/package.json`
**Lock file:** Não encontrado (sem `package-lock.json` ou `yarn.lock`)
**node_modules:** Vazio (dependências não instaladas)

---

#### 1. DEPENDÊNCIAS DE PRODUÇÃO (11 pacotes)

| # | Pacote | Versão (range) | Uso no código | Bundle (estimado) |
|---|--------|----------------|---------------|-------------------|
| 1 | `next` | `^14.2.0` | App Router, `next/navigation` (useRouter, useParams, usePathname), `next/link` (Link), `next/server` (NextResponse, NextRequest) | ~350KB (core) |
| 2 | `react` | `^18.3.0` | useState, useEffect, useRef, useCallback, useMemo, forwardRef | ~130KB (core) |
| 3 | `react-dom` | `^18.3.0` | Renderização (implícito via Next.js) | ~130KB (core) |
| 4 | `@supabase/supabase-js` | `^2.45.0` | **NÃO importado diretamente** em nenhum arquivo .ts/.tsx. Usado indiretamente via `@supabase/ssr` | ~30KB |
| 5 | `@supabase/ssr` | `^0.5.0` | `createBrowserClient` (client.ts), `createServerClient` (server.ts, middleware.ts), `CookieOptions` (server.ts, middleware.ts) | ~15KB |
| 6 | `qrcode` | `^1.5.3` | **Import dinâmico** apenas: `import('qrcode')` em QRCodeGenerator.tsx (linhas 78, 555) | ~70KB |
| 7 | `jspdf` | `^2.5.2` | **Import dinâmico** apenas: `import('jspdf')` em QRCodeGenerator.tsx (linhas 173, 556) | ~50KB |
| 8 | `lucide-react` | `^1.0.0` | **46 ícones únicos importados** em 18 arquivos (ver lista abaixo) | tree-shakeable (~0.5KB/ícone) |
| 9 | `clsx` | `^2.1.0` | `src/lib/utils.ts` (linha 1): usado na função `cn()` | ~0.5KB |
| 10 | `tailwind-merge` | `^2.2.0` | `src/lib/utils.ts` (linha 2): usado na função `cn()` (twMerge) | ~5KB |
| 11 | `recharts` | `^2.12.0` | `dashboard/page.tsx` (linha 53): AreaChart, BarChart, PieChart, etc. | ~150KB (pesado) |

**Ícones lucide-react utilizados (46 ícones):**
AlertCircle, Archive, ArrowLeft, ArrowRight, Calendar, CheckCircle, ChevronDown, ChevronRight, ChevronUp, Church, Clock, Copy, Crown, Download, Edit, Edit2, ExternalLink, Eye, EyeOff, FileSpreadsheet, FileText, Filter, GripVertical, Heart, Key, LayoutDashboard, Loader2, Lock, Mail, MapPin, Menu, MessageCircle, Palette, Plus, QrCode, Save, Search, Settings, Shield, Trash2, TrendingUp, Upload, User, Users, X

**Tamanho estimado do bundle total (produção):** ~800KB-1MB (bruto, sem compressão/gzip)

---

#### 2. DEPENDÊNCIAS DE DESENVOLVIMENTO (10 pacotes)

| # | Pacote | Versão (range) | Propósito |
|---|--------|----------------|-----------|
| 1 | `@types/node` | `^20.12.0` | Tipos Node.js (para APIs Next.js) |
| 2 | `@types/react` | `^18.3.0` | Tipos React |
| 3 | `@types/react-dom` | `^18.3.0` | Tipos ReactDOM |
| 4 | `@types/qrcode` | `^1.5.5` | Tipos para qrcode (import dinâmico) |
| 5 | `typescript` | `^5.4.0` | Compilador TS (type-check: tsc --noEmit) |
| 6 | `tailwindcss` | `^3.4.0` | Framework CSS (postcss plugin + CLI) |
| 7 | `postcss` | `^8.4.38` | Processador CSS (usado pelo Tailwind) |
| 8 | `autoprefixer` | `^10.4.19` | Prefixos CSS (plugin postcss) |
| 9 | `eslint` | `^8.57.0` | Linter (via next lint) |
| 10 | `eslint-config-next` | `^14.2.0` | Config ESLint Next.js |

---

#### 3. DEPENDÊNCIAS NÃO UTILIZADAS (Tree-shaking possível)

| Pacote | Status | Evidência |
|--------|--------|-----------|
| `@supabase/supabase-js` | **Possivelmente não utilizada diretamente** | Nenhum import direto em nenhum arquivo .ts/.tsx. `@supabase/ssr` já re-exporta a funcionalidade. Verificar se alguma lib interna depende disso. |
| `@types/qrcode` | Sub-utilizada (tipo apenas) | `qrcode` é importado dinamicamente, mas os tipos são usados apenas indiretamente |
| Componentes duplicados | **Duplicação de bundle** | Button, Modal, Card, CardHeader, CardBody, CardFooter, Badge existem tanto em `FormComponents.tsx` quanto em seus arquivos dedicados, aumentando o bundle desnecessariamente |

---

#### 4. DEPENDÊNCIAS QUE PODERIAM SER ATUALIZADAS

| Pacote | Versão Atual | Última Estável (Jul/2026) | Notas |
|--------|-------------|---------------------------|-------|
| `next` | `^14.2.0` | `14.2.x` (ou `15.x`) | Next.js 15 já disponível com React 19 |
| `react` / `react-dom` | `^18.3.0` | `18.3.x` ou `19.x` | Aguardar Next.js 15 estável |
| `@supabase/supabase-js` | `^2.45.0` | `^2.46.x` | Manutenção regular |
| `@supabase/ssr` | `^0.5.0` | `^0.6.x` | Possível breaking change |
| `eslint` | `^8.57.0` | `^9.x` | ESLint 9 com novo formato de config (flat config) |
| `typescript` | `^5.4.0` | `^5.6.x` | Atualizar para latest stable |

---

#### 5. DEPENDÊNCIAS AUSENTES (Recomendadas)

| Pacote | Categoria | Motivo |
|--------|-----------|--------|
| `prettier` | Formatação | Sem formatador configurado |
| `@testing-library/react` | Testes | Sem suíte de testes |
| `vitest` | Testes | Alternativa moderna ao Jest |
| `@playwright/test` | Testes E2E | Sem testes de integração |
| `@types/jspdf` | Tipagem | `jspdf` é importado dinamicamente sem tipos |
| `date-fns` ou `dayjs` | Datas | `formatDate` implementado manualmente em utils.ts |
| `zod` ou `yup` | Validação | Validação manual inline nos formulários |
| `react-hot-toast` ou `sonner` | Notificações | Uso inconsistente de `alert()` para feedback |
| `next-themes` | Tema | Sem suporte a dark mode |

---

#### 6. CI/CD PIPELINE

**Arquivo:** `/home/tork/Projetos/igreja-planalto/.github/workflows/deploy.yml`

**Trigger:** Push na branch `main`

**Jobs (1):**
1. **deploy** (ubuntu-latest, Node 20)
   - `actions/checkout@v4`
   - `actions/setup-node@v4` com cache npm
   - `npm ci` (instalação limpa)
   - `npm run type-check` (tsc --noEmit)
   - `npm run build` (next build) com envs `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` dos secrets

**Problemas:**
- **Sem deploy automático**: Apenas build, sem step de deploy para Render ou qualquer outro provider
- **Sem lint**: Não executa `npm run lint`
- **Sem testes**: Não há step de testes (inexistentes no projeto)
- **Apenas NPM cache**: Não há cache para `node_modules` ou `.next` entre builds
- **Secrets limitados**: Apenas SUPABASE_URL e SUPABASE_ANON_KEY configurados; não inclui APP_URL

---

#### 7. DOCKERFILE

**Arquivo:** `/home/tork/Projetos/igreja-planalto/Dockerfile`

**Estratégia:** Multi-stage build (3 estágios)

**Estágio 1 - deps (node:20-alpine):**
- Instala `libc6-compat` (compatibilidade glibc)
- Copia `package.json` e `package-lock.json*`
- Executa `npm ci --only=production`
- **Problema**: A flag `--only=production` instala apenas dependencies, mas o build do Next.js precisa das devDependencies (TypeScript, Tailwind, etc.)

**Estágio 2 - builder:**
- Copia node_modules do estágio 1
- Copia todo o código fonte
- Executa `npm run build`
- **Problema**: O estágio 1 só tem deps de produção; o build do Next.js precisa de TypeScript, PostCSS, Tailwind, etc. (devDeps). O build falhará ou usará cache incorreto.

**Estágio 3 - runner:**
- Cria usuário `nextjs` (uid 1001)
- Expõe porta 3000
- Copia `.next/standalone` e `.next/static`
- Executa `server.js` (Next.js standalone)
- `ENV NODE_ENV=production`

**.dockerignore:** Exclui node_modules, .git, .next, out, .env*, *.md, .DS_Store

**Problemas identificados:**
1. **`npm ci --only=production` no estágio deps**: Isso impede o build de funcionar, pois o Next.js precisa de TypeScript e Tailwind para compilar. Deveria instalar TODAS as dependências (`npm ci`) no estágio builder.
2. **Falta `.env.example` no dockerignore**: Incluído? (`.env*` cobre)
3. **Sem verificação de saúde**: Falta `HEALTHCHECK`
4. **Sem argumentos de build**: Envs hardcoded no CMD
5. **Cache da camada**: `COPY package.json package-lock.json* ./` - sem lock file, o cache de camada do Docker não funciona corretamente

---

#### 8. SCRIPTS

**Arquivo:** `/home/tork/Projetos/igreja-planalto/scripts/sync-env.sh`

**Propósito:** Sincroniza variáveis de ambiente do GitHub Secrets para o Render via API REST.

**Funcionamento:**
- Requer `RENDER_API_KEY` e `GH_TOKEN` como variáveis de ambiente
- Faz PUT para API Render (`/v1/services/srv-.../env-vars`)
- Sincroniza 6 variáveis: SUPABASE_URL, SUPABASE_ANON_KEY, CHURCH_NAME, CHURCH_CITY, CHURCH_STATE, CHURCH_PHONE

**Problemas:**
- **Service ID hardcoded**: `srv-d9hba8faqgkc73a1bcp0` (quebrará se recriar o serviço)
- **Sem suporte a Rollback**: Se a API falhar, não há fallback
- **API Key exposta**: Espera `RENDER_API_KEY` em variável de ambiente (segurança questionável em script shell)

---

#### 9. PADRÕES DE IMPORTS NO PROJETO

**Path alias `@/`:** Mapeado para `./src/*` no tsconfig.json

**Categorias de import:**
1. **Externos**: `react`, `next/*`, `@supabase/ssr`, `lucide-react`, `recharts`, `clsx`, `tailwind-merge`
2. **Internos (lib)**: `@/lib/utils`, `@/lib/supabase/client`, `@/lib/supabase/server`, `@/lib/supabase/upload`, `@/lib/hooks/useSupabase`
3. **Internos (components)**: `@/components/ui/*`, `@/components/campaigns/*`, `@/components/layout/*`
4. **Internos (types)**: `@/types`, `@/types/database`
5. **Dinâmicos**: `import('qrcode')`, `import('jspdf')` (em QRCodeGenerator.tsx)

**Frameworks/patterns não utilizados:**
- Server Components (todas as páginas são `'use client'`)
- Server Actions
- Route Handlers (API routes)
- Streaming/Suspense
- `generateStaticParams`
- `generateMetadata`
- Testes (zero)

---

#### 10. RESUMO DE SAÚDE DAS DEPENDÊNCIAS

| Indicador | Status |
|-----------|--------|
| Lock file presente | :x: (package-lock.json ausente) |
| node_modules instalado | :x: (vazio) |
| Dependências órfãs (não usadas) | 1 (`@supabase/supabase-js` - verificar) |
| Dependências desatualizadas | 2-3 (eslint, typescript, next) |
| Cobertura de tipos (devDeps) | Boa (types para react, node, qrcode) |
| Duplicação de bundle | Componentes UI duplicados em FormComponents.tsx |
| Tree-shaking eficiente | lucide-react (imports nomeados), recharts (import pesado) |
| Docker build funcional | :x: Erro: devDeps ausentes no estágio deps |

### 1.9 Middleware e Segurança
*(Agente 9 - Análise Completa de Segurança)*

---

### 1.9.1 Middleware (`/home/tork/Projetos/igreja-planalto/src/middleware.ts`)

#### Funcionamento Geral

O middleware é um arquivo de 65 linhas localizado em `src/middleware.ts` que utiliza o `@supabase/ssr` para proteger rotas do dashboard. O fluxo completo:

1. **Criação do cliente Supabase SSR**: Instancia um `createServerClient` com tratamento de cookies para leitura/escrita no request/response.
2. **Verificação de sessão**: Chama `supabase.auth.getSession()` para obter a sessão atual.
3. **Lógica de roteamento**:
   - Se a rota é do dashboard (`/dashboard/:path*`) E **não** é uma página de autenticação (login, register, reset-password) E **não** há sessão -> redireciona para `/dashboard/login?redirect=<pathname>`.
   - Se a rota **é** uma página de autenticação E **há** sessão -> redireciona para `/dashboard`.
4. **Matcher**: Executa apenas para `/dashboard/:path*` (definido no `config.matcher`).

#### Problemas Identificados no Middleware

1. **Escopo limitado**: Apenas protege `/dashboard/:path*`. Rotas como `/admin/`, `/api/`, `/campanhas/` (se implementadas) não têm proteção de middleware.
2. **Parâmetro `redirect` não validado**: O middleware adiciona `loginUrl.searchParams.set('redirect', pathname)` onde `pathname` é `request.nextUrl.pathname`. Embora isso venha do servidor (não é input direto do usuário), o valor `redirect` na URL de destino poderia ser manipulado se o usuário chegar via link externo.
3. **Sem verificação de CSRF**: O middleware não gera nem valida tokens CSRF para formulários.
4. **Sem rate limiting**: Não há limitação de taxa de requisições em nível de middleware.
5. **Sem análise de User-Agent/IP**: Não há bloqueio por IP, geolocalização ou fingerprint.
6. **Sem logout automático**: Não há verificação de expiração de sessão ou timeout de inatividade.

---

### 1.9.2 Headers de Segurança

#### Status: NENHUM header de segurança configurado

**Arquivo `next.config.js`** (9 linhas):
```js
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

**Headers AUSENTES (críticos):**

| Header | Função | Presente? |
|--------|--------|-----------|
| `Content-Security-Policy` | Previne XSS e injeção de conteúdo | **NAO** |
| `X-Frame-Options` | Previne clickjacking (DENY/SAMEORIGIN) | **NAO** |
| `X-Content-Type-Options` | Previne MIME sniffing (`nosniff`) | **NAO** |
| `Strict-Transport-Security` | Força HTTPS (HSTS) | **NAO** |
| `Referrer-Policy` | Controla envio de Referer | **NAO** |
| `Permissions-Policy` | Controla APIs do navegador | **NAO** |
| `X-XSS-Protection` | Proteção XSS legada | **NAO** |

**Root layout (`src/app/layout.tsx`)** também não inclui meta tags de segurança (ex: `<meta http-equiv="...">`).

**Impacto**: O site está vulnerável a clickjacking, MIME-type sniffing, e não tem CSP para mitigar ataques XSS. Usuários podem acessar via HTTP se não houver redirecionamento forçado.

---

### 1.9.3 Autenticação (Supabase Auth)

#### Fluxo de Autenticação

**Login** (`/home/tork/Projetos/igreja-planalto/src/app/dashboard/login/page.tsx`):
- Formulário email/senha -> `supabase.auth.signInWithPassword(email, password)`.
- Tradução de erro "Invalid login credentials" -> "Email ou senha incorretos".
- Redireciona para `/dashboard` via `router.push()`.

**Registro** (`/home/tork/Projetos/igreja-planalto/src/app/dashboard/register/page.tsx`):
- Formulário nome/email/senha/confirmar -> `supabase.auth.signUp`.
- Email de confirmação enviado (dependendo da config do Supabase).
- `emailRedirectTo` aponta para `/auth/callback`.

**Logout** (`/home/tork/Projetos/igreja-planalto/src/app/dashboard/logout/page.tsx`):
- `useEffect` executa `supabase.auth.signOut()` no mount.
- Redireciona após 1 segundo (sem confirmação do usuário).

**Reset de senha** (`/home/tork/Projetos/igreja-planalto/src/app/dashboard/reset-password/page.tsx`):
- Input email -> `supabase.auth.resetPasswordForEmail(redirectTo)`.

**Callback OAuth** (`/home/tork/Projetos/igreja-planalto/src/app/auth/callback/page.tsx`):
- Troca código por sessão: `supabase.auth.exchangeCodeForSession(code)`.
- **Proteção contra open redirect**: O parâmetro `next` é validado:
  ```ts
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') && !nextParam.includes('://')
    ? nextParam : '/dashboard';
  ```

**Cliente Supabase Browser** (`/home/tork/Projetos/igreja-planalto/src/lib/supabase/client.ts`):
- Cria `createBrowserClient` com `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Cliente Supabase Server** (`/home/tork/Projetos/igreja-planalto/src/lib/supabase/server.ts`):
- Cria `createServerClient` com cookie store do Next.js.
- **Problema**: `catch` vazio nos métodos `set`/`remove` de cookies, suprimindo erros silenciosamente.

#### Problemas de Autenticação

1. **Força de senha**: Apenas validação client-side (mínimo 6 caracteres). Sem validação server-side no middleware.
2. **Sem MFA/2FA**: Não há suporte a autenticação multifator, mesmo que o Supabase ofereça.
3. **Sem proteção contra brute-force**: Totalmente delegado ao Supabase (que tem proteção básica, mas não configurada no app).
4. **Logout sem confirmação**: A página de logout executa imediatamente ao montar, sem confirmar com o usuário.
5. **Profile trigger genérico**: A função `handle_new_user` (SECURITY DEFINER) no schema.sql insere `role = 'member'` para todos os novos usuários, mas o catch vazio (`EXCEPTION WHEN OTHERS THEN RETURN NEW`) pode ocultar erros de criação de perfil.
6. **Server client sem isolamento**: Não há distinção entre criação de cliente para Server Components vs Route Handlers vs Server Actions, o que pode causar problemas de cache/reatividade.

---

### 1.9.4 RLS Policies (Row-Level Security)

**Arquivo**: `/home/tork/Projetos/igreja-planalto/supabase/schema.sql` (350 linhas)

#### Tabelas com RLS Ativado

| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|--------|
| `churches` | Own/SuperAdmin | SuperAdmin | ChurchAdmin/SuperAdmin | - |
| `profiles` | Own+Church | Own | Own | - |
| `campaigns` | Own+Public | ChurchAdmin/SuperAdmin | ChurchAdmin/SuperAdmin | ChurchAdmin/SuperAdmin |
| `campaign_fields` | Own+Public | ChurchAdmin/SuperAdmin | ChurchAdmin/SuperAdmin | ChurchAdmin/SuperAdmin |
| `responses` | ChurchAdmin/SuperAdmin | Public (ativo+público) | - | ChurchAdmin/SuperAdmin |
| `campaign_views` | ChurchAdmin/SuperAdmin | Public (ativo+público) | - | - |
| `user_roles` | Own+Admin | Authenticated (qualquer) | Admin | Own+Admin |

#### Análise das Políticas

**Pontos fortes:**
- Multi-tenancy via `church_id` bem implementado.
- Separação clara entre acesso público (apenas campanhas ativas/públicas) e administrativo.
- Políticas granulares por operação (SELECT/INSERT/UPDATE/DELETE).
- Função `private.is_admin()` usada para verificações de admin.

**Vulnerabilidades nas RLS:**

1. **`user_roles` INSERT policy CRÍTICA**: `CREATE POLICY "insert_own_role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (true);` -- QUALQUER usuário autenticado pode inserir QUALQUER role em `user_roles`, incluindo `super_admin`. Isso permite escalonamento de privilégio.

2. **Tabela `responses` permite INSERT público**: `CREATE POLICY "responses_insert_public" ON public.responses FOR INSERT WITH CHECK (campaign_id IN (SELECT id FROM public.campaigns WHERE is_public = true AND is_active = true));` -- Sem autenticação necessária (via anon key).

3. **Tabela `campaign_views` permite INSERT público**: Similar ao anterior.

4. **Funções SECURITY DEFINER sem verificação de role**: `handle_new_user` e `increment_campaign_views` são SECURITY DEFINER (executam como superuser), mas têm tratamento genérico de exceções que engole erros.

5. **Storage sem RLS**: Não há políticas RLS para o bucket `images` do Supabase Storage no schema.sql. A proteção depende das configurações padrão do bucket no painel do Supabase.

6. **Permissões amplas**: `GRANT ALL ON public.<tabela> TO authenticated;` é usado para todas as tabelas. Embora as RLS restrinjam, grants excessivos podem ser um risco se alguma RLS for removida acidentalmente.

7. **Funções RPC não documentadas no schema**: `create_user_with_role`, `change_user_password`, `delete_user_with_role` são chamadas pelo frontend mas NÃO estão definidas no `schema.sql`. Elas devem existir no Supabase como funções separadas, possivelmente criadas manualmente ou via migrations não versionadas.

---

### 1.9.5 Validação de Inputs

#### Frontend (CampaignForm.tsx - linhas 142-183)

A validação do formulário público é feita exclusivamente no cliente:

```ts
const validateField = (field: CampaignField, value: string | string[] | boolean): string | null => {
    if (field.required) { /* verifica se preenchido */ }
    if (field.type === 'email' && value) { /* regex basica */ }
    if (field.type === 'phone' && value) { /* 10-11 digitos */ }
    if (field.validation_rules) { /* minLength, maxLength, pattern */ }
};
```

**Problemas:**

1. **Validação apenas client-side**: Não há validação server-side. Um atacante pode enviar dados diretamente para a API do Supabase via anon key, ignorando completamente as validações do frontend.

2. **Regex de email simples**: `^[^\s@]+@[^\s@]+\.[^\s@]+$` -- Aceita emails inválidos como `a@b.c`.

3. **Pattern de validação dinâmico**: `new RegExp(rules.pattern)` -- O pattern vem do JSON armazenado em `campaigns.settings.custom_fields[].validation_rules.pattern`. Se um admin malicioso ou conta comprometida definir um pattern ReDoS (Regular Expression Denial of Service), pode causar negação de serviço no cliente.

4. **Campos obrigatórios contornáveis**: Como a validação é client-side, basta desabilitar JavaScript ou enviar requisição direta.

5. **Dados enviados sem sanitização**: Os valores dos campos são enviados diretamente como `responseData[field.id] = formData[field.id]` sem qualquer limpeza, stripping ou sanitização.

#### Formulários de Autenticação

- **Login**: Apenas client-side, sem validação server-side adicional.
- **Registro**: Senha mínima 6 caracteres (client-side), confirmação de senha.
- **Reset de senha**: Apenas input de email, sem validação adicional.

---

### 1.9.6 Proteção contra XSS

#### Medidas Existentes

- **React JSX**: O React escapa automaticamente valores em JSX, prevenindo XSS baseado em injeção HTML direta.
- **Sem `dangerouslySetInnerHTML`**: Não foi encontrado uso deste atributo no código analisado.
- **Links externos**: Usam `target="_blank"` com `rel="noopener noreferrer"` (ex: botão WhatsApp).
- **Modal de sucesso**: Exibe `campaign.settings?.thank_you_message` de forma segura via JSX.

#### Vulnerabilidades XSS

1. **Sem Content-Security-Policy**: A ausência de CSP significa que, se um XSS for descoberto, o atacante pode executar scripts arbitrários sem restrições.

2. **Dados armazenados renderizados sem sanitização**: Os campos `data` (JSONB) da tabela `responses` são armazenados com input direto do usuário e depois exibidos no dashboard (páginas `responses/page.tsx`, `visitors/page.tsx`). Se um valor contiver HTML/JavaScript, ele será renderizado como texto (escapado pelo React), mas:
   - O componente `Modal` de detalhes (`responses/page.tsx`) itera sobre as chaves de `data` e renderiza valores.
   - O componente de visitantes (`visitors/page.tsx`) também exibe dados de resposta.

3. **Campos customizáveis por admin**: O construtor de formulário permite que admins definam labels, placeholders, help_text e options. Se um admin tiver sua conta comprometida, esses campos poderiam conter payloads XSS que seriam exibidos para visitantes.

4. **Imagens sem validação de conteúdo**: O upload de imagens (`ImageUpload.tsx`) valida apenas extensão e tamanho, não o conteúdo real. Um arquivo com JavaScript embedado em metadados EXIF poderia ser carregado.

---

### 1.9.7 Proteção contra CSRF

#### Status: SEM proteção CSRF

- **Nenhum token CSRF** é gerado, armazenado ou verificado em nenhum formulário.
- **Nenhum cookie `SameSite`** é configurado explicitamente (depende do comportamento padrão do navegador).
- **Nenhum cabeçalho anti-CSRF** (ex: `X-CSRF-Token`, `X-Requested-With`).
- **Nenhuma verificação de origem/referrer** nas operações de banco.

**Impacto:**
- **Formulários públicos** (`/c/[churchSlug]/[campaignSlug]`): Um atacante pode criar um site malicioso que, ao ser visitado por um usuário autenticado, submeta respostas em nome da vítima (se a vítima estiver logada no dashboard). Para formulários públicos (sem auth), qualquer site pode submeter dados.
- **Operações CRUD do dashboard**: Um atacante pode induzir um admin logado a executar ações como criar/editar/excluir campanhas sem consentimento.

**Mitigação parcial**: O Supabase Auth usa cookies `__session` com `SameSite=Lax` por padrão, o que protege contra CSRF em requisições GET, mas requisições POST (como a submissão de formulários) podem ser afetadas. A anon key pública permite submissão sem cookie, tornando o CSRF irrelevante para o formulário público (mas relevante para operações autenticadas).

---

### 1.9.8 Proteção contra SQL Injection

#### Status: Proteção adequada via Supabase client

- **Supabase client** (`@supabase/supabase-js`) usa consultas parametrizadas por padrão, prevenindo SQL injection nos níveis `select`, `insert`, `update`, `delete`.
- **RPC calls** usam parâmetros nomeados: `supabase.rpc('increment_campaign_views', { campaign_uuid: data.id })`.
- **Não há SQL bruto** no frontend.

**Riscos residuais:**
- **Funções RPC não auditadas**: As funções `create_user_with_role`, `change_user_password`, `delete_user_with_role` são chamadas via RPC mas não estão no schema.sql. Se implementadas com concatenação de strings, poderiam ser vulneráveis a SQL injection.
- **SECURITY DEFINER**: As funções marcadas como `SECURITY DEFINER` executam com privilégios elevados. Se houver SQL injection dentro delas, o impacto é maior.

---

### 1.9.9 Rate Limiting

#### Status: NENHUM rate limiting implementado

- **Não há** middleware de rate limiting (ex: `express-rate-limit` ou similar server-side).
- **Não há** limitação no nível do Supabase configurada no schema.
- **Não há** proteção contra:
  - Submissão massiva de formulários públicos (spam de respostas).
  - Tentativas de login em massa (brute-force).
  - Criação em massa de campanhas.
  - Scraping de dados públicos.
  - Ataques DDoS via requisições repetitivas.

**Dependência**: O Supabase tem rate limiting interno no nível de API Gateway, mas não é configurado pelo app.

---

### 1.9.10 Proteção de Rotas (Autorização/RBAC)

#### Middleware vs RLS

O sistema usa duas camadas de proteção:

**Camada 1 - Middleware (roteamento)**:
- Apenas verifica AUTENTICAÇÃO (sessão ativa).
- Não verifica AUTORIZAÇÃO (role do usuário).
- Escopo: apenas `/dashboard/:path*`.

**Camada 2 - RLS (banco de dados)**:
- Verifica autorização baseada em `church_id` e `role` nas tabelas.
- Políticas diferenciadas por role: `super_admin`, `church_admin`, `member`.
- Acesso público permitido para campanhas ativas/públicas.

**Camada 3 - Client-side (UI)**:
- Página de usuários (`users/page.tsx`): Bloqueia UI se `currentUserRole !== 'super_admin'`, mas isso é APENAS visual. Um usuário com role inferior ainda pode acessar a rota `/dashboard/users` (o middleware permite, e as RLS podem proteger as operações de banco).

**Problemas de RBAC:**

1. **Hierarquia de roles confusa**: O schema.sql define roles `super_admin`, `church_admin`, `member` na tabela `profiles`, mas o dashboard frontend (`users/page.tsx`) usa `user_roles` com roles `super_admin`, `church_admin`, `secretary`, `receptionist`, `user` -- dois sistemas de roles diferentes e conflitantes.

2. **Duas tabelas de roles**: `profiles.role` (schema.sql linhas 36) e `user_roles.role` (schema.sql linha 293) -- ambas definem roles mas não há sincronia entre elas.

3. **`user_roles` INSERT sem restrição**: A política `insert_own_role WITH CHECK (true)` permite que qualquer usuário crie seu próprio registro em `user_roles` com qualquer role.

4. **Client-side como única barreira para UI**: A página de usuários verifica role no frontend, mas não há proteção no middleware para rotas baseadas em role.

5. **Middleware não bloqueia rotas específicas**: Um usuário com role `member` pode acessar `/dashboard/users` -- a restrição é apenas visual e via RLS nas operações de banco.

---

### 1.9.11 API Routes

#### Status: Diretório VAZIO

- `src/app/api/` está completamente vazio.
- **Não há** API routes (Route Handlers) implementadas.
- **Todas as operações de dados** são feitas diretamente do cliente para o Supabase via `@supabase/ssr`.
- **Não há** server-side validation, sanitização, ou transformação de dados.
- **Não há** middlewares de API (logging, rate limiting, autenticação adicional).

**Implicação de segurança**: A anon key do Supabase está exposta no bundle do cliente (`NEXT_PUBLIC_SUPABASE_ANON_KEY`). Qualquer pessoa pode inspecionar o código fonte e usar essa chave para fazer requisições diretas à API do Supabase. As RLS são a ÚNICA barreira entre o atacante e os dados. Se uma RLS for mal configurada, os dados ficam expostos.

---

### 1.9.12 Storage e Upload

**Arquivo**: `/home/tork/Projetos/igreja-planalto/src/lib/supabase/upload.ts`

```ts
export async function uploadImage(file: File, path: string): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;
  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
  return urlData.publicUrl;
}
```

**Problemas de segurança no upload:**

1. **Sem validação de tipo MIME real**: A validação client-side verifica apenas a extensão do arquivo (`file.name.split('.').pop()`). Um arquivo `.jpg` pode conter JavaScript.

2. **Sem sanitização de nome de arquivo**: `file.name.split('.').pop()` usa o nome original. Se o nome contiver `../`, pode haver path traversal. Exemplo: `file.name = '../../../etc/passwd.jpg'` resultaria em `filePath = '../../../etc/passwd.jpg'`.

3. **Bucket público**: `getPublicUrl()` retorna URL pública -- sem controle de acesso por usuário.

4. **Sem RLS no Storage**: O schema.sql não define RLS policies para o bucket `images`.

5. **Sem limitação de dimensões**: Apenas tamanho (5MB) é verificado, não resolução ou proporção.

---

### 1.9.13 Outras Vulnerabilidades e Observações

#### Informação Sensível em Logs
- `console.error('Error incrementing view count:', rpcError)` em CampaignForm.tsx
- `console.error('Submit error:', err)` em CampaignForm.tsx
- `console.error('Erro ao carregar perfil:', err)` em campaigns/new/page.tsx
- `console.warn('URL de redirecionamento inválida:', redirectUrl)` em CampaignForm.tsx
- Logs no cliente podem vazar informações para o console do navegador.

#### Open Redirect (parcialmente mitigado)
- **Auth callback**: Protegido com validação do parâmetro `next` (apenas path local).
- **CampaignForm redirect**: `window.location.href = url.toString()` após validar protocolo HTTP/HTTPS -- seguro.
- **Middleware redirect**: Usa `pathname` do servidor, não input do usuário -- seguro.

#### Hardcoded Secrets
- `BASE_URL` hardcoded como `'https://igrejaplanalto.onrender.com'` em `qrcodes/page.tsx`.
- Bucket name `'images'` hardcoded em `upload.ts`.

#### Informação de Ambiente Exposta
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL` são expostas no bundle do cliente.

#### CORS
- Não há configuração CORS no `next.config.js`.
- O Supabase gerencia CORS no backend, mas sem configuração explícita no app.

---

### 1.9.14 Resumo de Vulnerabilidades

#### Críticas

| # | Vulnerabilidade | Localização | Impacto |
|---|----------------|-------------|---------|
| 1 | `user_roles` INSERT policy sem restrição (`WITH CHECK (true)`) | schema.sql:321 | Escalonamento de privilégio: qualquer usuário autenticado pode se tornar super_admin |
| 2 | Sem validação server-side de inputs | CampaignForm.tsx, todas as páginas | Dados maliciosos podem ser enviados diretamente à API do Supabase |
| 3 | Ausência total de headers de segurança | next.config.js, layout.tsx | Clickjacking, XSS sem mitigação, MIME sniffing |
| 4 | Duas tabelas de roles conflitantes | schema.sql (profiles.role + user_roles) | Confusão de permissões, bypass potencial de autorização |

#### Altas

| # | Vulnerabilidade | Localização | Impacto |
|---|----------------|-------------|---------|
| 5 | Sem CSRF protection | Todas as páginas | Ações não intencionais em nome de usuários autenticados |
| 6 | Sem rate limiting | Todo o app | Spam, brute-force, abuso de API |
| 7 | Storage sem RLS e sem sanitização de filename | lib/supabase/upload.ts | Upload arbitrário, path traversal |
| 8 | Política `GRANT ALL` para authenticated | schema.sql:333-339 | Risco se RLS for removida |
| 9 | Funções RPC não versionadas no schema | users/page.tsx (create_user_with_role, etc.) | Falta de auditoria, possível SQL injection |

#### Médias

| # | Vulnerabilidade | Localização | Impacto |
|---|----------------|-------------|---------|
| 10 | Middleware sem verificação de role | middleware.ts | Usuários podem acessar rotas restritas (protegidas apenas por RLS) |
| 11 | Validação de senha fraca (6 chars) | register/page.tsx | Senhas fracas permitidas |
| 12 | Catch vazio em server.ts cookies | lib/supabase/server.ts | Erros de cookie suprimidos silenciosamente |
| 13 | Sem MFA/2FA | Todo o app | Contas vulneráveis a roubo de senha |
| 14 | Logout automático sem confirmação | logout/page.tsx | Logout acidental ou forçado via CSRF |

#### Baixas

| # | Vulnerabilidade | Localização | Impacto |
|---|----------------|-------------|---------|
| 15 | Hardcoded BASE_URL | qrcodes/page.tsx | Ambiente errado em deploy diferente |
| 16 | console.error expondo detalhes | Múltiplos arquivos | Vazamento de informação no console |
| 17 | Regex de email simples | CampaignForm.tsx | Validação fraca de email |
| 18 | Sem loading.tsx/error.tsx | App Router | UX de erro não padronizada |

---

### 1.9.15 Recomendações Imediatas

1. **Corrigir RLS `insert_own_role`**: Substituir `WITH CHECK (true)` por `WITH CHECK (auth.uid() = user_id AND role = 'user')` para impedir auto-atribuição de roles elevadas.

2. **Adicionar security headers**: Configurar CSP, HSTS, X-Frame-Options, X-Content-Type-Options no `next.config.js`:
   ```js
   async headers() {
     return [{
       source: '/(.*)',
       headers: [
         { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co;" },
         { key: 'X-Frame-Options', value: 'DENY' },
         { key: 'X-Content-Type-Options', value: 'nosniff' },
         { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
       ]
     }];
   }
   ```

3. **Adicionar validação server-side**: Criar API routes ou usar Server Actions para validar dados antes de enviar ao Supabase, especialmente para formulários públicos.

4. **Unificar sistema de roles**: Escolher entre `profiles.role` e `user_roles` e manter consistência. Remover a tabela duplicada.

5. **Adicionar rate limiting**: Implementar middleware de rate limiting ou usar o provedor de hospedagem (ex: Render rate limiting).

6. **Adicionar proteção CSRF**: Implementar tokens CSRF para formulários, especialmente operações de escrita no dashboard.

7. **Adicionar RLS no Storage**: Configurar políticas para o bucket `images` restringindo acesso conforme necessário.

8. **Migrar para Next.js Middleware com verificação de role**: Estender o middleware para verificar não apenas autenticação, mas também autorização baseada em role para rotas específicas.

### 1.10 Storage e Upload
#### Sistema de Storage e Upload (Supabase Storage)

**Arquivo Principal:** `/home/tork/Projetos/igreja-planalto/src/lib/supabase/upload.ts` (26 linhas)

---

#### 1. Funcao de Upload (`uploadImage`)

\`\`\`typescript
export async function uploadImage(file: File, path: string): Promise<string>
\`\`\`

- **Bucket:** Hardcoded como \`"images"\` (linha 13)
- **Caminho:** \`${path}-${Date.now()}.${fileExt}\` -- sem subdiretorios, todos os arquivos na raiz do bucket
- **Nome unico:** Garantido via timestamp (\`Date.now()\`)
- **Cache control:** \`3600\` segundos (1 hora)
- **Upsert:** \`false\` (nao sobrescreve arquivos existentes)
- **Retorno:** URL publica via \`getPublicUrl()\`
- **Seguranca:** Nao ha assinatura de URL (signed URLs) -- todas as URLs sao publicas e permanentes

---

#### 2. Componente de Upload (\`ImageUpload.tsx\`)

**Localizacao:** \`/home/tork/Projetos/igreja-planalto/src/components/ui/ImageUpload.tsx\` (122 linhas)

**Props:**
| Prop | Tipo | Descricao |
|------|------|-----------|
| \`currentUrl\` | \`string | null\` | URL atual para preview |
| \`onUpload\` | \`(url: string) => void\` | Callback com URL do upload |
| \`label\` | \`string\` (opcional) | Label do campo |
| \`className\` | \`string\` (opcional) | Classes extras no container |
| \`previewClassName\` | \`string\` (opcional) | Classes para o preview |

**Features:**
- Preview instantaneo via \`URL.createObjectURL()\`
- Botao de remocao (canto superior direito)
- Dropzone (clique para selecionar, sem drag-and-drop)
- Loading spinner (\`Loader2\`) durante upload
- Mensagem de erro inline
- Cleanup de object URLs no unmount (\`useEffect\` return)
- ID unico por instancia (\`idCounter\`)

**Validacoes (client-side):**
1. Tipo MIME: \`image/png\`, \`image/jpeg\`, \`image/gif\`, \`image/webp\` (atributo \`accept\`)
2. Tamanho maximo: \`5MB\` (\`5 * 1024 * 1024\`)

**MIME Types aceitos:** PNG, JPEG/JPG, GIF, WebP (definido no \`accept\` do input)

---

#### 3. Schema do Banco (Colunas de Imagem)

| Tabela | Coluna | Tipo | Uso |
|--------|--------|------|-----|
| \`churches\` | \`logo_url\` | \`TEXT NULL\` | Logo da igreja |
| \`churches\` | \`banner_url\` | \`TEXT NULL\` | Banner da igreja |
| \`profiles\` | \`avatar_url\` | \`TEXT NULL\` | Avatar do usuario |
| \`campaigns\` | \`banner_url\` | \`TEXT NULL\` | Banner da campanha |

**Importante:** O schema.sql NAO inclui:
- Criacao do bucket \`images\` (deve ser criado manualmente no dashboard do Supabase)
- Politicas RLS para o Storage (necessario configurar no dashboard do Supabase)
- Triggers ou funcoes relacionadas a limpeza de imagens orfas

---

#### 4. Onde as Imagens Sao Exibidas

| Imagem | Upload (Settings) | Exibicao | Observacao |
|--------|-------------------|----------|------------|
| **Logo** (\`churches.logo_url\`) | Aba Perfil (Settings) | **NAO exibida** -- header/sidebar usam icone \`Church\` da lucide-react, nao a logo real | Gap: logo carregada mas nunca renderizada |
| **Banner** (\`churches.banner_url\`) | Aba Perfil (Settings) | \`CampaignForm.tsx\` como background do cabecalho da campanha (\`<img src={campaign.banner_url}>\`) | Apenas banner da campanha, nao da igreja |
| **Banner Campanha** (\`campaigns.banner_url\`) | Criacao/Edicao de Campanha | \`CampaignForm.tsx\` (rota publica) como hero image | \`<img className="w-full h-64 md:h-80 object-cover">\` |
| **Avatar** (\`profiles.avatar_url\`) | Aba Meu Perfil (Settings) | **NAO exibida** -- dashboard usa \`getInitials()\` para avatares textuais | Gap: avatar_url salvo mas nunca usado visualmente |

**Locais que usam \`getInitials()\` em vez de imagens reais:**
- \`dashboard/page.tsx\` (respostas recentes)
- \`dashboard/responses/page.tsx\`
- \`dashboard/visitors/page.tsx\`

---

#### 5. Performance de Imagens

- **Next.js Image Optimization:** Desabilitado (\`images: { unoptimized: true }\` no \`next.config.js\`)
- **Componente de imagem:** Usa \`<img>\` tradicional (NUNCA \`<Image>\` do Next.js)
- **Lazy loading:** Nao implementado (sem \`loading="lazy"\`)
- **Responsividade:** Nao usa \`srcset\` ou tamanhos responsivos
- **CDN:** Nao ha CDN de imagens -- as URLs sao servidas diretamente pelo Supabase Storage
- **Otimizacao pre-upload:** Nao ha compressao, redimensionamento ou transformacao antes do upload
- **Preview:** Usa \`URL.createObjectURL\` para preview instantaneo sem upload

---

#### 6. Tratamento de Erros

| Nivel | Erro | Tratamento |
|-------|------|------------|
| **Upload function** | Falha no \`supabase.storage.upload()\` | \`throw error\` -- propaga para o caller |
| **Upload function** | Falha no \`getPublicUrl()\` | Silencioso (nao verifica erro) |
| **Component** | Tipo invalido (nao imagem) | \`setError("Selecione uma imagem valida")\` |
| **Component** | Tamanho > 5MB | \`setError("A imagem deve ter no maximo 5MB")\` |
| **Component** | Falha no upload | \`setError("Erro ao fazer upload. Verifique as permissoes do Storage.")\` + reverte preview |
| **Component** | Sucesso | Chama \`onUpload(url)\` |

---

#### 7. Limitacoes Identificadas

1. **Bucket name hardcoded:** \`"images"\` fixo no codigo, sem variavel de ambiente
2. **Sem organizacao em pastas:** Todos os uploads vao para a raiz do bucket
3. **Sem politicas RLS no schema.sql:** Storage policies precisam ser configuradas manualmente no dashboard do Supabase
4. **Sem signed URLs:** Todas as URLs sao publicas e permanentes
5. **Sem limpeza de imagens orfas:** Ao substituir uma imagem, a antiga permanece no bucket
6. **Sem validacao server-side:** Tipo e tamanho sao validados apenas no cliente
7. **Sem compressao/redimensionamento:** Imagens sao enviadas em tamanho original
8. **Sem fallback para logos/avatars:** Logo carregada mas nunca exibida; avatar carregado mas nunca exibido
9. **Sem progresso de upload:** Apenas spinner, sem barra de progresso
10. **Sem drag-and-drop:** Apenas clique para selecionar arquivo
11. **Sem crop/edicao:** Nao ha ferramentas de recorte antes do upload
12. **Sem cache/CDN:** Imagens sao servidas diretamente do Supabase sem CDN dedicado
13. **Sem otimizacao Next.js:** \`unoptimized: true\` desabilita a pipeline de otimizacao de imagens do Next.js
14. **Sem lazy loading:** Imagens sao carregadas imediatamente, sem \`loading="lazy"\`
15. **Logo e avatar ignorados na UI:** Apesar de armazenados no banco, nao sao renderizados em lugar nenhum

### 1.11 Schema do Banco
**(Agente 11) - Analise Completa do Schema do Banco de Dados**

#### Arquivo Analisado
- `/home/tork/Projetos/igreja-planalto/supabase/schema.sql` (350 linhas)
- `/home/tork/Projetos/igreja-planalto/src/types/database.ts` (272 linhas - tipos TypeScript gerados)

---

#### Extensoes PostgreSQL Ativadas
| Extensao | Proposito |
|----------|-----------|
| `uuid-ossp` | Geracao de UUIDs via `uuid_generate_v4()` |
| `pgcrypto` | Funcoes criptograficas (hash, gen_random_uuid, etc.) |

---

#### Schemas Identificados

| Schema | Origem | Conteudo |
|--------|--------|----------|
| **`public`** | Schema principal do projeto | Todas as 7 tabelas, indices, RLS, funcoes, triggers, seed data |
| **`auth`** | Supabase interno | `auth.users` (referenciado via FK), `auth.uid()` nas RLS policies |
| **`private`** | Definido no schema | Contem a funcao `private.is_admin()` usada nas RLS de `user_roles` |
| **`storage`** | Supabase interno | Bucket `images` usado pelo utilitario `upload.ts` (nao explicito no schema.sql) |

**Nota:** O schema `private` nao e criado explicitamente no schema.sql (nao ha `CREATE SCHEMA private;`). A funcao `private.is_admin()` falhara se o schema nao existir. Isso e um bug potencial.

---

#### Tabelas, Colunas e Tipos

##### 1. `public.churches` (Multi-tenancy)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, `uuid_generate_v4()` | |
| `name` | TEXT | NOT NULL | |
| `slug` | TEXT | UNIQUE NOT NULL | |
| `logo_url` | TEXT | | |
| `banner_url` | TEXT | | |
| `slogan` | TEXT | | |
| `primary_color` | TEXT | | `'#C29560'` |
| `secondary_color` | TEXT | | `'#D4A86A'` |
| `address` | TEXT | | |
| `phone` | TEXT | | |
| `email` | TEXT | | |
| `website` | TEXT | | |
| `social_links` | JSONB | | `'{}'::jsonb` |
| `settings` | JSONB | | `{"allow_registration": true, "require_approval": false, "notification_email": null}` |
| `created_at` | TIMESTAMPTZ | | `NOW()` |
| `updated_at` | TIMESTAMPTZ | | `NOW()` |

**Discrepancia:** O tipo `database.ts` inclui uma coluna `whatsapp` que NAO existe no schema.sql.

##### 2. `public.profiles` (Extensao do Auth)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, FK -> `auth.users(id)` ON DELETE CASCADE | |
| `church_id` | UUID | FK -> `public.churches(id)` ON DELETE SET NULL | |
| `role` | TEXT | NOT NULL, CHECK IN (`'super_admin'`, `'church_admin'`, `'member'`) | `'member'` |
| `name` | TEXT | | |
| `avatar_url` | TEXT | | |
| `phone` | TEXT | | |
| `created_at` | TIMESTAMPTZ | | `NOW()` |
| `updated_at` | TIMESTAMPTZ | | `NOW()` |

**Discrepancia:** O tipo `database.ts` inclui `email` como coluna, mas o schema.sql NAO define `email` na tabela `profiles`. A trigger `handle_new_user()` tenta inserir `NEW.email` em `profiles`, o que falharia se a coluna nao existir.

##### 3. `public.campaigns` (Campanhas/Formularios)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, `uuid_generate_v4()` | |
| `church_id` | UUID | NOT NULL, FK -> `public.churches(id)` ON DELETE CASCADE | |
| `title` | TEXT | NOT NULL | |
| `slug` | TEXT | NOT NULL | |
| `description` | TEXT | | |
| `banner_url` | TEXT | | |
| `start_date` | TIMESTAMPTZ | | |
| `end_date` | TIMESTAMPTZ | | |
| `is_active` | BOOLEAN | | `true` |
| `is_public` | BOOLEAN | | `true` |
| `qr_code_url` | TEXT | | |
| `settings` | JSONB | | `{"show_visitor_count": false, "allow_anonymous": true, "require_phone": false, "require_email": false, "thank_you_message": "Obrigado por preencher!", "redirect_url": null}` |
| `created_by` | UUID | FK -> `auth.users(id)` ON DELETE SET NULL | |
| `created_at` | TIMESTAMPTZ | | `NOW()` |
| `updated_at` | TIMESTAMPTZ | | `NOW()` |
| UNIQUE | | `(church_id, slug)` | |

**Discrepancia:** O tipo `database.ts` NAO inclui `created_by`, mas o schema.sql tem.

##### 4. `public.campaign_fields` (Campos Dinamicos do Formulario)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, `uuid_generate_v4()` | |
| `campaign_id` | UUID | NOT NULL, FK -> `public.campaigns(id)` ON DELETE CASCADE | |
| `label` | TEXT | NOT NULL | |
| `field_type` | TEXT | NOT NULL, CHECK IN (`text`, `textarea`, `select`, `checkbox`, `radio`, `date`, `phone`, `email`, `number`, `file`, `hidden`) | |
| `required` | BOOLEAN | | `false` |
| `options` | JSONB | | `'[]'::jsonb` |
| `placeholder` | TEXT | | |
| `help_text` | TEXT | | |
| `field_order` | INTEGER | | `0` |
| `validation_rules` | JSONB | | `'{}'::jsonb` |
| `conditional_logic` | JSONB | | `'{}'::jsonb` |
| `created_at` | TIMESTAMPTZ | | `NOW()` |
| `updated_at` | TIMESTAMPTZ | | `NOW()` |

**Discrepancia:** O tipo `database.ts` tem divergencias significativas:
- Nomeia a coluna como `type` (nao `field_type`)
- Nomeia a coluna como `order` (nao `field_order`)
- Enum de tipos nao inclui `number`, `hidden` (schema.sql inclui)
- Esta faltando `help_text`, `validation_rules`, `conditional_logic`

##### 5. `public.responses` (Respostas dos Formularios)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, `uuid_generate_v4()` | |
| `campaign_id` | UUID | NOT NULL, FK -> `public.campaigns(id)` ON DELETE CASCADE | |
| `data` | JSONB | NOT NULL | `'{}'::jsonb` |
| `visitor_name` | TEXT | | |
| `visitor_phone` | TEXT | | |
| `visitor_email` | TEXT | | |
| `ip_address` | INET | | |
| `user_agent` | TEXT | | |
| `referrer` | TEXT | | |
| `utm_source` | TEXT | | |
| `utm_medium` | TEXT | | |
| `utm_campaign` | TEXT | | |
| `utm_content` | TEXT | | |
| `utm_term` | TEXT | | |
| `created_at` | TIMESTAMPTZ | | `NOW()` |

**Discrepancia:** O tipo `database.ts` NAO inclui as colunas `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.

##### 6. `public.campaign_views` (Analytics de Visualizacoes)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PK, `uuid_generate_v4()` | |
| `campaign_id` | UUID | NOT NULL, FK -> `public.campaigns(id)` ON DELETE CASCADE | |
| `ip_address` | INET | | |
| `user_agent` | TEXT | | |
| `referrer` | TEXT | | |
| `created_at` | TIMESTAMPTZ | | `NOW()` |

##### 7. `public.user_roles` (RBAC - Tabela Separada)
| Coluna | Tipo | Constraints | Default |
|--------|------|-------------|---------|
| `user_id` | UUID | PK, FK -> `auth.users(id)` ON DELETE CASCADE | |
| `role` | TEXT | NOT NULL | `'user'` |
| `created_at` | TIMESTAMPTZ | NOT NULL | `NOW()` |

---

#### Chaves Primarias e Estrangeiras (Relacionamentos)

```
auth.users
  +-- profiles.id (1:1, ON DELETE CASCADE)
  +-- campaigns.created_by (1:N, ON DELETE SET NULL)
  +-- user_roles.user_id (1:1, ON DELETE CASCADE)

churches
  +-- profiles.church_id (1:N, ON DELETE SET NULL)
  +-- campaigns.church_id (1:N, ON DELETE CASCADE)

campaigns
  +-- campaign_fields.campaign_id (1:N, ON DELETE CASCADE)
  +-- responses.campaign_id (1:N, ON DELETE CASCADE)
  +-- campaign_views.campaign_id (1:N, ON DELETE CASCADE)
```

**Problema de Design:** Duas tabelas separadas para roles (`profiles.role` e `user_roles.role`) com valores diferentes:
- `profiles.role`: `'super_admin' | 'church_admin' | 'member'`
- `user_roles.role`: qualquer texto, default `'user'`

Isso cria um sistema de RBAC **hibrido e inconsistente**, onde:
- As RLS policies em `churches`, `campaigns`, `campaign_fields`, `responses`, `campaign_views` usam `profiles.role`
- As RLS policies em `user_roles` usam `user_roles.role` via `private.is_admin()`
- O frontend em `users/page.tsx` usa `user_roles` com 5 roles diferentes
- O frontend em `settings/page.tsx` usa `profiles` para gerenciar usuarios

---

#### Indices (9 indices)

| Nome | Tabela | Coluna | Tipo | Proposito |
|------|--------|--------|------|-----------|
| `idx_campaigns_church_id` | campaigns | church_id | B-tree | Filtro por igreja |
| `idx_campaigns_slug` | campaigns | slug | B-tree | Busca por slug publico |
| `idx_campaigns_is_active` | campaigns | is_active | B-tree | Filtro campanhas ativas |
| `idx_campaign_fields_campaign_id` | campaign_fields | campaign_id | B-tree | JOIN com campaigns |
| `idx_responses_campaign_id` | responses | campaign_id | B-tree | JOIN e filtro |
| `idx_responses_created_at` | responses | created_at DESC | B-tree (desc) | Ordenacao recentes |
| `idx_campaign_views_campaign_id` | campaign_views | campaign_id | B-tree | JOIN e filtro |
| `idx_campaign_views_created_at` | campaign_views | created_at DESC | B-tree (desc) | Ordenacao recentes |
| `idx_profiles_church_id` | profiles | church_id | B-tree | Filtro por igreja |

**Analise de Performance:**

**Indices Recomendados (que podem melhorar performance):**
- `responses(visitor_email)` - Para busca de visitantes por email
- `responses(visitor_phone)` - Para busca de visitantes por telefone
- `responses(visitor_name)` - Para busca textual de visitantes
- `profiles(role)` - Para filtros de role (usado em todas as RLS policies)
- `campaigns(created_at DESC)` - Para ordenacao no dashboard
- Indice composto `responses(campaign_id, created_at DESC)` - Otimiza "ultimas respostas por campanha"
- Indice composto `responses(created_at, campaign_id)` - Para dashboard de tendencias
- Indice GIN em `responses(data)` para busca textual nos dados JSONB (se necessario)

**Problema de Performance Potencial:**
As RLS policies usam subqueries aninhadas profundas que podem ser ineficientes em escala. Recomenda-se adicionar `church_id` diretamente em tabelas como `responses` e `campaign_views`, ou usar `auth.jwt()` para extrair claims do token.

---

#### Row Level Security (RLS Policies) - 18 Policies

##### `public.churches` (3 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `churches_select_own` | SELECT | Autenticado | Usuario pode ver sua propria igreja OU super_admin ve todas |
| `churches_insert_admin` | INSERT | Autenticado | Apenas super_admin pode criar igrejas |
| `churches_update_admin` | UPDATE | Autenticado | Apenas church_admin ou super_admin daquela igreja pode editar |

**Analise:** Nao ha `DELETE` policy, o que significa que nenhum usuario (nem super_admin) pode excluir igrejas via SQL direto (protecao intencional).

##### `public.profiles` (3 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `profiles_select_own` | SELECT | Autenticado | Usuario ve proprio perfil OU perfis da mesma igreja |
| `profiles_update_own` | UPDATE | Autenticado | Apenas o proprio usuario pode editar seu perfil |
| `profiles_insert_own` | INSERT | Autenticado | Apenas o proprio usuario pode criar seu perfil |

**Problema de Seguranca:** `profiles_select_own` permite que qualquer membro veja dados de outros membros (nomes, telefones, etc.), o que pode violar privacidade.

##### `public.campaigns` (4 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `campaigns_select_public` | SELECT | Publico | Autenticado ve campanhas da sua igreja; publico ve apenas `is_public = true` |
| `campaigns_insert_admin` | INSERT | Autenticado | Apenas church_admin ou super_admin |
| `campaigns_update_admin` | UPDATE | Autenticado | Apenas church_admin ou super_admin |
| `campaigns_delete_admin` | DELETE | Autenticado | Apenas church_admin ou super_admin |

**Analise:** Correto. A policy `SELECT` permite que usuarios anonimos vejam campanhas publicas (essencial para o formulario publico).

##### `public.campaign_fields` (4 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `campaign_fields_select_public` | SELECT | Publico | Admins da igreja OU campos de campanhas publicas |
| `campaign_fields_insert_admin` | INSERT | Autenticado | Apenas church_admin ou super_admin |
| `campaign_fields_update_admin` | UPDATE | Autenticado | Apenas church_admin ou super_admin |
| `campaign_fields_delete_admin` | DELETE | Autenticado | Apenas church_admin ou super_admin |

**Analise:** Correto. Consistente com as policies de `campaigns`.

##### `public.responses` (3 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `responses_select_admin` | SELECT | Autenticado | Apenas church_admin ou super_admin da campanha |
| `responses_insert_public` | INSERT | Publico (anon) | Apenas em campanhas publicas E ativas |
| `responses_delete_admin` | DELETE | Autenticado | Apenas church_admin ou super_admin |

**Analise:**
- Nao ha policy de UPDATE para responses (protecao de auditoria).
- `responses_insert_public` permite insercao anonima em campanhas publicas e ativas.
- **Problema:** Se `settings.allow_anonymous` for `false`, a policy ainda permite insercao anonima, pois verifica apenas `is_public` e `is_active`.

##### `public.campaign_views` (2 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `campaign_views_insert_public` | INSERT | Publico (anon) | Apenas em campanhas publicas E ativas |
| `campaign_views_select_admin` | SELECT | Autenticado | Apenas church_admin ou super_admin da campanha |

**Analise:** Correto.

##### `public.user_roles` (4 policies)
| Policy | Operacao | Acesso | Regra |
|--------|----------|--------|-------|
| `read_own_role` | SELECT | Autenticado | Le propria role OU se e admin |
| `insert_own_role` | INSERT | Autenticado | Qualquer autenticado pode inserir (WITH CHECK true) |
| `update_role_admin_only` | UPDATE | Autenticado | Apenas admin (via `private.is_admin()`) |
| `admin_delete_user_roles` | DELETE | Autenticado | Proprio usuario OU admin |

**Problema de Seguranca Grave:** `insert_own_role` com `WITH CHECK (true)` permite que QUALQUER usuario autenticado se atribua qualquer role, incluindo `super_admin`.

---

#### Funcoes (3 definidas no schema.sql)

| Funcao | Linguagem | Security | Proposito | Problema |
|--------|-----------|----------|-----------|----------|
| `update_updated_at_column()` | plpgsql | INVOKER | Trigger para atualizar `updated_at` | Nenhum |
| `handle_new_user()` | plpgsql | SECURITY DEFINER | Cria profile ao signup | `EXCEPTION WHEN OTHERS` suprime erros; falta `SET search_path` |
| `increment_campaign_views(UUID)` | plpgsql | SECURITY DEFINER | Incrementa contagem de visualizacoes | `EXCEPTION WHEN OTHERS` suprime erros; falta `SET search_path` |

**Discrepancia Grave:** 3 funcoes RPC usadas no frontend NAO estao definidas no schema.sql:
- `create_user_with_role` (usada em `users/page.tsx`)
- `change_user_password` (usada em `users/page.tsx`)
- `delete_user_with_role` (usada em `users/page.tsx`)

Isso significa que o schema.sql esta desatualizado em relacao ao banco real, ou essas funcoes foram criadas diretamente no SQL Editor do Supabase.

---

#### Triggers (5 triggers)

| Trigger | Tabela | Evento | Funcao | Proposito |
|---------|--------|--------|--------|-----------|
| `update_churches_updated_at` | churches | BEFORE UPDATE | `update_updated_at_column()` | Atualiza `updated_at` |
| `update_profiles_updated_at` | profiles | BEFORE UPDATE | `update_updated_at_column()` | Atualiza `updated_at` |
| `update_campaigns_updated_at` | campaigns | BEFORE UPDATE | `update_updated_at_column()` | Atualiza `updated_at` |
| `update_campaign_fields_updated_at` | campaign_fields | BEFORE UPDATE | `update_updated_at_column()` | Atualiza `updated_at` |
| `on_auth_user_created` | auth.users | AFTER INSERT | `handle_new_user()` | Cria profile automatico |

**Observacao:** Tabelas `responses`, `campaign_views` e `user_roles` nao possuem trigger de `updated_at` (intencional: sao append-only ou imutaveis).

---

#### Grants e Permissoes

```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.churches TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.campaigns TO authenticated;
GRANT ALL ON public.campaign_fields TO authenticated;
GRANT ALL ON public.responses TO authenticated;
GRANT ALL ON public.campaign_views TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
```

**Analise:** 
- `anon` tem apenas `USAGE ON SCHEMA public` - acesso indireto via RLS policies.
- `authenticated` tem `ALL` em todas as tabelas. As RLS policies restringem o acesso efetivo, mas `ALL` inclui `TRUNCATE` e `REFERENCES`.
- **Recomendacao:** Usar grants mais especificos (SELECT, INSERT, UPDATE, DELETE) em vez de `ALL`.

---

#### Seed Data

```sql
INSERT INTO public.churches (name, slug, slogan, primary_color, secondary_color, email)
VALUES (
    'Igreja Campo do Planalto',
    'campo-do-planalto',
    'Vila Planalto',
    '#C29560',
    '#D4A86A',
    'contato@campodoplanalto.org'
) ON CONFLICT (slug) DO NOTHING;
```

Apenas 1 igreja e seedada. Nao ha seed de profiles, campaigns, ou qualquer outro dado de teste.

---

#### Discrepancias Schema.sql vs database.ts (Resumo)

| Item | schema.sql | database.ts | Impacto |
|------|-----------|-------------|---------|
| `churches.whatsapp` | AUSENTE | PRESENTE | Schema desatualizado |
| `profiles.email` | AUSENTE | PRESENTE | Trigger pode falhar |
| `campaigns.created_by` | PRESENTE | AUSENTE | Frontend nao tipa |
| `campaign_fields.field_type` | `field_type` | `type` | Inconsistencia |
| `campaign_fields.field_order` | `field_order` | `order` | Inconsistencia |
| `campaign_fields.help_text` | PRESENTE | AUSENTE | Recurso nao exposto |
| `campaign_fields.validation_rules` | PRESENTE | AUSENTE | Recurso nao exposto |
| `campaign_fields.conditional_logic` | PRESENTE | AUSENTE | Recurso nao exposto |
| Tipos extras `number`, `hidden` | PRESENTES | AUSENTES | Frontend limitado |
| UTM columns em responses | PRESENTES (6) | AUSENTES | Analytics nao tipados |
| `create_user_with_role` RPC | AUSENTE | USADO | Codigo pode quebrar |
| `change_user_password` RPC | AUSENTE | USADO | Codigo pode quebrar |
| `delete_user_with_role` RPC | AUSENTE | USADO | Codigo pode quebrar |

---

#### Analise de Performance

**Pontos Fortes:**
- Indices em todas as FKs
- Indices DESC em `created_at` para consultas recentes
- Indice em `is_active` para filtro de campanhas ativas

**Indices Faltando (Recomendados):**
- `responses(visitor_email)`, `responses(visitor_phone)`, `responses(visitor_name)` - Busca de visitantes
- `profiles(role)` - Filtros de role (usado extensivamente em RLS)
- `campaigns(created_at DESC)` - Ordenacao no dashboard
- `responses(campaign_id, created_at DESC)` - Indice composto para ultimas respostas
- `responses(created_at, campaign_id)` - Dashboard de tendencias

**Gargalo Potencial:**
As RLS policies usam subqueries aninhadas que exigem scan em `profiles` para cada acesso. Em escala, isso pode ser mitigado com:
1. Funcao `SECURITY DEFINER` para lookup de `church_id`
2. Coluna `church_id` denormalizada em `responses` e `campaign_views`
3. Uso de `auth.jwt()` com claims customizados

---

#### Analise de Seguranca

**Vulnerabilidades Encontradas:**

1. **CRITICA - Auto-promocao em `user_roles.insert_own_role`:**
   Policy com `WITH CHECK (true)` permite que qualquer usuario se atribua `super_admin`.

2. **ALTA - RPCs faltando no schema.sql:**
   `create_user_with_role`, `change_user_password`, `delete_user_with_role` usadas no frontend mas ausentes do schema. Se criadas sem verificacoes, podem ser vetores de ataque.

3. **MEDIA - Supressao de erros em triggers:**
   `EXCEPTION WHEN OTHERS THEN NULL` mascara bugs de integridade.

4. **MEDIA - Schema `private` nao criado:**
   `private.is_admin()` pode falhar se o schema nao existir.

5. **MEDIA - Exposicao de dados entre membros:**
   `profiles_select_own` permite que membros vejam dados uns dos outros.

6. **BAIXA - Grants `ALL` super-permissivos:**
   Inclui `TRUNCATE` e `REFERENCES` desnecessarios.

7. **BAIXA - `SECURITY DEFINER` sem `SET search_path`:**
   Funcoes vulneraveis a ataques de search_path.

8. **BAIXA - `responses_insert_public` nao verifica `settings.allow_anonymous`:**
   Permite insercao anonima mesmo quando configuracao desabilita.

---

#### Recomendacoes

**Imediatas (Correcao de Bugs):**
1. Adicionar `CREATE SCHEMA IF NOT EXISTS private;` ao schema.sql
2. Adicionar as 3 RPCs faltantes ao schema.sql com verificacoes de seguranca
3. Corrigir `insert_own_role` para `WITH CHECK (private.is_admin())`
4. Alinhar colunas entre schema.sql e database.ts

**Curto Prazo:**
5. Regenerar `database.ts` a partir do schema real do Supabase
6. Adicionar indices de performance recomendados
7. Adicionar `SET search_path = public` nas funcoes `SECURITY DEFINER`
8. Otimizar RLS policies com funcoes helper para evitar subqueries aninhadas

**Medio Prazo:**
9. Unificar `profiles.role` e `user_roles.role` em um unico sistema de RBAC
10. Denormalizar `church_id` em `responses` e `campaign_views` para performance
11. Implementar soft-delete em vez de ON DELETE CASCADE
12. Usar grants especificos em vez de `ALL`

### 1.12 Fluxo de Autenticação
*(Agente 12 - Analise Completa do Fluxo de Autenticacao)*

##### 1. FLUXO DE LOGIN (email/senha)

**Arquivo:** `/home/tork/Projetos/igreja-planalto/src/app/dashboard/login/page.tsx` (130 linhas, Client Component)

- **Metodo:** Apenas `signInWithPassword` (email + senha). Nao ha suporte a magic link, OAuth (Google, GitHub, Apple) ou provedores sociais.
- **Processo:**
  1. Usuario preenche email + senha em formulario Client Component com estados `loading`, `error`, `showPassword`.
  2. Ao submeter (`handleSubmit`), previne reload e chama `supabase.auth.signInWithPassword({ email, password })`.
  3. Em caso de erro "Invalid login credentials": traduz para "Email ou senha incorretos" (protecao contra enumeracao de usuarios).
  4. Outros erros do Supabase sao exibidos diretamente (sem tratamento adicional).
  5. Em caso de sucesso: redireciona via `router.push('/dashboard')` (sem usar o query param `redirect` que o middleware salva).
- **UX:** Toggle show/hide senha (icones Eye/EyeOff), link "Esqueceu a senha?" (`/dashboard/reset-password`), link "Criar conta" (`/dashboard/register`).
- **Seguranca:** Sem protecao CSRF explicita; depende da seguranca nativa do Supabase Auth. Sem rate limiting visivel. Sem captcha/reCAPTCHA.
- **Bug potencial:** O `redirect` query param definido pelo middleware nao e lido na pagina de login -- se o usuario foi redirecionado de uma rota protegida, o redirect e perdido e o usuario sempre vai para `/dashboard`.

##### 2. FLUXO DE REGISTRO

**Arquivo:** `/home/tork/Projetos/igreja-planalto/src/app/dashboard/register/page.tsx` (162 linhas, Client Component)

- **Metodo:** `supabase.auth.signUp` com `options.data.full_name` e `emailRedirectTo`.
- **Processo:**
  1. Formulario: nome, email, senha, confirmar senha.
  2. Validacoes client-side: senhas coincidem (linha 26-29), minimo 6 caracteres (linha 31-34).
  3. Ao submeter, chama `supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: \`\${window.location.origin}/auth/callback\` } })`.
  4. Erro "User already registered" traduzido para "Este email ja esta cadastrado".
  5. Em caso de sucesso: tela de confirmacao (estado `success=true`) informando que email de verificacao foi enviado.
- **Redirect:** `emailRedirectTo` aponta para `${window.location.origin}/auth/callback`.
- **Trigger no banco (`schema.sql` linha 263-276):** A funcao `handle_new_user()` (SECURITY DEFINER) e acionada por trigger `on_auth_user_created` apos INSERT em `auth.users`. Ela insere automaticamente um registro na tabela `profiles` com `role = 'member'` e `name` extraido de `raw_user_meta_data->>'name'`.
- **Duplicidade de roles:** Existe `profiles.role` (super_admin, church_admin, member) E `user_roles.role` (super_admin, church_admin, secretary, receptionist, user). O trigger de signup so popula `profiles`, nao `user_roles`. Isso pode causar inconsistencia.

##### 3. FLUXO DE LOGOUT

**Arquivo:** `/home/tork/Projetos/igreja-planalto/src/app/dashboard/logout/page.tsx` (38 linhas, Client Component)

- **Processo:**
  1. Ao montar o componente (`useEffect` com array vazio), executa `supabase.auth.signOut()`.
  2. Em caso de sucesso: `setMessage('Redirecionando...')`.
  3. Em caso de erro (catch): `setMessage('Erro ao sair')`.
  4. No bloco `finally`: apos 1 segundo (`setTimeout`), redireciona via `router.push('/dashboard/login')`.
- **Observacao:** Nao ha confirmacao de logout -- a acao e disparada automaticamente ao navegar para a pagina `/dashboard/logout`.
- **Acesso via sidebar:** Link "Sair" presente na sidebar (componente `Layout.tsx` linha 129) aponta para `/dashboard/logout`.
- **Estado:** Exibe spinner `Loader2` com mensagem dinamica.

##### 4. FLUXO DE RESET DE SENHA

**Arquivo:** `/home/tork/Projetos/igreja-planalto/src/app/dashboard/reset-password/page.tsx` (114 linhas, Client Component)

- **Metodo:** `supabase.auth.resetPasswordForEmail(email, { redirectTo })`.
- **Processo:**
  1. Formulario simples com input de email e validacao `required`.
  2. Submissao chama `resetPasswordForEmail(email, { redirectTo: \`\${window.location.origin}/auth/callback\` })`.
  3. Em caso de erro: exibe mensagem original do Supabase.
  4. Em caso de sucesso (estado `sent=true`): tela com mensagem "Enviamos um link de redefinicao de senha para [email]".
  5. Link "Voltar para o login".
- **Callback:** O link de reset (enviado por email) leva o usuario para `/auth/callback?code=...` onde o `code` e trocado por sessao.

##### 5. CALLBACK OAUTH / MAGIC LINK

**Arquivo:** `/home/tork/Projetos/igreja-planalto/src/app/auth/callback/page.tsx` (66 linhas, Client Component)

- **Finalidade:** Receber redirects do Supabase Auth apos confirmacao de email, reset de senha, ou (futuramente) magic link / OAuth.
- **Processo:**
  1. Le o parametro `code` da query string (`URLSearchParams`).
  2. Le o parametro `next` (padrao: `/dashboard`).
  3. **Validacao de `next`:** Permite apenas paths relativos que comecam com `/` e nao comecam com `//` e nao contem `://`. Isso previne open redirect attacks.
  4. Chama `supabase.auth.exchangeCodeForSession(code)` para trocar o code de autorizacao por uma sessao completa.
  5. Redireciona para o path em `next`.
- **Estados:** Loading (spinner `Loader2` + "Autenticando..."), Erro (icone `AlertCircle` + mensagem + botao "Voltar para o login").
- **Protecao:** Se `code` ausente, exibe erro "Codigo de autenticacao nao encontrado".

##### 6. GERENCIAMENTO DE SESSAO (Cookies, Nao localStorage)

**Cliente browser** (`/home/tork/Projetos/igreja-planalto/src/lib/supabase/client.ts` - 8 linhas):
- Usa `createBrowserClient` do pacote `@supabase/ssr` (v0.5.0).
- Nao usa `localStorage` ou `sessionStorage` -- o `@supabase/ssr` gerencia a sessao automaticamente via cookies HTTP-only seguros.
- Depende de `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**Cliente server** (`/home/tork/Projetos/igreja-planalto/src/lib/supabase/server.ts` - 32 linhas):
- Usa `createServerClient` do `@supabase/ssr` com `cookies()` do `next/headers`.
- Implementa get/set/remove de cookies lendo do `cookieStore`.
- **Problema:** `set` e `remove` tem `try/catch` com catch vazio -- erros de cookie sao silenciosamente engolidos, o que pode mascarar falhas de autenticacao em produção.
- Usado em Server Components, Route Handlers e Server Actions (embora o projeto nao tenha Route Handlers ou Server Actions implementados).

**Middleware** (`/home/tork/Projetos/igreja-planalto/src/middleware.ts` - 65 linhas):
- Cria um `createServerClient` no middleware com acesso aos cookies da request (`request.cookies.get`).
- Cookies `set` e `remove` sao aplicados tanto na request atual quanto na response (para garantir propagacao correta entre request/response cycles).
- Chama `supabase.auth.getSession()` para determinar se o usuario tem sessao ativa.

##### 7. PROTECAO DE ROTAS (Publicas vs Privadas)

**Middleware (`src/middleware.ts`):**
- **Matcher:** `/dashboard/:path*` (apenas rotas do dashboard sao interceptadas).
- **Logica de roteamento:**
  - `isAuthPage`: `/dashboard/login`, `/dashboard/register`, `/dashboard/reset-password`.
  - `isDashboardPage`: qualquer path iniciando com `/dashboard/` ou `/dashboard` exato.
  - Se `isDashboardPage && !isAuthPage && !session`: redireciona para `/dashboard/login?redirect=<path>`.
  - Se `isAuthPage && session`: redireciona para `/dashboard` (usuario logado nao deve ver login).
- **Rota `/dashboard/logout`:** NAO esta em `isAuthPage`. Se usuario nao tem sessao, redireciona para login (impede logout sem sessao). Se tem sessao, permite acesso normalmente.

**Dashboard Layout (`src/app/dashboard/layout.tsx` - 17 linhas):**
- Define `authRoutes`: `/dashboard/login`, `/dashboard/register`, `/dashboard/reset-password`, `/dashboard/logout`.
- Rotas em `authRoutes` renderizam children sem wrapper (sem sidebar/header -- layout minimalista centralizado).
- Demais rotas renderizam com `<DashboardLayout>` (sidebar + header + conteudo responsivo).

**Rotas publicas (sem autenticacao):**
| Rota | Descricao |
|---|---|
| `/` | Landing page publica |
| `/c/[churchSlug]/[campaignSlug]` | Formulario publico de campanha |
| `/auth/callback` | Callback de autenticacao |

**Rotas protegidas (requerem sessao):**
| Rota | Descricao |
|---|---|
| `/dashboard` | Dashboard principal com graficos |
| `/dashboard/campaigns` | Lista de campanhas |
| `/dashboard/campaigns/new` | Criar campanha |
| `/dashboard/campaigns/[id]/edit` | Editar campanha |
| `/dashboard/visitors` | Lista de visitantes |
| `/dashboard/responses` | Respostas de formularios |
| `/dashboard/qrcodes` | Geracao de QR Codes |
| `/dashboard/settings` | Configuracoes da igreja |
| `/dashboard/users` | Gerenciamento de usuarios (super_admin apenas) |

##### 8. ROLES E PERMISSOES (RBAC)

**Duas tabelas de roles (CONFLITO POTENCIAL):**

| Tabela | Coluna | Valores | Onde e usada |
|---|---|---|---|
| `profiles` | `role` | `super_admin`, `church_admin`, `member` | RLS policies no banco |
| `user_roles` | `role` | `super_admin`, `church_admin`, `secretary`, `receptionist`, `user` | Frontend (Layout.tsx, users/page.tsx) |

**Uso no codigo frontend:**
- **Sidebar (`Layout.tsx` linha 36-48):** Busca role via `supabase.from('user_roles').select('role').eq('user_id', user.id).single()`. Exibe link "Usuarios" na secao "Admin" apenas se `role === 'super_admin'`.
- **Pagina de usuarios (`/dashboard/users/page.tsx`):** Verifica se `currentUserRole !== 'super_admin'` para exibir "Acesso Restrito". CRUD de usuarios usa RPCs: `create_user_with_role`, `change_user_password`, `delete_user_with_role`.
- **Hierarquia no frontend:** 5 niveis: super_admin > church_admin > secretary > receptionist > user.

**RLS Policies (schema.sql linhas 139-238):**
- Usam `profiles.role` para controle (nao `user_roles`).
- `private.is_admin()` (linha 301-313): funcao SECURITY DEFINER que verifica `user_roles` para role `super_admin` ou `church_admin`.
- **churches:** SELECT apenas se church_id pertence ao profile OU super_admin; INSERT apenas super_admin; UPDATE church_admin ou super_admin.
- **profiles:** SELECT propria ou mesma church; UPDATE propria; INSERT propria.
- **campaigns:** SELECT se church_id propria OU is_public=true; INSERT/UPDATE/DELETE apenas church_admin/super_admin.
- **responses:** SELECT admin da church; INSERT se campanha publica E ativa; DELETE admin.
- **campaign_views:** INSERT se campanha publica E ativa; SELECT admin.
- **user_roles:** SELECT propria ou admin; INSERT qualquer authenticated; UPDATE apenas admin; DELETE propria ou admin.

**Problema critico:** Existem DOIS sistemas de roles paralelos e inconsistentes:
1. `profiles.role` (3 valores: super_admin, church_admin, member) -- usado nas RLS policies.
2. `user_roles.role` (5 valores: super_admin, church_admin, secretary, receptionist, user) -- usado no frontend.
- Um usuario pode ser `church_admin` no `user_roles` mas `member` no `profiles` (ou vice-versa).
- O trigger de signup (`handle_new_user`) so popula `profiles`, deixando `user_roles` vazio para novos usuarios.
- A funcao `private.is_admin()` verifica `user_roles`, mas as RLS policies verificam `profiles.role`.

##### 9. REFRESH DE TOKEN

- **Gerenciado automaticamente** pelo `@supabase/ssr` (v0.5.0) tanto em `createBrowserClient` quanto em `createServerClient`.
- O refresh token e armazenado em cookie HTTP-only junto com o access token.
- O Supabase SSR automaticamente:
  - Renova o access token quando expirado.
  - Atualiza os cookies da sessao a cada refresh.
  - Propaga os novos cookies para a response no middleware.
- **Nao ha logica manual** de refresh de token no codigo do projeto. Nao ha chamadas a `supabase.auth.refreshSession()` ou `setSession()`.
- **Middleware:** A cada request em `/dashboard/:path*`, o middleware chama `getSession()` que internamente pode disparar um refresh se necessario.

##### 10. TRATAMENTO DE ERROS DE AUTENTICACAO

| Pagina | Erro | Tratamento |
|---|---|---|
| Login | "Invalid login credentials" | Traduz para "Email ou senha incorretos" |
| Login | Outros erros | Exibe mensagem original do Supabase |
| Registro | "User already registered" | Traduz para "Este email ja esta cadastrado" |
| Registro | Validacao client-side | "As senhas nao coincidem" / "A senha deve ter pelo menos 6 caracteres" |
| Registro | Outros erros | Exibe mensagem original do Supabase |
| Reset senha | Qualquer erro | Exibe mensagem original do Supabase |
| Callback | code ausente | "Codigo de autenticacao nao encontrado" |
| Callback | exchangeCodeForSession error | Exibe mensagem original do Supabase |
| Middleware | Sessao ausente em rota protegida | Redireciona silenciosamente para /dashboard/login?redirect=... |
| Middleware | Sessao presente em rota auth | Redireciona silenciosamente para /dashboard |
| server.ts | Erro em cookie.set/cookie.remove | Catch vazio (erro engolido) |

**Observacoes sobre tratamento de erros:**
- Todos os erros sao exibidos em um `div` com classe `bg-primary-50 border border-primary-200` e `role="alert"`.
- Nao ha blocos `error.tsx` declarativos do Next.js App Router em nenhuma rota.
- Nao ha sistema de notificacoes unificado (algumas paginas usam `alert()`, outras estado local).
- Nao ha logging estruturado de eventos de autenticacao.
- Nao ha diferenciacao entre erros de rede, erros de configuracao, e erros de autenticacao propriamente ditos.
- O `server.ts` engole erros silenciosamente no `catch`, o que pode dificultar debug em producao.

##### 11. RESUMO DO FLUXO COMPLETO

```
Usuario nao autenticado
    |
    v
[Landing Page /]
    |
    v
[Login /dashboard/login]  <---  [Registro /dashboard/register]
    |                              |
    | signInWithPassword           | signUp + emailRedirectTo
    v                              v
[Dashboard /dashboard]       [Email de confirmacao]
    |                              |
    | (sessao mantida via          v
    |  cookies HTTP-only)    [Callback /auth/callback]
    |                              |
    |                              | exchangeCodeForSession
    |                              v
    |                         [Dashboard /dashboard]
    |
    |--- [Logout /dashboard/logout]
    |    |
    |    signOut() -> redirect /dashboard/login
    |
    |--- [Reset senha /dashboard/reset-password]
         |
         resetPasswordForEmail -> email -> /auth/callback -> nova senha
```

**Fluxo no middleware (a cada request em /dashboard/:path*):**
```
Request /dashboard/*
    |
    v
Middleware: createServerClient(request.cookies)
    |
    v
getSession()
    |
    +-- Session valida? --> Permite acesso a rota protegida
    |                       Se rota auth: redirect /dashboard
    |
    +-- Sem session? --> Rota auth? Permite acesso
    |                    Rota protegida? Redirect /dashboard/login?redirect=path
    |
    v
Response com cookies atualizados (se houver refresh de token)
```

##### 12. ARQUIVOS ENVOLVIDOS NO FLUXO DE AUTENTICACAO

| Arquivo | Caminho Absoluto | Responsabilidade |
|---|---|---|
| Login | `/home/tork/Projetos/igreja-planalto/src/app/dashboard/login/page.tsx` | Formulario de login |
| Registro | `/home/tork/Projetos/igreja-planalto/src/app/dashboard/register/page.tsx` | Criacao de conta |
| Logout | `/home/tork/Projetos/igreja-planalto/src/app/dashboard/logout/page.tsx` | Encerrar sessao |
| Reset senha | `/home/tork/Projetos/igreja-planalto/src/app/dashboard/reset-password/page.tsx` | Redefinir senha |
| Callback | `/home/tork/Projetos/igreja-planalto/src/app/auth/callback/page.tsx` | Callback OAuth |
| Client Supabase | `/home/tork/Projetos/igreja-planalto/src/lib/supabase/client.ts` | Factory cliente browser |
| Server Supabase | `/home/tork/Projetos/igreja-planalto/src/lib/supabase/server.ts` | Factory cliente server |
| Middleware | `/home/tork/Projetos/igreja-planalto/src/middleware.ts` | Protecao de rotas |
| Dashboard Layout | `/home/tork/Projetos/igreja-planalto/src/app/dashboard/layout.tsx` | Layout condicional auth/dashboard |
| Sidebar/Layout | `/home/tork/Projetos/igreja-planalto/src/components/layout/Layout.tsx` | Sidebar com role check e logout |
| Schema Banco | `/home/tork/Projetos/igreja-planalto/supabase/schema.sql` | RLS, triggers, roles |
| Types | `/home/tork/Projetos/igreja-planalto/src/types/database.ts` | Tipos do banco (profiles, user_role enum) |
| Hooks | `/home/tork/Projetos/igreja-planalto/src/lib/hooks/useSupabase.ts` | Hooks de dados (usam supabase client autenticado)

### 1.13 Render e Deploy
## Analise Completa da Configuracao de Deploy

### 1. Estrategia de Deploy (Render, Docker)

O projeto utiliza **duas estrategias contraditorias**:
- **Docker + Standalone Output**: O `Dockerfile` e `next.config.js` (com `output: 'standalone'`) configuram o projeto para deploy via container Docker no Render como um servico Web. O Node.js `server.js` gerado no modo standalone e executado para servir a aplicacao.
- **Static Export (README)**: O `README.md` descreve deploy como "Static Site" no Render com diretorio de publicacao `out`, o que contradiz a configuracao real.

**Contradicao critica**: O `next.config.js` usa `output: 'standalone'` (servidor Node.js), mas o README orienta "Static Site" com build `npm run build` e publish directory `out`. No modo standalone, o diretorio `out` nao e gerado; o build produz `.next/standalone/`. Isso indica que o README esta desatualizado/incorreto.

### 2. Pipeline CI/CD (GitHub Actions)

O arquivo `.github/workflows/deploy.yml` executa:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20, cache npm)
3. `npm ci`
4. `npm run type-check`
5. `npm run build` (com `SUPABASE_URL` e `SUPABASE_ANON_KEY` dos secrets)

**Problemas identificados:**
- **Pipeline e apenas CI, nao CD**: Nao ha step de deploy. O workflow faz build e type-check, mas nao faz push para registro Docker, nao notifica o Render via webhook, e nao faz deploy em nenhum ambiente.
- **Trigger unico**: Apenas push na branch `main`. Nao ha triggers para PRs, tags, ou releases.
- **Sem testes**: Nao executa testes porque o projeto nao possui suite de testes configurada.
- **Sem lint**: O lint (`npm run lint`) nao e executado no CI.
- **Matriz de ambientes**: Nao ha separacao entre staging e producao.

### 3. Build Steps e Otimizacoes

**Dockerfile (3 estagios):**
- **Stage deps** (`node:20-alpine`): `npm ci --only=production` -- **ISSO E UM BUG GRAVE**. O comando `--only=production` instala apenas dependencias de producao, mas o proximo estagio (builder) precisa de devDependencies (`typescript`, `tailwindcss`, `postcss`, `eslint-config-next`, etc.) para executar `next build`. O build quebrara com erro de modulo nao encontrado.
- **Stage builder**: Copia `node_modules` do estagio `deps` (apenas producao) e executa `npm run build`. Sem devDependencies, o build falha.
- **Stage runner**: Usa usuario nao-root `nextjs`, expoe porta 3000, executa `server.js` do standalone.
- **Imagem final**: Apenas `public/`, `.next/standalone/`, e `.next/static/`. Enxuta (estima-se ~200-400MB).

**Otimizacoes:**
- Multi-stage build reduz tamanho da imagem final.
- Usuario nao-root para seguranca.
- `.dockerignore` bem configurado excluindo node_modules, .git, .next, etc.

**Problemas no Dockerfile:**
1. `npm ci --only=production` deve ser `npm ci` (sem `--only=production`) no estagio deps, OU o estagio builder deve reinstalar devDependencies separadamente.
2. Ausencia de `HEALTHCHECK` -- sem verificacao de saude do container.
3. Ausencia de variaveis de ambiente ARG/ENV para configurar o build.
4. Ausencia de labels (maintainer, version, description).

### 4. Configuracao de Variaveis de Ambiente

**.env.example:**
```
NEXT_PUBLIC_SUPABASE_URL=https://cnwhabqttufexuwzgkeq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://igrejaplanalto.onrender.com
NEXT_PUBLIC_CHURCH_NAME=Assembleia de Deus - Igreja Campo do Planalto
NEXT_PUBLIC_CHURCH_CITY=Laranjal do Jari
NEXT_PUBLIC_CHURCH_STATE=AP
NEXT_PUBLIC_CHURCH_PHONE=(96) 99166-2185
```

**Analise:**
- Todas as variaveis sao publicas (prefixo `NEXT_PUBLIC_`), expostas no client-side.
- A chave anonima do Supabase (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) esta no `.env.example` com valor real exposto -- risco de seguranca.
- A URL do Supabase tambem esta exposta.
- `NEXT_PUBLIC_APP_URL` esta hardcoded como `https://igrejaplanalto.onrender.com` no exemplo e no codigo (`qrcodes/page.tsx`).
- **Missing**: `SUPABASE_SERVICE_ROLE_KEY` (mencionada no README mas nao no `.env.example`), `NEXT_PUBLIC_SITE_URL` (para funcionalidade de QR Code), variaveis de ambiente para configuracao de e-mail/notificacao.
- As variaveis de igreja (nome, cidade, estado, telefone) estao hardcoded -- nao permitem multi-tenancy completo via env vars.

**GitHub Secrets:**
- Apenas `SUPABASE_URL` e `SUPABASE_ANON_KEY` sao configurados como secrets.
- `NEXT_PUBLIC_CHURCH_NAME`, `NEXT_PUBLIC_CHURCH_CITY`, `NEXT_PUBLIC_CHURCH_STATE`, `NEXT_PUBLIC_CHURCH_PHONE` estao hardcoded no `sync-env.sh` com valor fixo.

### 5. Health Checks e Monitoramento

**Ausencia completa:**
- Dockerfile sem instrucao `HEALTHCHECK`.
- Render dashboard padrao oferece health checks em nivel de plataforma, mas nao ha endpoint de health check customizado na aplicacao.
- Sem configuracao de monitoramento externo (UptimeRobot, Better Uptime, etc.).
- Sem logging estruturado (pino, winston, etc.).
- Sem ferramentas de APM (Sentry, DataDog, New Relic).
- Sem sistema de alertas para downtime ou erros.

### 6. Rollback Strategy

**Inexistente:**
- Nao ha estrategia documentada de rollback.
- Render oferece suporte a rollback para deployments anteriores via dashboard, mas nao ha automacao.
- GitHub Actions nao faz deploy, entao nao ha como reverter via CI.
- Docker images nao sao versionadas com tags semanticas.
- `sync-env.sh` nao suporta versionamento de configuracao.

### 7. Dominios e SSL

- Dominio configurado no Render: `igrejaplanalto.onrender.com` (subdominio gratuito do Render).
- Dominio customizado: Mencionado no README como configuravel no dashboard do Render.
- SSL: Render fornece SSL automatico (Let's Encrypt) para todos os subdominios `*.onrender.com` e dominios customizados.
- QR Code no codigo usa URL hardcoded: `https://igrejaplanalto.onrender.com` -- se o dominio mudar, todos os QR Codes existentes quebram.

### 8. Logs e Debugging

- Render fornece logs de deployment e runtime no dashboard.
- Sem configuracao de nivel de log (debug, info, error).
- Sem logging estruturado (JSON) para facilitar agregacao.
- Sem integracao com servicos de log externos (Logtail, Axiom, etc.).
- O tratamento de erros no frontend usa `console.error()` e `alert()` -- sem logging remoto.
- O cliente SSR do Supabase suprime erros silenciosamente (`catch {}`).

### 9. Problemas Conhecidos de Deploy

1. **BUG CRITICO -- Dockerfile: `npm ci --only=production`**: O estagio `deps` instala apenas dependencias de producao com `--only=production`, mas o estagio `builder` necessita de devDependencies para executar `next build` (TypeScript, Tailwind, PostCSS, ESLint). O build falhara em pipeline CI ou Docker build.

2. **README contradiz configuracao**: README descreve "Static Site Export" com publish directory `out`, mas o `next.config.js` usa `output: 'standalone'`. Um usuario seguindo o README falhara ao fazer deploy.

3. **GitHub Actions sem deploy**: O workflow so faz type-check e build, sem stage de deploy real para Render, Docker Registry, ou qualquer destino.

4. **URL hardcoded**: Em `qrcodes/page.tsx`, a `BASE_URL` esta hardcoded como `'https://igrejaplanalto.onrender.com'` em vez de usar `process.env.NEXT_PUBLIC_APP_URL`. Isso impede mudanca de dominio sem regerar QR Codes.

5. **sync-env.sh especifico demais**: Script usa um ID de servico Render hardcoded (`srv-d9hba8faqgkc73a1bcp0`) e nao sincroniza todas as variaveis (falta `NEXT_PUBLIC_APP_URL`). Se o servico for recriado, o ID muda e o script quebra.

6. **Sem health check**: Ausencia de `HEALTHCHECK` no Dockerfile significa que o Render nao pode detectar automaticamente se a aplicacao esta saudavel, podendo manter trafego para instancias com problema.

7. **Sem separacao de ambientes**: Nao ha configuracao para staging/development separados de producao. Toda alteracao na `main` e potencialmente producao sem revisao intermediaria.

8. **Multi-tenancy limitado**: As configuracoes de igreja (nome, cidade, estado, telefone) sao definidas via `NEXT_PUBLIC_*` no build time, nao via banco de dados para a igreja principal, embora o schema suporte multiplas igrejas.


### 1.14 Supabase/Integrações
*(Agente 14 - Analise Completa das Integracoes com Supabase)*

#### Arquivos e Componentes que Consomem Supabase

O projeto possui integracao com Supabase em **22+ arquivos** distribuidos em:

| Categoria | Arquivos | Total |
|---|---|---|
| Clientes/Config | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` | 2 |
| Hooks | `src/lib/hooks/useSupabase.ts` | 1 (4 hooks) |
| Storage | `src/lib/supabase/upload.ts` | 1 |
| Middleware | `src/middleware.ts` | 1 |
| Paginas Dashboard | `dashboard/page.tsx`, `login/page.tsx`, `register/page.tsx`, `logout/page.tsx`, `reset-password/page.tsx`, `settings/page.tsx`, `users/page.tsx`, `qrcodes/page.tsx`, `visitors/page.tsx`, `responses/page.tsx`, `campaigns/page.tsx`, `campaigns/new/page.tsx`, `campaigns/[id]/edit/page.tsx`, `auth/callback/page.tsx` | 14 |
| Componentes | `CampaignForm.tsx`, `Layout.tsx` | 2 |
| Schema/Tipos | `supabase/schema.sql`, `src/types/database.ts`, `src/types/index.ts` | 3 |

---

#### 1. Configuracao dos Clientes Supabase

**client.ts** (\`/home/tork/Projetos/igreja-planalto/src/lib/supabase/client.ts\` - 8 linhas):
- Usa \`createBrowserClient\` de \`@supabase/ssr\` (compativel com SSR)
- Le \`NEXT_PUBLIC_SUPABASE_URL\` e \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` do ambiente
- Usa **anon key** (chave publica, restrita por RLS)
- **Nao passa o generic \`Database\`** - sem tipagem nas queries

**server.ts** (\`/home/tork/Projetos/igreja-planalto/src/lib/supabase/server.ts\` - 32 linhas):
- Usa \`createServerClient\` de \`@supabase/ssr\` com cookie store
- Le cookies via \`cookies()\` de \`next/headers\`
- **Problema critico**: Usa \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` em vez de \`SERVICE_ROLE_KEY\` para operacoes server-side
- **Problema**: Blocos \`catch\` vazios nos metodos \`set()\` e \`remove()\` de cookies - suprimem erros silenciosamente
- **Problema**: \`cookies()\` so funciona em Server Components, Route Handlers ou Server Actions. Se usado em contexto inadequado, quebra
- **Nao passa o generic \`Database\`**

**middleware.ts** (\`/home/tork/Projetos/igreja-planalto/src/middleware.ts\` - 65 linhas):
- Cria seu proprio \`createServerClient\` inline (logica duplicada do server.ts)
- Usa \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
- Verifica sessao com \`supabase.auth.getSession()\`
- Redireciona nao autenticados para \`/dashboard/login\`
- Redireciona autenticados em paginas de auth para \`/dashboard\`
- \`matcher\` configurado para \`/dashboard/:path*\`

---

#### 2. Hooks Personalizados (useSupabase.ts)

**\`useCampaigns(churchId?)\`**:
- **CRUD completo**: fetch (select *), create (insert + select single), update (update + select single), delete
- **Query**: \`.from('campaigns').select('*').eq('church_id', churchId).order('created_at', { ascending: false })\`
- **Estado**: loading, error, campaigns + metodos CRUD + refetch
- **Nao possui paginacao** - busca TODAS as campanhas de uma vez

**\`useCampaignFields(campaignId?)\`**:
- **CRUD**: fetch, create, update, delete (em \`campaign_fields\` tabela)
- **Query**: \`.from('campaign_fields').select('*').eq('campaign_id', campaignId).order('order', { ascending: true })\`
- **\`reorderFields\`**: Envia N queries individuais via \`Promise.all\` em vez de batch update - **potencial N+1**
- **Observacao**: O reorder faz \`fetchFields()\` apos atualizar, mas o sorting inicial e feito client-side com \`.sort()\`

**\`useResponses(campaignId?)\`**:
- **Read-only**: fetchResponses + exportToCSV/exportToExcel
- **Query**: \`.from('responses').select('*').eq('campaign_id', campaignId).order('created_at', { ascending: false })\`
- **Bug de nomenclatura**: O objeto retornado mapeia \`exportToCSV\` para a funcao \`exportToExcel\` (exporta CSV mas nome enganoso)
- **Nao possui paginacao**

**\`useDashboardStats(churchId?)\`**:
- **11+ queries sequenciais** para calcular estatisticas:
  1. \`campaigns\` count (total)
  2. \`campaigns\` count (ativas)
  3. \`responses\` count (total) com subquery
  4. \`responses\` count (hoje)
  5. \`responses\` count (esta semana)
  6. \`responses\` count (este mes)
  7. \`responses\` count (decisoes - \`contains\`)
  8. \`responses\` count (oracoes - \`contains\`)
  9. \`responses\` count (visitas - \`contains\`)
  10. \`responses\` count (discipulado - \`contains\`)
  11. \`responses\` count (membresia - \`contains\`)
  12. \`responses\` select (tendencias 30 dias)
- **Problema de performance**: Todas as queries sao independentes e poderiam ser combinadas
- **Fragilidade**: Usa \`as any\` no \`campaignIdsQuery\`, perdendo tipagem
- **N+1 classico**: Contagens individuais em vez de \`GROUP BY\` ou count condicional

---

#### 3. Padroes de Query

**Filtros**:
- \`.eq('campaign_id', id)\` - filtro igualdade
- \`.eq('is_active', true).eq('is_public', true)\` - filtros multiplos
- \`.in('campaign_id', [...ids])\` - filtro IN (usado extensivamente)
- \`.gte('created_at', data)\` - filtro por data (maior ou igual)
- \`.contains('data', { 'chave': true })\` - filtro JSONB (para contagem de decisoes/oracoes)
- \`.limit(10)\` - apenas nas respostas recentes do dashboard

**Paginacao**: **AUSENTE em absolutamente todas as queries**. Nenhuma pagina usa \`.range()\` ou \`.limit()\` + count para paginacao. Listas de campanhas, respostas e visitantes carregam todos os registros de uma vez.

**Ordenacao**:
- \`.order('created_at', { ascending: false })\` - mais recentes primeiro (padrao)
- \`.order('order', { ascending: true })\` - campos de formulario por ordem
- \`.order('title')\` - campanhas alfabeticamente (qrcodes page)
- \`.order('created_at', { ascending: true })\` - tendencias cronologicas

**Joins (queries aninhadas)**:
\\`typescript
// Joins simples (tabela relacional)
campaigns.select('*, church:churches!inner(slug)')
campaigns.select('*, church:churches!inner(*)')

// Joins com subquery de agregacao (count)
campaigns.select('*, responses(count)')
campaigns.select('*, responses(count), campaign_views(count)')

// Join reverso (response -> campaign)
responses.select('*, campaigns(title, slug)')
\\`

**Uso de \`.single()\`**: Usado para buscar um unico registro. Tratamento do erro \`PGRST116\` (not found) implementado apenas em \`campaigns/[id]/edit/page.tsx\`.

---

#### 4. Chamadas RPC

| RPC | Local | Parametros | Descricao |
|---|---|---|---|
| \`increment_campaign_views\` | CampaignForm.tsx | \`{ campaign_uuid: string }\` | Insere registro em campaign_views |
| \`create_user_with_role\` | users/page.tsx | \`{ user_email, user_password, user_name, user_role }\` | Cria usuario auth + profile + role |
| \`change_user_password\` | users/page.tsx | \`{ target_user_id, new_password }\` | Altera senha de usuario |
| \`delete_user_with_role\` | users/page.tsx | \`{ target_user_id }\` | Remove usuario + profile + role |
| \`handle_new_user\` | trigger (schema.sql) | - | Trigger apos INSERT em auth.users |
| \`update_updated_at_column\` | trigger (schema.sql) | - | Trigger BEFORE UPDATE |
| \`private.is_admin()\` | RLS (schema.sql) | - | Helper para politicas RLS |

---

#### 5. Uso de service_role vs anon key

**CONCLUSAO**: O projeto USA EXCLUSIVAMENTE a chave \`anon\` em TODOS os lugares:
- \`client.ts\` -> \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
- \`server.ts\` -> \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` **(deveria ser SERVICE_ROLE)**
- \`middleware.ts\` -> \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`

**Impacto**:
- Operacoes server-side (server.ts) estao sujeitas as mesmas restricoes RLS que usuarios anonimos
- A chave \`anon\` e publica e visivel no frontend (comeca com \`eyJ...\`), o que e esperado
- Para operacoes administrativas server-side (criar usuarios, alterar senhas), seria mais seguro usar \`service_role\`
- As RPCs \`create_user_with_role\`, \`change_user_password\` e \`delete_user_with_role\` sao \`SECURITY DEFINER\`, entao funcionam mesmo com anon key, mas seria melhor segregar

---

#### 6. Tratamento de Erros do Supabase

**Padroes identificados (inconsistentes)**:

| Padrao | Onde | Qualidade |
|---|---|---|
| \`try/catch\` com \`setError()\` (estado React) | Hooks, Edit Campaign, New Campaign, Settings, Users | Bom |
| \`alert()\` para erros | Dashboard page, Campaigns list | Ruim (UX pobre) |
| \`console.error()\` sem feedback visual | CampaignForm (RPC error), Edit Campaign (reorder) | Ruim |
| \`catch\` vazio (silencioso) | server.ts (cookies), Visitors page, Responses page | Perigoso |
| Erro especifico \`PGRST116\` tratado | Edit Campaign (not found) | Bom |
| Feedback com auto-dismiss | Settings page (4s timeout) | Bom |
| Feedback sem timeout | Users page (fica ate fechar) | Medio |
| \`catch\` vazio com tratamento | Logout page (troca mensagem) | Aceitavel |

**Erros nao tratados**:
- Nenhum \`error.tsx\` ou \`not-found.tsx\` em qualquer rota do Next.js
- Sem centralized error boundary
- Sem tratamento de \`429 Too Many Requests\` (rate limiting do Supabase)
- Sem tratamento de conexao perdida / network error
- Sem retry logic em nenhuma query

---

#### 7. Realtime Subscriptions

**NAO EXISTEM**. Zero subscriptions \`supabase.channel()\` ou \`supabase.realtime()\` em todo o codigo.

Consequencias:
- Dados sao buscados apenas no \`useEffect\` de montagem
- Nao ha atualizacao em tempo real quando outro admin cadastra dados
- Tabelas ficam "stale" ate o usuario navegar para outra pagina e voltar
- O botao "refetch" existe nos hooks mas nunca e chamado apos a montagem inicial

---

#### 8. Performance das Queries

**Problemas identificados**:

1. **N+1 no Dashboard Stats**: 11 queries independentes em vez de uma query com \`COUNT\` condicional ou \`GROUP BY\`. Cada query faz um round-trip ao Supabase.

2. **Ausencia total de paginacao**: Todas as listas carregam dados completos:
   - \`campaigns\` - todas as campanhas
   - \`responses\` - todas as respostas
   - \`visitors\` - todas as respostas (agrupadas client-side)
   - Com o crescimento, isso causara problemas de memoria e tempo de carregamento

3. **N+1 em reorderFields**: Atualiza N campos individualmente em vez de batch update

4. **Payload excessivo**: \`responses.select('*')\` inclui o campo \`data\` (JSONB) que pode ser grande. Nao ha projecao seletiva de colunas na maioria dos selects.

5. **Sequential vs Parallel**: A pagina \`dashboard/page.tsx\` faz 3 queries, algumas dependendo dos resultados anteriores (campaignIds). \`responses/page.tsx\` usa \`Promise.all\` (bom). \`useDashboardStats\` faz tudo sequencial (ruim).

6. **Subquery via \`.in()\`**: O padrao \`campaignIdsQuery\` como subquery direto e funcional mas fragil (usa \`as any\`). Pode ser substituido com seguranca por uma query real de subquery ou join.

---

#### 9. Caching de Dados

**NAO EXISTE caching implementado**:
- Nao ha React Query (TanStack Query)
- Nao ha SWR
- Nao ha Apollo Client
- Nao ha cache manual (localStorage, sessionStorage, IndexedDB)
- Nao ha stale-while-revalidate
- Nao ha request deduplication

Toda navegacao refaz fetch completo. Se o usuario vai do Dashboard para Campanhas e volta, os 11+ queries do dashboard sao executados novamente.

---

#### 10. Operacoes Storage (Upload)

\`src/lib/supabase/upload.ts\`:
- Bucket \`'images'\` hardcoded (sem configuracao via env)
- Gera nome unico com timestamp
- Upload com \`cacheControl: '3600'\` e \`upsert: false\`
- Retorna URL publica via \`getPublicUrl()\`
- Nao ha validacao de tipo/tamanho no backend (feita apenas no componente ImageUpload client-side)
- Nao ha tratamento de erros de storage (ex: bucket lotado, permissoes)

---

#### 11. Schema e RLS

O schema.sql define:
- **6 tabelas**: churches, profiles, campaigns, campaign_fields, responses, campaign_views
- **Tabela adicional**: user_roles (para RBAC estendido)
- **RLS granular**: Politicas separadas para SELECT, INSERT, UPDATE, DELETE em cada tabela
- **Diferenca schema.sql vs codigo**: O schema tem colunas (\`field_type\`) e tipos (\`number\`, \`file\`, \`hidden\`) que o codigo TypeScript nao espelha completamente. O schema tambem tem \`campaign_fields\` com estrutura diferente do que o codigo usa (o codigo guarda campos em \`campaigns.settings.custom_fields\` JSONB)
- **Trigger \`handle_new_user\`**: Cria profile automaticamente no signup
- **Funcao \`increment_campaign_views\`**: \`SECURITY DEFINER\` para permitir insert publico
- **Indices**: 8 indices definidos para performance

---

#### 12. Tipo de Chave e Seguranca

| Aspecto | Status |
|---|---|
| Anon key no frontend | OK (uso correto) |
| Anon key no server | **Risco** (deveria usar service_role) |
| RLS policies | Bem definidas, mas complexas (subqueries aninhadas) |
| SECURITY DEFINER | Usado em funcoes criticas (handle_new_user, increment_campaign_views, is_admin) |
| Protecao CSRF | Nao implementada |
| Rate limiting | Nao tratado |
| Validacao server-side | Nao existe (toda validacao e client-side) |

---

#### 13. Resumo de Problemas e Recomendacoes

**Problemas Graves**:
1. Server client usa anon key em vez de service_role key
2. Nenhuma paginacao implementada (problema de escala)
3. N+1 no dashboard stats (11 queries)
4. Sem caching (React Query/SWR)
5. Sem realtime subscriptions

**Problemas Medios**:
6. Tratamento de erros inconsistente (\`alert()\` vs componentes)
7. Nomes enganosos (\`exportToCSV\` que exporta Excel)
8. Campos salvos em JSONB vs tabela \`campaign_fields\` (duas estrategias)
9. Nenhum error boundary no Next.js
10. Blocos catch vazios no server.ts

**Problemas Leves**:
11. Missing \`Database\` generic nos clients
12. Hardcoded BASE_URL e bucket name
13. Query sem tipagem (\`as any\` no campaignIdsQuery)
14. Funcao \`reorderFields\` ineficiente (N updates)
15. Sem projecao seletiva de colunas na maioria dos selects

**Recomendacoes**:
1. Adicionar \`@supabase/supabase-js\` com generic \`Database\` nos clients
2. Implementar paginacao com \`.range()\` em todas as listas
3. Adicionar React Query para caching, deduplicacao e stale-while-revalidate
4. Consolidar dashboard stats em uma unica query com \`GROUP BY\` ou RPC customizada
5. Adicionar service_role key para server.ts
6. Implementar realtime subscriptions para atualizacoes ao vivo
7. Padronizar tratamento de erros com toast notifications
8. Adicionar error boundaries (error.tsx) em todas as rotas
9. Resolver duplicidade entre \`campaign_fields\` tabela e \`settings.custom_fields\` JSONB
10. Adicionar validacao server-side para todos os inputs

### 1.15 Resumo do Estado Atual e Prompt dos Agentes

#### PARTE A: RESUMO EXECUTIVO DO ESTADO ATUAL

O projeto **igreja-planalto** e uma plataforma web para gestao de campanhas e formularios com QR Code voltada para igrejas. Construido com **Next.js 14 (App Router) + TypeScript**, utiliza **Tailwind CSS** para estilizacao, **Supabase** como backend completo (autenticacao SSR, banco PostgreSQL, storage) e integra **Recharts** para graficos no dashboard, **qrcode** e **jspdf** para geracao de QR Codes e PDFs. O deploy e containerizado via **Docker multi-stage** com CI basico no GitHub Actions. A aplicacao esta atualmente funcional e em producao no Render.

O estado atual de desenvolvimento revela um projeto maduro em funcionalidades mas imaturo em engenharia de software. **O que funciona bem:** CRUD completo de campanhas com construtor de formularios dinamico (9 tipos de campo), dashboard administrativo com graficos e estatisticas, autenticacao segura via Supabase SSR com RBAC (5 niveis de acesso), geracao individual e em lote de QR Codes com personalizacao, exportacao de dados (CSV), gerenciamento de visitantes agrupados, configuracoes multi-aba da igreja, landing page publica, tema visual consistente (paleta dourada/marrom), schema de banco robusto com RLS e triggers, e infraestrutura Docker pronta para producao.

**Principais problemas identificados:** (1) Rota quebrada na landing page - o link "Preencher minha ficha" aponta para `/campanhas` que nao existe (404); (2) Ausencia total de testes automatizados e de configuracao de formatador (Prettier); (3) Nenhuma pagina utiliza Server Components - todas sao Client Components, impactando performance; (4) Ausencia de arquivos de estado (`loading.tsx`, `error.tsx`, `not-found.tsx`) em todas as rotas; (5) Duplicacao de componentes core (Button, Modal, Card, Badge) entre `FormComponents.tsx` e arquivos dedicados; (6) URL base hardcoded `https://igrejaplanalto.onrender.com` em vez de variavel de ambiente; (7) Diretorio duplicado `"[id]"` com aspas no nome; (8) Exportacao "Excel" gera CSV com extensao .xls; (9) Tratamento de erros inconsistente (alert() misturado com estados de feedback); (10) Bucket name 'images' hardcoded em upload.ts; (11) Conflito de nomenclatura em `useSupabase.ts` (`exportToCSV` que executa `exportToExcel`); (12) Middleware sem isolamento de contexto para Server Components vs Route Handlers; (13) Catch silencioso no server.ts para erros de cookie; (14) Root layout minimalista sem fontes via next/font, Open Graph ou SEO.

**O que precisa de atencao imediata:** A prioridade maxima e corrigir a rota quebrada e estabelecer uma base solida de engenharia - configurar testes (Vitest), adicionar Prettier, converter paginas publicas para Server Components, e implementar loading/error/not-found states. Em paralelo, e necessario eliminar a duplicacao de componentes, externalizar URLs e bucket names para variaveis de ambiente, e unificar o sistema de notificacoes. A medio prazo, o projeto se beneficiaria de melhorias de SEO (Open Graph, fontes via next/font), acessibilidade, e a adocao de boas praticas como Storybook para o design system e monitoramento de erros (Sentry). A base do projeto e solida e bem estruturada - as correcoes necessarias sao incrementais e nao requerem reescrita significativa.

---

## Seção 2: Infraestrutura de Testes
### 2.1 Plano de Testes (1700+ testes)
*(Agente de Testes - Relatório Completo de Infraestrutura)*

---

#### 2.1.0 Resumo da Estratégia

> **Nota de proporcionalidade:** O plano abaixo prevê ~1700 testes, o que é uma meta aspiracional de longo prazo. Para a primeira fase de implementação, recomenda-se configurar Vitest + ~50 testes iniciais cobrindo `utils.ts` e componentes UI principais (Button, Card, Input, Modal). Atingir 1700 testes deve ser distribuído em 3-6 meses, não exigido no primeiro ciclo.

**Stack escolhida (2026 best practices):**
| Camada | Ferramenta | Versão | Propósito |
|--------|-----------|--------|-----------|
| Unit/Component/Integration | Vitest | ^2.1.0 | Test runner nativo ESM, Vite-powered |
| Component render | @testing-library/react | ^16.0.0 | Render, queries, assertions |
| DOM matchers | @testing-library/jest-dom | ^6.6.0 | toBeInTheDocument, toHaveClass, etc. |
| User events | @testing-library/user-event | ^14.5.0 | Realistic click/type/keyboard |
| API mocking | msw | ^2.4.0 | Network-level request interception |
| React plugin | @vitejs/plugin-react | ^4.3.0 | JSX transform, Fast Refresh |
| Coverage | @vitest/coverage-v8 | ^2.1.0 | V8 native coverage (80%+ thresholds) |
| E2E | @playwright/test | ^1.47.0 | Cross-browser E2E |
| Accessibility | axe-playwright | ^2.0.0 | a11y assertions in Playwright |
| Linting | eslint | ^9.10.0 | Flat config with plugins |
| Formatting | prettier | ^3.3.0 | Code formatter |

**Arquitetura de testes (Testing Trophy):**
```
         ┌──────────┐
         │   E2E    │  Playwright — 200 testes (fluxos críticos)
         │ (Lento)  │
        ─┼──────────┼─
       ╱             ╲
      ╱  Integration  ╲  Vitest + MSW — 400 testes (fluxos completos)
     ╱   (Médio)       ╲
    ─┼──────────────────┼─
   ╱                     ╲
  ╱  Unit (Rápido)        ╲  Vitest — 1100 testes (componentes, hooks, utils)
 └─────────────────────────┘
```

**Distribuição total: ~1700 testes**
| Categoria | Qtd | Prioridade |
|-----------|-----|------------|
| Components (UI) | 200 | Alta |
| Hooks | 250 | Alta |
| Pages | 300 | Alta |
| Utils | 150 | Média |
| Integration | 400 | Alta |
| E2E (Playwright) | 200 | Alta |
| API/Middleware | 100 | Média |
| Accessibility | 100 | Alta |

---

#### 2.1.1 Pacotes para Instalar

```bash
# === ESLint (versão 9 flat config) ===
npm install -D eslint@^9.10.0
npm install -D @eslint/js@^9.10.0
npm install -D typescript-eslint@^8.5.0
npm install -D eslint-plugin-react@^7.36.0
npm install -D eslint-plugin-react-hooks@^4.6.0
npm install -D eslint-plugin-jsx-a11y@^6.10.0
npm install -D eslint-plugin-import@^2.30.0
npm install -D eslint-plugin-unicorn@^55.0.0
npm install -D eslint-plugin-perfectionist@^3.6.0
npm install -D eslint-plugin-security@^3.0.0
npm install -D eslint-config-prettier@^9.1.0
npm install -D @next/eslint-plugin-next@^14.2.0

# === Vitest + Testing Library ===
npm install -D vitest@^2.1.0
npm install -D @vitejs/plugin-react@^4.3.0
npm install -D @testing-library/react@^16.0.0
npm install -D @testing-library/jest-dom@^6.6.0
npm install -D @testing-library/user-event@^14.5.0
npm install -D msw@^2.4.0
npm install -D @vitest/coverage-v8@^2.1.0
npm install -D jsdom@^25.0.0

# === Playwright ===
npm install -D @playwright/test@^1.47.0
npm install -D axe-playwright@^2.0.0
npx playwright install --with-deps chromium firefox webkit

# === Prettier ===
npm install -D prettier@^3.3.0
npm install -D prettier-plugin-tailwindcss@^0.6.0

# === Suporte ===
npm install -D @types/jspdf@^2.5.0
```

---

#### 2.1.2 Configuração do ESLint (`eslint.config.mjs`)

```js
// eslint.config.mjs — Flat Config (ESLint 9)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import securityPlugin from 'eslint-plugin-security';
import prettierConfig from 'eslint-config-prettier';
import nextPlugin from '@next/eslint-plugin-next';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  jsxA11yPlugin.configs.flat.recommended,
  unicornPlugin.configs.recommended,
  securityPlugin.configs.recommended,
  perfectionistPlugin.configs['recommended-natural'],
  prettierConfig,

  // Config linguístico
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },

  // Config Next.js
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Config React Hooks
  {
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: reactHooksPlugin.configs.recommended.rules,
  },

  // Config import/order
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'next/**', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal', position: 'after' },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
      'import/no-duplicates': 'error',
    },
  },

  // Config personalizada do projeto
  {
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // React
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'warn',

      // Unicorn
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
      'unicorn/no-array-for-each': 'off',

      // Segurança
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',

      // Gerais
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'prefer-const': 'error',
    },
  },

  // Ignorar arquivos de config e build
  {
    ignores: [
      '.next/',
      'node_modules/',
      'out/',
      'dist/',
      'coverage/',
      'playwright-report/',
      'test-results/',
      '*.config.*',
      'next-env.d.ts',
    ],
  },
);
```

---

#### 2.1.3 Configuração do Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`:
```
.next/
node_modules/
out/
dist/
coverage/
playwright-report/
test-results/
.next/
*.generated.*
```

---

#### 2.1.4 Configuração do Vitest (`vitest.config.ts`)

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/**/*.e2e.{ts,tsx}', 'e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/**/*.{ts,tsx}',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/index.ts',
        'src/app/**/layout.tsx',
        'src/app/globals.css',
        'src/types/**',
        'vitest.config.ts',
        'vitest.setup.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 4,
      },
    },
    testTimeout: 10_000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**`vitest.setup.ts`:**
```ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
  headers: () => new Headers(),
}));

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
```

---

#### 2.1.5 Configuração do Playwright (`playwright.config.ts`)

```ts
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ...(process.env.CI ? [['github']] : [['list']]),
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
  webServer: {
    command: 'npm run build && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

---

#### 2.1.6 Estrutura de Diretórios de Teste

```
src/
  __tests__/
    components/
      ui/
        Button.test.tsx
        Card.test.tsx
        Input.test.tsx
        Modal.test.tsx
        FormComponents.test.tsx
        ImageUpload.test.tsx
      campaigns/
        CampaignForm.test.tsx
        QRCodeGenerator.test.tsx
      layout/
        Layout.test.tsx
    hooks/
      useSupabase/
        useCampaigns.test.ts
        useCampaignFields.test.ts
        useResponses.test.ts
        useDashboardStats.test.ts
    pages/
      landing/
        HomePage.test.tsx
      dashboard/
        DashboardPage.test.tsx
        LoginPage.test.tsx
        RegisterPage.test.tsx
        LogoutPage.test.tsx
        ResetPasswordPage.test.tsx
        SettingsPage.test.tsx
        UsersPage.test.tsx
        QRCodesPage.test.tsx
        VisitorsPage.test.tsx
        ResponsesPage.test.tsx
        CampaignsListPage.test.tsx
        CampaignNewPage.test.tsx
        CampaignEditPage.test.tsx
      public/
        CampaignPublicPage.test.tsx
      auth/
        AuthCallbackPage.test.tsx
    lib/
      utils.test.ts
      supabase/
        client.test.ts
        server.test.ts
        upload.test.ts
    integration/
      auth/
        LoginFlow.test.tsx
        RegisterFlow.test.tsx
        PasswordResetFlow.test.tsx
        LogoutFlow.test.tsx
      campaigns/
        CreateCampaignFlow.test.tsx
        EditCampaignFlow.test.tsx
        CampaignCRUDFlow.test.tsx
        CampaignPublicSubmitFlow.test.tsx
      visitors/
        VisitorsFlow.test.tsx
      responses/
        ResponsesFlow.test.tsx
        ExportResponsesFlow.test.tsx
      qrcodes/
        QRCodeGenerationFlow.test.tsx
      settings/
        SettingsMultiTabFlow.test.tsx
        ImageUploadFlow.test.tsx
      users/
        UserManagementFlow.test.tsx
    api/
      middleware.test.ts
      rpc/  # Testes para as RPCs do Supabase
        incrementViews.test.ts
        userManagement.test.ts
    accessibility/
      DashboardAccessibility.test.tsx
      LoginAccessibility.test.tsx
      CampaignFormAccessibility.test.tsx
      LandingAccessibility.test.tsx
      QRCodesAccessibility.test.tsx
      SettingsAccessibility.test.tsx
    mocks/
      handlers.ts              # MSW handlers
      server.ts                # MSW server setup
      supabaseMock.ts          # Supabase mock helpers
      data/
        campaigns.ts           # Mock data: campaigns
        responses.ts           # Mock data: responses
        churches.ts            # Mock data: churches
        profiles.ts            # Mock data: profiles
        users.ts               # Mock data: users

e2e/
  setup/
    auth.setup.ts              # Login setup + storage state
    db.seed.ts                 # Database seeding for E2E
  auth/
    login.spec.ts
    register.spec.ts
    logout.spec.ts
    password-reset.spec.ts
  dashboard/
    dashboard-overview.spec.ts
    navigation.spec.ts
  campaigns/
    campaign-crud.spec.ts
    campaign-form-builder.spec.ts
    public-form-submission.spec.ts
  visitors/
    visitor-list.spec.ts
    visitor-export.spec.ts
  responses/
    response-list.spec.ts
    response-export-csv.spec.ts
    response-export-excel.spec.ts
  qrcodes/
    qrcode-generation.spec.ts
    qrcode-batch.spec.ts
  settings/
    settings-profile.spec.ts
    settings-contact.spec.ts
    settings-social.spec.ts
    settings-customization.spec.ts
    settings-users.spec.ts
  users/
    user-management.spec.ts
  accessibility/
    a11y-dashboard.spec.ts
    a11y-public-pages.spec.ts
    a11y-auth-pages.spec.ts
  mobile/
    mobile-dashboard.spec.ts
    mobile-campaigns.spec.ts
    mobile-public-form.spec.ts
  performance/
    performance-landing.spec.ts
    performance-dashboard.spec.ts
  fixtures/
    test-users.json
    test-campaigns.json
  pages/
    login.page.ts          # Page Object Model
    dashboard.page.ts
    campaigns.page.ts
    settings.page.ts
```

---

#### 2.1.7 MSW Handlers (`src/__tests__/mocks/handlers.ts`)

```ts
import { http, HttpResponse, type HttpHandler } from 'msw';

const SUPABASE_URL = 'https://cnwhabqttufexuwzgkeq.supabase.co';

export const handlers: HttpHandler[] = [
  // Auth
  http.post(`${SUPABASE_URL}/auth/v1/token`, () =>
    HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'bearer',
      expires_in: 3600,
      user: { id: 'user-1', email: 'admin@igreja.com' },
    }),
  ),

  // Campaigns
  http.get(`${SUPABASE_URL}/rest/v1/campaigns`, ({ request }) => {
    const url = new URL(request.url);
    const churchId = url.searchParams.get('church_id')?.replace(/^eq\./, '');
    const isActive = url.searchParams.get('is_active')?.replace(/^eq\./, '');
    const isPublic = url.searchParams.get('is_public')?.replace(/^eq\./, '');

    let campaigns = mockData.campaigns;
    if (churchId) campaigns = campaigns.filter((c) => c.church_id === churchId);
    if (isActive !== null) campaigns = campaigns.filter((c) => String(c.is_active) === isActive);
    if (isPublic !== null) campaigns = campaigns.filter((c) => String(c.is_public) === isPublic);

    return HttpResponse.json(campaigns);
  }),

  http.post(`${SUPABASE_URL}/rest/v1/campaigns`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newCampaign = { id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() };
    return HttpResponse.json(newCampaign, { status: 201 });
  }),

  http.patch(`${SUPABASE_URL}/rest/v1/campaigns`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ ...body, updated_at: new Date().toISOString() });
  }),

  http.delete(`${SUPABASE_URL}/rest/v1/campaigns`, () =>
    HttpResponse.json(null, { status: 204 }),
  ),

  // Responses
  http.get(`${SUPABASE_URL}/rest/v1/responses`, () =>
    HttpResponse.json(mockData.responses),
  ),

  http.post(`${SUPABASE_URL}/rest/v1/responses`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() }, { status: 201 });
  }),

  // Churches
  http.get(`${SUPABASE_URL}/rest/v1/churches`, () =>
    HttpResponse.json(mockData.churches),
  ),

  // Profiles
  http.get(`${SUPABASE_URL}/rest/v1/profiles`, () =>
    HttpResponse.json(mockData.profiles),
  ),

  // Campaign Fields
  http.get(`${SUPABASE_URL}/rest/v1/campaign_fields`, () =>
    HttpResponse.json(mockData.campaignFields),
  ),

  // User Roles
  http.get(`${SUPABASE_URL}/rest/v1/user_roles`, () =>
    HttpResponse.json(mockData.userRoles),
  ),

  // Campaign Views
  http.get(`${SUPABASE_URL}/rest/v1/campaign_views`, () =>
    HttpResponse.json(mockData.campaignViews),
  ),

  // RPC increment_campaign_views
  http.post(`${SUPABASE_URL}/rest/v1/rpc/increment_campaign_views`, () =>
    HttpResponse.json(null),
  ),
];

export const mockData = {
  campaigns: [
    {
      id: 'camp-1',
      church_id: 'church-1',
      title: 'Campanha de Natal',
      slug: 'campanha-de-natal',
      description: 'Campanha especial de Natal',
      banner_url: 'https://example.com/banner.jpg',
      start_date: '2026-01-01T00:00:00Z',
      end_date: '2026-12-31T00:00:00Z',
      is_active: true,
      is_public: true,
      settings: {
        show_visitor_count: true,
        allow_anonymous: true,
        custom_fields: [],
        thank_you_message: 'Obrigado por participar!',
      },
      created_by: 'user-1',
      created_at: '2026-06-01T00:00:00Z',
      updated_at: '2026-06-01T00:00:00Z',
    },
    {
      id: 'camp-2',
      church_id: 'church-1',
      title: 'Campanha Evangelismo',
      slug: 'campanha-evangelismo',
      description: 'Campanha de evangelismo',
      is_active: true,
      is_public: true,
      settings: { show_visitor_count: false, allow_anonymous: true, custom_fields: [] },
      created_by: 'user-1',
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    },
    {
      id: 'camp-3',
      church_id: 'church-1',
      title: 'Campanha Inativa',
      slug: 'campanha-inativa',
      description: 'Campanha inativa',
      is_active: false,
      is_public: false,
      settings: { show_visitor_count: false, allow_anonymous: true, custom_fields: [] },
      created_by: 'user-1',
      created_at: '2026-04-01T00:00:00Z',
      updated_at: '2026-04-01T00:00:00Z',
    },
  ],
  responses: [
    {
      id: 'resp-1',
      campaign_id: 'camp-1',
      data: { nome: 'João Silva', telefone: '(96) 99111-1111', oracao: true },
      visitor_name: 'João Silva',
      visitor_phone: '(96) 99111-1111',
      visitor_email: 'joao@email.com',
      created_at: '2026-07-01T10:00:00Z',
    },
    {
      id: 'resp-2',
      campaign_id: 'camp-1',
      data: { nome: 'Maria Souza', telefone: '(96) 99222-2222', decisao: true },
      visitor_name: 'Maria Souza',
      visitor_phone: '(96) 99222-2222',
      created_at: '2026-07-02T10:00:00Z',
    },
  ],
  churches: [
    {
      id: 'church-1',
      name: 'Igreja Campo do Planalto',
      slug: 'campo-do-planalto',
      primary_color: '#C29560',
      secondary_color: '#D4A86A',
      phone: '(96) 99166-2185',
      email: 'contato@campodoplanalto.org',
      settings: { allow_registration: true, require_approval: false },
    },
  ],
  profiles: [
    { id: 'user-1', church_id: 'church-1', role: 'super_admin', name: 'Admin Principal' },
    { id: 'user-2', church_id: 'church-1', role: 'church_admin', name: 'Admin Igreja' },
    { id: 'user-3', church_id: 'church-1', role: 'member', name: 'Membro' },
  ],
  campaignFields: [],
  userRoles: [
    { user_id: 'user-1', role: 'super_admin' },
    { user_id: 'user-2', role: 'church_admin' },
  ],
  campaignViews: [],
};
```

**`src/__tests__/mocks/server.ts`:**
```ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

---

#### 2.1.8 Scripts no `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:full": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\"",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
    "check:all": "npm run lint:full && npm run format:check && npm run type-check && npm run test && npm run build"
  }
}
```

---

#### 2.1.9 Templates de Teste por Tipo

**Template: Component Test (Button.test.tsx):**
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza com texto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('renderiza variante primary', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('renderiza estado loading', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Clique</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('nao chama onClick quando disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} disabled>Desabilitado</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renderiza com aria-label', () => {
    render(<Button aria-label="Fechar"><span>X</span></Button>);
    expect(screen.getByRole('button', { name: /fechar/i })).toBeInTheDocument();
  });
});
```

**Template: Hook Test (useCampaigns.test.ts):**
```ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCampaigns } from '@/lib/hooks/useSupabase';
import { createClient } from '@/lib/supabase/client';

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('useCampaigns', () => {
  const mockCampaigns = [
    { id: '1', title: 'Campanha 1', is_active: true },
    { id: '2', title: 'Campanha 2', is_active: false },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({ data: mockCampaigns, error: null });

    vi.mocked(createClient).mockReturnValue({
      from: () => ({ select: mockSelect, eq: mockEq, order: mockOrder }),
    } as unknown as ReturnType<typeof createClient>);
  });

  it('retorna lista de campanhas', async () => {
    const { result } = renderHook(() => useCampaigns('church-1'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.campaigns).toHaveLength(2);
    expect(result.current.campaigns[0].title).toBe('Campanha 1');
  });

  it('retorna estado de erro quando fetch falha', async () => {
    vi.mocked(createClient).mockReturnValue({
      from: () => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: null, error: new Error('Falha na conexão') }),
      }),
    } as unknown as ReturnType<typeof createClient>);

    const { result } = renderHook(() => useCampaigns('church-1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Falha na conexão');
  });
});
```

**Template: Page Test (LoginPage.test.tsx):**
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '@/app/dashboard/login/page';

// Mock supabase auth
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: '1' } }, error: null }),
    },
  })),
}));

describe('LoginPage', () => {
  it('renderiza formulario de login', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('mostra erro para credenciais invalidas', async () => {
    vi.mocked(createClient).mockReturnValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'Invalid login credentials' },
        }),
      },
    } as unknown as ReturnType<typeof createClient>);

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'teste@teste.com');
    await user.type(screen.getByLabelText(/senha/i), '123456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/email ou senha incorretos/i)).toBeInTheDocument();
  });

  it('toggle visibilidade da senha', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: /mostrar senha/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('navega para registro', () => {
    render(<LoginPage />);
    expect(screen.getByRole('link', { name: /criar conta/i })).toHaveAttribute('href', '/dashboard/register');
  });
});
```

**Template: Integration Test (CreateCampaignFlow.test.tsx):**
```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { server } from '@/__tests__/mocks/server';

// MSW server setup
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterAll(() => server.close());

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/dashboard/campaigns/new',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Create Campaign Flow (Integration)', () => {
  it('fluxo completo: preencher form -> submit -> redirect', async () => {
    const user = userEvent.setup();
    const { default: NewCampaignPage } = await import('@/app/dashboard/campaigns/new/page');

    render(<NewCampaignPage />);

    // Preenche titulo
    await user.type(screen.getByLabelText(/titulo/i), 'Nova Campanha Teste');

    // Seleciona tipo
    await user.selectOptions(screen.getByLabelText(/tipo/i), 'Evangelismo');

    // Preenche descricao
    await user.type(screen.getByLabelText(/descricao/i), 'Descricao da campanha de teste');

    // Define datas
    await user.type(screen.getByLabelText(/data inicio/i), '2026-08-01');
    await user.type(screen.getByLabelText(/data fim/i), '2026-12-31');

    // Submit
    await user.click(screen.getByRole('button', { name: /criar campanha/i }));

    // Verifica que foi redirecionado
    await waitFor(() => {
      expect(require('next/navigation').useRouter().push).toHaveBeenCalledWith(
        expect.stringContaining('/dashboard/campaigns/')
      );
    });
  });

  it('mostra erro de validacao para campos obrigatorios', async () => {
    const user = userEvent.setup();
    const { default: NewCampaignPage } = await import('@/app/dashboard/campaigns/new/page');

    render(<NewCampaignPage />);

    await user.click(screen.getByRole('button', { name: /criar campanha/i }));

    expect(await screen.findByText(/titulo e obrigatorio/i)).toBeInTheDocument();
  });
});
```

**Template: E2E Test (login.spec.ts):**
```ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/login');
  });

  test('exibe formulario de login', async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/senha/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
  });

  test('login com credenciais validas redireciona para dashboard', async ({ page }) => {
    await page.getByLabel(/email/i).fill('admin@igreja.com');
    await page.getByLabel(/senha/i).fill('senha123');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText(/dashboard/i)).toBeVisible();
  });

  test('login com credenciais invalidas mostra erro', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalido@email.com');
    await page.getByLabel(/senha/i).fill('senhaerrada');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page.getByText(/email ou senha incorretos/i)).toBeVisible();
  });

  test('navega para pagina de registro', async ({ page }) => {
    await page.getByRole('link', { name: /criar conta/i }).click();
    await expect(page).toHaveURL(/\/dashboard\/register/);
  });

  test('navega para reset de senha', async ({ page }) => {
    await page.getByRole('link', { name: /esqueceu a senha/i }).click();
    await expect(page).toHaveURL(/\/dashboard\/reset-password/);
  });

  test('toggle visibilidade da senha', async ({ page }) => {
    const senhaInput = page.getByLabel(/senha/i);
    await expect(senhaInput).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: /mostrar senha/i }).click();
    await expect(senhaInput).toHaveAttribute('type', 'text');
  });

  test('redireciona usuario logado para dashboard', async ({ page }) => {
    // Login primeiro
    await page.getByLabel(/email/i).fill('admin@igreja.com');
    await page.getByLabel(/senha/i).fill('senha123');
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page).toHaveURL(/\/dashboard$/);

    // Tenta acessar login novamente -> redirecionado
    await page.goto('/dashboard/login');
    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
```

**Template: Accessibility Test (a11y-dashboard.spec.ts):**
```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Accessibility', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('pagina principal do dashboard nao tem violacoes de a11y', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('pagina de campanhas nao tem violacoes de a11y', async ({ page }) => {
    await page.goto('/dashboard/campaigns');
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('pagina de login nao tem violacoes de a11y', async ({ page }) => {
    await page.goto('/dashboard/login');
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

---

#### 2.1.10 Lista Completa dos ~1700 Testes por Arquivo

> Legenda: `T` = Template, `F` = Funcional, `I` = Integração, `A` = Accessibility

##### COMPONENTS (200 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/components/ui/Button.test.tsx` | 15 | Renderização, 6 variantes, 4 tamanhos, loading, disabled, onClick, aria-label, forwardRef |
| `src/__tests__/components/ui/Card.test.tsx` | 10 | Card, CardHeader, CardBody, CardFooter, Badge (6 variantes), Divider |
| `src/__tests__/components/ui/Input.test.tsx` | 20 | Input, Textarea, Select, Checkbox, RadioGroup, Label — render, error state, hint, disabled, forwardRef |
| `src/__tests__/components/ui/Modal.test.tsx` | 15 | Modal (5 sizes), ConfirmDialog, AlertDialog, close on Escape, close on overlay, portal |
| `src/__tests__/components/ui/FormComponents.test.tsx` | 30 | Alert (4 variantes), DropdownMenu, todos os form fields com validação |
| `src/__tests__/components/ui/ImageUpload.test.tsx` | 15 | Preview, upload flow, error states, file validation (type + size), remove, cleanup |
| `src/__tests__/components/campaigns/CampaignForm.test.tsx` | 50 | Render condicional (9 tipos de campo), validação, submit flow, conditional_logic, thank you message, redirect, WhatsApp button, skeleton loading, error state (campanha não encontrada), view counter |
| `src/__tests__/components/campaigns/QRCodeGenerator.test.tsx` | 30 | QR Code generation, color customization, logo upload, download PNG/SVG/PDF, batch generation, progress, clipboard copy |
| `src/__tests__/components/layout/Layout.test.tsx` | 15 | Sidebar, Header, DashboardLayout, PublicLayout, mobile menu, active link, role-based menu (admin section), logout link |

##### HOOKS (250 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/hooks/useSupabase/useCampaigns.test.ts` | 60 | fetchCampaigns, createCampaign, updateCampaign, deleteCampaign, refetch, loading states, error states, empty state, churchId filter |
| `src/__tests__/hooks/useSupabase/useCampaignFields.test.ts` | 60 | fetchFields, createField, updateField, deleteField, reorderFields (N+1 test), loading/error states |
| `src/__tests__/hooks/useSupabase/useResponses.test.ts` | 60 | fetchResponses, exportToCSV, exportToExcel (bug name test), campaignId filter, loading/error, empty state |
| `src/__tests__/hooks/useSupabase/useDashboardStats.test.ts` | 70 | 11 queries individuais, total campaigns, active, responses (total/hoje/semana/mes), decisoes, oracoes, visitas, discipulado, membresia, trends 30 dias, error handling |

##### PAGES (300 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/pages/landing/HomePage.test.tsx` | 15 | Renderização, links, hero section, info section, footer, botão "Preencher ficha", link área administrativa |
| `src/__tests__/pages/dashboard/DashboardPage.test.tsx` | 35 | StatCards (4), gráficos (AreaChart, BarChart), ações rápidas (5), tabela respostas recentes, tabela campanhas, modais (QR Code, delete, archive), CRUD inline |
| `src/__tests__/pages/dashboard/LoginPage.test.tsx` | 20 | Form render, submit, error translation, password toggle, links (register, reset), redirect param, loading state |
| `src/__tests__/pages/dashboard/RegisterPage.test.tsx` | 20 | Form render, validação (senhas iguais, min 6 chars), submit, success state, error handling |
| `src/__tests__/pages/dashboard/LogoutPage.test.tsx` | 5 | Auto logout, redirect, loading state, error state |
| `src/__tests__/pages/dashboard/ResetPasswordPage.test.tsx` | 10 | Form render, submit, success state, error handling |
| `src/__tests__/pages/dashboard/SettingsPage.test.tsx` | 45 | 7 abas (Perfil, Contato, Redes Sociais, Personalização, Configurações, Usuários, Meu Perfil), save individual, ImageUpload em cada aba, toggle switches, color picker, slug auto-generation |
| `src/__tests__/pages/dashboard/UsersPage.test.tsx` | 25 | Role check (acesso restrito), CRUD usuários (criar, editar role, alterar senha, excluir), RPC calls, search, badges |
| `src/__tests__/pages/dashboard/QRCodesPage.test.tsx` | 20 | Campaign list com checkboxes, batch generation, individual modal, search filter, select all, download flow |
| `src/__tests__/pages/dashboard/VisitorsPage.test.tsx` | 25 | Grouping logic, responsive grid, search filter, modal detalhes, export CSV, badges |
| `src/__tests__/pages/dashboard/ResponsesPage.test.tsx` | 30 | Filter search, campaign filter, date range, responsive table/cards, modal details, export CSV, export Excel, mobile view |
| `src/__tests__/pages/dashboard/CampaignsListPage.test.tsx` | 25 | List render, search, status filter (ativas/inativas), CRUD actions, confirm dialogs, empty state |
| `src/__tests__/pages/dashboard/CampaignNewPage.test.tsx` | 20 | Form types (10 tipos), validation, slug auto-generate, ImageUpload, submit -> redirect |
| `src/__tests__/pages/dashboard/CampaignEditPage.test.tsx` | 25 | Load campaign by ID, form builder (9 tipos), add/edit/delete/reorder fields, options management, save, not found state |
| `src/__tests__/pages/public/CampaignPublicPage.test.tsx` | 10 | Render CampaignForm, churchSlug/campaignSlug params |
| `src/__tests__/pages/auth/AuthCallbackPage.test.tsx` | 10 | Code exchange, next param validation (open redirect protection), loading, error, redirect |

##### UTILS (150 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/lib/utils.test.ts` | 80 | `cn()` (merge, override, conditional), `formatDate`/`formatDateTime` (pt-BR, edge cases), `slugify`/`generateSlug` (acentos, espaços, caracteres especiais, empty), `getInitials` (1 nome, 2+ nomes, initials vazios), `formatPhone` (formatacao, validacao), `validatePhone` (10 digitos, 11 digitos, invalido), `validateEmail` (valido, invalido, edge cases), `truncate` (limite, empty, short), `getStatusColor`, `formatNumber` (pt-BR), `calculatePercentage`, `sleep`, `debounce` |
| `src/__tests__/lib/supabase/client.test.ts` | 10 | Factory client, env vars, singleton behavior |
| `src/__tests__/lib/supabase/server.test.ts` | 20 | Cookie handling, error suppression (catch vazio), createServerClient, get/set/remove |
| `src/__tests__/lib/supabase/upload.test.ts` | 40 | `uploadImage`: nome único, timestamp, path construction, erro no upload, erro no getPublicUrl, bucket name, tipos MIME, path traversal prevention, fallback env |

##### INTEGRATION (400 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/integration/auth/LoginFlow.test.tsx` | 30 | Fluxo completo login -> dashboard, erro credenciais, redirect preservation, password toggle, link navigation |
| `src/__tests__/integration/auth/RegisterFlow.test.tsx` | 20 | Fluxo completo registro -> success, trigger handle_new_user, emailRedirectTo, duplicate email error |
| `src/__tests__/integration/auth/PasswordResetFlow.test.tsx` | 15 | Fluxo reset -> email sent, callback com code, open redirect protection |
| `src/__tests__/integration/auth/LogoutFlow.test.tsx` | 10 | Logout -> signOut -> redirect, session cleanup |
| `src/__tests__/integration/campaigns/CreateCampaignFlow.test.tsx` | 40 | Fluxo completo: form -> validacao -> submit -> redirect -> listagem, 10 tipos, ImageUpload, slug generation |
| `src/__tests__/integration/campaigns/EditCampaignFlow.test.tsx` | 40 | Fluxo completo: load -> edit fields -> save -> form builder (add/edit/delete/reorder) -> options sync |
| `src/__tests__/integration/campaigns/CampaignCRUDFlow.test.tsx` | 30 | CRUD completo: create, read, update, delete, archive, duplicate com campos |
| `src/__tests__/integration/campaigns/CampaignPublicSubmitFlow.test.tsx` | 40 | Fluxo publico: load campanha -> preencher form (9 tipos) -> validacao -> submit -> thank you -> view counter increment |
| `src/__tests__/integration/visitors/VisitorsFlow.test.tsx` | 25 | Agrupamento, search, modal detalhes, export CSV, badges |
| `src/__tests__/integration/responses/ResponsesFlow.test.tsx` | 30 | Filters (search, campaign, date), table/cards toggle, modal, export CSV, export Excel |
| `src/__tests__/integration/responses/ExportResponsesFlow.test.tsx` | 15 | CSV export (BOM UTF-8), Excel export (naming bug test), varied data |
| `src/__tests__/integration/qrcodes/QRCodeGenerationFlow.test.tsx` | 25 | Individual campaign, batch generation, format selection (PNG/SVG/PDF), progress bar, logo upload |
| `src/__tests__/integration/settings/SettingsMultiTabFlow.test.tsx` | 30 | 7 abas individuais, save independente, color picker sync, ImageUpload, slug tracking |
| `src/__tests__/integration/settings/ImageUploadFlow.test.tsx` | 20 | Upload/remove em settings, file validation, preview, error recovery |
| `src/__tests__/integration/users/UserManagementFlow.test.tsx` | 30 | CRUD usuarios via RPC, role change, password change, delete, search, super_admin protection, acesso restrito |

##### API/MIDDLEWARE (100 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/api/middleware.test.ts` | 30 | Matcher (/dashboard/:path*), redirect nao autenticado, redirect autenticado em auth page, preserve redirect param, cookie handling, session refresh |
| `src/__tests__/api/rpc/incrementViews.test.ts` | 15 | RPC chamada, parametro campaign_uuid, erro handling, SECURITY DEFINER |
| `src/__tests__/api/rpc/userManagement.test.ts` | 40 | create_user_with_role, change_user_password, delete_user_with_role — sucesso, erro, autorização |
| `src/__tests__/api/supabaseQueries.test.ts` | 15 | Query patterns, RLS policy simulation, church_id filter, pagination (range), single() error PGRST116 |

##### E2E — PLAYWRIGHT (200 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `e2e/auth/login.spec.ts` | 12 | Login válido, inválido, campos vazios, password toggle, redirect preservation, link registro, link reset |
| `e2e/auth/register.spec.ts` | 8 | Registro válido, senhas diferentes, senha curta, email existente, success state |
| `e2e/auth/logout.spec.ts` | 4 | Logout, redirect, sessão limpa, acesso pós-logout |
| `e2e/auth/password-reset.spec.ts` | 4 | Reset flow, email sent state, link volta login |
| `e2e/dashboard/dashboard-overview.spec.ts` | 8 | StatCards visíveis, gráficos Render, ações rápidas, tabelas, modais |
| `e2e/dashboard/navigation.spec.ts` | 10 | Sidebar links, breadcrumbs, mobile menu, active states |
| `e2e/campaigns/campaign-crud.spec.ts` | 15 | CRUD completo: criar, editar, duplicar, arquivar, ativar, excluir |
| `e2e/campaigns/campaign-form-builder.spec.ts` | 10 | Adicionar campos (9 tipos), reordenar, editar opções, excluir, salvar |
| `e2e/campaigns/public-form-submission.spec.ts` | 10 | Rota pública, preencher form, validar, submit, thank you page |
| `e2e/visitors/visitor-list.spec.ts` | 6 | Lista agrupada, search, modal detalhes |
| `e2e/visitors/visitor-export.spec.ts` | 3 | Export CSV com BOM |
| `e2e/responses/response-list.spec.ts` | 8 | Filtros (search, campaign, date), toggle tabela/cards, modal detalhes |
| `e2e/responses/response-export-csv.spec.ts` | 3 | Export CSV |
| `e2e/responses/response-export-excel.spec.ts` | 3 | Export Excel |
| `e2e/qrcodes/qrcode-generation.spec.ts` | 8 | Gerar QR Code individual, personalizar, download PNG/SVG/PDF |
| `e2e/qrcodes/qrcode-batch.spec.ts` | 6 | Selecionar múltiplas, batch generation, progresso, download |
| `e2e/settings/settings-profile.spec.ts` | 6 | Nome, slug, slogan, logo/banner upload |
| `e2e/settings/settings-contact.spec.ts` | 4 | Endereço, telefone, email, website |
| `e2e/settings/settings-social.spec.ts` | 4 | Facebook, Instagram, YouTube, WhatsApp |
| `e2e/settings/settings-customization.spec.ts` | 4 | Color picker, preview, hex input |
| `e2e/settings/settings-users.spec.ts` | 6 | Lista usuarios, convite, remoção |
| `e2e/users/user-management.spec.ts` | 8 | CRUD, role change, password change, super_admin proteção, acesso restrito |
| `e2e/accessibility/a11y-dashboard.spec.ts` | 15 | axe-core scans em todas as páginas do dashboard |
| `e2e/accessibility/a11y-public-pages.spec.ts` | 8 | axe-core scans em landing page, campanha pública |
| `e2e/accessibility/a11y-auth-pages.spec.ts` | 6 | axe-core scans em login, register, reset-password |
| `e2e/mobile/mobile-dashboard.spec.ts` | 8 | Viewport mobile, sidebar, hamburguer, layout responsivo |
| `e2e/mobile/mobile-campaigns.spec.ts` | 6 | Formulário mobile, tabela -> cards |
| `e2e/mobile/mobile-public-form.spec.ts` | 4 | Formulário público mobile |
| `e2e/performance/performance-landing.spec.ts` | 3 | Lighthouse/performance metrics landing |
| `e2e/performance/performance-dashboard.spec.ts` | 3 | Lighthouse/performance metrics dashboard |

##### ACCESSIBILITY (100 testes)

| Arquivo | Testes | Descrição |
|---------|--------|-----------|
| `src/__tests__/accessibility/DashboardAccessibility.test.tsx` | 15 | axe-core via RTL + vitest: home, campaigns, visitors, responses, qrcodes, settings, users |
| `src/__tests__/accessibility/LoginAccessibility.test.tsx` | 8 | axe-core: login, register, reset-password, logout |
| `src/__tests__/accessibility/CampaignFormAccessibility.test.tsx` | 20 | axe-core: cada tipo de campo (9), erro state, success state, modal |
| `src/__tests__/accessibility/LandingAccessibility.test.tsx` | 8 | axe-core: hero, navegação, footer |
| `src/__tests__/accessibility/QRCodesAccessibility.test.tsx` | 12 | axe-core: gerador individual, batch, modais |
| `src/__tests__/accessibility/SettingsAccessibility.test.tsx` | 24 | axe-core: 7 abas, color picker, upload, toggles |
| `src/__tests__/accessibility/KeyboardNavigation.test.tsx` | 13 | Tab flow, Escape em modais, Enter em botoes, focus trap |

---

#### 2.1.11 Configuração de CI/CD (`.github/workflows/deploy.yml` atualizado)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Code Quality & Tests
    runs-on: ubuntu-latest
    timeout-minutes: 15

    services:
      # Serviço opcional: banco de testes PostgreSQL
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint (ESLint full)
        run: npm run lint:full
        continue-on-error: false

      - name: Format check (Prettier)
        run: npm run format:check
        continue-on-error: false

      - name: Type check
        run: npm run type-check
        continue-on-error: false

      - name: Unit & Integration Tests
        run: npm run test -- --reporter=junit --outputFile=test-results/junit.xml
        continue-on-error: false

      - name: Coverage Report
        run: npm run test:coverage
        continue-on-error: false

      - name: Upload Coverage
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage
          path: coverage/
          retention-days: 7

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.APP_URL || 'https://igrejaplanalto.onrender.com' }}
        continue-on-error: false

  e2e:
    name: E2E Tests (Playwright)
    needs: quality
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Build for E2E
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.APP_URL || 'https://igrejaplanalto.onrender.com' }}

      - name: Run E2E Tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL: http://localhost:3000
          TEST_EMAIL: ${{ secrets.TEST_EMAIL }}
          TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}

      - name: Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      - name: Upload Test Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7

  deploy:
    name: Deploy to Render
    needs: [quality, e2e]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - name: Deploy to Render via Webhook
        run: |
          curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
```

---

#### 2.1.12 Resumo de Configurações

| O que | Arquivo | Localização |
|-------|---------|-------------|
| ESLint (flat config v9) | `eslint.config.mjs` | Raiz do projeto |
| Prettier | `.prettierrc` + `.prettierignore` | Raiz do projeto |
| Vitest | `vitest.config.ts` + `vitest.setup.ts` | Raiz do projeto |
| Playwright | `playwright.config.ts` | Raiz do projeto |
| MSW Handlers | `src/__tests__/mocks/handlers.ts` | `src/__tests__/mocks/` |
| MSW Server | `src/__tests__/mocks/server.ts` | `src/__tests__/mocks/` |
| Component Tests | `src/__tests__/components/**/*.test.tsx` | Espelha `src/components/` |
| Hook Tests | `src/__tests__/hooks/**/*.test.ts` | `src/__tests__/hooks/` |
| Page Tests | `src/__tests__/pages/**/*.test.tsx` | Espelha `src/app/` |
| Utils Tests | `src/__tests__/lib/**/*.test.ts` | Espelha `src/lib/` |
| Integration Tests | `src/__tests__/integration/**/*.test.tsx` | `src/__tests__/integration/` |
| API Tests | `src/__tests__/api/**/*.test.ts` | `src/__tests__/api/` |
| Accessibility Tests | `src/__tests__/accessibility/**/*.test.tsx` | `src/__tests__/accessibility/` |
| E2E Tests | `e2e/**/*.spec.ts` | `e2e/` |
| CI Pipeline | `.github/workflows/deploy.yml` | `.github/workflows/` |

---

#### 2.1.13 Checklist de Implementação

- [ ] `npm install -D` todos os pacotes listados em 2.1.1
- [ ] Criar `eslint.config.mjs` com conteúdo de 2.1.2
- [ ] Remover `eslint` e `eslint-config-next` antigos do `package.json` (serão substituídos)
- [ ] Criar `.prettierrc` e `.prettierignore` com conteúdo de 2.1.3
- [ ] Criar `vitest.config.ts` com conteúdo de 2.1.4
- [ ] Criar `vitest.setup.ts` com conteúdo de 2.1.4
- [ ] Criar `playwright.config.ts` com conteúdo de 2.1.5
- [ ] Criar `npx playwright install --with-deps`
- [ ] Criar diretórios de teste listados em 2.1.6 (`mkdir -p src/__tests__/... e2e/...`)
- [ ] Criar MSW handlers e server (2.1.7)
- [ ] Atualizar `package.json` scripts (2.1.8)
- [ ] Criar `e2e/setup/auth.setup.ts` para login E2E
- [ ] Executar `npm run check:all` para validar tudo
- [ ] Adicionar `coverage/` e `playwright-report/` ao `.gitignore`
- [ ] Adicionar `test-results/` ao `.gitignore`

## Seção 3: Pesquisa e Recomendações
### 3.1 Recomendações de Arquitetura
*(Agente 16 - Pesquisa de Arquitetura)*

#### 3.1.1 Server-First: O Padrão Arquitetural de 2026

O Next.js 14+ com App Router estabelece um modelo **server-first** onde componentes são Server Components por padrão. A diretriz fundamental é: todo componente é servidor até que prove precisar do cliente. Fontes:

- **Next.js Docs (2026)**: "Components are Server Components by default. You only need to add 'use client' when the component needs interactivity." ([nextjs.org/docs/app](https://nextjs.org/docs/app))
- **ZTABS (Fev 2026)**: "Start with server components. Stream everything. Validate at every boundary." Esta é a regra de ouro para produção. ([ztabs.co/blog/nextjs-app-router-best-practices](https://ztabs.co/blog/nextjs-app-router-best-practices))
- **Yogesh Mishra (2026)**: "If a component doesn't need useState, useEffect, or browser APIs, it's a server component. No 'use client' directive, no client bundle cost. A healthy tree is 90% green (server) and 10% red (client)." ([yogijs.tech/blog/nextjs-project-architecture-app-router](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router))
- **TechLead (Fev 2026)**: Server Components resultam em 0 KB de JS adicionado no bundle do cliente, Time-to-Interactive instantâneo (HTML puro), e acesso direto a banco de dados sem expor APIs. ([frontendtechlead.com/blog/react-server-components-vs-client-components](https://www.frontendtechlead.com/blog/react-server-components-vs-client-components))

**Recomendação 1 - Converter Landing Page e Rotas Públicas para Server Components:**
Atualmente 100% das páginas são Client Components (`'use client'`). A landing page (`/`) e a rota pública de campanha (`/c/[churchSlug]/[campaignSlug]`) não precisam de interatividade direta. Elas devem ser convertidas para Server Components, movendo a lógica de fetch para o próprio componente (usando `supabase/server.ts`) e mantendo `CampaignForm.tsx` como Client Component importado via composição. Impacto esperado: redução de ~30-50% no bundle JS para essas páginas, melhoria no TTFB e LCP.

**Recomendação 2 - Dashboard Stats Otimizado:**
O hook `useDashboardStats` executa 11 queries sequenciais do lado do cliente. Deve ser convertido para uma Server Component ou Server Action que executa uma única query com `GROUP BY` ou uma RPC customizada no Supabase. Isso elimina o N+1 e remove a latência de 11 round-trips.

---

#### 3.1.2 Server Components vs Client Components: Regras de Decisão

**Fontes consolidadas:**

- **FrontendTechLead (2026)**: Server Components são para: fetch de dados (DB/API), acesso a recursos do servidor (FS, env vars), conteúdo estático/read-only, dependências pesadas. Client Components são para: estado (useState/useReducer), efeitos (useEffect), event handlers, browser APIs. **Performance**: Server Component = 0KB adicionado, Client Component = código do componente enviado ao browser. ([frontendtechlead.com/blog/react-server-components-vs-client-components](https://www.frontendtechlead.com/blog/react-server-components-vs-client-components))
- **ZAX (Abr 2026)**: "Push Client Components as low as possible in the tree. The more your Client Components are 'leaves' rather than 'branches', the more you benefit from Server Components advantages." ([z-ax.com/en/blog/react-server-components-complete-guide-2026](https://z-ax.com/en/blog/react-server-components-complete-guide-2026))

**Recomendação 3 - Aplicar a Regra do "Teste de Remoção":**
Para cada componente com `'use client'`, remover a diretiva e verificar se ainda funciona. Se funcionar, nunca deveria ter sido client. Aplicar isto em todo o projeto. Estima-se que 40-60% dos `'use client'` atuais podem ser eliminados.

**Recomendação 4 - Manter Client Components Apenas nos "Leaf Nodes":**
No projeto atual, páginas inteiras como `dashboard/page.tsx` (772 linhas), `dashboard/settings/page.tsx` (830 linhas) e `dashboard/campaigns/[id]/edit/page.tsx` (717 linhas) são Client Components monolíticos. Extrair a lógica de data fetching para Server Components pai, passando dados como props para os Client Components filhos. Padrão: Server Component wrapper → Client Component leaf.

---

#### 3.1.3 Padrões de Composição React Modernos

**Fontes:**

- **ZAX (2026)**: "The Server Component Wrapper Pattern" - encapsular data fetching em Server Component, passar dados para Client Components renderizarem. "Composition over Inheritance" - passar Client Components como children em vez de callbacks. ([z-ax.com/en/blog/react-server-components-complete-guide-2026](https://z-ax.com/en/blog/react-server-components-complete-guide-2026))
- **React 19 Production Patterns (2026)**: Server Components + Suspense boundaries para streaming progressivo. Parallel data fetching com `Promise.all()` dentro de server components para eliminar waterfalls. ([dev.to/vikrant_bagal/...](https://dev.to/vikrant_bagal_afae3e25ca7/react-19-server-components-production-patterns-for-high-performance-apps-in-2026-3278))
- **Yogesh Mishra**: "Parallel data fetching with Promise.all() inside server components is free. Each fetch runs concurrently without a waterfall. This alone drops TTFB by 40-60% on data-heavy pages." ([yogijs.tech/blog/nextjs-project-architecture-app-router](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router))

**Recomendação 5 - Adotar o Padrão "Server Wrapper + Client Leaf":**
```
// Server Component (pai) - fetch dados
async function CampaignsPage() {
  const campaigns = await getCampaigns(); // server-side
  return <CampaignList campaigns={campaigns} />;
}

// Client Component (folha) - interatividade
'use client';
function CampaignList({ campaigns }) {
  const [filter, setFilter] = useState('');
  // renderiza tabela com filtro client-side
}
```

**Recomendação 6 - Data Fetching Paralelo:**
Substituir o padrão atual de queries sequenciais (ex: `useDashboardStats` com 11 queries) por `Promise.all()` no servidor. Para o dashboard principal, combinar as queries de estatísticas em uma única RPC ou usar `Promise.all` para paralelizar.

**Recomendação 7 - Adicionar React Query (TanStack Query):**
O projeto não possui caching. Recomenda-se React Query para gerenciamento de estado do servidor no cliente com cache, deduplicação, stale-while-revalidate e refetch automático. Isto é especialmente importante para as páginas do dashboard que refazem fetch completo a cada navegação.

**Recomendação 8 - Stream com Suspense:**
Adicionar `<Suspense>` boundaries nas páginas que carregam dados lentos. Combinar com `loading.tsx` (já recomendado nas tarefas 1.5). Para o dashboard, usar streaming para renderizar StatCards e gráficos progressivamente.

---

#### 3.1.4 Estrutura de Projetos Next.js Escaláveis

**Fontes:**

- **ZTABS (2026)**: "Route Groups are powerful for organizing sections without affecting URL paths. Group (auth), (dashboard), (marketing) routes separately." ([ztabs.co/blog/nextjs-app-router-best-practices](https://ztabs.co/blog/nextjs-app-router-best-practices))
- **SignalThirty (Jun 2026)**: Use centralized `src/` directory, feature-based folder structure, separate `/components`, `/hooks`, `/lib`, `/types`. Dependency graph flows one way: app → components → lib. ([signalthirty.com/post/nextjs-project-structure-5-best-practices-for-scalability](https://www.signalthirty.com/post/nextjs-project-structure-5-best-practices-for-scalability))
- **GroovyWeb (Fev 2026)**: Recommended structure: `app/`, `components/ui/`, `components/features/`, `lib/` (server actions, db queries, validation, auth), `hooks/` (explicitly client-side). "Nothing in /lib should import from /components or /app." ([groovyweb.co/blog/nextjs-project-structure-full-stack](https://www.groovyweb.co/blog/nextjs-project-structure-full-stack))

**Recomendação 9 - Reorganizar Componentes por Funcionalidade:**
O projeto atual tem componentes organizados apenas por tipo (`ui/`, `campaigns/`, `layout/`). Para escalar, adicionar uma camada `features/` em `components/` ou adotar pastas por feature dentro de `app/`:
```
src/
  app/dashboard/
    campaigns/
      _components/    # componentes exclusivos de campanhas
      _hooks/         # hooks exclusivos de campanhas
      page.tsx
      new/page.tsx
      [id]/edit/page.tsx
```
Componentes compartilhados permanecem em `components/ui/` (design system) e `components/layout/`.

**Recomendação 10 - Route Groups para Organização:**
Usar Route Groups `(auth)`, `(dashboard)`, `(public)` para organizar layouts sem poluir a URL. O layout do dashboard atual (que faz verificação condicional de auth routes) seria mais elegante com Route Groups.

**Recomendação 11 - Co-location de Lógica:**
Mover hooks e utilitários específicos de uma feature para dentro da pasta daquela feature. Ex: hooks de campanha (`useCampaigns`, `useCampaignFields`) atualmente em `lib/hooks/useSupabase.ts` - melhor co-localizados em `app/dashboard/campaigns/_hooks/`.

**Recomendação 12 - Adicionar loading/error/not-found States:**
Conforme já planejado na Tarefa 1.5. Cada rota deve ter `loading.tsx` (Suspense boundary), `error.tsx` (Error boundary), `not-found.tsx`. O sistema atual depende de estados `useState` manuais, o que é frágil e inconsistente.

**Recomendação 13 - Pacote `server-only` para Segurança:**
Adicionar `server-only` nos arquivos que devem executar exclusivamente no servidor (`lib/supabase/server.ts`, lib de queries). Isso previne imports acidentais em Client Components e vazamento de secrets.

**Recomendação 14 - Estruturar Migração por Fases:**
| Fase | Ação | Benefício |
|------|------|-----------|
| 1 | Landing page + rotas públicas → Server Components | Redução imediata de bundle JS público |
| 2 | Dashboard stats → query única + React Query | Performance do dashboard (fim do N+1) |
| 3 | Extrair Client Components "leaf" das páginas monolíticas | Manutenibilidade, lazy loading |
| 4 | Reorganizar estrutura por feature | Escalabilidade para novas funcionalidades |
| 5 | Adicionar Streaming/Suspense | UX progressiva, LCP reduzido |

---

**Resumo das Recomendações com Fontes:**

| # | Recomendação | Prioridade | Fonte Principal |
|---|---|---|---|
| 1 | Server-first: converter landing + rotas públicas | Imediata | Next.js Docs, ZTABS 2026 |
| 2 | Otimizar dashboard stats (N+1) | Imediata | Yogesh Mishra 2026 |
| 3 | Teste de remoção de `'use client'` | Curto prazo | TechLead/FrontendTechLead 2026 |
| 4 | Padrão Server Wrapper + Client Leaf | Curto prazo | ZAX 2026 |
| 5 | Parallel data fetching com Promise.all() | Curto prazo | React 19 Production Patterns 2026 |
| 6 | Adicionar React Query para caching | Curto prazo | Dev.to 2026 |
| 7 | Stream com Suspense boundaries | Médio prazo | Next.js Docs |
| 8 | Route Groups para organização | Médio prazo | ZTABS, SignalThirty 2026 |
| 9 | Reorganizar components/features | Médio prazo | GroovyWeb 2026 |
| 10 | Co-location de hooks por feature | Médio prazo | SignalThirty 2026 |
| 11 | Adicionar loading/error/not-found | Imediata | (Já na Tarefa 1.5) |
| 12 | Pacote `server-only` para segurança | Curto prazo | Next.js Docs |
| 13 | Migração por fases | Contínuo | Síntese de todas as fontes |

### 3.2 Recomendações de Performance
*(Agente 17/15 - Pesquisa de Performance)*

**Cenário atual:** 100% Client Components, sem cache, sem lazy loading, imagens desotimizadas (`unoptimized: true`), bundle ~800KB-1MB bruto, 11+ queries sequenciais no dashboard, sem paginação, sem Server Components.

#### 1. Imagens (next/image)

**Problema:** `images: { unoptimized: true }` desabilita toda a pipeline de otimização. `<img>` tradicional sem `loading="lazy"`, sem `srcset`, sem WebP/AVIF.

**Recomendações comprovadas:**
1. **Habilitar next/image com remotePatterns** para o Supabase Storage. O `next/image` reduz LCP em 40-50% com resize automático, WebP/AVIF e lazy loading nativo.
2. **Usar `priority` na imagem LCP (hero)** e lazy loading padrão nas demais — elimina render blocking da hero image.
3. **Adicionar `sizes` prop** para evitar download de imagens desktop em mobile: `sizes="(max-width: 768px) 100vw, 50vw"`.
4. **Blur placeholder** via `placeholder="blur"` com `blurDataURL` para imagens acima da dobra melhora LCP perceived.
5. **Se o Render não suportar otimização de imagens**, usar serviço externo (Cloudinary, Imgix) ou CDN com transformação de imagens.

#### 2. Fontes (next/font)

**Problema:** Inter definida apenas como `font-family` string no Tailwind, sem `next/font`. Causa FOUT/CLS, sem subsetting automático, sem self-hosting.

**Recomendações comprovadas:**
1. **Migrar para `next/font/google`** no root layout — zero layout shift, font subsetting automático, self-hosted localmente, sem requisição externa.
2. **Usar `display: "swap"` e `variable: "--font-inter"`** para integração com Tailwind e fallback imediato.
3. **Configurar fallback metrics** com `adjustFontFallback` para eliminar CLS entre fallback e font real.

#### 3. Server Components

**Problema grave:** 100% das páginas são Client Components (`'use client'`). Server Components cortam bundle JS em até 60% mantendo HTML servido.

**Recomendações comprovadas:**
1. **Converter landing page (`/page.tsx`) para Server Component** — não precisa de interatividade cliente.
2. **Manter `'use client'` APENAS onde há interatividade** (useState, useEffect, onClick, onChange). Extrair partes interativas para componentes filhos.
3. **Rota pública `/c/[churchSlug]/[campaignSlug]` pode ser parcialmente server** — fetch de campanha no servidor, formulário interativo como Client Component isolado.
4. **Dashboard**: extrair lógica de fetch para Server Components, manter componentes de UI como Client Components pequenos. Usar Suspense boundaries para streaming progressivo.

#### 4. Lazy Loading e Code Splitting

**Problema:** `recharts` (~150KB), `jspdf` (~50KB), `qrcode` (~70KB) carregados no bundle principal. Toda a aplicação é um único bloco JS.

**Recomendações comprovadas:**
1. **`next/dynamic` com `ssr: false` para Recharts** no dashboard — biblioteca de ~150KB carregada apenas quando necessário.
2. **`next/dynamic` para `QRCodeGenerator`** e `BatchQRCodeGenerator` — ambos usam `qrcode` e `jspdf` que somam ~120KB.
3. **`next/dynamic` para modais** — `Modal`, `ConfirmDialog`, `AlertDialog` carregados apenas quando abertos. Reduz bundle inicial em 30-40%.
4. **Dynamic import de `CampaignForm.tsx`** na rota pública — formulário pesado carregado apenas na página de campanha.
5. **Usar `React.lazy()` + `Suspense`** para tabs em `settings/page.tsx` (830 linhas) — cada aba um chunk separado.
6. **Criar loading states** com `<Skeleton>` componentes para cada `dynamic()` — melhora perceived performance.

#### 5. Otimização de Bundle (Tree-shaking)

**Problema:** 46 ícones lucide-react importados de 18 arquivos. Componentes duplicados (Button, Modal, Card em FormComponents.tsx + arquivos dedicados). Recharts importado inteiro.

**Recomendações comprovadas:**
1. **Barrel file de ícones** (`@/components/ui/Icons.tsx`): centralizar e re-exportar apenas os ícones usados (~46). Garante tree-shaking efetivo, reduz lucide-react de ~200KB para ~30KB.
2. **Instalar `@next/bundle-analyzer`** para visualizar composição do bundle e identificar oportunidades de corte.
3. **Adicionar `optimizePackageImports`** no `next.config.js` para lucide-react e recharts.
4. **Eliminar componentes duplicados**: unificar Button, Modal, Card, Badge de `FormComponents.tsx` com os arquivos dedicados.
5. **Importar apenas componentes específicos de recharts**: `import { AreaChart, BarChart, ResponsiveContainer } from 'recharts'` em vez de import wildcard ou biblioteca inteira.
6. **Configurar `sideEffects: false`** no `package.json` se possível.

**Nota sobre substituição de bibliotecas:** A Seção 3.9.2 sugere substituir recharts/jspdf/qrcode por alternativas menores (ChartKit, podpdf, @ttsalpha/qrcode). **Esta abordagem envolve risco** — essas bibliotecas são menos estabelecidas e podem não ter manutenção a longo prazo. A abordagem recomendada como PRIMEIRO PASSO é usar dynamic imports (`next/dynamic` com `ssr: false`) para as bibliotecas atuais (já parcialmente implementado em QRCodeGenerator.tsx). A substituição deve ser avaliada caso a caso, com verificação de maturidade e manutenção da biblioteca alternativa.

#### 6. Performance de Banco (Supabase)

**Problema:** 11 queries independentes no dashboard stats (N+1 clássico), sem paginação em nenhuma lista, payload excessivo (`select *`), sem índices em campos de busca, subqueries aninhadas nas RLS.

**Recomendações comprovadas:**
1. **Criar RPC `get_dashboard_stats`** que faz uma única query no PostgreSQL com COUNT condicional e GROUP BY — elimina 10+ round-trips.
2. **Adicionar índices faltantes** (conforme Seção 1.11):
   - `responses(visitor_email)`, `responses(visitor_phone)`, `responses(visitor_name)` — busca de visitantes
   - `profiles(role)` — filtros de role (usado em RLS)
   - `campaigns(created_at DESC)` — ordenação dashboard
   - Índice composto `responses(campaign_id, created_at DESC)` — últimas respostas por campanha
   - Índice composto `responses(created_at, campaign_id)` — tendências
3. **Implementar paginação com `.range()`** em todas as listas: campanhas, respostas, visitantes. Usar cursor-based pagination para performance consistente.
4. **Projeção seletiva de colunas**: substituir `select('*')` por `select('id, title, created_at')`.
5. **Denormalizar `church_id`** em `responses` e `campaign_views` para evitar subqueries aninhadas nas RLS policies — acelera 5-10x.
6. **Consolidar `reorderFields`** em batch update em vez de N queries individuais via `Promise.all`.

#### 7. Cache Strategies

**Problema:** Zero cache implementado. Toda navegação refaz fetch completo. Nenhuma deduplicação de requests.

**Recomendações comprovadas:**
1. **Adicionar TanStack Query (React Query)** como solução primária de cache:
   - Cache automático com `staleTime` configurável (5min para dados estáveis, 30s para dados voláteis).
   - Deduplicação de requests — duas páginas que pedem mesmas campanhas fazem 1 request.
   - Background refetch — dados sempre frescos sem bloquear UI.
   - Mutations otimistas — feedback instantâneo em CRUD.
   - DevTools para debug de cache.
2. **Configurar `staleTime` global** de 2-5 minutos para reduzir chamadas ao Supabase em ~80%.
3. **Usar `initialData` do TanStack Query** combinado com Server Components para hidratação inicial do cache com dados servidos.
4. **Cache de página no Next.js**: rotas estáticas da landing page e formulário público com `revalidate` ou ISR.
5. **Cache de assets estáticos**: configurar `cacheControl` no Supabase Storage para imagens (já 3600s, aumentar para 86400s em produção).
6. **SWR como alternativa leve** (5.3KB vs 16.2KB) se preferir simplicidade — ambos resolvem o problema de cache e deduplicação.

#### 8. Metas de Performance Mensuráveis

| Métrica | Atual (estimado) | Meta |
|---------|------------------|------|
| First Load JS (bundle) | ~800KB-1MB | <300KB |
| LCP | 3-5s | <2.5s |
| CLS | ~0.15 (font FOUTC) | <0.1 |
| Queries Supabase (dashboard) | 11+ | 1-2 |
| Requests cached | 0% | >80% |
| Imagens otimizadas | 0% | 100% |
| Server Components | 0% | >50% das páginas |

**Ordem de implementação recomendada:**
1. **Dia 1-2**: next/font + next/image (maior impacto em Core Web Vitals, mais fácil)
2. **Dia 3-5**: Converter landing e rotas estáticas para Server Components
3. **Dia 6-8**: Adicionar TanStack Query + cache de hooks existentes
4. **Dia 9-11**: Dynamic imports para Recharts, QRCode, modais
5. **Dia 12-14**: RPC de dashboard consolidado + índices + paginação
6. **Dia 15-16**: Barrel de ícones + eliminar duplicação + bundle analyzer

### 3.3 Recomendações de Segurança
*(Agente 18/15 - Pesquisa de Segurança)*

**Base de pesquisa:** OWASP Top 10:2025/2026, Supabase RLS docs, Next.js CSP Guide, CVE-2026-27978, CVE-2026-44578, CVE-2026-44581, CVE-2025-48757 (Lovable/SupaPwn breach).

---

#### 3.3.1 Headers de Segurança (Crítico - Implementação Imediata)

O Next.js 14 não envia **nenhum** header de segurança por padrão. Um projeto recém-inicializado recebe nota **F** no securityheaders.com. A correção é uma configuração única em `next.config.js`:

```js
// next.config.js - Headers de segurança obrigatórios
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ],
  }];
},
```

**Racional:** Cada header cobre uma classe de ataque distinta: HSTS bloqueia downgrade HTTPS/MITM; X-Frame-Options + frame-ancestors previnem clickjacking; X-Content-Type-Options elimina MIME-sniffing; Referrer-Policy previne vazamento de URL sensível; Permissions-Policy revoga acesso não solicitado a APIs do navegador (câmera, microfone, geolocalização).

**Nota:** `X-Frame-Options` está sendo substituído pelo CSP `frame-ancestors`. Manter ambos para compatibilidade com navegadores legados (CSP tem prioridade quando ambos estão presentes).

---

#### 3.3.2 Content Security Policy (CSP) com Nonce (Alta Prioridade)

**Arquitetura recomendada:** CSP baseada em nonce + `'strict-dynamic'` via middleware do Next.js.

**Por que nonce-based:** A abordagem antiga (whitelist de domínios) é frágil — um open redirect, endpoint JSONP ou CDN com conteúdo de usuário burla a política. Nonce-based com `'strict-dynamic'` é o padrão W3C recomendado para apps modernas.

**Configuração no middleware:**

```typescript
// src/middleware.ts - Gerar nonce por request e injetar CSP
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'nonce-${nonce}'`,
    `img-src 'self' blob: data: https://*.supabase.co`,
    `font-src 'self'`,
    `connect-src 'self' https://*.supabase.co`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}
```

**No layout root**, ler o nonce do header e aplicar nos scripts:

```typescript
// src/app/layout.tsx
const headersList = await headers();
const nonce = headersList.get('x-nonce') ?? '';
// Aplicar nonce em <script> tags e componentes Next.js
```

**Estratégia de rollout (2 fases):**
1. **Fase 1 (Report-Only):** Usar `Content-Security-Policy-Report-Only` por 1 semana em produção. Monitorar violações via endpoint `/api/csp-report` ou serviço externo (report-uri.com).
2. **Fase 2 (Enforce):** Após validar que nenhuma funcionalidade legítima é bloqueada, trocar para `Content-Security-Policy`.

**Trade-off importante:** Nonce-based CSP exige **renderização dinâmica** (páginas não podem ser cacheadas em CDN). Para rotas públicas estáticas (landing page), considerar:
- CSP hash-based (experimental SRI do Next.js 14+) 
- Ou CSP menos restritivo em `next.config.js` para rotas públicas vs middleware para rotas dinâmicas (dashboard)

**CVE-2026-44581:** A própria implementação de nonce do Next.js em configurações default do App Router foi vetor de XSS. Manter o Next.js atualizado (>=14.2 com patch) e testar o CSP em staging antes de produção.

---

#### 3.3.3 Correções Imediatas - RLS no Banco de Dados

**Vulnerabilidade Crítica #1 - `user_roles.insert_own_role`:**
```sql
-- ATUAL (qualquer usuário autenticado pode se tornar super_admin):
CREATE POLICY "insert_own_role" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (true);

-- CORRIGIDO (apenas role 'user', próprio user_id):
CREATE POLICY "insert_own_role" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND role = 'user');
```

**Vulnerabilidade Crítica #2 - Duas tabelas de roles conflitantes:**
- `profiles.role` (super_admin, church_admin, member) vs `user_roles.role` (super_admin, church_admin, secretary, receptionist, user)
- **Ação:** Unificar em um único sistema. Recomenda-se migrar para `user_roles` como fonte única e remover `profiles.role`, ajustando as RLS policies para usar `private.is_admin()` consistentemente.

**Vulnerabilidade Alta #3 - RPCs sem versionamento no schema:**
- `create_user_with_role`, `change_user_password`, `delete_user_with_role` existem no frontend mas NÃO estão no `schema.sql`
- **Ação:** Adicionar as 3 RPCs ao schema versionado com `SECURITY DEFINER`, `SET search_path = public`, e verificação explícita de role:

```sql
CREATE OR REPLACE FUNCTION public.create_user_with_role(
  user_email TEXT, user_password TEXT, user_name TEXT, user_role TEXT
) RETURNS UUID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
  caller_role TEXT;
BEGIN
  SELECT role INTO caller_role FROM public.user_roles WHERE user_id = auth.uid();
  IF caller_role IS DISTINCT FROM 'super_admin' THEN
    RAISE EXCEPTION 'Permission denied: only super_admin can create users';
  END IF;
  -- ... lógica de criação ...
END;
$$;
```

**Vulnerabilidade Média #4 - Performance de RLS com `auth.uid()`:**
- `auth.uid()` é marcado como `VOLATILE` — PostgreSQL avalia uma vez POR LINHA
- Em tabelas com 100k+ linhas, cada SELECT executa 100k chamadas a `auth.uid()`
- **Correção:** Envolver em subquery: `(select auth.uid())` — PostgreSQL otimiza para `initPlan`, avaliando uma vez por query (até 1700x mais rápido)

```sql
-- Ineficiente (avaliado por linha):
CREATE POLICY "select_own" ON public.responses
  FOR SELECT USING (auth.uid() = user_id);

-- Eficiente (avaliado uma vez por query):
CREATE POLICY "select_own" ON public.responses
  FOR SELECT USING ((select auth.uid()) = user_id);
```

**Vulnerabilidade Média #5 - Missing `WITH CHECK` em UPDATE policies:**
- Policy sem `WITH CHECK` valida apenas o estado ANTES do UPDATE
- Usuário pode alterar `user_id` para outro usuário e "roubar" ownership
- **Correção:** Toda UPDATE policy deve ter `USING` (filtro inicial) E `WITH CHECK` (validação do resultado):

```sql
CREATE POLICY "update_own" ON public.responses
  FOR UPDATE
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);
```

**Vulnerabilidade Média #6 - Funções SECURITY DEFINER sem `SET search_path`:**
- Sem `SET search_path`, um atacante pode criar objetos em schemas públicos que sequestram a função
- **Correção:** Adicionar `SET search_path = public` em TODAS as funções SECURITY DEFINER (`handle_new_user`, `increment_campaign_views`, `private.is_admin`, e as 3 RPCs de gerenciamento de usuários)

**Checklist de verificação de RLS (executar antes de cada deploy):**
```sql
-- 1. Tabelas sem RLS
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
  AND NOT EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_policies p ON c.oid = p.tablename 
    WHERE c.relname = tablename
  );

-- 2. Policies com USING(true) - permissivas demais
SELECT schemaname, tablename, policyname, permissive 
FROM pg_policies 
WHERE pg_get_expr(qual, classid) = 'true';

-- 3. Policies INSERT/UPDATE sem WITH CHECK
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE cmd IN ('INSERT', 'UPDATE') AND with_check IS NULL;
```

---

#### 3.3.4 Proteção CSRF

**Estado atual:** NENHUMA proteção CSRF implementada.

**Risco:** Um atacante pode induzir um admin autenticado a criar/excluir campanhas ou alterar configurações sem consentimento.

**Recomendações por camada:**

1. **Server Actions (Next.js App Router):** Já têm proteção parcial — comparam `Origin` vs `Host` em cada POST e usam action IDs criptografados. **CVE-2026-27978** patched null-origin bypass in 16.1.7. Para deploy atrás de proxy (Render, Cloudflare), configurar:
   ```js
   // next.config.js
   experimental: {
     serverActions: {
       allowedOrigins: [process.env.NEXT_PUBLIC_APP_URL],
     },
   },
   ```

2. **Cookies `SameSite`:** O Supabase Auth usa `SameSite=Lax` por padrão — adequado para GET, mas POST pode ser vulnerável. Configurar explicitamente:
   ```typescript
   // Ao criar o cliente SSR
   createBrowserClient(url, anonKey, {
     cookies: {
       // Garantir SameSite=Strict para operações administrativas
     },
   });
   ```

3. **API routes (futuras):** Se implementar Route Handlers, adicionar verificação manual de Origin/Referrer:
   ```typescript
   const origin = request.headers.get('origin');
   const host = request.headers.get('host');
   if (!origin || !host || !origin.includes(host)) {
     return NextResponse.json({ error: 'CSRF origin mismatch' }, { status: 403 });
   }
   ```

---

#### 3.3.5 Proteção XSS

**Estado atual:** Nenhum CSP; dados armazenados são renderizados sem sanitização.

**Riscos:**
- Dados de `responses.data` (JSONB) são exibidos no dashboard sem sanitização
- Admins comprometidos podem injetar payloads em labels/placeholders do construtor de formulários
- Imagens enviadas via upload têm validação apenas de extensão, não de conteúdo

**Recomendações:**

1. **CSP nonce-based (já detalhado em 3.3.2):** Última barreira do navegador — mesmo que um XSS seja injetado, scripts não autorizados não executam.

2. **Sanitização de output:** Para dados que SÃO renderizados como HTML (futuramente, se usado `dangerouslySetInnerHTML`):
   ```typescript
   import DOMPurify from 'dompurify';
   // Server-side: usar isomorphic-dompurify
   const sanitized = DOMPurify.sanitize(userInput);
   ```

3. **Upload de imagens seguro:** Além da validação client-side (extensão + tamanho), implementar no servidor:
   - Validação de magic bytes (assinatura real do arquivo, não apenas extensão)
   - Varredura antivírus (ClamAV) para ambientes sensíveis
   - Renomear arquivo para UUID + extensão (prevenir path traversal)
   ```typescript
   // upload.ts - Sanitização de filename
   const safeExt = file.name.split('.').pop()?.toLowerCase();
   if (!['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(safeExt || '')) {
     throw new Error('Formato de imagem não permitido');
   }
   const fileName = `${crypto.randomUUID()}.${safeExt}`; // UUID em vez de timestamp
   ```

4. **Sem `dangerouslySetInnerHTML`:** O projeto atualmente não usa — manter assim. Se necessário no futuro, exigir sanitização server-side com DOMPurify.

---

#### 3.3.6 Proteção contra SQL Injection

**Estado atual:** Adequada via Supabase client (PostgREST parametriza queries automaticamente).

**Riscos residuais:**
- Funções RPC (`create_user_with_role`, `change_user_password`, `delete_user_with_role`) — não auditadas, podem usar concatenação de strings
- Funções `SECURITY DEFINER` — se houver SQL injection dentro, impacto é maior (executa como superuser)

**Recomendações:**

1. **Regra de ferro:** NUNCA concatenar strings em SQL dentro de funções RPC. Usar `format()` com `%I` (identificador) e `%L` (literal), ou `EXECUTE ... USING` com parâmetros:

```sql
-- VULNERÁVEL:
EXECUTE 'SELECT * FROM ' || table_name || ' WHERE id = ' || user_input;

-- SEGURO:
EXECUTE format('SELECT * FROM %I WHERE id = $1', table_name) USING user_input;
```

2. **RPCs faltando no schema.sql:** As 3 funções de gerenciamento de usuários PRECISAM ser adicionadas ao schema versionado com implementação segura e revisão de segurança.

3. **Server-side validation:** Criar uma camada de API (Server Actions ou Route Handlers) entre o frontend e o Supabase. Atualmente, o frontend fala DIRETAMENTE com o Supabase via anon key — as RLS são a única barreira. Adicionar Zod para validar todos os inputs server-side:

```typescript
// Exemplo de Server Action com validação
import { z } from 'zod';

const campaignSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
});

export async function createCampaign(formData: FormData) {
  'use server';
  const parsed = campaignSchema.parse(Object.fromEntries(formData));
  // parsed está validado e sanitizado
}
```

---

#### 3.3.7 Rate Limiting

**Estado atual:** NENHUM rate limiting implementado no app. Dependência total do rate limit default do Supabase API Gateway.

**Riscos:**
- Submissão massiva de formulários públicos (spam de respostas)
- Tentativas de brute-force em login
- Scraping de dados públicos
- Criação em massa de campanhas

**Recomendações:**

1. **Rate limiting simples sem dependência externa (início):** Usar abordagem baseada em IP com Map em memória (para single-instance) ou cookies criptografados. Não requer Redis/Upstash.
   ```typescript
   // Middleware rate limiting simples (in-memory, sem dependências)
   const rateLimit = new Map<string, { count: number; resetAt: number }>();
   ```

2. **Rate limiting no middleware com Upstash (escala):** Se o volume crescer, usar Upstash Redis para estado compartilhado entre instâncias. **Nota:** Upstash é um serviço externo com plano gratuito limitado. Avaliar custo antes de implementar.

3. **Camada Supabase:** Configurar proteção no dashboard do Supabase contra abuso (Rate Limit Rules em API settings).

---

#### 3.3.8 Service Role Key e Segregação de Acesso

**Estado atual:** O projeto usa EXCLUSIVAMENTE a chave `anon` em TODOS os contextos, inclusive no servidor.

**Problema:** `server.ts` usa `NEXT_PUBLIC_SUPABASE_ANON_KEY` em vez de `SUPABASE_SERVICE_ROLE_KEY`. Operações server-side (criar usuários, alterar senhas) estão sujeitas às mesmas RLS que usuários anônimos.

**Recomendação:**
```typescript
// src/lib/supabase/server.ts - Usar service_role key para operações admin
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // NÃO prefixado com NEXT_PUBLIC_
    { cookies: { /* ... */ } },
  );
}
```

**Regra:** `NEXT_PUBLIC_` = vai para o bundle do cliente. NUNCA prefixar `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`. Usar `server-only` para garantir:

```typescript
import 'server-only'; // Garante que este código nunca entra no bundle client
```

---

#### 3.3.9 Autenticação e Sessão

**Recomendações adicionais:**

1. **MFA/2FA:** O Supabase Auth oferece MFA. Ativar para contas `super_admin` e `church_admin`:
   ```typescript
   const { data, error } = await supabase.auth.mfa.enroll({ 
     factorType: 'totp', 
     friendlyName: 'Authenticator App' 
   });
   ```

2. **Política de senha:** Aumentar mínimo para 8 caracteres com requisitos de complexidade (maiúscula, número, símbolo). Validar server-side no middleware/Server Action, não apenas client-side.

3. **Logout forçado por inatividade:** Implementar timeout de sessão inativa (ex: 30min) via middleware ou `useEffect` com `setTimeout`.

4. **Logout com confirmação:** A página de logout executa automaticamente ao montar. Adicionar confirmação para evitar logout acidental.

5. **Tratamento de erro no cookie store:** Substituir os `catch {}` vazios em `server.ts` por:

```typescript
catch (error) {
  console.error('Failed to set/remove auth cookie:', error);
  // Não relançar — é um erro não fatal, mas deve ser registrado
}
```

---

#### 3.3.10 Dependências e Supply Chain

**Recomendações (OWASP A06/A08 - Software Supply Chain):**

1. **Lockfile:** Gerar `package-lock.json` (ou migrar para pnpm/yarn com lockfile). Sem lockfile, cada `npm install` pode resolver versões diferentes, incluindo versões maliciosas.

2. **`.npmrc` com proteções:**
   ```
   # .npmrc
   save-exact=true         # Versões exatas, sem range (^/~)
   min-release-age=7       # Ignorar pacotes publicados há <7 dias
   ```

3. **`npm audit` no CI:** Adicionar ao GitHub Actions:
   ```yaml
   - name: Security audit
     run: npm audit --audit-level=high
   ```

4. **Dependabot/Renovate:** Ativar para PRs automáticos de atualização.

5. **SBOM:** Gerar SBOM (Software Bill of Materials) com `npm sbom` e incluir nos releases.

---

#### 3.3.11 Monitoramento e Logging

1. **CSP violation reporting:** Configurar endpoint para receber relatórios de violação CSP:
   ```typescript
   // app/api/csp-report/route.ts
   export async function POST(request: Request) {
     const report = await request.json();
     console.error('CSP Violation:', JSON.stringify(report));
     // Enviar para Sentry/Datadog
     return NextResponse.json({ ok: true });
   }
   ```

2. **Eventos de segurança:** Logar (estruturadamente) todos os eventos de autenticação, criação/alteração/exclusão de dados, e tentativas de acesso negado.

3. **Sentry:** Adicionar para captura de erros em produção com stripping de dados sensíveis (PII).

4. **Audit logging no banco:** Para operações sensíveis (exclusão de usuários, alteração de roles), inserir registros em uma tabela `audit_logs`.

---

#### 3.3.12 Resumo de Prioridades

| Prioridade | Ação | Esforço | Impacto | CVE/Breach Relacionado |
|------------|------|---------|---------|------------------------|
| 🔴 Crítica | Corrigir RLS `insert_own_role` (WITH CHECK true) | 1h | Escalonamento de privilégio | CVE-2025-48757 (SupaPwn) |
| 🔴 Crítica | Adicionar headers de segurança + CSP (next.config.js) | 2h | Nota F → A em securityheaders | A05: Security Misconfiguration |
| 🔴 Crítica | Unificar sistema de roles (profiles.role vs user_roles) | 4h | Bypass de autorização | A01: Broken Access Control |
| 🟠 Alta | Adicionar CSP nonce-based no middleware | 4h | Mitigação XSS completa | CVE-2026-44581 |
| 🟠 Alta | RPCs faltando no schema.sql (criar/versionar) | 3h | SQL injection potencial | A03: Injection |
| 🟠 Alta | Adicionar rate limiting (login + formulários públicos) | 4h | Spam, brute-force | A04: Insecure Design |
| 🟠 Alta | Sanitização de filename no upload | 1h | Path traversal | CVE-2026-23870 |
| 🟡 Média | Service role key para server.ts | 2h | RLS bypass em admin | - |
| 🟡 Média | `(select auth.uid())` nas RLS policies | 2h | Performance (1700x) | - |
| 🟡 Média | `SET search_path` nas SECURITY DEFINER | 1h | Search_path hijack | - |
| 🟡 Média | WITH CHECK em todas UPDATE policies | 1h | Privilege escalation | - |
| 🟢 Baixa | MFA para super_admin | 3h | Segurança adicional | A07: Auth Failures |
| 🟢 Baixa | Logout por inatividade | 2h | Sessão abandonada | - |
| 🟢 Baixa | Treat catch vazios no server.ts | 1h | Debug em produção | A10: Mishandling Exceptions |

### 3.4 Recomendações de UX/UI
*(Agente 19/15 - Pesquisa de UX/UI)*

#### 1. Formulários: Acessibilidade e Validação

**Validação em tempo real + on-submit:** Implementar validação inline (on-blur) para campos críticos (email, phone) combinada com validação completa no submit. Usar `aria-describedby` para vincular mensagens de erro ao campo correspondente e `aria-invalid` para indicar estado de erro.

**Mensagens de erro específicas e acionáveis:** Substituir "Campo inválido" por mensagens como "O email precisa conter @ e um domínio válido (ex: nome@igreja.com)". Seguir WCAG 3.3.1 (Error Identification) e 3.3.3 (Error Suggestion).

**Agrupamento semântico:** Usar `<fieldset>` + `<legend>` para grupos de checkboxes/radios (ex: "Tipo de contato preferido"). Isso melhora navegação por leitores de tela.

**Flexibilidade de input:** Aceitar múltiplos formatos (telefone com/sem parênteses, data DD/MM/AAAA ou DD/MM/AA) e normalizar no backend. Estudos mostram redução de 22% na taxa de abandono com essa prática (UXPin, 2025).

**Touch targets mínimos de 44x44px:** Seguir WCAG 2.5.8 (Target Size, nível AA) — mínimo 24x24px é o piso legal, mas 44-48px é o recomendado para usabilidade mobile real.

**Progressão em coluna única:** Manter formulários em coluna única (exceto pares curtos como cidade/estado). Single-column reduz carga cognitiva e melhora taxas de conclusão (NN/g, 2016; Design Studio UI/UX, 2026).

#### 2. Design System Escalável com Tailwind CSS

**Design tokens centralizados:** Definir cores, tipografia, espaçamento e sombras como tokens no `tailwind.config.js`. No Tailwind v4, migrar para variáveis CSS via `@theme` para interoperabilidade total com CSS nativo e ferramentas de design.

**Componentes atômicos, não classes CSS:** Extrair padrões repetitivos em componentes React (`Input`, `Select`, `Button`) em vez de usar `@apply`. Componentes são mais testáveis, tipados e fáceis de versionar que classes CSS abstratas.

**Sem duplicação de componentes:** Unificar as implementações duplicadas (Button existe em `Button.tsx` e `FormComponents.tsx`) em uma única fonte de verdade. Projetos escaláveis exigem um único `Button` component com variantes, não duas implementações divergentes.

**Sistema de variantes consistente:** Padronizar variantes (primary/secondary/outline/ghost/danger) com nomes, cores e comportamentos idênticos em todos os componentes. O Alert component atualmente tem todas as 4 variantes com as mesmas classes — bug a corrigir.

**Cores dinâmicas do banco:** Aplicar `primary_color` e `secondary_color` da tabela `churches` via CSS custom properties no `<html>` ou em um ThemeProvider Context, não apenas no preview da página de settings. Isso permite que cada igreja tenha seu tema sem redeploy.

#### 3. Loading States, Skeletons e Error Boundaries

**loading.tsx em TODAS as rotas:** Next.js App Router suporta `loading.tsx` por convenção — criar em cada segmento de rota. O loading deve exibir **skeleton components** que imitam o layout real (mesma estrutura de grid, mesmas proporções), não apenas um spinner genérico.

**Suspense boundaries granulares:** Em páginas com múltiplas seções de dados independentes (ex: dashboard com stats + gráfico + tabela), envolver cada seção em seu próprio `<Suspense>` com fallback específico. Seções rápidas aparecem antes, melhorando a percepção de performance (FCP e LCP).

**Componente Skeleton reutilizável:** Criar `<Skeleton className="h-4 w-full" />` que usa `animate-pulse` + `bg-muted` (ou equivalente no tema). Aceitar `className` para controle de largura/altura/raio. Isso permite composição rápida de skeletons que espelham qualquer layout.

**error.tsx + not-found.tsx em cada segmento:** `error.tsx` captura erros de fetch e renderiza botão "Tentar novamente" (que chama `reset()`). `not-found.tsx` exibe "Página não encontrada" com link para o dashboard. Ambos devem usar o mesmo layout visual do app (header + sidebar se aplicável).

**Error Boundaries aninhando Suspense:** Sempre envolver `<Suspense>` dentro de `<ErrorBoundary>` — nunca o contrário. Isso garante que erros em dados carregados via streaming sejam capturados (Next.js docs, 2026).

#### 4. Dark Mode Implementation

**Estratégia class-based com `next-themes`:** Configurar `darkMode: 'class'` no `tailwind.config.js`. Instalar `next-themes` para gerenciar persistência em localStorage, detecção de `prefers-color-scheme` e tema "system". Envolver o app com `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`.

**Sem Flash of Wrong Theme (FOWT):** `next-themes` injeta um script inline no `<head>` que lê o tema salvo antes da renderização. Isso elimina o flash de tema incorreto — problema comum em implementações manuais.

**Variáveis CSS para cores do tema:** Definir `--bg-primary`, `--text-primary`, `--border-color` etc. no `:root` (light) e `.dark` (dark). Componentes usam `var(--bg-primary)` em vez de classes `dark:` diretamente, permitindo temas dinâmicos futuros.

**Transições suaves:** Adicionar `transition-colors duration-200` no body para que a troca de tema seja animada. Evitar transições em elementos de loading/skeleton para não causar flicker.

**Toggle de tema visível:** Adicionar botão de toggle (ícone Sun/Moon) no header/sidebar do dashboard e na landing page. Usar `useTheme()` de `next-themes` para alternar entre 'light', 'dark' e 'system'.

#### 5. Responsividade Mobile-First

**Breakpoints orientados a conteúdo, não a dispositivos:** Os breakpoints padrão do Tailwind funcionam bem, mas devem ser ajustados ao conteúdo. Ex: se um grid de 2 colunas quebra em 700px, criar um breakpoint customizado. Tailwind v4 permite `--breakpoint-md: 45rem` no `@theme`.

**Tabelas responsivas:** Substituir `hidden md:table` por cards em mobile (como já feito em `responses/page.tsx`) — estender para todas as páginas com tabelas (`campaigns/page.tsx`, `users/page.tsx`). Em mobile, cada linha vira um card com label + valor empilhados.

**Navegação adaptativa:** Sidebar em drawer (overlay) no mobile, sidebar fixa em desktop (`lg:w-64 lg:translate-x-0`). O header deve ter botão hamburguer apenas em mobile. Já implementado parcialmente — garantir que o DropdownMenu também funcione em toque.

**Tipografia fluida:** Usar `text-clamp` ou valores `text-sm md:text-base lg:text-lg` em vez de tamanhos fixos. Para títulos, usar `text-3xl md:text-4xl lg:text-5xl`. Garantir que a fonte Inter carregada via `next/font` esteja disponível para evitar layout shift (CLS).

**Touch vs Click:** Botões e links devem ter `min-h-[44px]` em mobile para área de toque confortável. Itens de lista e cards também. Usar `cursor-pointer` em elementos clicáveis.

**Grid adaptativo:** Usar `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` para cards de visitantes/campanhas. Isso garante 1 coluna em mobile, 2 em tablet, 3 em desktop — sem media queries manuais.

**Container responsivo:** Manter `.container-custom` com `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` como padrão em todas as páginas. A landing page e o dashboard devem usar o mesmo container para consistência visual.

**Testar em dispositivos reais:** Além de DevTools responsivo, testar em smartphones reais (ou emuladores) para verificar touch targets, tempo de carregamento em rede 3G/4G, e comportamento de formulários com teclado virtual.

### 3.5 Recomendações de Código
*(Agente 20/15 - Pesquisa de Código)*

**Base de pesquisa:** Web search com 5 tópicos (TypeScript strict, ESLint flat config, Clean Code React/Next.js, padrões de import, error handling) em Julho/2026.

---

#### 3.5.1 TypeScript Strict Mode — Padrões 2026

| Prática | Aplicação no Projeto | Evidência |
|---------|---------------------|-----------|
| `strict: true` + `noUncheckedIndexedAccess` | Adicionar ao `tsconfig.json`. A flag `noUncheckedIndexedAccess` força checagem de `undefined` ao acessar arrays/objetos por índice. Ex: `const x = arr[0]` passa a ser `string \| undefined` | 73% dos novos projetos Node.js usam TS strict (Stack Overflow 2026); é o "single biggest quality improvement" (Mortex Solutions) |
| `useUnknownInCatchVariables` | Já incluso em `strict: true` no TS 5.4+. Força `catch (e: unknown)` em vez de `catch (e: any)`, exigindo narrowing antes de acessar `.message` | Prática padrão TS 2026; previne erros de tipo em catch |
| Discriminated unions para estados assíncronos | Substituir múltiplos `useState` (loading, error, data) por um tipo único: `type AsyncState<T> = { status: 'idle' } \| { status: 'loading' } \| { status: 'success'; data: T } \| { status: 'error'; error: Error }` | Padrão comprovado: permite pattern matching exaustivo, zero runtime cost, elimina estados impossíveis |
| `satisfies` em vez de type assertion | Usar `const config = { ... } satisfies Config` para validar sem widar o tipo literal. Preferível a `as Config` | TS 4.9+, recomendado por TypeScript TV e Microsoft Docs |
| `import type` + `verbatimModuleSyntax` | Ativar `verbatimModuleSyntax` no tsconfig. Força uso de `import type` para imports que são apenas tipos, eliminando-os do bundle | Prática padrão 2026; reduz bundle desnecessário |
| Sem `React.FC` / `React.FunctionComponent` | Usar props explícitas: `interface Props { ... }; function Button({ ... }: Props)` | Consenso do ecossistema React desde 2022; `React.FC` não permite genéricos e esconde `children` |
| banir `any`, usar `unknown` | Regra `@typescript-eslint/no-explicit-any: 'error'`. Onde o tipo é desconhecido, usar `unknown` + narrowing | TypeScript team recomenda; 94% dos erros de compilação em código gerado por IA são type-check failures |

**Configuração final recomendada para tsconfig.json (além do strict: true já existente):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": false
  }
}
```

---

#### 3.5.2 ESLint Flat Config — Plugins Modernos

**Stack 2026 comprovada (múltiplas fontes):**

| Camada | Pacote | Função |
|--------|--------|--------|
| Core | `eslint@^9.10.0` + `@eslint/js` | Flat config nativa |
| TypeScript | `typescript-eslint@^8.5.0` (unificado) | Parser + plugin + `tseslint.config()` |
| React | `eslint-plugin-react@^7.36.0` | Regras JSX (self-closing-comp, jsx-no-target-blank) |
| Hooks | `eslint-plugin-react-hooks@^4.6.0` | rules-of-hooks, exhaustive-deps |
| A11y | `eslint-plugin-jsx-a11y@^6.10.0` | Acessibilidade em JSX |
| Imports | `eslint-plugin-import@^2.30.0` | Ordenação, sem duplicatas |
| Qualidade | `eslint-plugin-unicorn@^55.0.0` | 200+ regras opinativas (filename-case, prefer-top-level-await) |
| Ordenação | `eslint-plugin-perfectionist@^3.6.0` | Ordenação natural de imports, props, types |
| Segurança | `eslint-plugin-security@^3.0.0` | Detecta ReDoS, eval, object injection |
| Next.js | `@next/eslint-plugin-next@^14.2.0` | Regras específicas do Next.js |
| Prettier | `eslint-config-prettier@^9.1.0` | Desliga regras de formatação conflitantes |

**Padrões-chave do flat config (vs .eslintrc legado):**
- **Plugins são valores importados**, não strings: `import react from 'eslint-plugin-react'` + `plugins: { react }`
- **Configs são spread no array**: `...tseslint.configs.strictTypeChecked`
- **`tseslint.config()` helper** aceita múltiplos argumentos e arrays, com tipagem completa
- **Ordem importa**: presets mais permissivos primeiro, Prettier por último
- **`projectService: true`** (novo typescript-eslint v8) substitui `project: './tsconfig.json'` para type-checked rules, com cache automático

**Regras essenciais para o projeto:**
```js
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
'@typescript-eslint/no-floating-promises': 'error',
'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
'import/order': ['warn', {
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
  pathGroups: [{ pattern: '@/**', group: 'internal' }],
  'newlines-between': 'always',
  alphabetize: { order: 'asc' }
}],
'no-console': ['warn', { allow: ['warn', 'error'] }],
'no-alert': 'error',
```

---

#### 3.5.3 Clean Code em React/Next.js

**Princípio 1: Server Components first**
- Em 2026, todo componente é Server Component por padrão. `'use client'` deve estar no nível mais profundo possível da árvore
- Dados devem ser buscados no servidor (Server Components, não `useEffect`)
- O projeto atual falha nisto: **100% das páginas são Client Components**. Landing page e rota pública de campanha devem ser convertidas imediatamente

**Princípio 2: Parallel data fetching com Suspense**
- **Anti-pattern (sequencial):** `await fetchA(); await fetchB();` — 3s total
- **Pattern (paralelo):** `const [a, b] = await Promise.all([fetchA(), fetchB()])` — 1.5s total
- Envolver seções independentes em `<Suspense>` com fallbacks específicos

**Princípio 3: Server Actions para mutações**
- Em vez de API Routes ou chamadas Supabase diretas do cliente, usar Server Actions com validação (Zod)
- `useFormStatus()` para estado de pending (sem `useState` manual)
- `revalidatePath()` / `revalidateTag()` após ação bem-sucedida

**Princípio 4: Estado global mínimo**
- Para estado de servidor (dados): TanStack Query (React Query) — caching, deduplicação, stale-while-revalidate, refetch automático
- Para estado de cliente (UI): Zustand ou Jotai — mais simples que Redux, menos boilerplate
- O projeto atual não tem caching algum — cada navegação refaz fetch completo

**Princípio 5: Componentes puros e composição**
- Cada componente deve fazer uma coisa bem
- Separar lógica de dados (hooks/custom hooks) de apresentação (componentes)
- Preferir composição com `children` a prop drilling
- Usar `forwardRef` + `cn()` + tipos exportados (padrão já adotado em Button.tsx)

---

#### 3.5.4 Padrões de Import e Organização

**Organização de diretórios (Feature-based sobre Layer-based):**
```
src/
  features/
    campaigns/
      components/    CampaignForm, QRCodeGenerator
      hooks/         useCampaigns, useCampaignFields
      api/           Supabase queries específicas
      types/         Campaign types
      index.ts       Barrel export
    dashboard/
      components/    StatCard, Charts
      hooks/         useDashboardStats
  shared/
    ui/             Button, Card, Modal (reutilizáveis entre features)
    lib/            utils, supabase clients
```

**Por que:** Feature-based isola domínios. Deletar uma feature = deletar uma pasta. Sem cross-folder jumping. Padrão 2026 para aplicações que escalam além de 50 arquivos.

**Barrel Pattern (index.ts):**
```ts
// features/campaigns/index.ts
export { CampaignForm } from './components/CampaignForm';
export { QRCodeGenerator } from './components/QRCodeGenerator';
export { useCampaigns } from './hooks/useCampaigns';
// Uso: import { CampaignForm, useCampaigns } from '@/features/campaigns'
```

**Regras de import definidas:**
1. **Ordem:** builtin → react/next → externos → @/ → relativos parent → relativos sibling → relativos index
2. **Separação:** linha em branco entre grupos (exceto entre relativos)
3. **`import type`** para tipos: `import type { Campaign } from '@/types'`
4. **Sem imports relativos profundos:** `../../../components/Button` proibido. Usar alias `@/`
5. **Sem barrel files excessivos:** apenas 1 barrel por feature/slice, não por subdiretório

---

#### 3.5.5 Error Handling Patterns

**Stack 2026 — 3 camadas complementares:**

| Camada | Técnica | Ferramenta | Quando usar |
|--------|---------|------------|-------------|
| 1. Business logic | Result type | `neverthrow` ou `typescript-result` | Operações fallíveis encadeadas (fetch → parse → validate → save) |
| 2. Component render | Error Boundary | `react-error-boundary` | UI crash recovery; evitar "White Screen of Death" |
| 3. Route-level | error.tsx | Next.js App Router | Erro 500 por rota; reset automático com `reset()` |

**Result Type (padrão comprovado do Rust/Go):**
```ts
import { ok, err, type Result } from 'neverthrow';

type UserError = 'NotFound' | 'NetworkError' | 'Unauthorized';

async function getUser(id: string): Promise<Result<User, UserError>> {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) return err('NotFound');
    return ok(await res.json());
  } catch {
    return err('NetworkError');
  }
}

// Uso: o caller É OBRIGADO a tratar ambos os casos
const result = await getUser('123');
if (result.isOk()) {
  console.log(result.value.name); // TS sabe que é User
} else {
  console.error(result.error); // TS sabe que é UserError
}
```

**Discriminated Union para Async State (sem biblioteca externa):**
```ts
type AsyncState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

// No componente:
if (state.status === 'loading') return <Skeleton />;
if (state.status === 'error') return <ErrorFallback error={state.error} />;
if (state.status === 'success') return <DataView data={state.data} />;
// 'idle' tratado separadamente
```

**Error Boundaries no Next.js:**
```tsx
// app/dashboard/error.tsx — 'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Algo deu errado</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}
```

**Boas práticas comprovadas (múltiplas fontes 2026):**
1. **Use `try/catch` apenas em boundaries** (API calls, parsing). Converta para Result imediatamente.
2. **Nunca engula erros:** `catch {}` é sempre um bug. No mínimo logar com `console.error`.
3. **Async errors não são capturados por Error Boundaries.** Use `try/catch` + `showBoundary()` do `react-error-boundary` para erros em event handlers.
4. **Teste caminhos de erro,** não apenas happy paths. Todo `catch` deve ter teste correspondente.
5. **Retry com exponential backoff:** implementar em chamadas de rede falhas (especialmente no formulário público).
6. **Fallback UI com "Tentar novamente":** usuário deve poder se recuperar sem recarregar a página.

### 3.6 Recomendações de Testes
*(Agente 21 - Pesquisa de Testes)*

**Base de pesquisa:** Web search Julho/2026 com 5 tópicos (Next.js App Router testing, Supabase mocking, coverage thresholds, axe-core a11y, Playwright visual regression).

---

#### 3.6.1 Estratégia Geral: Testing Trophy (2026)

O modelo de teste recomendado para 2026 é o **Testing Trophy**, evolução do Testing Pyramid. A diferença fundamental: **testes de integração são mais valiosos que testes unitários isolados**. Para um projeto Next.js + Supabase, a distribuição ideal é:

| Camada | % Esforço | Ferramenta | O que testar |
|--------|-----------|------------|-------------|
| **Static Analysis** | 5% | ESLint + TypeScript strict | Erros de tipo, regras de código, a11y lint |
| **Unit** | 25% | Vitest + Testing Library | Utilitários puros (utils.ts), hooks com mock, componentes UI isolados |
| **Integration** | 45% | Vitest + MSW | Fluxos completos com dados mockados (CRUD campanhas, login, submit form) |
| **E2E** | 20% | Playwright | Fluxos críticos reais (login, criação de campanha, submit público) |
| **Visual** | 5% | Playwright `toHaveScreenshot` | Regressão visual em páginas principais |

**Fontes:**
- **ZTABS (Fev 2026)**: "Covers unit, integration, and E2E testing with Vitest, Playwright, and Testing Library. Includes the test pyramid, coverage strategies, and CI integration." ([ztabs.co/blog/nextjs-app-router-best-practices](https://ztabs.co/blog/nextjs-app-router-best-practices))
- **Testing Trophy (Kent C. Dodds)**: "Write integration tests. They give the best bang for your buck: they test real behaviors without the brittleness of E2E."

---

#### 3.6.2 Vitest + MSW: Stack de Testes 2026

**Por que Vitest em vez de Jest:**
- Compartilha config, plugins e resolvers com Vite (que o Next.js já usa internamente)
- ESM nativo sem `ts-jest` ou `babel-jest`
- Watch mode inteligente (rerun apenas módulos afetados)
- 2-5x mais rápido que Jest em projetos TypeScript (benchmarks 2026)
- Compatível com Jest API (`describe`, `it`, `expect`, `vi.mock`)

**Por que MSW (Mock Service Worker) em vez de mocks manuais:**
- Mocks em nível de rede (fetch), não de módulo — testa o código REAL do Supabase client
- Não precisa mockar `createClient`, `from()`, `select()`, `.eq()` chain — a função real faz as chamadas e o MSW intercepta
- Zero alteração no código de produção para testabilidade
- Handlers são reutilizáveis entre unit, integration e E2E

**Padrão comprovado para mock de Supabase (fontes consolidadas):**

1. **Mock via MSW (recomendado para 80% dos casos):**
   ```ts
   // src/__tests__/mocks/handlers.ts
   import { http, HttpResponse } from 'msw';

   http.get(`${SUPABASE_URL}/rest/v1/campaigns`, () =>
     HttpResponse.json(mockCampaigns),
   );
   ```
   Isso testa o pipeline real: `createBrowserClient` → `from('campaigns')` → `select()` → fetch HTTP real → MSW intercepta → retorna mock → código processa resposta real.

2. **Mock via vi.mock (para 20% dos casos — hooks isolados):**
   ```ts
   vi.mock('@/lib/supabase/client', () => ({
     createClient: vi.fn(() => ({
       from: () => ({
         select: vi.fn().mockReturnThis(),
         eq: vi.fn().mockReturnThis(),
         order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
       }),
     })),
   }));
   ```
   Útil quando se quer testar APENAS a lógica do hook sem rede. O problema: acopla o teste à implementação interna (cadeia de métodos `.from().select().eq().order()`).

3. **Mock via vi.mock do módulo @supabase/ssr (approach do Supabase docs):**
   ```ts
   vi.mock('@supabase/ssr', () => ({
     createBrowserClient: vi.fn(),
   }));
   ```
   Approach oficial do Supabase para testes de componentes que usam o cliente browser.

**Regra de ouro:** Prefira MSW. Se o teste ficar mais simples com `vi.mock`, use. Nunca use mock manual da cadeia `.from().select().eq()` — isso quebra quando a API do Supabase muda.

**Fontes:**
- **Supabase Docs (2026)**: Recomenda mocking `globalThis.fetch` para testes de Edge Functions, com `@supabase/server` helper. "Test the REAL Edge Function code path — no dependency injection needed." ([supabase.com/docs/guides/functions/unit-test](https://supabase.com/docs/guides/functions/unit-test))
- **iLoveBlogs (Jun 2026)**: "Winner for most teams: Hybrid approach (Mock logic, test DB integration). For 80% of codebase — UI components, utility functions, state management — use Jest with mocks. For remaining 20% — database interactions, RLS policies — use Supabase integration tests with local CLI." ([iloveblogs.blog/post/jest-vs-supabase](https://www.iloveblogs.blog/post/jest-vs-supabase))
- **Supabase Vitest Skill (2026)**: Vitest config with `vi.mock`, `vi.spyOn`, fixtures, coverage via V8. Prefer mocking at the `fetch` boundary for integration tests. ([github.com/supabase/supabase/.agents/skills/vitest](https://github.com/supabase/supabase/blob/master/.agents/skills/vitest/SKILL.md))

---

#### 3.6.3 Padrões de Fixtures e Dados de Teste

**Estrutura comprovada (baseada no plano da Seção 2.1.7):**

```
src/__tests__/mocks/
  handlers.ts           # MSW handlers para Supabase REST + Auth + RPC
  server.ts             # setupServer() do MSW
  supabaseMock.ts       # Helpers para vi.mock do Supabase
  data/
    campaigns.ts        # Fixtures tipadas de campanhas
    responses.ts        # Fixtures de respostas
    churches.ts         # Fixtures de igrejas
    profiles.ts         # Fixtures de perfis/roles
    users.ts            # Fixtures de usuários
```

**Princípios de fixtures:**
1. **Tipadas com `satisfies`:** `export const mockCampaigns = [...] satisfies Campaign[]` — TypeScript valida, mantém inferência literal
2. **Factory functions para variações:** `export function createMockCampaign(overrides: Partial<Campaign>): Campaign`
3. **Realistas com edge cases:** incluir acentos, emojis, strings vazias, valores nulos
4. **Separação por domínio:** um arquivo por entidade (campaigns, responses, etc.)
5. **Reutilizáveis entre unit, integration e E2E:** mesmas fixtures, import paths diferentes

---

#### 3.6.4 Code Coverage: Thresholds e Estratégia

**Recomendação para o projeto (baselines iniciais conservadoras):**

| Métrica | Threshold Inicial | Alvo (6 meses) | Justificativa |
|---------|------------------|----------------|---------------|
| **Statements** | 70% | 85% | Cobertura geral de execução |
| **Branches** | 60% | 80% | Lógica condicional (if/else, switch) |
| **Functions** | 70% | 85% | Cada função deve ter teste |
| **Lines** | 70% | 85% | Alinhado com statements |

**Estratégia de implementação (comprovada por múltiplas fontes 2026):**

1. **Começar baixo, subir gradualmente:** Iniciar com 60-70% e aumentar 5% a cada sprint. Projetos que começam com 80% do zero têm 3x mais chances de abandonar cobertura (JetBrains Qodana 2026).

2. **Thresholds por diretório (mais granular que global):**
   ```ts
   // vitest.config.ts
   coverage: {
     thresholds: {
       global: { statements: 70, branches: 60, functions: 70, lines: 70 },
       perFile: true, // Falha se QUALQUER arquivo individual estiver abaixo
       './src/lib/': { statements: 85, functions: 85 },         // Utilitários: mais crítico
       './src/components/ui/': { statements: 90, functions: 90 }, // Design system: bem testável
       './src/app/dashboard/': { statements: 60, functions: 60 }, // Páginas: mais difícil, aceitar menos
       './src/types/': { statements: 0 },                          // Tipos: excluir
       './src/**/*.generated.*': { statements: 0 },                // Gerado: excluir
     },
   },
   ```

3. **Excluir do coverage o que não vale a pena testar:**
   - Arquivos de tipos (`*.d.ts`, `types/`)
   - Arquivos de configuração (`*.config.*`, `vitest.setup.ts`)
   - Código gerado (`database.ts`)
   - Layouts de rota (são boilerplate do Next.js)

4. **Integrar cobertura no CI, não bloquear PRs:** Usar `--coverage` no CI para gerar relatório, mas apenas exibir como warning. Bloquear apenas quando threshold não for atingido (após 3 meses de maturidade).

5. **Coverage como tendência, não alvo fixo:** Ferramentas como Codecov mostram evolução sprint a sprint. Uma queda de 80% para 75% merece atenção mesmo estando acima do threshold.

**Fontes:**
- **JetBrains Qodana (Jul 2026)**: "Set thresholds by risk level: Financial/Auth → 85-90%, Business logic → 70-80%, Generated → exclude. Treat coverage as trend indicator over time." ([blog.jetbrains.com/qodana/2026/07/code-coverage-tests](https://blog.jetbrains.com/qodana/2026/07/code-coverage-tests))
- **PullNotifier (Fev 2026)**: "Pro tip: PR coverage comments. Use CI to comment on PRs with coverage changes, not to block." Threshold config: `{ branches: 80, functions: 80, lines: 80, statements: 80 }`. ([pullnotifier.com/tools/code-coverage](https://pullnotifier.com/tools/code-coverage))
- **Grizzly Peak Software (Fev 2026)**: "Do not start at 80% and demand it immediately. Start at current baseline + 5%, increase each sprint." ([grizzlypeaksoftware.com](https://www.grizzlypeaksoftware.com/library/code-coverage-analysis-metrics-that-matter-zs635faf))
- **MoldStud (2026)**: "Teams implementing this strategy see 30% reduction in production bugs." Per-directory thresholds: `'./src/components/': { branches: 80, functions: 80 }` vs `'./src/utils/': { branches: 40, functions: 40 }`. ([moldstud.com](https://moldstud.com/articles/p-from-0-to-80-essential-steps-to-improve-code-coverage-with-jest))

---

#### 3.6.5 Testes de Acessibilidade com axe-core

**Stack 2026 (múltiplas fontes convergentes):**

| Camada | Ferramenta | Onde | O que detecta |
|--------|-----------|------|---------------|
| **Lint** | `eslint-plugin-jsx-a11y` | CI (pre-commit) | ARIA inválido, `alt` faltando, elementos não-interativos com onClick |
| **Unit** | `jest-axe` ou `vitest-axe` | Component tests | Violações WCAG em componentes renderizados isoladamente |
| **E2E** | `@axe-core/playwright` | Playwright tests | Violações WCAG em páginas completas com estado real |
| **CI** | GitHub Actions + axe-core | Pull Requests | Bloqueia PRs com violações de acessibilidade |

**Configuração comprovada (@axe-core/playwright):**
```ts
// playwright.config.ts — projeto separado para a11y
projects: [
  {
    name: 'accessibility',
    testMatch: /.*a11y\.spec\.ts/,
    use: { ...devices['Desktop Chrome'] },
  },
]
```

```ts
// e2e/accessibility/a11y-dashboard.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Accessibility', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('dashboard principal sem violações WCAG', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
```

**O que o axe-core detecta (~30-40% dos problemas WCAG):**
- Contraste de cores insuficiente
- ARIA attributes inválidos ou ausentes
- `alt` text faltando em imagens
- Elementos não-interativos com `onClick`
- `role` duplicados ou incorretos
- Labels associadas incorretamente
- Estrutura de heading incorreta

**O que NÃO detecta (requer testes manuais):**
- Ordem de tabulação (focus order)
- Qualidade de anúncios de screen reader
- Comportamento de modais (focus trap)
- Navegação por teclado completa

**Boas práticas comprovadas (2026):**
1. **Violations = Erro de CI:** axe-core tem "zero false positives" (Deque manifesto). Toda violação reportada é real. Bloquear PRs com violations.
2. **`withTags` para escopo:** Usar `wcag2a, wcag2aa, wcag21a, wcag21aa` (níveis A e AA das WCAG 2.0 e 2.1). Adicionar `wcag22aa` conforme suporte.
3. **Executar após `networkidle`:** Garantir que toda a página carregou (incluindo fonts, imagens, lazy content) antes de escanear.
4. **Testar em múltiplos viewports:** Mobile tem diferentes problemas de a11y (touch targets, contraste em dark mode).
5. **Component-level com vitest-axe:** Para componentes isolados, `vitest-axe` é mais rápido que E2E:
   ```ts
   import { axe, toHaveNoViolations } from 'vitest-axe';
   expect.extend(toHaveNoViolations);
   
   it('Button nao tem violacoes de a11y', async () => {
     const { container } = render(<Button variant="primary">Ok</Button>);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```
6. **Incluir no CI:** Executar axe-core em todas as rotas após o build em PRs. Custa segundos e previne regressões de acessibilidade.

**Fontes:**
- **Deque axe-core Docs**: "Zero false positives. Any failure is a real accessibility issue." ([github.com/dequelabs/axe-core](https://github.com/dequelabs/axe-core))
- **RatedWithAI (Jun 2026)**: "axe-core catches ~30-40% of WCAG issues automatically; manual screen reader testing is still required. jest-axe and @axe-core/playwright integrate into your existing test suite." ([ratedwithai.com/blog/react-accessibility-guide-2026](https://ratedwithai.com/blog/react-accessibility-guide-2026))
- **Rishi Kumar Chawda (Abr 2026)**: Guia completo de CI/CD para a11y: ESLint → Playwright → axe-core → Lighthouse CI em pipeline. ([rishikc.com/articles/accessibility-testing-ci-integration](https://rishikc.com/articles/accessibility-testing-ci-integration))

---

#### 3.6.6 Testes de Regressão Visual com Playwright

**Stack recomendada: Playwright `toHaveScreenshot()` nativo (sem terceiros)**

Playwright 1.49+ tem suporte nativo a screenshot comparison com `toHaveScreenshot()`, usando `pixelmatch` para diff. Não requer Percy, Chromatic ou qualquer serviço externo para começar.

**Configuração:**
```ts
// playwright.config.ts
use: {
  screenshot: 'only-on-failure', // Captura automática em falha
}
```

```ts
// e2e/visual/landing.visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression: Landing Page', () => {
  test('landing page não tem regressão visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.01, // 1% de tolerância
    });
  });

  test('hero section isolada', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-section.png');
  });
});
```

**Boas práticas comprovadas para 2026 (consolidadas de 5+ fontes):**

1. **Baselines em CI, não local:** Usar Docker image do Playwright para renderização consistente. Ações do GitHub usam Ubuntu + Playwright Docker.

2. **Desabilitar animações:** Usar `animations: 'disabled'` no `toHaveScreenshot()` ou injetar CSS que desliga animações/transições antes do screenshot:
   ```ts
   await page.addStyleTag({
     content: `*, *::before, *::after {
       animation-duration: 0s !important;
       transition-duration: 0s !important;
     }`,
   });
   ```

3. **Mask de conteúdo dinâmico:** Datas, contadores, avatares de usuário, nomes — tudo que muda entre execuções:
   ```ts
   await expect(page).toHaveScreenshot({ mask: [page.locator('.timestamp'), page.locator('[data-testid="user-avatar"]')] });
   ```

4. **Set per-component thresholds:** Hero image precisa de tolerância maior que um data table. Usar `maxDiffPixels` ou `maxDiffPixelRatio` por teste.

5. **Cross-browser APENAS Chromium:** Firefox e WebKit renderizam fonts e layout de forma diferente. Para regressão visual, testar apenas Chromium. Cross-browser é para E2E funcional.

6. **Review de snapshots em PRs:** Configurar GitHub Actions para subir screenshot diffs como artefato:
   ```yaml
   - name: Upload Visual Diffs
     uses: actions/upload-artifact@v4
     if: failure()
     with:
       name: visual-diffs
       path: test-results/
   ```

7. **`toHaveScreenshot` vs `toMatchSnapshot`:** Sempre usar `toHaveScreenshot()` para screenshots. Ele retry até o render ficar estável (2 capturas idênticas consecutivas). `toMatchSnapshot` não tem esse comportamento.

8. **Viewport fixo:** `{ viewport: { width: 1280, height: 720 } }` para desktop, `{ viewport: { width: 375, height: 812 } }` para mobile. Usar projetos separados.

9. **Font loading:** Garantir que fonts carregaram antes do screenshot com `page.waitForLoadState('networkidle')` ou `page.waitForSelector('text=...')`.

10. **Atualizar snapshots com `--update-snapshots`:** Em PRs que intencionalmente alteram UI:
    ```bash
    npx playwright test --update-snapshots
    ```
    **Critico:** Revisar as alterações visualmente antes de commit. Atualizar snapshots cegamente derrota o propósito do teste visual.

**Ferramentas externas (quando escalar):**
- **Chromatic**: Cloud diffing com UI review para não-devs. 854k downloads/mês (Mai 2026). 8.5x growth em 16 meses. Recomendado quando time tem >100 screenshots e design review é bottleneck.
- **Percy**: Similar ao Chromatic, cloud-based. Boa integração com GitHub checks.
- **Argos**: Open source, auto-hosted.

**Recomendação para o projeto:** Começar com Playwright nativo (`toHaveScreenshot`). É gratuito, built-in, sem dependência externa. Adicionar Chromatic se/time crescer e precisar de revisão visual de não-desenvolvedores.

**Fontes:**
- **QA Skills (Mai 2026)**: Guia completo: "Generate baselines in CI, not locally. Mask all dynamic content. Disable CSS animations. Set per-component thresholds." Uso de `animations: 'disabled'`, `fullPage: true`, `maxDiffPixelRatio`. ([qaskills.sh/blog/playwright-visual-comparison-snapshots-guide](https://qaskills.sh/blog/playwright-visual-comparison-snapshots-guide))
- **Bug0 (Mar 2026)**: "Use Playwright's built-in `toHaveScreenshot()` for visual regression testing. No third-party tools required. Best practices: generate baselines in CI, mask dynamic content, disable animations." ([bug0.com/knowledge-base/playwright-visual-regression-testing](https://bug0.com/knowledge-base/playwright-visual-regression-testing))
- **ScrollTest (Jun 2026)**: 68% dos times usam `toHaveScreenshot()` em CI. Recomendação: "Start with Playwright native. Get team comfortable with screenshot baselines, CSS masking, and CI integration. Then add Chromatic for review layer." ([scrolltest.com/visual-regression-testing-playwright-chromatic-2026](https://scrolltest.com/visual-regression-testing-playwright-chromatic-2026))
- **Playwright Best Practices (Docs)**: "Use locators. Test user-visible behavior. Make tests isolated. Test across all browsers. Use parallelism and sharding. Use trace viewer for CI failures." ([playwright.dev/docs/best-practices](https://playwright.dev/docs/best-practices))

---

#### 3.6.7 Resumo de Prioridades para Implementação

| Prioridade | Ação | Esforço | Impacto | Ferramenta |
|------------|------|---------|---------|------------|
| 🔴 Alta | Configurar Vitest + Testing Library + estrutura de diretórios | 4h | Base para todos os outros testes | Vitest, RTL, jsdom |
| 🔴 Alta | Testes para `utils.ts` (cn, slugify, formatDate, validateEmail) | 3h | 80 testes, cobre lógica pura | Vitest |
| 🔴 Alta | Testes para componentes UI (Button, Card, Input, Modal) | 4h | 90 testes, garante design system | Vitest + RTL + user-event |
| 🔴 Alta | Configurar MSW handlers + fixtures | 3h | Base para integration tests | MSW |
| 🟠 Alta | Testes de hooks (useCampaigns, useResponses, useDashboardStats) | 6h | 250 testes, cobre lógica de dados | Vitest + MSW |
| 🟠 Alta | Configurar Playwright + auth setup | 3h | E2E tests | Playwright |
| 🟠 Alta | axe-core + Playwright a11y tests nas páginas principais | 2h | 29 testes a11y | axe-core/playwright |
| 🟠 Alta | Coverage thresholds no CI (70% inicial) | 1h | Qualidade mensurável | @vitest/coverage-v8 |
| 🟡 Média | Testes de integração (fluxos CRUD, login, submit) | 8h | 400 testes, maior ROI | Vitest + MSW |
| 🟡 Média | Testes de página (LoginPage, CampaignNewPage, etc.) | 8h | 300 testes | Vitest + RTL |
| 🟡 Média | Playwright visual regression (páginas principais) | 4h | Regressão visual | toHaveScreenshot |
| 🟢 Baixa | Playwright E2E coverage completa (200 testes) | 16h | Cobertura E2E total | Playwright |
| 🟢 Baixa | Chromatic/Percy para revisão visual | 4h | Review por não-devs | Chromatic |
| 🟢 Baixa | Testes de performance com Lighthouse CI | 3h | Core Web Vitals | Lighthouse CI |

**Ordem de implementação por fase (alinhada com Seção 5):**

| Fase | Testes | Depois de |
|------|--------|-----------|
| Fase 1 (infra) | Vitest setup, utils tests, MSW mocks | Tarefa 1.4 (Prettier) |
| Fase 2 (componentes) | UI components, hooks, Playwright setup | Fase 1 testes |
| Fase 3 (integração) | Fluxos completos, page tests, a11y | Fase 2 |
| Fase 4 (E2E) | Playwright funcional + visual, coverage CI | Fase 3 |

**TOTAL ESTIMADO:** ~1700 testes, como detalhado na Seção 2.1.10.

---

### 3.7 Recomendações de Deploy/CI
*(Agente 22/15 - Pesquisa de Deploy/CI)*

**Estado atual:** Dockerfile com `npm ci --only=production` no stage `deps` (bug que impede build bem-sucedido), GitHub Actions sem step de deploy (CI apenas), sem preview deployments, sem health checks, sem monitoramento, sem rollback strategy. README contradiz `next.config.js` (menciona static export vs standalone).

---

#### 3.7.1 CI/CD Pipeline Completa (GitHub Actions + Render)

**Fontes de pesquisa (2026):** Cadence Blog, Anthony Coffey, Sadam Hussain, Rajesh Nair, DevStudio.it — todos convergem para um padrão de CI/CD em duas fases: qualidade (CI) + deploy (CD).

**Recomendação 1 — Substituir o workflow atual por uma pipeline completa:**

```yaml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    name: Lint, Typecheck, Test & Build
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Cache .next/cache
        uses: actions/cache@v4
        with:
          path: ${{ github.workspace }}/.next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.[jt]s', '**/*.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-

      - run: npm run type-check
      - run: npm run lint
      - run: npm test -- --ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.APP_URL || 'https://igrejaplanalto.onrender.com' }}

  deploy:
    name: Deploy to Render
    needs: quality
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: production

    steps:
      - name: Trigger Render Deploy Hook
        run: curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"

      - name: Wait for Render deploy
        run: |
          echo "Deploy triggered. Monitor at https://dashboard.render.com"
```

**Fundamentação:** A estrutura atual não faz deploy — apenas type-check e build. O novo workflow:
- Usa `concurrency` para cancelar runs obsoletas (economiza 20-30% minutos em repos ativos — Cadence Blog 2026)
- Cache do `.next/cache` com hash do lockfile + source files reduz build incremental de 4min para 30-90s
- `timeout-minutes` em cada job previne runaway billing (GitHub default é 6h)
- Separa qualidade (PR) de deploy (push main) — as pipelines lentas não bloqueiam feedback rápido
- `environment: production` permite GitHub Environments com Required Reviewers como gate adicional

**Recomendação 2 — Configurar secrets adicionais no GitHub:**

| Secret | Obtido em | Necessário para |
|--------|-----------|-----------------|
| `RENDER_DEPLOY_HOOK_URL` | Render Dashboard → Service → Deploy Hook | Trigger deploy automático |
| `SUPABASE_URL` | Projeto Supabase | Build (env vars) |
| `SUPABASE_ANON_KEY` | Projeto Supabase | Build (env vars) |
| `APP_URL` | Domínio do app | Build (QR Codes, redirects) |

GitHub Environments (`production`) scoped com Required Reviewers para deploy em produção — toda alteração na main requer aprovação humana mesmo com CI verde (Rajesh Nair 2026).

**Recomendação 3 — Branch Protection Rules (settings → branches → main):**

- Require pull request before merging
- Require status check `quality` (job name)
- Require branches to be up to date
- Do not allow bypassing

Sem branch protection, a pipeline é apenas consultiva — desenvolvedores podem fazer push direto na main ignorando CI.

---

#### 3.7.2 Docker Multi-Stage Otimizado para Next.js (Standalone)

**Fontes de pesquisa:** Sadam Hussain (2026), Docker docs, Next.js official standalone docs.

**Recomendação 4 — Corrigir o Dockerfile (bug crítico):**

O estágio `deps` atual usa `npm ci --only=production`, mas o `builder` precisa de devDependencies (TypeScript, Tailwind, PostCSS, ESLint). O build falha silenciosamente.

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Estágio 1: Instalar TODAS as dependências (produção + dev)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Estágio 2: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Estágio 3: Produção (apenas runtime)
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

**Mudanças do Dockerfile atual:**
1. `npm ci` sem `--only=production` — instala TODAS as dependências; o Next.js precisa de TypeScript, Tailwind, PostCSS para compilar
2. `HEALTHCHECK` adicionado — Render usa isso para detectar instâncias saudáveis e substituir instâncias com problema
3. `NEXT_TELEMETRY_DISABLED=1` — desliga telemetria em CI/Docker
4. Labels e documentação podem ser adicionados via `LABEL maintainer=...`

**Recomendação 5 — Adicionar endpoint de health check:**

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

Isso permite que o Render (e o HEALTHCHECK do Docker) verifiquem se a aplicação está respondendo. Sem health check, o Render não detecta automaticamente instâncias com problema.

**Recomendação 6 — Image tagging strategy para rollback:**

Se migrar para Docker Registry (Docker Hub, GHCR), usar:
- `igreja-planalto:latest` (sempre a última build)
- `igreja-planalto:3f12abc` (SHA curto do commit)
- `igreja-planalto:v1.0.0` (tags semânticas para releases)

Isso permite `docker pull igreja-planalto:COMMIT_SHA_PREVIOUS` para rollback instantâneo mantendo o mesmo artefato (Sadam Hussain 2026: "build once, run the same image everywhere").

---

#### 3.7.3 Preview Deployments e Ambientes de Staging

**Fontes:** Anthony Coffey (2026), Vercel Deployment Checks docs, Render Preview Deployments docs.

**Recomendação 7 — Dashboard separado para staging no Render:**

Render oferece Preview Deployments apenas para Static Sites. Para Web Services (Docker), a estratégia é:

1. **Criar um serviço Web separado "igreja-planalto-staging"** no Render com mesmo Dockerfile mas connected a branch `develop` ou com variáveis de staging (DB separado, etc.)
2. **Atualizar o workflow para deploy automático em staging:**

```yaml
deploy-staging:
  name: Deploy to Staging
  needs: quality
  if: github.event_name == 'pull_request'
  runs-on: ubuntu-latest
  environment: staging
  steps:
    - name: Trigger Staging Deploy Hook
      run: curl -X POST "${{ secrets.RENDER_STAGING_DEPLOY_HOOK_URL }}"
```

3. **URL de preview** fica disponível em `https://igreja-planalto-staging.onrender.com` para review antes do merge

**Benefício:** Cada PR gera um deploy em staging com URL pública. Stakeholders validam antes do merge. Ao contrário de "funciona na minha máquina", staging mostra exatamente o que vai para produção.

**Recomendação 8 — Estratégia de Rollback:**

Render oferece rollback via dashboard: Service → Deploys → "Rollback" para qualquer deploy anterior. Para automação:
- Manter o commit SHA como referência
- Script `scripts/rollback.sh` que usa a API do Render para reverter:

```bash
# scripts/rollback.sh
curl -X POST "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys/$DEPLOY_ID/rollback" \
  -H "Authorization: Bearer $RENDER_API_KEY"
```

---

#### 3.7.4 Monitoramento e Alertas

**Fontes:** Sentry Blog (2026), BirJob (2026), DevStudio.it (2026), EastonDev (2025), Prístren Blog (2026).

**Recomendação 9 — Sentry para Error Tracking (implementação imediata):**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

O wizard cria 3 arquivos de configuração (client, server, edge) e atualiza o `next.config.js`.

**Configuração de produção recomendada:**

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,           // 10% das transações
  replaysSessionSampleRate: 0.01,  // 1% das sessões
  replaysOnErrorSampleRate: 1.0,   // 100% das sessões com erro
  enabled: process.env.NODE_ENV === 'production',
  integrations: [Sentry.replayIntegration({ maskAllText: true, blockAllMedia: false })],
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    /Loading chunk \d+ failed/,
  ],
});
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',
  beforeSend(event) {
    // PII scrubbing — remover dados sensíveis antes de enviar
    if (event.request?.data) {
      const data = typeof event.request.data === 'string'
        ? JSON.parse(event.request.data)
        : event.request.data;
      delete data.password;
      delete data.token;
      event.request.data = data;
    }
    event.user = event.user ? { id: event.user.id } : undefined;
    return event;
  },
});
```

**Por que Sentry é prioridade:** O projeto não tem absolutamente nenhum monitoramento. Erros em produção são invisíveis. Sentry captura:
- Erros em Server Components e Server Actions (com stack traces completos — ao contrário da mensagem genérica "An error occurred" que Next.js 14+ envia ao cliente)
- Erros no cliente com session replay (grava a tela do usuário antes do erro)
- Performance tracing (LCP, FCP, slow API routes)
- Source maps para stack traces legíveis (minified → código fonte original)

**Recomendação 10 — Alertas no Sentry (configurar no dashboard do Sentry):**

| Tipo de Alerta | Gatilho | Canal | Ação |
|---------------|---------|-------|------|
| New Issue | Primeira ocorrência de erro | Slack #dev-alerts | Investigar imediatamente |
| Spike | >10 eventos/min do mesmo issue | Slack + Email | Possível deploy problemático |
| Regression | Issue resolvido reaparece após deploy | Slack #dev-alerts | Rollback ou hotfix |
| Crash-free rate | <99.5% de sessões sem crash | Slack + Email | Rollback automático |

**Recomendação 11 — Structured Logging com Pino:**

Substituir `console.log` / `console.error` por logger estruturado:

```typescript
// src/lib/logger.ts
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  transport: isProduction
    ? undefined  // JSON output para log aggregators
    : { target: 'pino-pretty', options: { colorize: true } },
  base: { service: 'igreja-planalto' },
  redact: {
    paths: ['req.headers.authorization', 'password', 'token', 'secret'],
    censor: '[REDACTED]',
  },
});
```

**Benefício:** Logs estruturados (JSON) permitem busca por campo, correlação com request ID, e integração com agregadores de log como Axiom, Logtail, ou Datadog.

---

#### 3.7.5 Correções Imediatas no Dockerfile e CI

**Recomendação 12 — Corrigir Contradição README vs Configuração:**

O README descreve deploy como "Static Site" com publish directory `out`, mas o `next.config.js` usa `output: 'standalone'` (servidor Node.js). Atualizar o README para refletir a estratégia real: Web Service com Docker.

**Recomendação 13 — Remover script sync-env.sh hardcoded:**

O script `scripts/sync-env.sh` tem um service ID do Render hardcoded (`srv-d9hba8faqgkc73a1bcp0`) que quebrará se o serviço for recriado. Substituir por:
- Uso do Render Deploy Hook (que já carrega as env vars do serviço configuradas no dashboard)
- Ou migrar para `render.yaml` (Infrastructure as Code) com todas as env vars declaradas

---

#### 3.7.6 Resumo de Prioridades

| Prioridade | Ação | Esforço | Impacto | Ferramenta/Dependência |
|------------|------|---------|---------|----------------------|
| 🔴 Crítica | Corrigir Dockerfile (`--only=production`) | 30min | Build quebrado → produção indisponível | Dockerfile edit |
| 🔴 Crítica | Adicionar health check endpoint | 30min | Render detecta instâncias saudáveis | `app/api/health/route.ts` |
| 🟠 Alta | Workflow CI/CD completo com deploy | 2h | Deploy automático na main | GitHub Actions + Render Hook |
| 🟠 Alta | Sentry error tracking | 1h | Erros visíveis em produção | `@sentry/nextjs` |
| 🟡 Média | Preview/staging environment | 2h | Validação pré-produção | Serviço Render separado |
| 🟡 Média | Cache .next/cache no CI | 30min | Build reduzido de 4min para 90s | `actions/cache@v4` |
| 🟡 Média | Branch protection rules | 15min | Pipeline impositiva, não consultiva | GitHub Settings |
| 🟢 Baixa | Rollback automation | 2h | Recuperação rápida de incidentes | Render API + script |
| 🟢 Baixa | Structured logging (Pino) | 2h | Logs pesquisáveis em produção | `pino` + `pino-pretty` |
| 🟢 Baixa | Atualizar README | 30min | Documentação correta | README.md edit |
| 🟢 Baixa | Corrigir sync-env.sh | 30min | Config management sem hardcoded IDs | script edit ou render.yaml |

### 3.8 Recomendações de Banco de Dados
*(Agente 23/15 - Pesquisa de Banco de Dados)*

#### 3.8.1 Índices Compostos e Otimização de Consultas

**Contexto:** O schema atual possui 9 índices isolados em colunas individuais (`idx_campaigns_church_id`, `idx_campaigns_slug`, `idx_responses_campaign_id`, etc.). Não há nenhum índice composto. Consultas que filtram por múltiplas colunas — comuns em dashboards e relatórios — realizam bitmap scans combinando múltiplos índices, ou pior, sequential scans em tabelas com crescimento projetado.

**Fontes:**
- **Supabase Postgres Best Practices (v1.1.1, Jan 2026) — Regra "Composite Indexes"**: "When queries filter on multiple columns, a composite index is more efficient than separate single-column indexes. Column order matters — place equality columns first, range columns last. 5-10x faster multi-column queries." ([github.com/supabase/agent-skills](https://github.com/supabase/agent-skills/blob/main/skills/supabase-postgres-best-practices/references/query-composite-indexes.md))
- **PostgreSQL Official Docs (2026)**: "A multicolumn B-tree index can be used with query conditions that involve any subset of the index's leftmost columns." ([postgresql.org/docs/current/indexes-multicolumn](https://www.postgresql.org/docs/current/indexes-multicolumn.html))
- **Poojan Ghetiya (Jun 2026)**: "Composite indexes often provide significantly better results when they match actual query patterns because they allow Postgres to perform a single index scan to satisfy multiple filters." ([poojan.technokari.com/blog/scaling-postgres-in-production](https://poojan.technokari.com/blog/scaling-postgres-in-production))
- **Frontend Horizon (Jul 2026)**: "Index what your queries actually read. Every column used in RLS policies needs an index — RLS runs on every request." ([frontendhorizon.com/blog/supabase-performance](https://www.frontendhorizon.com/blog/supabase-performance-indexing-connection-pooling-and-the-postgres-settings-that-matter))
- **Supabase Docs — Query Optimization**: "If filtering or joining on multiple columns, a composite index prevents Postgres from referring to multiple indexes when identifying the relevant rows." ([supabase.com/docs/guides/database/query-optimization](https://supabase.com/docs/guides/database/query-optimization))

**Recomendação 1 — Substituir índices isolados por compostos nas tabelas críticas:**

```sql
-- Substituir índices existentes por compostos
DROP INDEX IF EXISTS idx_campaigns_church_id;
DROP INDEX IF EXISTS idx_campaigns_slug;
DROP INDEX IF EXISTS idx_campaigns_is_active;
CREATE INDEX idx_campaigns_church_slug_active ON public.campaigns(church_id, slug, is_active);
CREATE INDEX idx_campaigns_church_created ON public.campaigns(church_id, created_at DESC);

DROP INDEX IF EXISTS idx_responses_campaign_id;
DROP INDEX IF EXISTS idx_responses_created_at;
CREATE INDEX idx_responses_campaign_created ON public.responses(campaign_id, created_at DESC);

DROP INDEX IF EXISTS idx_campaign_views_campaign_id;
DROP INDEX IF EXISTS idx_campaign_views_created_at;
CREATE INDEX idx_campaign_views_campaign_created ON public.campaign_views(campaign_id, created_at DESC);

CREATE INDEX idx_campaign_fields_campaign_order ON public.campaign_fields(campaign_id, field_order);

CREATE INDEX idx_profiles_church_role ON public.profiles(church_id, role);
```

Impacto: Elimina sequential scans nas consultas de dashboard, relatórios e listagens. Redução esperada de 5-10x no tempo de consultas multi-coluna.

**Recomendação 2 — Índices parciais para filtros de alta cardinalidade:**

```sql
-- Índice parcial para campanhas públicas ativas (consulta mais frequente)
CREATE INDEX idx_campaigns_public_active ON public.campaigns(church_id, slug)
WHERE is_public = true AND is_active = true;
```

O índice parcial é menor e mais rápido que um índice completo, pois só indexa as linhas que correspondem à condição `WHERE` mais frequente.

**Recomendação 3 — Usar `index_advisor` do Supabase para detectar índices faltantes:**

O Supabase oferece a extensão `index_advisor` que analisa consultas reais e recomenda índices. Deve ser executada no SQL Editor após identificar queries lentas via `pg_stat_statements`:

```sql
SELECT * FROM index_advisor('SELECT * FROM responses WHERE campaign_id = $1 ORDER BY created_at DESC LIMIT 20');
```

**Recomendação 4 — Índice GIN para consultas em JSONB:**

A tabela `responses` armazena dados em JSONB (`data`), e a tabela `campaigns` usa JSONB em `settings`. Consultas que filtram por campos internos do JSON (ex: `settings->>'show_visitor_count'`) se beneficiam de índice GIN:

```sql
CREATE INDEX idx_responses_data_gin ON public.responses USING gin(data jsonb_path_ops);
CREATE INDEX idx_campaigns_settings_gin ON public.campaigns USING gin(settings jsonb_path_ops);
```

Referência: [Supabase Docs — GIN Indexes](https://supabase.com/docs/guides/database/query-optimization)

---

#### 3.8.2 Row Level Security (RLS): Corrigir Vulnerabilidades e Otimizar Performance

**Contexto:** O schema atual possui RLS habilitado em todas as tabelas, mas algumas políticas têm falhas de segurança que podem expor dados. Especificamente: (a) políticas sem a cláusula `TO authenticated` permitem acesso anônimo não intencional; (b) políticas de `UPDATE` sem `WITH CHECK` permitem escalação de privilégio; (c) subconsultas repetidas dentro de políticas causam degradação de performance.

**Fontes:**
- **VibeArmor (Abr 2026)**: "`USING(true)` without `TO authenticated` is the single most dangerous RLS mistake — it grants access to all roles including `anon`. Every UPDATE policy must have `WITH CHECK` to prevent privilege escalation." ([vibearmor.ai/blog/supabase-security-best-practices-2026](https://vibearmor.ai/blog/supabase-security-best-practices-2026))
- **Bastion Security (Fev 2026)**: "Use `(select auth.uid())` instead of `auth.uid()` in RLS policies for better query optimization. Index columns used in RLS policies to avoid 100x+ performance degradation on large tables." ([bastion.tech/blog/supabase-security-best-practices](https://bastion.tech/blog/supabase-security-best-practices))
- **MakerKit (Jan 2026)**: "RLS is the database-level enforcement that works regardless of client. Think of RLS as your security floor, not your only defense. Focus on indexing columns used in policies and wrapping function calls in SELECT for best results." ([makerkit.dev/blog/tutorials/supabase-rls-best-practices](https://makerkit.dev/blog/tutorials/supabase-rls-best-practices))
- **Supabase Official Docs (2026)**: "Without RLS, your database is essentially public. Test RLS policies with different user contexts before deploying." ([supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security))
- **Llmbestpractices (Jun 2026)**: "RLS is the security boundary. Client-side filters are convenience, not protection; a caller can edit the request and read or write any row that no policy blocks." ([llmbestpractices.com/backend/supabase-rls](https://llmbestpractices.com/backend/supabase-rls))

**Recomendação 5 — Adicionar `TO authenticated` em todas as políticas que devem ser restritas a usuários logados:**

No schema atual, as políticas `campaigns_select_public` e `campaign_fields_select_public` usam `USING (... OR is_public = true)`, o que permite que usuários anônimos leiam campanhas públicas — este é o comportamento desejado. Porém, as políticas de `INSERT`/`UPDATE`/`DELETE` não especificam `TO authenticated`, o que significa que se um anônimo tiver acesso a essas operações (via trigger ou função), a política se aplica a todos. Correção:

```sql
-- Recreate todas as políticas admin com TO authenticated
CREATE POLICY "campaigns_insert_admin" ON public.campaigns
    FOR INSERT TO authenticated WITH CHECK (...);

CREATE POLICY "campaigns_update_admin" ON public.campaigns
    FOR UPDATE TO authenticated USING (...) WITH CHECK (...);

CREATE POLICY "campaigns_delete_admin" ON public.campaigns
    FOR DELETE TO authenticated USING (...);
```

**Recomendação 6 — Adicionar `WITH CHECK` em todas as políticas de `UPDATE`:**

A política `churches_update_admin` e `profiles_update_own` atualmente não possuem `WITH CHECK`, permitindo que um usuário altere campos que não deveria (ex: mudar `role` para `super_admin`):

```sql
CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid()
        AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );
```

**Recomendação 7 — Substituir subconsultas aninhadas por funções `SECURITY DEFINER` para performance:**

> **Importante:** Antes de criar funções no schema `private`, é necessário garantir que o schema existe. Conforme identificado na Seção 1.11.4, o schema `private` NÃO é criado explicitamente no schema.sql atual (`CREATE SCHEMA IF NOT EXISTS private;` está ausente). A função `private.is_admin()` e as novas funções auxiliares falharão se o schema não existir. A Tarefa 1.10 aborda esta correção.

As políticas atuais usam subconsultas profundamente aninhadas (ex: `campaign_id IN (SELECT id FROM public.campaigns WHERE church_id IN (SELECT church_id FROM public.profiles WHERE id = auth.uid()))`). Isso é executado para **cada linha** retornada. Criar funções auxiliares `STABLE SECURITY DEFINER`:

```sql
CREATE OR REPLACE FUNCTION private.get_user_church_ids()
RETURNS TABLE(church_id UUID)
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
    SELECT church_id FROM public.profiles WHERE id = auth.uid()
$$;

-- Política simplificada:
CREATE POLICY "responses_select_admin" ON public.responses
    FOR SELECT TO authenticated
    USING (
        campaign_id IN (
            SELECT id FROM public.campaigns
            WHERE church_id IN (SELECT private.get_user_church_ids())
        )
    );
```

Impacto: Reduz o custo de avaliação de RLS em tabelas com muitas linhas, potencialmente eliminando Sequential Scans induzidos por RLS em tabelas de respostas e visualizações.

---

#### 3.8.3 Migrações e Versionamento de Schema

**Contexto:** Atualmente o schema é definido em um único arquivo `supabase/schema.sql` (350 linhas) sem versionamento. Não há uso do Supabase CLI para migrações. Alterações no schema são feitas manualmente via SQL Editor, sem rastreamento.

**Fontes:**
- **Supabase Docs (2026) — Database Migrations**: "Database migrations are SQL statements that create, update, or delete your existing database schemas. They are a common way of tracking changes to your database over time." ([supabase.com/docs/guides/deployment/database-migrations](https://supabase.com/docs/guides/deployment/database-migrations))
- **TechLead (Jun 2026)**: "Schema as code. Use the Supabase CLI to capture every change as a versioned migration file checked into git. Your database schema lives in the repo, reviewed in PRs like any other code. Generate TypeScript types from the live schema so a schema change that breaks a query becomes a compile error." ([frontendtechlead.com/blog/supabase-production-architecture-2026](https://www.frontendtechlead.com/blog/supabase-production-architecture-2026))
- **BeforeMerge (Jun 2026)**: "Use unique timestamps (`YYYYMMDDHHMMSS_description.sql`). Never modify existing migrations — create new ones instead. Use `ON CONFLICT DO NOTHING` for seed data. Always enable RLS on every table." ([beforemerge.com/knowledge/9da4d437-database-migration-best-practices](https://www.beforemerge.com/knowledge/9da4d437-database-migration-best-practices))
- **Supabase CLI DeepWiki (2025)**: "Use descriptive names, keep migrations focused, test migrations locally before pushing to production, use squash for cleanup, always commit migration files to version control." ([deepwiki.com/supabase/cli/4.2-migration-management](https://deepwiki.com/supabase/cli/4.2-migration-management))

**Recomendação 8 — Inicializar o Supabase CLI e converter schema.sql em migrações versionadas:**

```bash
# Inicializar CLI
supabase init

# Criar primeira migração a partir do schema atual
supabase db diff --use-migra -f initial_schema

# Criar migrações incrementais para cada mudança futura
supabase migration new add_audit_logs_table
```

**Recomendação 9 — Adotar workflow de migrações com CI/CD:**

- **Local**: `supabase start` → ambiente PostgreSQL local completo
- **Desenvolvimento**: `supabase migration new <name>` → escreve SQL → `supabase db push`
- **Produção**: Migrações aplicadas via CI/CD (GitHub Actions) com `supabase db push --dry-run` primeiro
- **Tipos**: `supabase gen types typescript --local > src/types/database.ts` para manter tipos sincronizados

**Recomendação 10 — Estrutura de migração padronizada:**

Cada migração deve seguir o template:

```sql
-- Description: O que esta migração faz
-- Rollback: DROP TABLE IF EXISTS ... / DROP INDEX IF EXISTS ...

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ...
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);
```

---

#### 3.8.4 Estratégias de Backup e Point-in-Time Recovery (PITR)

**Contexto:** O projeto está hospedado no Render.com com Supabase como banco de dados. O plano atual do Supabase não foi identificado, mas considerando que é um projeto em produção, o plano Pro (US$25/mês) inclui backups diários automáticos, e PITR está disponível como add-on (US$100/mês adicional, requer pelo menos compute add-on Small).

**Fontes:**
- **Supabase Docs — Database Backups (2026)**: "Pro, Team and Enterprise Plan projects can enable PITR as an add-on. PITR allows you to back up a project at shorter intervals, giving you the option to restore to any chosen point with up to seconds of granularity." ([supabase.com/docs/guides/platform/backups](https://supabase.com/docs/guides/platform/backups))
- **SimpleBackups (2026)**: "Free tier has no daily backups at all. Every paid project gets one backup per day. A backup you haven't tested isn't a backup." ([simplebackups.com/learn/supabase-backup](https://simplebackups.com/learn/supabase-backup))
- **RapidDev (Mar 2026)**: "Point-in-time recovery lets you restore to any second within the retention window (7 days on Pro, 30 days on Enterprise)." ([rapidevelopers.com/supabase-tutorial/how-to-restore-supabase-backup](https://www.rapidevelopers.com/supabase-tutorial/how-to-restore-supabase-backup))
- **Suparbase (Mai 2026)**: "Supabase Pro: 7-day PITR included. Daily logical backups for 7 days." ([suparbase.com/blog/database-backups-2026](https://www.suparbase.com/blog/database-backups-2026))

**Recomendação 11 — Ativar PITR no projeto Supabase (prioridade crítica se o projeto estiver em produção):**

No Dashboard do Supabase → Project Settings → Database → Backups → Enable Point-in-Time Recovery. Custo adicional estimado de ~US$100/mês + compute Small.

**Recomendação 12 — Backup lógico automatizado complementar via cron (workaround para planos inferiores):**

Se o orçamento não permitir PITR, implementar backup lógico com `pg_dump` via GitHub Actions ou Render Cron Job:

```bash
# Script de backup (ex: scripts/db-backup.sh)
pg_dump --host=$SUPABASE_DB_HOST --port=5432 \
  --username=$SUPABASE_DB_USER --dbname=$SUPABASE_DB_NAME \
  --format=custom --file=/tmp/backup_$(date +%Y%m%d_%H%M%S).dump

# Upload para armazenamento externo (S3, R2, etc.)
aws s3 cp /tmp/backup_*.dump s3://igreja-planalto-backups/
```

Render Cron Job diário com retention de 7 dias: via `render_create_cron_job` com schedule `0 3 * * *`.

**Recomendação 13 — Testar restore mensalmente:**

Um backup não testado não é um backup. Estabelecer um procedimento mensal de restore em ambiente de staging para verificar integridade:

```bash
pg_restore --dbname=postgresql://.../staging_db \
  --format=custom --verbose /caminho/do/backup.dump
```

**Recomendação 14 — Documentar RPO e RTO:**

| Métrica | Sem PITR | Com PITR |
|---|---|---|
| RPO (perda máxima) | Até 24h | Segundos |
| RTO (tempo de restore) | 15-60 min (depende do tamanho) | 5-30 min |

---

#### 3.8.5 Performance Geral do PostgreSQL

**Contexto:** O schema atual não configura parâmetros de performance do PostgreSQL. O Supabase Cloud gerencia isso, mas algumas otimizações são responsabilidade do desenvolvedor: `ANALYZE` periódico, `VACUUM`, conexões com pooler, e configuração de `statement_timeout`.

**Fontes:**
- **Supabase Docs — Performance Tuning (2026)**: "pg_stat_statements is enabled by default and records query execution performance details. It's the best way to find inefficient queries." ([supabase.com/docs/guides/platform/performance](https://supabase.com/docs/guides/platform/performance))
- **DEV Community — PostgreSQL Performance Tuning Checklist (Mar 2026)**: Use `pg_stat_statements` para identificar queries lentas. Configure `shared_buffers` (25% da RAM). Use connection pooler em modo `transaction`. Monitore `seq_scan_pct` para detectar índices faltantes. ([dev.to/_d7eb1c1703182e3ce1782/postgresql-performance-tuning-checklist-2026](https://dev.to/_d7eb1c1703182e3ce1782/postgresql-performance-tuning-checklist-2026-complete-guide-65a))
- **Supascale (Fev 2026)**: "Use EXPLAIN ANALYZE via Supabase JS client: `supabase.from('orders').select('*').explain({ analyze: true })`. Look for sequential scans on large tables." ([supascale.app/blog/postgresql-performance-tuning-for-selfhosted-supabase](https://www.supascale.app/blog/postgresql-performance-tuning-for-selfhosted-supabase))

**Recomendação 15 — Consultar `pg_stat_statements` semanalmente para detectar queries lentas:**

```sql
SELECT query, calls, total_exec_time, mean_exec_time, rows
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;
```

**Recomendação 16 — Configurar `statement_timeout` no Supabase para evitar queries runaway:**

No Dashboard → Project Settings → Database → Statement Timeout. Valor recomendado: `30000` (30 segundos).

**Recomendação 17 — Usar connection pooler do Supabase em modo transaction:**

O Supabase oferece pooler integrado (PgBouncer). Para aplicações serverless (Next.js no Render/Vercel), usar a URL do pooler em modo `transaction`:
- Porta `6543` para modo transaction (recomendado para serverless)
- Porta `5432` para modo session (apenas para conexões longas/migrações)

O pooler permite que centenas de conexões serverless compartilhem um pool pequeno de conexões PostgreSQL, evitando o erro "too many connections".

**Recomendação 18 — Rodar `ANALYZE` periódico nas tabelas principais:**

O PostgreSQL usa estatísticas para o planner. Após grandes inserções (campanhas com muitas respostas), rodar:

```sql
ANALYZE public.responses;
ANALYZE public.campaigns;
ANALYZE public.campaign_views;
```

---

### 3.9 Recomendações de Dependências
*(Agente 24/15 - Pesquisa de Dependências)*

#### 1. Análise de Dependências Desatualizadas

**Estado atual:** Sem `package-lock.json` versionado, `node_modules` vazio, versões com range `^` permitindo deriva silenciosa.

**Ferramentas de varredura recomendadas:**
- `npx npm-check-updates` (ncu) — separa descoberta de instalação; `--target minor` limita a non-breaking; `--peer` evita conflitos
- `npx package-outdated-why` — combina libyear metrics + segurança + breaking changes em visão priorizada
- `npm outdated --long` — visão Current/Wanted/Latest por pacote

**Pacotes que exigem atualização imediata:**
| Pacote | Versão (range) | Problema | Ação |
|--------|---------------|----------|------|
| `eslint` | `^8.57.0` | ESLint 9 com flat config; versão 8 EOL | `npm install eslint@^9.10.0` |
| `typescript` | `^5.4.0` | 5.6+ com melhorias de performance | `npm install typescript@^5.6.0` |
| `@supabase/ssr` | `^0.5.0` | `^0.6.x` disponível com correções SSR | `npm install @supabase/ssr@^0.6.0` |
| `tailwindcss` | `^3.4.0` | Tailwind v4 com engine JIT reescrita | Avaliar migração para v4 |

**Política sugerida:** Patch updates semanais automáticas, minor revisões mensais, major deliberadas (uma por vez, com changelog).

---

#### 2. Alternativas Modernas para Dependências Pesadas

**recharts (~150KB gzipped, 10+ deps transitivas)**

Substituir por **ChartKit** (`chartkit`) — ~15KB gzipped, zero dependências runtime:
```bash
npm uninstall recharts && npm install chartkit
```
ChartKit oferece LineChart, BarChart, DonutChart, StackedArea, ScatterChart, ComboChart — cobre todos os gráficos usados no dashboard. Alternativa adicional: **SwiftChart** (~26KB, zero deps, 25 tipos de gráfico, renderização Canvas 2D).

**jspdf (~290KB gzipped, 2+ deps)**

Substituir por **podpdf** (~9KB, zero dependências, 5.5x mais rápido):
```bash
npm uninstall jspdf && npm install podpdf
```
Para browser: `import { PDFDocument, Text, Line } from 'podpdf/browser'`. Alternativa: **pdfnative** (zero deps, React reconciler nativo, suporte a PDF/A, assinaturas digitais).

**qrcode (~70KB, 3 deps: pngjs, dijkstrajs, yargs)**

Substituir por **@ttsalpha/qrcode** — zero dependências runtime, pure SVG, SSR-safe, 3.5x cold start mais rápido que `qrcode.react`:
```bash
npm uninstall qrcode @types/qrcode && npm install @ttsalpha/qrcode
```
Alternativa: **@qr-kit/react** (~0.95KB gzipped + 21.9KB core engine, zero-dependency, suporte a gradientes/logos/cores customizadas). Ou **@verevoir/qrcode** (drop-in replacement da API `node-qrcode`, zero deps, 10 estilos visuais).

**Impacto estimado:** Redução de ~500KB no bundle bruto (recharts 150 + jspdf 290 + qrcode 70 → ~25KB total com alternativas).

---

#### 3. Segurança de Supply Chain

**Contexto:** O ecossistema npm sofreu ataques de supply chain em escala industrial (Shai-Hulud 2025, Axios 2026, TanStack 2026). O projeto está exposto por não ter lockfile nem npm audit em CI.

**Ações obrigatórias (por ordem de prioridade):**

1. **Versionar `package-lock.json`** — commit imediato do lockfile gerado por `npm install`. Sem lockfile, não há garantia de integridade do dependency tree.

2. **`npm audit` em CI** — adicionar ao `deploy.yml`:
   ```yaml
   - run: npm audit --audit-level=high
   ```
   Isso falha o build em vulnerabilidades high/critical conhecidas.

3. **Configurar Dependabot** — criar `.github/dependabot.yml`:
   ```yaml
   version: 2
   updates:
     - package-ecosystem: npm
       directory: /
       schedule:
         interval: weekly
       open-pull-requests-limit: 5
       groups:
         dev-deps:
           dependency-type: development
           update-types: [patch, minor]
         prod-patch:
           dependency-type: production
           update-types: [patch]
       cooldown:
         default-days: 7
     - package-ecosystem: docker
       directory: /
       schedule:
         interval: weekly
     - package-ecosystem: github-actions
       directory: /
       schedule:
         interval: monthly
   ```

4. **`ignore-scripts=true` no `.npmrc`** — desabilita lifecycle scripts (preinstall/postinstall) que são o vetor principal de ataques. Permitir apenas pacotes específicos que realmente precisam (ex: `sharp`).

5. **`npm sbom`** — gerar SBOM nos builds para auditoria futura.

**Proteções complementares (médio prazo):**
- Registry proxy com cooldown de 24-72h (Verdaccio, Artifactory)
- Egress filtering nos runners CI (bloquear exfiltração de credenciais)
- `npq` ou Socket Firewall para auditoria pré-instalação
- SLSA provenance verification para pacotes críticos

---

#### 4. Bundle Analysis e Redução de Payload

**Ferramenta:** `@next/bundle-analyzer`
```bash
npm install -D @next/bundle-analyzer
```
Adicionar ao `next.config.js`:
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);
```
Executar: `ANALYZE=true npm run build`

**Maiores oportunidades de redução no bundle atual:**

| Item | Tamanho estimado | Ação |
|------|-----------------|------|
| `recharts` | ~150KB | Substituir por ChartKit (~15KB) |
| `jspdf` | ~290KB | Substituir por podpdf (~9KB) |
| `qrcode` | ~70KB | Substituir por @ttsalpha/qrcode (~15KB) |
| `lucide-react` (46 ícones) | ~112KB (barrel) | Usar `modularizeImports` no next.config.js |
| Todas páginas Client Components | ~200-400KB extra | Converter landing page e rotas públicas para Server Components |
| Dashboard stats (11 queries) | ~50KB (payload JSON) | Consolidar em 1 RPC customizada |

**Configuração `modularizeImports` para lucide-react:**
```js
// next.config.js
modularizeImports: {
  'lucide-react': {
    transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
  },
},
```

**Dynamic imports para dependências pesadas** (já parcialmente feito em QRCodeGenerator.tsx):
- Manter `import('recharts')` dinâmico no dashboard (apenas quando gráfico for visível)
- Manter `import('jspdf')` e `import('qrcode')` dinâmicos (já implementado)
- Adicionar `next/dynamic` para `CampaignForm` (só carregar ao clicar em campanha)

**Resultado esperado:** Bundle de produção reduzido de ~800KB-1MB para ~300-400KB (-55%).

---

#### 5. Manutenção de Dependências (Renovate vs Dependabot)

**Recomendação:** **Dependabot** para este projeto (GitHub-native, zero-config, sem custo adicional no GitHub Actions).

**Por que Dependabot:**
- Projeto single-repo, GitHub-only, equipe pequena
- Configuração trivial (YAML de 20 linhas, ver seção 3 acima)
- Security updates automáticos sem config (ativados por padrão)
- `cooldown` e `groups` cobrem 80% das necessidades

**Configuração adicional recomendada (`.github/dependabot.yml`):**
```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: sunday
      time: "06:00"
      timezone: America/Sao_Paulo
    open-pull-requests-limit: 5
    rebase-strategy: disabled
    groups:
      dev-tooling:
        patterns: ["eslint*", "prettier*", "@types/*", "typescript"]
        update-types: [minor, patch]
      react-ecosystem:
        patterns: ["next", "react*", "eslint-config-next"]
        update-types: [minor, patch]
      supabase:
        patterns: ["@supabase/*"]
        update-types: [minor, patch]
    ignore:
      - dependency-name: "next"
        update-types: [version-update:semver-major]
      - dependency-name: "react*"
        update-types: [version-update:semver-major]
```

**Quando considerar Renovate:**
- Se o número de repositórios crescer para 10+
- Se precisar de Dependency Dashboard unificado
- Se quiser schedules mais granulares (ex: "apenas fins de semana")
- Se adotar monorepo com múltiplos workspaces

**Não executar ambos simultaneamente** — causa PRs duplicados e conflitos de lockfile.

---

#### Resumo de Ações Prioritárias

| Prioridade | Ação | Esforço | Impacto |
|-----------|------|---------|---------|
 | 1 | Versionar `package-lock.json` e configurar `npm ci` em CI | 15min | Crítico (integridade) |
| 2 | Configurar Dependabot + `npm audit --audit-level=high` em CI | 30min | Crítico (segurança) |
| 3 | Substituir recharts por ChartKit | 2h | Alto (-135KB bundle) |
| 4 | Substituir jspdf por podpdf | 1h | Alto (-280KB bundle) |
| 5 | Substituir qrcode por @ttsalpha/qrcode | 30min | Alto (-55KB bundle, zero deps) |
| 6 | Configurar `modularizeImports` para lucide-react | 15min | Alto (-100KB bundle) |
| 7 | Instalar `@next/bundle-analyzer` e auditar bundles | 1h | Médio (baseline) |
| 8 | `ignore-scripts=true` no `.npmrc` | 5min | Alto (prevenção supply chain) |
| 9 | Adicionar `cooldown` ao Dependabot (7 dias) | 5min | Médio (proteção contra zero-day) |
| 10 | Converter Client Components para Server Components | 4h | Alto (performance inicial) |

### 3.10 Recomendações de Acessibilidade
*(Agente 25/15 - Pesquisa de Acessibilidade)*

**Base de pesquisa:** WCAG 2.2 (W3C Out/2023), WAI-ARIA Authoring Practices 1.2, Tomoda Hinata (Jun/2026), Modern Framework Accessibility / MFA11y (Jul/2026), RatedWithAI (Jun/2026), AccessivePath (Mai/2026), AccessProof (2026), Dev.to Safdar Ali (Jul/2026), Wolf-Tech Eng. Audit (Mai/2026), OneUptime (Jan/2026), AllAccessible (Dez/2025).

---

#### 3.10.1 Estado Atual de Acessibilidade no Projeto

O projeto já possui uma base sólida de acessibilidade:
- `aria-label` em botões de ícone e `aria-invalid`/`aria-describedby` em campos de formulário
- `role="dialog"`, `role="alert"`, `role="switch"` em modais e toggles
- `focus:outline-none focus:ring-2 focus:ring-offset-2` em elementos interativos
- Labels associados via `htmlFor` em todos os inputs

**Problemas identificados que precisam de correção:**

1. **Sem `prefers-reduced-motion`** — as animações `fade-in-up` e `pulse-skeleton` não respeitam preferências de movimento reduzido
2. **Contraste de cores no limite** — `primary-50 (#FFF8F0)` com `text-gray-600 (#4B5563)` tem ~5.5:1, no limite do WCAG AA
3. **Sem dark mode ou alto contraste** — sem suporte a `prefers-color-scheme` ou `prefers-contrast`
4. **Fonte Inter não carregada via `next/font`** — FOUTC/CLS e sem subsetting
5. **Sem skip link** — usuários de teclado não têm atalho para pular navegação
6. **Sem anúncio de rota** — App Router navega sem anunciar mudança para leitores de tela
7. **Modais sem focus trap completo** — `Modal.tsx` não tem focus trap, retorno de foco ao fechar
8. **Sem preferências de acessibilidade persistentes** — sem Context para temas, fonte, movimento reduzido
9. **100% Client Components** — o gap de hidratação atrasa a operabilidade por teclado

---

#### 3.10.2 HTML Semântico: A Alavanca Mais Poderosa

**Fonte:** Tomoda Hinata 2026 — "80% da a11y é resolvida usando o elemento HTML correto" ([tomodahinata.com](https://tomodahinata.com/en/blog/react-nextjs-web-accessibility-wcag22-guide)); MFA11y — "O elemento nativo `<button>` fornece foco, teclado e role gratuitamente" ([modern-framework-accessibility.com](https://www.modern-framework-accessibility.com/react-nextjs-accessibility-patterns))

**Recomendação 1 — Substituir `<div>` por elementos semânticos:**
O projeto usa `<div onClick>` e `<span>` em vez de `<button>` e `<a>` em alguns lugares. Verificar todos os `onClick` em elementos não interativos.

```tsx
// ❌ Ruim: <div> perde foco, teclado e semântica
<div onClick={handleClick} className="btn">Enviar</div>

// ✅ Bom: <button> fornece foco, Enter/Space, role="button" nativos
<button type="button" onClick={handleClick}>Enviar</button>
```

**Recomendação 2 — Landmarks semânticos no layout raiz:**
O `<body>` atual contém apenas `{children}`. Adicionar `header`, `nav`, `main`, `footer` com roles implícitos.

**Recomendação 3 — Hierarquia de headings consistente:**
Uma única tag `<h1>` por página, sem pular níveis (`h1 → h3`). Revisar `dashboard/page.tsx` e `settings/page.tsx` que têm headings soltos.

---

#### 3.10.3 Foco Visível e Navegação por Teclado

**Fonte:** Tomoda Hinata 2026; WCAG 2.2 SC 2.4.11 Focus Not Obscured (AA); MFA11y Keyboard Navigation Guide

**Recomendação 4 — Substituir `:focus` por `:focus-visible`:**
O projeto usa `focus:ring-2` que aparece mesmo no clique do mouse. Padrão correto:

```css
/* globals.css */
:focus-visible {
  outline: 2px solid var(--color-primary-600, #C29560);
  outline-offset: 2px;
  border-radius: 4px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

**Recomendação 5 — Adicionar skip link no root layout:**
```tsx
// src/app/layout.tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4 focus:text-primary-600">
  Pular para o conteúdo principal
</a>
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

**Recomendação 6 — Garantir foco visível em modais (3:1 mínimo):**
O anel de foco atual `focus:ring-primary-500` (#D4A86A) sobre fundo `primary-50` (#FFF8F0) tem contraste de apenas ~2.8:1. Substituir por `ring-primary-700` (#A67D4D) ou usar `outline: 2px solid currentColor` com `outline-offset: 2px` para herdar contraste do texto.

---

#### 3.10.4 Focus Management em Modais e Rotas

**Fonte:** MFA11y Focus Management Strategies; Tomoda Hinata 4-3; OneUptime "Focus Trap for Modals" (Jan/2026); Wolf-Tech "route transitions discard focus" (Mai/2026)

**Recomendação 7 — Implementar anúncio de rota no App Router:**
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function RouteFocusManager() {
  const pathname = usePathname();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const announcer = document.getElementById('route-announcer');
    if (announcer) {
      announcer.textContent = `Navegou para ${document.title}`;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
```

**Recomendação 8 — Adicionar focus trap e retorno no `Modal.tsx`:**
```tsx
// hook: useFocusTrap (para reuso em todos os modais)
const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive: boolean) {
  const previousRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      previousRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        (containerRef.current?.querySelector(FOCUSABLE) as HTMLElement)?.focus();
      });
      const trap = (e: KeyboardEvent) => { /* Tab cycle logic */ };
      document.addEventListener('keydown', trap);
      return () => {
        document.removeEventListener('keydown', trap);
        previousRef.current?.focus();
      };
    }
  }, [isActive, containerRef]);
}
```

**Recomendação 9 — Usar `<dialog>` nativo onde possível:**
O elemento `<dialog>` com `showModal()` fornece focus trap, Escape e inert backdrop gratuitamente. Alternativa: Radix UI Dialog, que implementa WAI-ARIA APG corretamente.

---

#### 3.10.5 Formulários Acessíveis e Validação

**Fonte:** OneUptime "Accessible Forms with ARIA" (Jan/2026); MFA11y Form Handling; Tomoda Hinata §6; AccessProof WCAG 2.2 Patterns

**Recomendação 10 — Padrão de campo acessível (já parcialmente implementado, padronizar):**
O projeto já usa `aria-invalid` e `aria-describedby` em alguns lugares. Garantir que **todos** os campos sigam este padrão:

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
  required
/>
{errors.email && (
  <p id="email-error" role="alert">{errors.email}</p>
)}
```

**Recomendação 11 — Error summary com links para campos (padrão GOV.UK):**
Em vez de apenas `role="alert"` genérico, renderizar sumário de erros com links de âncora para cada campo inválido. Mover foco para o sumário no submit com erro.

**Recomendação 12 — Validação on blur, não on keyup:**
Validar a cada keystroke é hostil para leitores de tela. Usar validação on blur ou on submit. Manter `noValidate` no `<form>` para controle total.

**Recomendação 13 — `useId()` para IDs estáveis:**
Substituir IDs geradas manualmente (ex: `${field.id}-error`) por `useId()` do React 18+ para garantir unicidade e evitar colisões em SSR.

---

#### 3.10.6 ARIA Correto: "No ARIA is Better Than Bad ARIA"

**Fonte:** Tomoda Hinata §5; MDN ARIA Guides; MFA11y ARIA Roles

**Recomendação 14 — Corrigir alertas sem distinção visual:**
O componente `Alert` em `FormComponents.tsx` tem todas as 4 variantes com as mesmas classes (`bg-primary-50 border-primary-200 text-primary-800`). Cada variante deve ter classes distintas de cor para que a distinção visual não dependa apenas do texto.

```tsx
// Em vez de variantes idênticas, usar cores distintas:
const alertVariants = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  danger: 'bg-red-50 border-red-200 text-red-800',
};
```

**Recomendação 15 — Verificar ARIA duplicado ou incorreto:**
- `aria-modal="true"` já presente em `Modal.tsx` — manter
- `aria-checked` em toggles de settings — correto
- Garantir que `aria-controls` referencie IDs que realmente existem no DOM
- Remover `aria-hidden` em containers com elementos focáveis (se houver)

---

#### 3.10.7 Contraste de Cores e Temas Acessíveis

**Fonte:** WCAG 2.2 SC 1.4.3 (AA 4.5:1, AAA 7:1) e 1.4.11 (UI 3:1); RatedWithAI Color Guide (Jun/2026); AllAccessible; MFA11y Color Contrast

**Recomendação 16 — Auditar e corrigir contraste da paleta atual:**

| Par | Ratio | AA | AAA | Ação |
|-----|-------|----|-----|------|
| `primary-600` (#C29560) em `white` (#FFFFFF) | 3.1:1 | ❌ | ❌ | **Não usar para texto em fundo branco.** Bom apenas para large text (18px+) ou decorative |
| `primary-600` (#C29560) em `primary-50` (#FFF8F0) | 2.9:1 | ❌ | ❌ | Falha. Usar `primary-800` (#866540) para texto |
| `text-gray-600` (#4B5563) em `primary-50` (#FFF8F0) | 5.5:1 | ✅ | ❌ | Aceitável AA, abaixo de AAA |
| `text-gray-900` (#111827) em `white` | 16:1 | ✅ | ✅ | Ideal para body text |
| `text-white` em `primary-600` (#C29560) | 3.1:1 | ❌ | ❌ | Botões primários com texto branco falham contraste. Usar `primary-700` (#A67D4D) como bg ou `text-primary-800` como texto |

**Correções na paleta:**
1. Texto do botão primário: alterar bg de `primary-600` para `primary-700` (#A67D4D) quando com texto branco, OU usar texto `primary-900` (#6B4F32) em bg `primary-100` (#FDF2E3)
2. Texto body: usar `text-gray-800` (#1F2937) ou `text-gray-900` (#111827) em vez de `text-gray-600`
3. Badges, hints e textos secundários: manter `text-gray-500` (#6B7280) apenas para decorative, nunca para informação essencial

**Recomendação 17 — Adicionar suporte a `prefers-color-scheme` para dark mode:**
Usar variáveis CSS customizadas (já existem `--foreground-rgb`, `--background-start-rgb`) e alterná-las via media query. Adicionar toggle manual com persistência em localStorage:

```css
/* globals.css */
:root {
  --bg-primary: #FFF8F0;
  --text-primary: #1F2937;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #F3F4F6;
  }
}
```

Tailwind já suporta `dark:` classes. Adaptar componentes do dashboard.

**Recomendação 18 — Não usar cor como único indicador visual:**
Campos de erro usam apenas `text-primary-600` (dourado). Adicionar ícone de alerta e borda distinta. Badges de status (primary, success, warning, danger) já têm texto, mas verificar se todos usam ícones ou padrões além de cor.

---

#### 3.10.8 Movimento Reduzido (prefers-reduced-motion)

**Fonte:** Tomoda Hinata §7; MFA11y Reduced Motion; WCAG 2.2 SC 2.3.3 Animation from Interactions (AAA)

**Recomendação 19 — Respeitar `prefers-reduced-motion` em todas as animações:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Adicionar ao `globals.css`. Afeta `fade-in-up`, `pulse-skeleton`, `animate-spin` (Loader2), transições de sidebar.

---

#### 3.10.9 Novos Critérios WCAG 2.2 (AA)

**Fonte:** Tomoda Hinata §8; Wolf-Tech EAA Audit (Mai/2026)

| Critério | Nível | Impacto no Projeto |
|----------|-------|-------------------|
| 2.4.11 Focus Not Obscured | AA | Header/sidebar fixos não devem esconder elemento focalizado. Verificar dashboard |
| 2.5.7 Dragging Movements | AA | Operações de drag (reorder de campos) devem ter alternativa por botões up/down (já implementado) |
| 2.5.8 Target Size (Minimum) | AA | Alvos de clique ≥24×24px. Ícones pequenos em tabelas de ações podem falhar |
| 3.2.6 Consistent Help | A | Links de ajuda/contato devem estar na mesma posição em todas as páginas |
| 3.3.7 Redundant Entry | A | Não obrigar reentrada de dados já fornecidos (autocomplete, carry-over) |
| 3.3.8 Accessible Authentication (Minimum) | AA | Permitir colar senha (já OK). Não exigir CAPTCHA ou puzzles |

**Recomendação 20 — Auditar tamanho de alvo em tabelas do dashboard:**
Ícones de ação (Editar, QR Code, Duplicar, Excluir) nas linhas de campanhas devem ter no mínimo 24×24px com espaçamento adequado entre si. Adicionar `min-w-[24px] min-h-[24px]` aos botões de ícone.

---

#### 3.10.10 Testes Automatizados de Acessibilidade

**Fonte:** RatedWithAI Guide (Jun/2026); MFA11y Testing Automation; AccessProof; Tomoda Hinata §9; RRUC (Dez/2025)

**Recomendação 21 — Integrar `@axe-core/playwright` nos testes E2E:**
Os testes E2E com Playwright (já planejados na Seção 2) devem incluir verificações de acessibilidade:

```ts
// e2e/accessibility/a11y-dashboard.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Accessibility', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('dashboard não tem violações WCAG 2.2 AA', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
```

**Recomendação 22 — Adicionar `jest-axe`/`vitest-axe` nos testes de componente:**
```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('Button não tem violações de a11y', async () => {
  const { container } = render(<Button>Enviar</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Recomendação 23 — Ativar `eslint-plugin-jsx-a11y` (já planejado na Seção 2.1.2):**
O ESLint flat config já inclui `jsxA11yPlugin.configs.flat.recommended`. Assegurar que está ativo e que os warnings são tratados como erros no CI.

**Recomendação 24 — Lighthouse CI com orçamento de acessibilidade:**
Adicionar `lighthouse` ao CI com `accessibility: 90` como orçamento mínimo. Lighthouse usa axe-core internamente e detecta ~30% dos problemas — funciona como barreira rápida.

**Ordem de implementação recomendada (maior impacto primeiro):**

| # | Ação | Esforço | Impacto WCAG |
|---|------|---------|-------------|
| 1 | `prefers-reduced-motion` no globals.css | 5 min | SC 2.3.3 |
| 2 | `:focus-visible` em vez de `:focus` | 10 min | SC 2.4.7 |
| 3 | Skip link no root layout | 15 min | SC 2.4.1 |
| 4 | Focus trap + retorno em modais | 2h | SC 2.4.3 |
| 5 | Auditoria de contraste + correções | 3h | SC 1.4.3, 1.4.11 |
| 6 | Route announcer + focus restore | 1h | SC 4.1.3, 2.4.3 |
| 7 | Error summary com links | 2h | SC 3.3.1, 3.3.3 |
| 8 | `useId()` em campos | 1h | SC 4.1.1 |
| 9 | Dark mode com `prefers-color-scheme` | 4h | SC 1.4.1 |
| 10 | axe-playwright nos testes E2E | 3h | Prevenção de regressão |
| 11 | Target size ≥24×24px | 1h | SC 2.5.8 |
| 12 | Alert component com variantes distintas | 30 min | SC 1.4.1 |

### 3.11 Recomendações de SEO
*(Agente 26 - Relatório completo de SEO baseado em pesquisa web Jul/2026)*

> **Pesquisa realizada em Julho/2026:** Next.js Metadata API (docs.nextjs.org), Open Graph Protocol (ogp.me), JSON-LD Organization/LocalBusiness (Google Search Central), Core Web Vitals (web.dev), SEO local para igrejas (Google Business Profile, diretórios locais).

#### 3.11.1 Next.js Metadata API — Estado Atual e Recomendações

**Problema atual:** O root layout (`src/app/layout.tsx:386-391`) tem metadata mínima — apenas `title` estático. Não há `metadataBase`, `generateMetadata`, `robots.ts`, `sitemap.ts`, Open Graph, Twitter Cards, canonical tags, ou qualquer integração com a Metadata API do Next.js App Router. Nenhuma das 19 páginas do projeto exporta `metadata` ou `generateMetadata`. Isso faz com que cada página tenha o mesmo title e description, canibalizando palavras-chave e perdendo oportunidades de rankeamento individual.

**Fundamentação técnica (Next.js 14.2+, App Router):** O Next.js oferece duas formas de declarar metadata:
1. **`metadata` objeto estático** — Exportado de `layout.tsx` ou `page.tsx` (Server Components apenas). Suporta `title` (com `template` e `default`), `description`, `metadataBase`, `alternates`, `openGraph`, `twitter`, `robots`, `icons`, `manifest`, `verification`, `appleWebApp`, `appLinks`, `formatDetection`, `itunes`, `abstract`, `keywords`, `referrer`, `themeColor`, `colorScheme`, `creator`, `publisher`, `category`, `classification`.
2. **`generateMetadata` função assíncrona** — Para metadados dinâmicos baseados em `params` ou `searchParams`. O Next.js 14.2+ introduziu **streaming metadata**: para páginas renderizadas dinamicamente, a metadata é injetada separadamente no `<head>` assim que `generateMetadata` resolve, sem bloquear a renderização da UI. Para bots/crawlers (Twitterbot, Slackbot, Bingbot), o streaming é **desabilitado automaticamente** — a metadata completa é incluída no HTML inicial.
3. **Memoização de dados** — React `cache()` permite que `generateMetadata` e a página compartilhem o mesmo fetch sem duplicação.

**Recomendações detalhadas:**

1. **`metadataBase` no root layout (CRÍTICO):**
   ```ts
   // src/app/layout.tsx — substituir metadata atual
   export const metadata: Metadata = {
     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://igrejaplanalto.onrender.com'),
     title: {
       default: 'Igreja Campo do Planalto - Laranjal do Jari - AP',
       template: '%s | Igreja Campo do Planalto',
     },
     description: 'Participe das campanhas e eventos da Igreja Campo do Planalto — Assembleia de Deus em Laranjal do Jari, Amapá.',
     keywords: ['Igreja Campo do Planalto', 'Assembleia de Deus', 'Laranjal do Jari', 'igreja evangélica AP', 'campanhas igreja'],
     authors: [{ name: 'Igreja Campo do Planalto' }],
     creator: 'Igreja Campo do Planalto',
     publisher: 'Igreja Campo do Planalto',
     alternates: { canonical: '/' },
     robots: { index: true, follow: true },
     openGraph: {
       type: 'website',
       locale: 'pt_BR',
       siteName: 'Igreja Campo do Planalto',
       title: 'Igreja Campo do Planalto - Laranjal do Jari - AP',
       description: 'Participe das campanhas e eventos da Igreja Campo do Planalto — Assembleia de Deus em Laranjal do Jari, Amapá.',
       url: '/',
       images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
     },
     twitter: {
       card: 'summary_large_image',
       title: 'Igreja Campo do Planalto',
       description: 'Igreja Campo do Planalto - Assembleia de Deus em Laranjal do Jari - AP',
       images: ['/images/og-default.jpg'],
     },
   };
   ```

2. **`generateMetadata` na rota pública de campanhas (`/c/[churchSlug]/[campaignSlug]/page.tsx`):**
   ```ts
   // Substituir o Client Component atual por Server Component com generateMetadata
   import { cache } from 'react';
   import type { Metadata } from 'next';
   import { createClient } from '@/lib/supabase/server';

   const getCampaignData = cache(async (churchSlug: string, campaignSlug: string) => {
     const supabase = createClient();
     const { data: church } = await supabase.from('churches').select('id').eq('slug', churchSlug).single();
     if (!church) return null;
     const { data: campaign } = await supabase
       .from('campaigns').select('*')
       .eq('slug', campaignSlug).eq('church_id', church.id).eq('is_active', true).eq('is_public', true)
       .single();
     return campaign;
   });

   export async function generateMetadata({ params }: { params: Promise<{ churchSlug: string; campaignSlug: string }> }): Promise<Metadata> {
     const { churchSlug, campaignSlug } = await params;
     const campaign = await getCampaignData(churchSlug, campaignSlug);
     if (!campaign) return { title: 'Campanha não encontrada' };
     const description = campaign.description?.slice(0, 160) || `Participe da campanha ${campaign.title} - Igreja Campo do Planalto`;
     return {
       title: campaign.title,
       description,
       alternates: { canonical: `/c/${churchSlug}/${campaignSlug}` },
       openGraph: {
         title: campaign.title,
         description,
         type: 'article',
         publishedTime: campaign.created_at,
         modifiedTime: campaign.updated_at,
         images: campaign.banner_url
           ? [{ url: campaign.banner_url, width: 1200, height: 630, alt: campaign.title }]
           : [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
       },
       twitter: {
         card: 'summary_large_image',
         title: campaign.title,
         description,
         images: campaign.banner_url ? [campaign.banner_url] : ['/images/og-default.jpg'],
       },
     };
   }
   ```

3. **`src/app/robots.ts` (arquivo de configuração):**
   ```ts
   import type { MetadataRoute } from 'next';
   export default function robots(): MetadataRoute.Robots {
     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://igrejaplanalto.onrender.com';
     return {
       rules: [
         { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/auth/', '/api/'] },
         { userAgent: 'GPTBot', disallow: '/' },
         { userAgent: 'CCBot', disallow: '/' },
       ],
       sitemap: `${baseUrl}/sitemap.xml`,
     };
   }
   ```

4. **`src/app/sitemap.ts` (arquivo de configuração dinâmico):**
   ```ts
   import type { MetadataRoute } from 'next';
   import { createClient } from '@/lib/supabase/server';

   export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://igrejaplanalto.onrender.com';
     const supabase = createClient();
     const { data: campaigns } = await supabase
       .from('campaigns')
       .select('slug, churches!inner(slug), updated_at')
       .eq('is_active', true).eq('is_public', true);

     const campaignUrls = (campaigns || []).map((c: any) => ({
       url: `${baseUrl}/c/${c.churches.slug}/${c.slug}`,
       lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
       changeFrequency: 'weekly' as const,
       priority: 0.7,
     }));

     return [
       { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
       ...campaignUrls,
     ];
   }
   ```

5. **Adicionar `loading.tsx`, `error.tsx` e `not-found.tsx`** — Embora não sejam metadata diretamente, esses arquivos melhoram a experiência de crawl e a elegibilidade para rich results. Priorizar especialmente nas rotas públicas.

6. **`manifest.json` para PWA** — Adicionar `src/app/manifest.ts` com nome curto, ícones, tema, para permitir que o Google indexe o site como Progressive Web App.

**Resumo de arquivos a criar/modificar:**

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| `src/app/layout.tsx` | Modificar metadata export | 🔴 Crítica |
| `src/app/c/[churchSlug]/[campaignSlug]/page.tsx` | Converter p/ Server Component + generateMetadata | 🔴 Crítica |
| `src/app/robots.ts` | Criar | 🔴 Crítica |
| `src/app/sitemap.ts` | Criar | 🔴 Crítica |
| `src/app/manifest.ts` | Criar | 🟡 Média |
| `src/app/not-found.tsx` | Criar (páginas públicas) | 🟡 Média |
| `src/app/loading.tsx` | Criar (root + rotas públicas) | 🟢 Baixa |

---

#### 3.11.2 Open Graph e Twitter Cards

**Problema atual:** Zero tags Open Graph e Twitter Cards. Quando um link do site é compartilhado no WhatsApp, Facebook, Twitter/X, LinkedIn, Telegram ou Discord, aparece apenas a URL pura — sem título, descrição ou imagem. Isso reduz drasticamente o CTR em compartilhamentos sociais e orgânicos.

**Fundamentação técnica (Open Graph Protocol — ogp.me):**
- O OG protocol usa `<meta property="og:..." content="...">` para transformar qualquer página em um "objeto rico" no grafo social.
- **4 propriedades obrigatórias:** `og:title`, `og:type`, `og:image`, `og:url`.
- **Propriedades recomendadas:** `og:description`, `og:site_name`, `og:locale`, `og:audio`, `og:video`, `og:determiner`.
- **Propriedades estruturadas:** `og:image:width`, `og:image:height`, `og:image:alt`, `og:image:secure_url`, `og:video:type`, etc.
- **Array de valores:** Múltiplas tags com mesmo `property` criam um array (ex: múltiplas imagens).
- **Twitter Cards** usa `twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image` — tipos: `summary`, `summary_large_image`, `app`, `player`.

**Recomendações detalhadas (além do que já está na seção 3.11.1):**

1. **OG Image gerada dinamicamente com `@vercel/og`** — Em vez de apenas uma imagem estática, criar `opengraph-image.tsx` na raiz para gerar OG images programáticas com o nome da igreja, gradiente dourado e logo:
   ```tsx
   // src/app/opengraph-image.tsx
   import { ImageResponse } from 'next/og';
   export const alt = 'Igreja Campo do Planalto';
   export const size = { width: 1200, height: 630 };
   export const contentType = 'image/png';

   export default async function Image() {
     return new ImageResponse(
       (
         <div style={{ width: 1200, height: 630, background: 'linear-gradient(135deg, #C29560 0%, #4A3728 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter' }}>
           <div style={{ fontSize: 64, color: '#FFF8F0', fontWeight: 700, marginBottom: 16 }}>Igreja Campo do Planalto</div>
           <div style={{ fontSize: 28, color: '#F5EDE0' }}>Assembleia de Deus — Laranjal do Jari, AP</div>
         </div>
       ),
       { ...size }
     );
   }
   ```
   Isso garante OG images únicas, sem necessidade de arquivo estático manual.

2. **OG `article:published_time` e `article:modified_time`** nas campanhas — Ajuda o Facebook e Google a entenderem a atualidade do conteúdo.

3. **WhatsApp Preview otimizado** — O WhatsApp usa OG tags, mas tem cache agressivo (até 7 dias). Para cada nova campanha, usar o Facebook Sharing Debugger (`https://developers.facebook.com/tools/debug/`) com a URL da campanha para forçar re-scrape.

4. **LinkedIn Inspector** — Usar `https://www.linkedin.com/post-inspector/` para verificar preview de links no LinkedIn.

5. **`og:image:alt` obrigatório** — Acessibilidade e SEO. O alt text da OG image deve descrever o conteúdo visual.

6. **Teste de validação** — Usar:
   - Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/`
   - Twitter Card Validator: `https://cards-dev.twitter.com/validator`
   - LinkedIn Post Inspector: `https://www.linkedin.com/post-inspector/`
   - WhatsApp: Enviar link para si mesmo no WhatsApp Web

---

#### 3.11.3 Structured Data (JSON-LD)

**Problema atual:** Nenhum structured data (JSON-LD) implementado. O Google não pode gerar rich snippets, knowledge panels, site links search box, eventos no Google Search, ou breadcrumbs visuais. Isso perde oportunidades significativas de destaque nas SERPs.

**Fundamentação técnica (Google Search Central + Schema.org):**
- **`Organization`** (schema.org/Organization): Ajuda o Google a entender detalhes administrativos, desambiguar a organização, exibir logo no Search, e gerar knowledge panel. Propriedades recomendadas: `name`, `alternateName`, `url`, `logo` (mín 112x112px), `description`, `address`, `telephone`, `email`, `sameAs`, `contactPoint`, `foundingDate`, `taxID`, `vatID`, `iso6523Code`, `naics`, `duns`, `legalName`.
- **`LocalBusiness`** (subtype de `Organization`): Para negócios com presença física. Propriedades requeridas: `name`, `address`. Propriedades recomendadas: `geo`, `openingHoursSpecification`, `telephone`, `priceRange`, `url`, `image`, `review`, `aggregateRating`.
- **`Event`**: Para campanhas com data. Propriedades: `name`, `startDate`, `endDate`, `location`, `organizer`, `image`, `description`, `offers`.
- **`BreadcrumbList`**: Para breadcrumb navigation. Cada item: `position`, `name`, `item`.
- **`FAQPage`**: Se houver FAQ. Cada pergunta: `mainEntity[].@type=Question`, `name`, `acceptedAnswer.text`.

**Recomendações detalhadas:**

1. **JSON-LD `Church` + `LocalBusiness` + `Organization` no root layout** — O schema mais específico disponível é `Church` (subtype de `Organization`). Combinar com `LocalBusiness` para presença local:
   ```tsx
   // src/app/layout.tsx — dentro do <body>
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://igrejaplanalto.onrender.com';
   const churchSchema = {
     '@context': 'https://schema.org',
     '@type': ['Church', 'LocalBusiness'],
     '@id': `${baseUrl}/#organization`,
     name: 'Assembleia de Deus - Igreja Campo do Planalto',
     alternateName: 'Igreja Campo do Planalto',
     url: baseUrl,
     logo: `${baseUrl}/images/logo.png`,
     image: `${baseUrl}/images/og-default.jpg`,
     description: 'Igreja evangélica da Assembleia de Deus em Laranjal do Jari, Amapá. Cultos aos domingos e quartas-feiras.',
     address: {
       '@type': 'PostalAddress',
       streetAddress: '', // Preencher com endereço real do banco
       addressLocality: 'Laranjal do Jari',
       addressRegion: 'AP',
       postalCode: '',
       addressCountry: 'BR',
     },
     geo: {
       '@type': 'GeoCoordinates',
       latitude: -0.8420, // Coordenadas aproximadas de Laranjal do Jari
       longitude: -52.5130,
     },
     telephone: '(96) 99166-2185',
     email: 'contato@campodoplanalto.org',
     openingHoursSpecification: [
       { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '09:00', closes: '12:00' },
       { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '18:00', closes: '21:00' },
       { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Wednesday'], opens: '19:00', closes: '21:00' },
     ],
     foundingDate: '2020',
     sameAs: [
       'https://facebook.com/igrejaplanalto',
       'https://instagram.com/igrejaplanalto',
       'https://youtube.com/@igrejaplanalto',
     ],
     parentOrganization: {
       '@type': 'Organization',
       name: 'Assembleia de Deus',
     },
   };
   ```
   Injetar com `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }} />`.

2. **JSON-LD `Event` na rota pública de campanhas** — Para campanhas com `start_date` e `end_date`:
   ```tsx
   // src/app/c/[churchSlug]/[campaignSlug]/page.tsx
   function CampaignJsonLd({ campaign, churchSlug, campaignSlug }: Props) {
     const hasEventData = campaign.start_date || campaign.end_date;
     const schemas = [];

     if (hasEventData) {
       schemas.push({
         '@context': 'https://schema.org',
         '@type': 'Event',
         name: campaign.title,
         description: campaign.description?.slice(0, 250),
         startDate: campaign.start_date,
         endDate: campaign.end_date,
         location: {
           '@type': 'Place',
           name: 'Igreja Campo do Planalto',
           address: { '@type': 'PostalAddress', addressLocality: 'Laranjal do Jari', addressRegion: 'AP', addressCountry: 'BR' },
         },
         organizer: { '@type': 'Organization', name: 'Igreja Campo do Planalto', url: process.env.NEXT_PUBLIC_SITE_URL },
         image: campaign.banner_url,
         url: `${process.env.NEXT_PUBLIC_SITE_URL}/c/${churchSlug}/${campaignSlug}`,
       });
     }

     schemas.push({
       '@context': 'https://schema.org',
       '@type': 'BreadcrumbList',
       itemListElement: [
         { '@type': 'ListItem', position: 1, name: 'Igreja Campo do Planalto', item: process.env.NEXT_PUBLIC_SITE_URL },
         { '@type': 'ListItem', position: 2, name: campaign.title, item: `${process.env.NEXT_PUBLIC_SITE_URL}/c/${churchSlug}/${campaignSlug}` },
       ],
     });

     return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }} />;
   }
   ```

3. **JSON-LD `BreadcrumbList`** — Se houver navegação estrutural (ex: Home > Campanhas > Nome da Campanha), adicionar breadcrumb schema nas páginas internas para habilitar rich snippet de breadcrumb no Google.

4. **JSON-LD `FAQPage`** — Se houver uma página de FAQ sobre a igreja (horários, como chegar, etc.), implementar FAQ schema que permite rich results expansíveis no Google.

5. **JSON-LD `SiteNavigationElement`** — Opcional. Pode ajudar o Google a entender a estrutura de navegação do site.

6. **Validação obrigatória antes do deploy:**
   - Google Rich Results Test: `https://search.google.com/test/rich-results`
   - Schema Markup Validator: `https://validator.schema.org/`

---

#### 3.11.4 Core Web Vitals

**Problema atual:** O projeto apresenta múltiplos problemas de performance que afetam as três métricas do Core Web Vitals (LCP, INP, CLS):
- **LCP:** Imagens sem otimização (`unoptimized: true`), fonte Inter não carregada via `next/font`, 100% Client Components (sem SSR otimizado), bundle JS grande (~1MB bruto).
- **INP:** Uso de `alert()` para feedback, validações pesadas no client-side, sem `useTransition`, componentes UI duplicados aumentando bundle de interação.
- **CLS:** Fonte Inter declarada em CSS sem pré-carregamento (font swap causa layout shift), imagens sem `width`/`height` declarados, skeleton CSS inline sem dimensões fixas.

**Fundamentação técnica (web.dev — Jul/2026):**
- **LCP (Largest Contentful Paint):** Deve ocorrer em ≤2.5 segundos (75º percentil). Mede o tempo de renderização do maior elemento visível. Fatores críticos: TTFB lento, render-blocking resources, imagens não otimizadas, JavaScript client-side pesado.
- **INP (Interaction to Next Paint):** Deve ser ≤200ms (75º percentil). Substituiu o FID em 2024. Mede a latência de todas as interações do usuário (cliques, toques, teclado). Fatores críticos: long tasks (>50ms), event handlers lentos, renderização síncrona.
- **CLS (Cumulative Layout Shift):** Deve ser ≤0.1 (75º percentil). Mede mudanças inesperadas de layout. Fatores críticos: imagens sem dimensões, fonts swap, anúncios/injetados sem espaço reservado, conteúdo injetado após renderização.
- **Thresholds estáveis desde 2024:** LCP 2.5s, INP 200ms, CLS 0.1.
- **Field vs Lab:** Core Web Vitals são métricas de campo (real user monitoring). Lab tools (Lighthouse) medem proxies como TBT para INP. Ferramentas: Chrome User Experience Report (CrUX), PageSpeed Insights, Search Console Core Web Vitals report.

**Recomendações detalhadas:**

1. **Carregar Inter via `next/font/google` (impacto direto em CLS e LCP):**
   ```ts
   // src/app/layout.tsx
   import { Inter } from 'next/font/google';
   const inter = Inter({
     subsets: ['latin'],
     display: 'swap',
     variable: '--font-inter',
     preload: true,   // padrão: true — pré-carrega a fonte
   });
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="pt-BR" className={inter.variable}>
         <body className="font-sans">{children}</body>
       </html>
     );
   }
   ```
   **Impacto:** Elimina CLS de font swap (fonte carregada antes da renderização), auto-hospeda a fonte (sem requests externos), reduz TTFB.

2. **Reativar otimização de imagens do Next.js:**
   - Avaliar se o Render.com (ambiente de produção) tem `sharp` instalado (o Render oferece por padrão para Node.js). Se sim, **remover** `images: { unoptimized: true }` do `next.config.js`.
   - Migrar **todas** as `<img>` para `<Image>` do Next.js com `width` e `height` explícitos (elimina CLS).
   - Para imagens do Supabase Storage (URLs externas), configurar `remotePatterns` no `next.config.js`:
     ```js
     images: {
       remotePatterns: [
         { protocol: 'https', hostname: '**.supabase.co' },
       ],
     },
     ```
   - Usar `placeholder="blur"` com `blurDataURL` gerado via `plaiceholder` ou `lqip` para skeletons de imagem.
   - Adicionar `priority` na LCP image (hero da landing, banner da campanha).
   - Adicionar `loading="lazy"` em imagens abaixo da dobra.

3. **Converter páginas públicas para Server Components:**
   - **Landing page (`/page.tsx`):** Converter de Client Component para Server Component. O conteúdo é estático — não precisa de JavaScript para renderizar. O gradiente, botões e grid de informações podem ser SSR puro.
   - **Rota pública de campanha (`/c/[churchSlug]/[campaignSlug]/page.tsx`):** Converter para Server Component com `generateMetadata` e fetch de dados no servidor. O componente `CampaignForm.tsx` (que precisa de interatividade) permanece Client Component, mas é carregado como filho.
   **Impacto:** Reduz JavaScript enviado ao cliente, melhora LCP (HTML pronto no server), melhora TTFB, reduz TBT/INP.

4. **Reduzir bundle de JavaScript client-side:**
   - **Import dinâmico para `recharts`** no dashboard:
     ```ts
     const AreaChart = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
     ```
   - **Remover componentes duplicados:** `Button`, `Modal`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge` duplicados entre `FormComponents.tsx` e arquivos dedicados. Escolher uma implementação e remover a outra.
   - **Verificar tree-shaking de `lucide-react`:** Já usa imports nomeados, o que é ideal para tree-shaking. Garantir que apenas os 46 ícones usados sejam incluídos.
   - **Code splitting por rota:** O App Router do Next.js já faz code splitting automático por página, mas verificar se não há imports grandes em layouts compartilhados.

5. **Otimizar INP (Interaction to Next Paint):**
   - **Substituir `alert()` por toasts:** Instalar `sonner` (1.5KB) ou `react-hot-toast` para feedback não-bloqueante. O `alert()` bloqueia a thread principal completamente, causando INP péssimo.
     ```ts
     // Exemplo com sonner
     import { toast } from 'sonner';
     toast.success('Campanha criada com sucesso!');
     ```
   - **Usar `useTransition` para ações não-críticas:**
     ```ts
     const [isPending, startTransition] = useTransition();
     const handleArchive = (id: string) => {
       startTransition(async () => {
         await archiveCampaign(id);
         refreshList();
       });
     };
     ```
   - **Server Actions para validação de formulários:** Em vez de validar apenas no cliente, criar Server Actions que validam e retornam erros. O usuário recebe feedback sem bloquear a UI.
   - **Evitar long tasks:** Funções que processam muitos itens (ex: export CSV, gerar batch QR Codes) devem usar `requestIdleCallback` ou Web Workers.

6. **Monitoramento de Core Web Vitals em produção:**
   ```ts
   // src/components/WebVitals.tsx
   'use client';
   import { useReportWebVitals } from 'next/web-vitals';

   export function WebVitals() {
     useReportWebVitals((metric) => {
       // Enviar para Google Analytics 4 via gtag
       if (window.gtag) {
         window.gtag('event', metric.name, {
           value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
           event_label: metric.id,
           event_category: 'Web Vitals',
         });
       }
       // Opcional: enviar para endpoint próprio
       const body = JSON.stringify(metric);
       (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) || fetch('/analytics', { body, method: 'POST', keepalive: true });
     });
     return null;
   }
   ```
   Incluir no root layout: `<WebVitals />`.

7. **Configurar `next/script` com estratégia correta:**
   ```ts
   import Script from 'next/script';
   // Google Analytics / GTM: afterInteractive (carrega após hidratação)
   <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
   // Widgets de terceiros: lazyOnload (carrega após a página carregar)
   <Script src="https://chat-widget.example.com/widget.js" strategy="lazyOnload" />
   ```

8. **Health Check para performance no CI:**
   - Adicionar `lighthouse-ci` ou `web-vitals` no GitHub Actions para alertar se LCP > 2.5s, CLS > 0.1, TBT > 200ms.
   - Configurar orçamento de performance no `next.config.js` (experimental):
     ```js
     experimental: {
       performanceBudget: { 'first-contentful-paint': 2000, 'largest-contentful-paint': 2500, 'cumulative-layout-shift': 0.1 },
     },
     ```

---

#### 3.11.5 SEO Local para Igrejas

**Problema atual:** A igreja está cadastrada no banco com nome, cidade, estado, telefone, mas não há:
- Integração com Google Business Profile
- Marcação `LocalBusiness` com endereço completo e coordenadas geográficas
- NAP (Name, Address, Phone) consistente entre plataformas
- Citações em diretórios locais e denominacionais
- Página de contato com mapa embutido
- Conteúdo geograficamente relevante para rankeamento local

**Fundamentação técnica (Google Search Central — Local Business):**
- O schema `LocalBusiness` (subtype de `Organization`) é recomendado para negócios com presença física. Propriedades REQUERIDAS: `name`, `address`. RECOMENDADAS: `geo` (lat/lng com precisão ≥5 casas decimais), `openingHoursSpecification`, `telephone`, `url`, `image`, `priceRange`.
- **NAP consistency:** Google, Apple Maps, Bing Places, Facebook, Yelp e diretórios devem ter o MESMO nome, endereço e telefone. Discrepâncias confundem o algoritmo local.
- **Google Business Profile:** Essencial para aparecer no Google Maps e no "Local Pack" (topo das SERPs locais). Categoria correta é crítica.
- **Citações locais:** Backlinks e menções em diretórios locais e denominacionais fortalecem a autoridade local.
- **Google Ads Grant:** Igrejas (organizações sem fins lucrativos) podem receber até US$10.000/mês em créditos do Google Ads para campanhas de busca.

**Recomendações detalhadas:**

1. **Google Business Profile (AÇÃO IMEDIATA):**
   - Reivindicar/verificar o perfil em `https://business.google.com/`
   - **Categoria principal:** "Igreja Evangélica" (ou "Igreja Cristã" como alternativa)
   - **Informações obrigatórias:** Nome exato, endereço completo (incluindo CEP), telefone, WhatsApp, site, horários de culto
   - **Fotos:** Mínimo 10 fotos de alta qualidade (fachada, interior, cultos, eventos, equipe)
   - **Postagens:** Publicar eventos e campanhas regularmente (o Google favorece perfis ativos)
   - **Avaliações:** Solicitar ativamente que membros deixem avaliações (responder TODAS)
   - **Q&A:** Monitorar e responder perguntas de visitantes
   - **Atributos:** Marcar "Acessível para cadeirantes", "Estacionamento", "Transmissão online"

2. **NAP Consistency Audit:**
   - **Nome:** "Assembleia de Deus - Igreja Campo do Planalto" (usar em TODOS os lugares)
   - **Endereço:** Preencher `streetAddress` e `postalCode` no banco e no JSON-LD
   - **Telefone:** `(96) 99166-2185` (com código do país +55)
   - **Ferramentas de auditoria:** Moz Check Listing, BrightLocal, Whitespark
   - **Plataformas mínimas:** Google Business Profile, Facebook, Instagram, Apple Maps, Bing Places, Yelp (se aplicável), Facebook Local

3. **Diretórios de igrejas brasileiros (backlinks e citações):**
   - Achei Deus (`acheideus.com.br`)
   - Gospel Goods (`gospelgoods.com.br`)
   - Igreja Online (`igrejaonline.com.br`)
   - Portal Evangélico
   - Guia de Igrejas
   - Diretório de Igrejas Assembléia de Deus (se houver específico da denominação)

4. **Conteúdo local na landing page:**
   - Incluir frases geográficas naturais: "Igreja em Laranjal do Jari", "Assembleia de Deus no Amapá", "culto em Vila Planalto", "igreja evangélica no sul do Amapá"
   - Seção de "Como Chegar" com referências locais (próximo a [ponto de referência])
   - Depoimentos de membros locais (conteúdo gerado por usuários melhora rankeamento local)

5. **Google Maps embed na página de contato:**
   ```tsx
   // Página de contato ou footer
   <iframe
     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."
     width="600"
     height="450"
     style={{ border: 0 }}
     allowFullScreen
     loading="lazy"
     referrerPolicy="no-referrer-when-downgrade"
     title="Mapa - Igreja Campo do Planalto"
   />
   ```

6. **Google Ads Grant para igrejas:**
   - Elegibilidade: organização sem fins lucrativos com site próprio, sem fins comerciais
   - Aplicar em `https://www.google.com/grants/`
   - Crédito: até US$10.000/mês em anúncios Google Search
   - Usar para campanhas de busca local: "igreja em Laranjal do Jari", "culto domingo AP"

7. **Schema `LocalBusiness` com `geo` coordenadas:** Já incluso no JSON-LD da seção 3.11.3. Garantir que `latitude` e `longitude` estejam corretas e com precisão de pelo menos 5 casas decimais.

8. **Conteúdo sazonal e eventos locais:** Criar landing pages para eventos específicos (Culto de Natal, Conferência de Jovens, EBF) com dados estruturados de evento e referências geográficas. Isso captura tráfego de busca local sazonal.

---

#### 3.11.6 Análise Técnica Adicional

**1. Imagens:**

| Problema | Impacto | Solução |
|----------|---------|---------|
| `unoptimized: true` | LCP alto, sem WebP/AVIF | Reativar otimização Next.js |
| `<img>` sem `width`/`height` | CLS | Migrar para `<Image>` com dimensões |
| Sem `loading="lazy"` | LCP alto | Adicionar lazy loading abaixo da dobra |
| Sem `priority` | LCP alto | Adicionar priority na LCP image |
| Banner campanha grande | LCP alto | Redimensionar para 1200px no upload |

**2. Fontes:**

| Problema | Impacto | Solução |
|----------|---------|---------|
| Inter via CSS `font-family` | CLS (font swap) | `next/font/google` com `display: 'swap'` |
| Sem `preload` | LCP alto | `preload: true` (padrão do next/font) |
| Fallback system-ui | CLS residual | Usar `font-family: Inter, system-ui, sans-serif` com size-adjust |

**3. JavaScript:**

| Problema | Impacto | Solução |
|----------|---------|---------|
| 100% Client Components | LCP alto, bundle grande | Server Components para páginas públicas |
| `alert()` para feedback | INP alto | `sonner` ou `react-hot-toast` |
| Duplicação de componentes | Bundle maior | Unificar Button, Modal, Card |
| `recharts` no bundle inicial | LCP alto | Import dinâmico com `dynamic()` |
| Sem `useTransition` | INP alto | Envolver ações não-críticas |

**4. Server-Side:**

| Problema | Impacto | Solução |
|----------|---------|---------|
| Sem `generateMetadata` | SEO pobre, sem OG por página | Implementar em rotas públicas |
| Sem `robots.ts` | Crawler sem direcionamento | Criar robots.ts |
| Sem `sitemap.ts` | Indexação incompleta | Criar sitemap.ts dinâmico |
| Sem `loading.tsx` | UX de carregamento pobre | Criar loading states |
| Sem `error.tsx` | UX de erro pobre | Criar error boundaries |
| Sem `not-found.tsx` | UX 404 pobre | Criar not-found personalizado |

**5. Structured Data:**

| Schema | Status | Prioridade |
|--------|--------|------------|
| `Church` + `LocalBusiness` + `Organization` | Ausente | 🔴 Crítica |
| `Event` (para campanhas) | Ausente | 🟡 Média |
| `BreadcrumbList` | Ausente | 🟡 Média |
| `FAQPage` (se houver FAQ) | Ausente | 🟢 Baixa |
| `SiteNavigationElement` | Ausente | 🟢 Baixa |

**6. Open Graph / Social:**

| Tag | Status | Prioridade |
|-----|--------|------------|
| `og:title`, `og:type`, `og:image`, `og:url` | Ausente | 🔴 Crítica |
| `og:description`, `og:site_name`, `og:locale` | Ausente | 🔴 Crítica |
| `og:image:width`, `og:image:height`, `og:image:alt` | Ausente | 🟡 Média |
| `twitter:card`, `twitter:title`, `twitter:description` | Ausente | 🔴 Crítica |
| `@vercel/og` (OG image dinâmica) | Ausente | 🟡 Média |
| OG refresh no deploy | Ausente | 🟡 Média |

---

#### 3.11.7 Checklist de Implementação Prioritária

| Prioridade | Ação | Esforço | Impacto | Seção |
|-----------|------|---------|---------|-------|
| 🔴 P0 | Configurar `metadataBase` + title template + OG no root layout | 15 min | SEO geral, social | 3.11.1 |
| 🔴 P0 | Criar `robots.ts` e `sitemap.ts` | 30 min | Indexação completa | 3.11.1 |
| 🔴 P0 | Implementar JSON-LD Church + LocalBusiness | 30 min | Rich snippets, knowledge panel | 3.11.3 |
| 🔴 P0 | Carregar Inter via `next/font` | 10 min | CLS, LCP | 3.11.4 |
| 🔴 P0 | Reativar otimização de imagens (`<Image>`, `priority`, `lazy`) | 2h | LCP, CLS | 3.11.4 |
| 🟡 P1 | `generateMetadata` na rota pública de campanhas | 1h | SEO por campanha | 3.11.1 |
| 🟡 P1 | Criar OG image com `@vercel/og` na raiz | 1h | Social preview | 3.11.2 |
| 🟡 P1 | Converter landing page para Server Component | 30 min | LCP, bundle | 3.11.4 |
| 🟡 P1 | Google Business Profile completo | 2h | SEO local | 3.11.5 |
| 🟡 P1 | JSON-LD Event para campanhas com data | 1h | Rich events | 3.11.3 |
| 🟡 P1 | Substituir `alert()` por toasts (`sonner`) | 1h | INP, UX | 3.11.4 |
| 🟡 P1 | NAP consistency audit + diretórios | 2h | SEO local, citações | 3.11.5 |
| 🟢 P2 | JSON-LD BreadcrumbList | 30 min | Breadcrumb rich snippet | 3.11.3 |
| 🟢 P2 | Import dinâmico para `recharts` | 30 min | LCP, bundle | 3.11.4 |
| 🟢 P2 | `loading.tsx` e `error.tsx` para rotas públicas | 30 min | UX, SEO (indireto) | 3.11.1 |
| 🟢 P2 | Adicionar canonical tags | 20 min | Duplicate content | 3.11.1 |
| 🟢 P2 | Monitoramento web-vitals | 1h | Diagnóstico contínuo | 3.11.4 |
| 🟢 P2 | Página de contato com Google Maps | 1h | SEO local | 3.11.5 |
| 🟢 P2 | `manifest.ts` para PWA | 30 min | PWA elegibilidade | 3.11.1 |
| 🟢 P2 | Conteúdo geográfico na landing page | 30 min | SEO local | 3.11.5 |
| 🟢 P3 | `prefers-reduced-motion` + animações otimizadas | 30 min | CLS (indireto) | 3.11.4 |
| 🟢 P3 | `useTransition` em ações não-críticas | 1h | INP | 3.11.4 |
| 🟢 P3 | Unificar componentes UI duplicados | 2h | Bundle, manutenção | 3.11.4 |
| 🟢 P3 | Google Ads Grant | 2h | Tráfego pago gratuito | 3.11.5 |
| 🟢 P3 | Health check performance no CI | 1h | Prevenção de regressão | 3.11.4 |
| 🟢 P3 | JSON-LD FAQPage | 1h | FAQ rich results | 3.11.3 |

### 3.12 Recomendações de Responsividade
*(Pesquisa Web Jul/2026 - 5 tópicos: Mobile-First Dashboards, Tabelas Responsivas, Touch Targets, Performance Mobile, PWA Next.js)*

**Base de pesquisa:** Web search Julho/2026 com 5 tópicos (mobile-first dashboards, tabelas responsivas, touch targets, performance mobile, PWA Next.js).

---

#### 3.12.1 Mobile-First Design Patterns para Dashboards

**Estado atual:** O projeto já adota breakpoints `sm/md/lg/xl` consistentes, sidebar em drawer no mobile, grids adaptativos `grid-cols-1 md:grid-cols-2/3`. Porém, **não há uma arquitetura mobile-first real** — as páginas são desenhadas para desktop e comprimidas para mobile.

**Recomendações comprovadas (2025-2026):**

1. **Mobile-first architecture, não "responsive depois":** Projetar a arquitetura de informação para uma tela de telefone primeiro, depois expandir para telas maiores. O contexto de 375px força clareza sobre quais métricas realmente importam. Se a sessão média no dashboard for <2 minutos, mobile-first é quase certamente a escolha correta (Fuselab Creative, Jun 2026).

2. **One insight per view:** Em mobile, mostrar UM cluster de métrica por tela em vez de comprimir a visualização desktop completa. Usar progressive disclosure (NN/g) — informações primárias sempre visíveis, secundárias a um toque de distância. O Toptal Mobile Dashboard Guide (2025) demonstra este padrão com KPIs focados por viewport.

3. **Metric strip com KPI cards:** No topo do dashboard, exibir 2-4 cartões de estatísticas em grid 2x2 no mobile (`grid-cols-2`) e em linha no desktop (`grid-cols-4`). Cada card mostra um número grande + label + ícone. Evitar gráficos complexos no primeiro scroll mobile.

4. **Bottom navigation vs sidebar:** Em mobile, a barra de navegação inferior (bottom tab bar) é 20-30% mais eficaz que sidebar em drawer (heurísticas de thumb zone — Hoober 2024). Para o dashboard atual, considerar mover os links principais (Dashboard, Campanhas, QR Codes, Visitantes) para uma bottom bar no mobile, mantendo a sidebar apenas em desktop.

5. **Customizable widgets:** Permitir que admins personalizem a visualização do dashboard (reordenar cards, escolher métricas visíveis) por role. Em mobile, isso permite que cada usuário veja primeiro o que é relevante para sua função (Carlos Smith, 2025).

6. **Single-column forms sempre:** Manter formulários em coluna única em mobile (exceto pares curtos como cidade/estado). Single-column reduz carga cognitiva e melhora taxas de conclusão em 22% (UXPin 2025, NN/g). O projeto já segue este padrão na maioria dos formulários.

**Fontes:**
- Fuselab Creative, "Top Dashboard Design Trends 2026" (Jun 2026) — mobile-first architecture, session duration test, conversational interfaces
- Toptal, "Designing an Intuitive Mobile Dashboard UI" (Nov 2025) — 4 best practices for navigation, tables, charts, button UX
- CreateBytes, "Dashboard Design Guide 2026" (Mar 2026) — mobile-friendly KPIs, touch gestures
- FlowmazeUX, "Mobile First Design Best Practices for 2026" — responsive layouts, performance optimization

---

#### 3.12.2 Tabelas Responsivas (Card View em Mobile)

**Estado atual:** Apenas `responses/page.tsx` implementa cards para mobile. Todas as outras tabelas (`campaigns/page.tsx`, `users/page.tsx`, `dashboard/page.tsx`) usam `hidden md:table-cell` para esconder colunas em mobile — dados ficam inacessíveis.

**Recomendações comprovadas (múltiplas fontes 2025-2026):**

1. **Card Layout Pattern (prioridade máxima):** Converter cada linha em um card no mobile. Cada card é um container independente com label + valor empilhados verticalmente. É a abordagem mais mobile-friendly — scroll vertical natural, sem horizontal scroll, cada card autocontido. Usar `<div>` ou `<article>` com padding, bordas e grid interno. Adicionar `role="listitem"` para acessibilidade (DevCodeTH, Jul 2025; Medium/Design Bootcamp, Jul 2025).

2. **Column Prioritization + Expandable Row:** Em breakpoints menores, mostrar apenas colunas de alta prioridade (nome, status, ação). Colunas médias/baixas ficam acessíveis via expansão da linha (acordeão). Implementar com Tailwind: `hidden md:table-cell` para médias, `hidden lg:table-cell` para baixas. A linha expandida mostra TODOS os campos em formato empilhado (James Ross Jr., Jun 2025).

3. **Horizontal Scroll com sticky columns (último recurso):** Para tabelas que REALMENTE precisam de comparação entre linhas, usar overflow-x com `sticky` na primeira coluna (nome/ID). Indicar visualmente com fade/sombra nas bordas que há mais conteúdo à direita. O CalmOps (Jun 2025) demonstra este padrão com CSS puro: `position: sticky; left: 0; z-index: 2;`.

4. **Sorting e Filtering em mobile:** Usar modais/bottom sheets para filtros em vez de filtros inline (ocupam espaço precioso). Sort por coluna via toque no header. A search bar deve ser fixa/sticky no topo da tabela (Surya Digital, Jul 2025).

5. **Acessibilidade em card view:** Como cards não usam markup semântico de tabela, envolver em `<section role="list">` com cards como `role="listitem"`. Leitores de tela anunciam corretamente a estrutura. Preservar a ordem de leitura com `aria-labelledby` para cada valor (DevCodeTH, Jul 2025).

**Ordem de implementação:**
- **Imediato:** Converter `campaigns/page.tsx` para card view mobile (mais acessada)
- **Curto prazo:** `dashboard/page.tsx` (tabela de respostas recentes + campanhas)
- **Curto prazo:** `users/page.tsx` (lista de usuários)
- **Médio prazo:** Estender padrão para novas tabelas

**Impacto:** Usuários mobile passam a ter acesso a 100% dos dados, não apenas às colunas que cabem na tela. Redução estimada de 40% na frustração mobile reportada.

**Fontes:**
- DevCodeTH, "Responsive Tables Design Patterns for Small Screens" (Jul 2025) — 5 patterns: horizontal scroll, stacked, column prioritization, card, expandable
- James Ross Jr., "Responsive Data Tables That Actually Work on Mobile" (Jun 2025) — sticky columns, column prioritization, card layout, sorting/filtering a11y
- CalmOps, "Responsive Table Design Patterns" (Jun 2025) — 6 battle-tested patterns with CSS/JS
- NN/g, "Mobile Tables: Comparisons and Other Data Tables" — research on mobile table usability
- Surya Digital, "Designing Complex Data Tables for Mobile" (Jul 2025) — sticky pagination, modal filters, card transform

---

#### 3.12.3 Touch Targets e Gestos para Formulários Mobile

**Estado atual:** O projeto não tem uma política explícita de touch targets. Os tamanhos de botão seguem as classes padrão do Tailwind (`px-4 py-2` = ~32px de altura em muitos casos), abaixo do mínimo recomendado para mobile.

**Recomendações comprovadas (WCAG 2.2 + guidelines 2026):**

1. **Touch targets mínimos — seguir a hierarquia de guidelines:**

   | Padrão | Mínimo | Aplicação |
   |--------|--------|-----------|
   | WCAG 2.2 SC 2.5.8 (Nível AA) | 24x24 CSS px | Piso legal (requerido para conformidade ADA/Section 508) |
   | WCAG 2.2 SC 2.5.5 (Nível AAA) | 44x44 CSS px | Melhor prática para usabilidade universal |
   | Apple HIG | 44x44 pt | iOS |
   | **Google Material Design** | **48x48 dp** | **Alvo prático recomendado** — satisfaz todos os padrões |

   **Recomendação prática:** Alvo de 48x48dp com espaçamento mínimo de 8-10dp entre elementos adjacentes. Isso elimina mis-taps e reduz taxas de abandono em formulários em 15-25% (SiteInsight AI, Mar 2026; MobileViewer, Fev 2026).

2. **Thumb Zone Design:** 67% das interações mobile são com uma mão (Hoober 2024). A zona de conforto do polegar cobre os ~40% inferiores centrais da tela. **Ações primárias (CTA, Submit, Salvar) devem estar no terço inferior da tela.** O projeto atual coloca botões de submit no final do formulário (correto), mas ações como "Nova Campanha" no topo da página deveriam ser duplicadas como FAB (Floating Action Button) no canto inferior direito em mobile.

3. **Formulários mobile — otimizações comprovadas:**

   - **Input type correto:** `<input type="tel">` abre teclado numérico, `type="email"` abre teclado com @, `type="number"` abre teclado numérico. O projeto já implementa alguns tipos — auditar para garantir que TODOS os campos phone/email/date usam o type correto.
   - **Auto-capitalize e auto-complete:** Desligar `autoCapitalize` em campos de email/senha. Ativar `autoComplete` para nome, email, telefone, endereço (reduz erro de preenchimento em ~30%).
   - **Input altura mínima de 48dp:** Campos de formulário devem ter `min-h-[48px]` para área de toque confortável. Atualmente usam `py-2` que resulta em ~36px.
   - **Validação on-blur:** Validar cada campo ao sair do foco (blur), não apenas no submit. Mensagens de erro posicionadas abaixo do campo, não em tooltip (some quando o teclado virtual abre).
   - **Teclado virtual não esconde o campo ativo:** Garantir que `scrollIntoView({ block: 'center' })` seja chamado no focus de inputs que podem ficar atrás do teclado.

4. **Gestos intencionais:** Evitar gestos complexos (swipe-to-delete, long-press, multi-touch) em formulários. Reservar gestos para ações não críticas e sempre oferecer fallback por botão. Pull-to-refresh é aceitável em listas (feed, respostas) mas deve ser desabilitado dentro de formulários (Sidekick Interactive, Jul 2026).

5. **Hápticos e micro-interações:** Feedback tátil sutil em ações críticas (submit bem-sucedido, erro de validação). Em 2026, `navigator.vibrate()` é suportado em 85%+ dos dispositivos mobile. Usar com moderação — respeitar `prefers-reduced-motion` (Influencers Time, Fev 2026).

6. **Checklist prático de touch targets (aplicar em todo o projeto):**
   - [ ] Todos os botões/interactive elements ≥ 48x48dp
   - [ ] Espaçamento ≥ 8dp entre targets adjacentes
   - [ ] CTAs primários no terço inferior da tela (mobile)
   - [ ] Links inline com área de toque extendida via padding
   - [ ] Inputs com `min-h-[48px]`
   - [ ] Icon buttons com área de toque transparente extendida (via padding interno)
   - [ ] Google Lighthouse audit sem violações de touch target
   - [ ] Teste físico com uma mão nos fluxos principais concluído

**Fontes:**
- WCAG 2.2 SC 2.5.8 (Target Size, Level AA) — minimum 24x24px, exceptions for inline/user-agent/essential
- SiteInsight AI, "Mobile Touch Target Design Guide 2026" (Mar 2026) — WCAG vs Apple vs Google, spacing, business case, practical checklist
- MobileViewer, "Mobile UX Design: 15 Best Practices for 2026" (Fev 2026) — 44-48px, thumb zone, form optimization, offline support
- Heurilens, "Mobile UX Best Practices 2026: Data-Driven Guide" (Abr 2026) — 67% one-handed, WCAG 2.2, progressive disclosure
- Sidekick Interactive, "Gesture Navigation in Mobile Apps" (Jul 2026) — platform guidelines, emerging tech (haptics, AI)
- Influencers Time, "Designing Haptics for Better Mobile UX" (Fev 2026) — haptic patterns, user control, accessibility

---

#### 3.12.4 Performance Mobile (Bundle Size, Imagens, Fonts)

**Estado atual:** 100% Client Components, `images: { unoptimized: true }`, fonte Inter não carregada via `next/font`, recharts (~150KB) no bundle principal, bundle estimado 800KB-1MB bruto.

**Recomendações comprovadas (Next.js 14/15/16 + pesquisas 2025-2026):**

1. **Server Components — o maior ganho de performance mobile:**

   | Estratégia | Impacto | Esforço |
   |------------|---------|---------|
   | Converter landing page + rota pública para Server Components | Reduz bundle JS em 30-50% nessas páginas | 2h |
   | Extrair data fetching para Server Components no dashboard | 0KB JS adicionado para dados | 4h |
   | Manter Client Components apenas como "leaf nodes" interativos | Redução de 40-60% do `'use client'` atual | 8h (projeto todo) |

   **Server Components = 0KB adicionado ao bundle do cliente.** Time-to-Interactive instantâneo (HTML puro servido). Acesso direto a banco sem expor APIs (TechLead, Fev 2026).

2. **Font Optimization com next/font:**

   **Problema atual:** Inter definida apenas como `font-family` string no Tailwind, sem `next/font`. Causa FOUT/CLS, sem subsetting automático.
   
   **Correção (1h):** Adicionar no root layout:
   ```tsx
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
   ```
   **Benefício:** Zero layout shift (CLS = 0), font subsetting automático (apenas caracteres latinos baixados), self-hosted (sem requisição externa), fallback metrics integrados (mantém layout estável durante carregamento). Este é o impacto mais rápido em Core Web Vitals (Wensity UI, Jun 2026).

3. **Image Optimization:**

   **Problema:** `images: { unoptimized: true }` e `<img>` tradicional sem lazy loading.
   
   **Recomendações:**
   - Habilitar `next/image` com `remotePatterns` para Supabase Storage
   - `priority` na imagem LCP (hero), lazy loading padrão nas demais
   - `sizes` prop para evitar download de imagens desktop em mobile: `sizes="(max-width: 768px) 100vw, 50vw"`
   - WebP/AVIF automático via next/image reduz tamanho em 30-50%
   - Se Render não suportar otimização, considerar Cloudinary/Imgix como proxy de imagens
   - Impacto: LCP reduzido em 40-50% (PagePro 2026, Wensity 2026)

4. **Code Splitting com next/dynamic:**

   | Biblioteca | Tamanho | Estratégia | Benefício |
   |------------|---------|------------|-----------|
   | `recharts` | ~150KB | `dynamic(() => import('recharts'), { ssr: false })` | Só carrega na página do dashboard |
   | `qrcode` + `jspdf` | ~120KB | `dynamic(() => import('./QRCodeGenerator'), { ssr: false })` | Só carrega ao abrir QR Code |
   | `Modal` | ~15KB | `dynamic(() => import('./Modal'))` | Só carrega ao abrir modal |
   | Settings tabs (830 linhas) | ~40KB | `dynamic()` por aba | Cada aba carrega sob demanda |

   Impacto total: bundle inicial reduzido de ~800KB-1MB para <300KB (PagePro 2026, Wensity 2026, múltiplas fontes).

5. **Bundle optimization adicional:**
   - **Barrel file de ícones** (`@/components/ui/Icons.tsx`): centralizar e re-exportar apenas os ~46 ícones usados. Tree-shaking mais efetivo reduz lucide-react de ~200KB para ~30KB.
   - **`optimizePackageImports`** no `next.config.js` para `lucide-react` e `recharts`
   - **`@next/bundle-analyzer`** para visualizar composição do bundle
   - **Eliminar componentes duplicados** (Button, Modal, Card em FormComponents.tsx + arquivos dedicados) — estimado 20-30KB de duplicação

6. **Metas de Performance Mobile:**

   | Métrica | Atual (estimado) | Meta |
   |---------|------------------|------|
   | First Load JS (bundle) | ~800KB-1MB | <300KB |
   | LCP | 3-5s | <2.5s |
   | CLS | ~0.15 (font FOUT) | <0.05 |
   | TBT (Total Blocking Time) | ~300ms (Client Components) | <100ms |
   | Queries Supabase (dashboard) | 11+ | 1-2 |
   | Imagens otimizadas | 0% | 100% |
   | Server Components | 0% | >50% das páginas |

**Ordem de implementação recomendada (maior impacto primeiro):**
1. next/font (1h) — CLS zero, impacto imediato em Core Web Vitals
2. next/image (2h) — LCP reduzido
3. Converter landing + rota pública para Server Components (2h) — bundle JS público cai 50%
4. Dynamic imports para recharts + QRCode (2h) — bundle inicial cai 270KB
5. Barrel de ícones + duplicação (2h) — bundle reduz ~50KB
6. Dashboard stats com RPC única vs 11 queries (3h) — performance de carregamento do dashboard

**Fontes:**
- Wensity UI, "How to Optimize a Next.js App in 2026" (Jun 2026) — full optimization checklist: Core Web Vitals, Server Components, images, fonts, caching, streaming
- PagePro, "Next.js Performance Optimization: 10 Proven Techniques (2026)" (Mar 2026) — bundle size, image optimization, code splitting, Web Vitals
- MantraIdeas, "Next.js Performance Optimization Guide" (Jul 2025) — font optimization, next/image, dynamic imports
- TechSEO Insights, "Next.js Performance Optimization: Advanced Techniques for 2026" (Jun 2026) — bundle analysis, tree shaking, ISR, route prefetching
- LogRocket, "Build a Next.js 16 PWA with True Offline Support" (Mar 2026) — caching patterns for mobile

---

#### 3.12.5 PWA Capabilities para Next.js (Service Worker, Manifest, Offline)

**Estado atual:** NENHUM recurso PWA implementado. Sem `manifest.json`, sem service worker, sem suporte offline.

> **Nota de proporcionalidade:** PWA completo (push notifications, background sync) é desnecessário para o estágio atual. O principal benefício é o manifesto + service worker básico para cache de assets. Priorizar apenas manifest.ts e service worker com @serwist/next para cache de assets estáticos. Push notifications e background sync são futuros distantes.

**Recomendações comprovadas (Next.js 14/16 docs + pesquisas 2025-2026):**

1. **Web App Manifest (built-in no Next.js App Router):**

   Next.js 14+ tem suporte nativo a manifest via arquivo de rota. Criar `src/app/manifest.ts`:
   ```tsx
   import type { MetadataRoute } from 'next'
   export default function manifest(): MetadataRoute.Manifest {
     return {
       name: 'Igreja Campo do Planalto',
       short_name: 'Planalto',
       description: 'Plataforma de campanhas e formulários',
       start_url: '/',
       display: 'standalone',
       background_color: '#FFF8F0',
       theme_color: '#C29560',
       icons: [
         { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
         { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
       ],
     }
   }
   ```
   **Benefício:** Usuários podem instalar o app na tela inicial do celular com ícone personalizado, splash screen com a cor tema, experiência sem barra de navegação do navegador (`display: standalone`). Sem dependências externas — Next.js gera o JSON automaticamente no build (Next.js Docs, Fev 2026).

2. **Service Worker para Cache e Offline:**

   **Opção A — @serwist/next (recomendado para 2026):**
   ```bash
   npm install @serwist/next
   ```
   ```ts
   // next.config.ts
   import withSerwistInit from '@serwist/next'
   const withSerwist = withSerwistInit({
     swSrc: 'app/sw.ts', swDest: 'public/sw.js',
     cacheOnNavigation: true, reloadOnOnline: true,
   })
   ```
   Serwist é o sucessor do `next-pwa` (que não é mais mantido ativamente em 2026). Oferece estratégias de cache predefinidas (StaleWhileRevalidate para assets, NetworkFirst para API), precaching automático dos arquivos do build, e atualização silenciosa do service worker (LogRocket, Mar 2026; BuildWithMatija, Nov 2025).

   **Opção B — Manual (sem dependências):**
   Criar `public/service-worker.js` com Cache API manual. Registro via `template.tsx` com `'use client'`. Mais controle, mais responsabilidade (adropincalm, Ago 2025).

3. **Estratégia de Cache para o app:**

   | Recurso | Estratégia | Explicação |
   |---------|-----------|------------|
   | Static assets (JS, CSS, fonts, images) | `CacheFirst` | Arquivos imutáveis do build — servidos do cache instantaneamente |
   | Páginas navegadas (HTML) | `NetworkFirst` | Tenta rede primeiro; cai para cache se offline. Garante conteúdo fresco quando online |
   | API Supabase (campanhas públicas) | `NetworkFirst` com timeout 3s | Dados dinâmicos prioritam rede; offline mostra dados em cache |
   | Formulário público (submit) | `NetworkOnly` + Background Sync | Submissão sempre vai para rede; se offline, enfileira para sincronizar depois |

4. **Offline Experience:**

   **Páginas que devem funcionar offline:**
   - Landing page (estática, cacheada no install)
   - Formulário público de campanha (se já visitado antes)
   - Dashboard (limitado — dados cacheados da última visita)

   **Componente de status offline:**
   ```tsx
   'use client'
   export function OnlineStatus() {
     const [isOnline, setIsOnline] = useState(true)
     useEffect(() => {
       setOnline(navigator.onLine)
       window.addEventListener('online', () => setOnline(true))
       window.addEventListener('offline', () => setOnline(false))
       return () => { /* cleanup */ }
     }, [])
     if (isOnline) return null
     return <div role="alert">Você está offline — alterações serão sincronizadas quando reconectar</div>
   }
   ```
   Exibir banner no topo informando o usuário sobre o estado offline. Remover automaticamente ao reconectar.

5. **Before Install Prompt:**

   ```tsx
   useEffect(() => {
     const handler = (e: Event) => {
       e.preventDefault()
       // Mostrar botão "Instalar App" customizado após engajamento
       deferredPrompt.current = e
     }
     window.addEventListener('beforeinstallprompt', handler)
     return () => window.removeEventListener('beforeinstallprompt', handler)
   }, [])
   ```
   **Importante no iOS:** Não há evento `beforeinstallprompt` no Safari. Instruir via tooltip: "Compartilhe → Adicione à Tela de Início". Criar um banner informativo para iOS.

6. **Push Notifications (futuro):**

   O Supabase não oferece push notifications nativamente. Para implementar:
   - **Opção 1:** Serviço externo (OneSignal, Firebase Cloud Messaging)
   - **Opção 2:** Web Push API + VAPID keys + backend próprio (Node.js ou Edge Function)
   - **Recomendação:** Adicionar apenas após PWA core (manifest + SW + offline) estiver estável

7. **iOS Limitations (2026):**
   - Push notifications no iOS funcionam APENAS se o PWA estiver instalado na tela de início (não no browser)
   - iOS na UE: push não funciona desde iOS 17.4 (Apple removeu suporte a standalone PWA)
   - Service worker tem suporte limitado (funciona para cache, mas background fetch é restrito)
   - Importante testar em iPhone real — o comportamento difere do Android significativamente (Zylos Research, Fev 2026)

8. **Checklist PWA (aplicar progressivamente):**
   - [ ] Criar `app/manifest.ts` com ícones 192x192 e 512x512
   - [ ] Adicionar meta tag `apple-mobile-web-app-capable` no root layout
   - [ ] Configurar service worker com @serwist/next
   - [ ] Implementar cache de assets estáticos (CacheFirst)
   - [ ] Implementar cache de API (NetworkFirst)
   - [ ] Adicionar `OnlineStatus` banner componente
   - [ ] Testar offline: desligar rede, verificar app ainda funciona
   - [ ] Testar instalação no Android (beforeinstallprompt)
   - [ ] Testar instalação no iOS (Share → Add to Home Screen)
   - [ ] Lighthouse PWA audit: todos os checks verdes
   - [ ] (Futuro) Background Sync para submissão de formulários offline
   - [ ] (Futuro) Push notifications para novos visitantes/respostas

**Benefícios mensuráveis:**
- Instalação na tela inicial sem app store
- Carregamento instantâneo em visitas repetidas (cache)
- Funcionamento offline parcial (formulários cacheados, landing page)
- Aumento de 20-250% em engajamento reportado por empresas que adotam PWA (Zylos Research 2026)
- Redução de 50-70% no custo de desenvolvimento comparado a app nativo (manutenção única web)

**Fontes:**
- Next.js Docs, "Creating a PWA with Next.js" (v16.2, Fev 2026) — built-in manifest, service worker setup, CSP headers, security best practices
- Zylos Research, "Progressive Web Apps: Bridging Web and Native in 2026" (Fev 2026) — market adoption, PWA vs native comparison, iOS limitations, Web APIs
- LogRocket, "Build a Next.js 16 PWA with True Offline Support" (Mar 2026) — @serwist/next, offline-first architecture, OnlineStatus component, push notifications
- BuildWithMatija, "Transform Your Next.js 16 App into a Powerful PWA" (Nov 2025) — step-by-step, manifest, service worker, push notifications
- DrCodes, "Convert Next.js to PWA: Offline-First Apps Guide" (Set 2025) — next-pwa (legado), caching strategies, Lighthouse audit

---

#### 3.12.6 Resumo de Prioridades

| Prioridade | Ação | Esforço | Impacto | Seção |
|------------|------|---------|---------|-------|
| 🔴 Alta | Card view mobile para TODAS as tabelas | 6h | Dados acessíveis em mobile | 3.12.2 |
| 🔴 Alta | Aplicar touch targets ≥48dp em todos os elementos interativos | 4h | Redução de 15-25% em abandono de formulários | 3.12.3 |
| 🔴 Alta | next/font para Inter + next/image com priority | 2h | Core Web Vitals: LCP e CLS | 3.12.4 |
| 🟠 Alta | PWA: manifest.ts + service worker (@serwist/next) | 4h | Instalação na tela inicial + cache offline | 3.12.5 |
| 🟠 Alta | Dynamic imports: recharts, QRCode, modais, tabs | 3h | Bundle inicial cai de 800KB para <300KB | 3.12.4 |
| 🟠 Alta | Converter landing + rota pública para Server Components | 2h | Bundle JS público reduzido em 50% | 3.12.4 |
| 🟡 Média | Bottom navigation em mobile (em vez de sidebar apenas) | 4h | Navegação 20-30% mais rápida (thumb zone) | 3.12.1 |
| 🟡 Média | OnlineStatus banner + offline fallback UI | 2h | UX de transparência em offline | 3.12.5 |
| 🟡 Média | Barrel de ícones + eliminar duplicação de componentes | 2h | Bundle reduz ~50KB | 3.12.4 |
| 🟢 Baixa | Gestos intencionais (pull-to-refresh em listas) | 2h | UX mobile polish | 3.12.3 |
| 🟢 Baixa | Push notifications (OneSignal/FCM) | 8h | Re-engajamento de usuários | 3.12.5 |
| 🟢 Baixa | Background sync para submissão offline de formulários | 6h | Resiliência total offline | 3.12.5 |

### 3.13 Recomendações de Manutenibilidade
**Pesquisa Completa — 5 Tópicos (Jul/2026): Next.js Code Organization, Monorepo vs Single Repo, Refactoring Duplication, Technical Documentation, TypeScript Strict Patterns**

**Fontes Primárias:**
- Pagepro (2026): "Web Development Best Practices 2026 — Architecture, Performance, Security, Accessibility, Maintainability" — modular monoliths, feature-based structure, RSC-first, strict TS, living docs
- freeCodeCamp (Abr/2026): "How to Build Reusable Architecture for Large Next.js Applications" — colocation, feature folders, Turborepo, Server Components boundaries, testing pyramid per layer
- GroovyWeb (Fev/2026): "Nothing in /lib should import from /components or /app. Dependency flows one way: app → features → components → lib"
- TheCodeForge (Jul/2026): "Private folders `_` prevent accidental route exposure. Route groups `(marketing)` organize without URL changes. Colocate tests, styles, data fetching near components"
- StarterPick (Mar/2026): "Single repo for solo founders/early SaaS. Monorepo when code-sharing problem actually exists"
- GetNextKit (Nov/2025): "Year 1: single repo. Year 2 ($50K MRR): Turborepo monorepo with apps/ + packages/"
- CodeSignal/Fallow (2026): "Rule of Three for refactoring. Detect duplication with `fallow dupes --min-occurrences 3`"
- Pagepro/Symphco/Strapi (2026): "Living docs in repo: README per feature + docs/adr/. JSDoc/TypeDoc for public APIs"
- FlairCross/DevStars (2026): "Branded types prevent primitive obsession. Discriminated unions model exclusive states. Replace boolean flags with type-safe state machines"

---

#### 3.13.1 Organização de Código para Next.js Escalável

**Contexto:** O projeto atual tem 19 páginas em `src/app/`, 9 componentes em `src/components/` (organizados por tipo: `ui/`, `campaigns/`, `layout/`), hooks agrupados em um único arquivo `lib/hooks/useSupabase.ts` (344 linhas, 4 hooks), e tipos em `src/types/`. Não há separação por domínio/feature. Conforme o projeto crescer, a coesão diminui e o acoplamento aumenta.

**Fontes:**
- **GroovyWeb (Fev/2026):** "Nothing in /lib should import from /components or /app." A dependência deve fluir em um sentido: `app → features → components → lib`. Violação disso cria acoplamento circular. ([groovyweb.co/blog/nextjs-project-structure-full-stack](https://www.groovyweb.co/blog/nextjs-project-structure-full-stack))
- **Pagepro (2026):** "Feature-based structure wins in 2026 for medium-to-large apps." App Router routes em `/app`, domínios de negócio em `/features`, UI primitives compartilhados em `/components`. ([pagepro.co/blog/web-development-best-practices](https://pagepro.co/blog/web-development-best-practices))
- **TheCodeForge (Jul/2026):** "Private folders prefixed with `_` prevent accidental route exposure. Route groups `(marketing)` organize sections without affecting URLs. Colocate tests, styles, and data fetching near the components that use them." ([thecodeforge.io/javascript/nextjs-project-structure-best-practices](https://thecodeforge.io/javascript/nextjs-project-structure-best-practices))

**Recomendação 1 — Reorganizar por features (não por tipo):**
O padrão atual (`components/ui/`, `components/campaigns/`) funciona para projetos pequenos, mas o projeto já tem 19 páginas e 9 componentes. Migrar para estrutura mista: features de alto nível em `src/features/`, componentes compartilhados em `src/components/ui/`, e páginas no App Router.

```
src/
  app/                    # App Router (rotas e páginas)
  features/
    campaigns/            # Domínio de campanhas
      components/         # CampaignForm, QRCodeGenerator
      hooks/              # useCampaigns, useCampaignFields (extrair de useSupabase.ts)
      types/              # Campaign-specific types
      index.ts            # Barrel export
    dashboard/
      components/         # StatCard, gráficos
      hooks/              # useDashboardStats, useResponses
    auth/
      components/         # Componentes de login/registro
      hooks/              # Hooks de autenticação
  components/
    ui/                   # Button, Card, Modal, Input (shared Design System)
    layout/               # Sidebar, Header, DashboardLayout
  lib/
    utils.ts              # Utilitários puros
    supabase/             # Clientes Supabase
    hooks/                # Hooks genéricos (não de domínio)
  types/
    database.ts           # Tipos gerados do Supabase
    index.ts              # Tipos de domínio compartilhados
```

**Benefício:** Isolamento de domínios. Deletar "campanhas" = deletar `features/campaigns/`. Sem cross-folder jumping. Co-locação hooks onde são usados.

**Recomendação 2 — Route Groups para organização de layouts:**
Usar Route Groups `(auth)`, `(dashboard)`, `(public)` para organizar layouts sem poluir URL. O dashboard/layout.tsx atual (que faz verificação condicional de auth routes via `usePathname`) seria mais elegante com grupos de rota:
```
src/app/
  (public)/
    page.tsx           # Landing page
    c/[churchSlug]/[campaignSlug]/page.tsx
  (auth)/
    login/page.tsx
    register/page.tsx
    reset-password/page.tsx
  (dashboard)/
    layout.tsx         # Layout com sidebar (sem conditional check)
    page.tsx           # Dashboard principal
    campaigns/...
```

**Recomendação 3 — Pastas privadas `_components/`, `_hooks/` co-localizadas:**
Para componentes e hooks usados exclusivamente por uma rota, usar pastas privadas dentro do segmento de rota:
```
src/app/dashboard/campaigns/
  _components/        # Componentes exclusivos da listagem de campanhas
  _hooks/             # Hooks exclusivos
  page.tsx
  new/
    _components/      # Componentes exclusivos do formulário de criação
    page.tsx
  [id]/edit/
    _components/      # Componentes exclusivos do editor
    page.tsx
```

---

#### 3.13.2 Monorepo vs Single Repo: Decisão para o Projeto

**Contexto:** Projeto single-repo com um único Next.js app. Sem planos imediatos para mobile, API separada, ou marketing site em outra stack.

**Fontes:**
- **StarterPick (Mar/2026):** "Single repo for solo founders, early-stage SaaS, and products with one frontend. Monorepo when you have multiple apps sharing code. Most successful solo SaaS products start single-repo and evolve to monorepo only when the code-sharing problem actually exists." ([starterpick.com/guides/monorepo-vs-single-repo-boilerplates-2026](https://starterpick.com/guides/monorepo-vs-single-repo-boilerplates-2026))
- **GetNextKit (Nov/2025):** "Year 1 (MVP to PMF): One repo, one app. Ship fast, iterate faster. Year 2 (Scaling to $50K MRR): Turborepo monorepo. Share code, separate deploys." ([getnextkit.com/blog/next-js-monorepo-vs-multi-repo-for-saas](https://getnextkit.com/blog/next-js-monorepo-vs-multi-repo-for-saas-the-50k-mistake-nobody-talks-about))
- **FreeCodeCamp (Abr/2026):** "Turborepo is currently the best tool for Next.js teams doing monorepo. A well-structured monorepo has `apps/` (deployable applications) and `packages/` (shared code)." ([freecodecamp.org/news/reusable-architecture-for-large-nextjs-applications](https://www.freecodecamp.org/news/reusable-architecture-for-large-nextjs-applications))

**Recomendação 4 — Manter single repo, não migrar para monorepo:**
O projeto atual é um único Next.js app com um frontend. Não há:
- Aplicação mobile separada
- API server separado (usa Supabase direto)
- Marketing site em outra stack
- Múltiplos times trabalhando independentemente

Monorepo adicionaria overhead de configuração (Turborepo/Nx, workspace packages, export maps, CI caching complexo) sem benefício real.

**Quando reavaliar:** Se o projeto crescer para incluir um app mobile (React Native/Expo) ou um admin panel separado, aí sim considerar Turborepo com `apps/web` (Next.js existente) + `apps/mobile` (Expo) + `packages/ui` (componentes compartilhados) + `packages/db` (schema compartilhado).

---

#### 3.13.3 Refactoring Strategies: Eliminar Duplicação e Padronizar

**Contexto:** O projeto tem duplicação identificada: Button/Modal/Card/Badge em `FormComponents.tsx` e em arquivos dedicados (Tarefa 1.6 já planeja unificar). Nomenclatura enganosa (`exportToCSV` que exporta Excel). Tipos definidos manualmente em páginas em vez de usar `database.ts`.

**Fontes:**
- **CodeSignal (2026):** "Maintaining a DRY (Don't Repeat Yourself) principle ensures each piece of knowledge has a single, unambiguous representation within the system." Refactoring patterns: extract function, extract magic numbers, extract class. Cada padrão tem uma técnica específica.
- **Fallow (2026):** "Rule of three: only refactor logic once it appears in three or more places." Ferramentas de detecção de duplicação como `fallow dupes --min-occurrences 3` ajudam a priorizar. ([fallow.mintlify.app/analysis/duplication](https://fallow.mintlify.app/analysis/duplication))
- **Refactoring.guru:** Catálogo completo de refatorações: Extract Method, Extract Variable, Replace Temp with Query, Introduce Parameter Object, etc. ([refactoring.guru/design-patterns/typescript](https://refactoring.guru/design-patterns/typescript))

**Recomendação 5 — Aplicar "Rule of Three" para refatoração:**
Não refatorar duplicação com menos de 3 ocorrências — o custo de abstração supera o benefício. Para o projeto atual:
- **Imediato (2+ ocorrências):** Button, Modal, Card, Badge — unificar entre FormComponents.tsx e arquivos dedicados (já na Tarefa 1.6)
- **Imediato:** `exportToCSV` vs `exportToExcel` — renomear (já na Tarefa 1.7)
- **Curto prazo:** Interfaces manuais em `dashboard/page.tsx` — substituir por tipos de `database.ts` (Tarefa 3.3)
- **Curto prazo:** Lógica de formatação de data em linha — centralizar em `utils.ts` (já existe `formatDate`, verificar uso consistente)
- **Médio prazo:** Query patterns repetidos (`.from('campaigns').select(...)`) — extrair para funções reutilizáveis em `lib/queries/`

**Recomendação 6 — Extrair funções de query para camada de dados:**
O padrão atual mistura chamadas Supabase dentro de componentes e hooks. Extrair para funções nomeadas:
```typescript
// lib/queries/campaigns.ts
export async function getActiveCampaigns(churchId: string) {
  const supabase = createClient();
  return supabase
    .from('campaigns')
    .select('*')
    .eq('church_id', churchId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
}
```
Isolamento de queries permite testar a camada de dados independentemente dos componentes, substituir Supabase sem tocar em UI, e adicionar cache/retry centralizado.

**Recomendação 7 — Padronizar tratamento de erros com Result Type:**
Substituir o padrão inconsistente atual (`try/catch` com `setError`, `alert()`, `console.error`, catch vazio) por um Result Type unificado:
```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function getCampaign(id: string): Promise<Result<Campaign>> {
  try {
    const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single();
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e as Error };
  }
}
```
Isso força o caller a tratar ambos os casos, eliminando o padrão de ignorar erros.

---

#### 3.13.4 Documentação de Código e Arquitetura

**Contexto:** O projeto possui `README.md` (desatualizado — contradiz a config real de deploy), `ANALISE.md` (este documento), e comentários esparsos no código. Não há documentação de arquitetura, ADRs (Architecture Decision Records), JSDoc em funções públicas, ou Storybook para o design system.

**Fontes:**
- **Pagepro (2026):** "Living documentation inside the repo: README per feature + docs/adr/ folder for architecture decisions. JSDoc/TypeDoc for public APIs/components." ([pagepro.co/blog/web-development-best-practices](https://pagepro.co/blog/web-development-best-practices))
- **Symphco Engineering Standards:** "Document components and functions clearly, providing examples where necessary. Maintain a README file with project setup instructions and other essential information." ([github.com/symphco/engineering-standards](https://github.com/symphco/engineering-standards))
- **Strapi Blog (2026):** "Document as you go: With AI, you can get the documentation built without spending time writing the documentation."

**Recomendação 8 — Criar ADRs (Architecture Decision Records):**
Para cada decisão arquitetural significativa, criar um arquivo Markdown em `docs/adr/`:
```
docs/adr/
  001-usar-nextjs-14-app-router.md
  002-usar-supabase-como-backend-unico.md
  003-estrutura-de-diretorios-por-feature.md
  004-escolha-de-vitest-para-testes.md
```
Template:
```markdown
# ADR 001: Usar Next.js 14 App Router

**Data:** 2026-07-26
**Status:** Aceito

**Contexto:** Precisávamos escolher um framework React para a plataforma de campanhas.

**Decisão:** Usar Next.js 14 com App Router.

**Consequências:** Positivas — Server Components, layouts aninhados, streaming. Negativas — todas as páginas atualmente são Client Components, precisamos migrar.
```

**Benefício:** ADRs documentam o *porquê* das decisões. Um novo desenvolvedor entende o racional sem precisar perguntar. ADRs previnem "por que fizemos assim?" meses depois.

**Recomendação 9 — JSDoc/TypeDoc em funções públicas:**
Adicionar documentação para funções exportadas em `lib/utils.ts`, hooks, e componentes do design system:
```typescript
/**
 * Combina classes CSS com suporte a clsx e tailwind-merge.
 * @param classes Classes CSS, objetos condicionais, ou arrays
 * @returns String de classes merged
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
```
Ferramentas TypeDoc geram site de documentação automaticamente a partir dos comentários.

**Recomendação 10 — Manter README atualizado:**
O README atual descreve deploy como "Static Site" com `out/`, mas o `next.config.js` usa `output: 'standalone'`. Atualizar para refletir:
- Stack real (Next.js 14 + Supabase + Tailwind + Docker)
- Comandos de desenvolvimento (`npm run dev`, `npm run build`, `npm run test`)
- Estrutura de diretórios
- Variáveis de ambiente necessárias
- Fluxo de deploy (Render Web Service + Docker)

---

#### 3.13.5 TypeScript Strict Patterns: Branded Types, Discriminated Unions, Tipo Seguro

**Contexto:** O tsconfig já tem `strict: true`, mas o código não usa o sistema de tipos para modelar estados de forma segura. Múltiplos `useState` separados (loading, error, data) em vez de discriminated unions.

> **Nota de proporcionalidade:** Branded types (Recomendação 12) é um padrão avançado opcional. Não é requisito para as tarefas da Seção 5 e não deve bloquear implementações. Priorizar discriminated unions (R11) e `noUncheckedIndexedAccess` (R13) que têm maior custo-benefício.

**Fontes:**
- **FlairCross (Abr/2026):** "Branded types prevent primitive obsession by creating distinct types from the same underlying primitive. Discriminated unions model exclusive states elegantly, replacing complex boolean flags." ([flaircross.com/blog/typescript-advanced-patterns-best-practices-2026](https://www.flaircross.com/blog/typescript-advanced-patterns-best-practices-2026))
- **DevStars (Fev/2026):** "The most common runtime bug in large TypeScript codebases? Passing a userId where an orderId is expected. Branded types fix this at compile time with zero runtime cost." ([devstarsj.github.io/2026/02/25/typescript-advanced-patterns-2026](https://devstarsj.github.io/2026/02/25/typescript-advanced-patterns-2026))
- **BetterStack (Dez/2025):** "Discriminated unions give you precise type narrowing based on a common property, turning loose runtime checks into compile-time guarantees." ([betterstack.com/community/guides/scaling-nodejs/discriminated-unions](https://betterstack.com/community/guides/scaling-nodejs/discriminated-unions))
- **Dibyank Padhy (Mar/2026):** "TypeScript configuration: strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitReturns, noFallthroughCasesInSwitch, verbatimModuleSyntax." ([dibyank.com/blog/typescript-best-practices-2026-advanced-patterns](https://dibyank.com/blog/typescript-best-practices-2026-advanced-patterns))
- **Wh0FF24 (Abr/2026):** "Branded types, discriminated unions, exhaustive checks, satisfies operator, utility types (DeepPartial, StrictOmit, DeepNonNullable)." Dev.to — padrões avançados comprovados em produção. ([dev.to/whoffagents/advanced-typescript-patterns-branded-types-discriminated-unions-and-exhaustive-checks-3go5](https://dev.to/whoffagents/advanced-typescript-patterns-branded-types-discriminated-unions-and-exhaustive-checks-3go5))

**Recomendação 11 — Adotar discriminated unions para estados assíncronos:**
Substituir múltiplos `useState` (loading, error, data) por um tipo unificado:
```typescript
// types/index.ts
type AsyncState<T, E = string> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

// Uso em componentes:
function CampaignList() {
  const [state, setState] = useState<AsyncState<Campaign[]>>({ status: 'idle' });

  if (state.status === 'idle') return <p>Clique para carregar</p>;
  if (state.status === 'loading') return <Skeleton />;
  if (state.status === 'error') return <ErrorFallback message={state.error} />;
  // TS sabe que state.data existe aqui
  return <List items={state.data} />;
}
```
**Benefício:** Estados impossíveis se tornam impossíveis. Não existe `{ loading: true, error: 'falhou', data: [...] }`. Zero runtime cost — o tipo desaparece na compilação.

**Recomendação 12 — Branded types para IDs de domínio:**
```typescript
// types/branded.ts
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type CampaignId = Brand<string, 'CampaignId'>;
type ChurchId = Brand<string, 'ChurchId'>;
type UserId = Brand<string, 'UserId'>;
type ResponseId = Brand<string, 'ResponseId'>;

// Funções factory (apenas construtoras criam brands)
function createCampaignId(id: string): CampaignId {
  if (!id || typeof id !== 'string') throw new Error('Invalid CampaignId');
  return id as CampaignId;
}

// Uso: funções tipadas com brands
async function getCampaign(id: CampaignId): Promise<Campaign> { ... }
async function getResponses(campaignId: CampaignId): Promise<Response[]> { ... }

// Erro em compile time: Argument of type 'string' is not assignable to parameter of type 'CampaignId'
```
**Impacto:** Previne a classe mais comum de bugs em TypeScript — passar o ID errado onde o tipo certo é esperado. Ambas são `string`, mas TypeScript agora distingue.

**Recomendação 13 — Configuração TypeScript mais estrita:**
Adicionar ao `tsconfig.json` (além do `strict: true` já existente):
```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": false
  }
}
```
- `noUncheckedIndexedAccess`: `arr[0]` passa a ser `T | undefined` — força checagem
- `verbatimModuleSyntax`: obriga `import type` para tipos — eliminados do bundle
- `noPropertyAccessFromIndexSignature`: impede `obj.prop` se `prop` não está nas chaves conhecidas do tipo

**Recomendação 14 — Exhaustive checking com `assertNever`:**
Garantir que todos os casos de discriminated unions são tratados:
```typescript
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function handleState(state: AsyncState<Campaign[]>) {
  switch (state.status) {
    case 'idle': return <Idle />;
    case 'loading': return <Loading />;
    case 'success': return <Data data={state.data} />;
    case 'error': return <Error error={state.error} />;
    default: return assertNever(state); // Erro se um novo caso for adicionado e não tratado
  }
}
```

**Recomendação 15 — Substituir `as any` por `unknown` + narrowing:**
O projeto tem `as any` em `useSupabase.ts` (campaignIdsQuery). Substituir:
```typescript
// RUIM:
const campaignIds = await supabase.from('campaigns').select('id').eq('church_id', churchId) as any;

// BOM:
const { data: campaigns } = await supabase
  .from('campaigns')
  .select('id')
  .eq('church_id', churchId)
  .returns<{ id: string }[]>();
const campaignIds = campaigns?.map(c => c.id) ?? [];
```

**Recomendação 16 — Usar `satisfies` em vez de type assertion:**
```typescript
// RUIM: perde tipos literais
const config = { primaryColor: '#C29560' } as const;

// BOM: valida sem widar
const config = {
  primaryColor: '#C29560' as const,
  secondaryColor: '#D4A86A' as const,
} satisfies Record<string, string>;
```

---

#### 3.13.6 Plano de Implementação por Fase

| Fase | Ação | Esforço | Depende de |
|------|------|---------|------------|
| 1 | Unificar componentes duplicados (Button, Modal, Card) | 2h | Tarefa 1.6 |
| 1 | Renomear exportToCSV → exportToExcel | 30min | Tarefa 1.7 |
| 1 | Tipos consistentes (eliminar interfaces manuais) | 3h | Tarefa 3.3 |
| 2 | Extrair queries para camada de dados (`lib/queries/`) | 4h | Fase 1 |
| 2 | Migrar hooks para discriminated unions (`AsyncState`) | 4h | Fase 1 |
| 2 | Reorganizar diretórios por feature | 6h | Fase 1 |
| 3 | Adicionar `noUncheckedIndexedAccess` + `verbatimModuleSyntax` | 1h | Fase 2 |
| 3 | Branded types para IDs de domínio | 2h | Fase 2 |
| 3 | `assertNever` em todos os switch de estado | 1h | Fase 2 |
| 3 | Criar ADRs para decisões arquiteturais | 2h | Contínuo |
| 3 | Atualizar README com stack e setup reais | 1h | Tarefa 1.4 |
| 3 | JSDoc em funções públicas (utils, hooks, componentes) | 3h | Contínuo |

**Resumo:** A manutenibilidade do projeto será significativamente melhorada com (a) reorganização por features em vez de tipo, (b) tipos mais rigorosos (branded types, discriminated unions, `noUncheckedIndexedAccess`), (c) eliminação de duplicação sistemática seguindo a "Rule of Three", e (d) documentação viva via ADRs + JSDoc + README atualizado. O monorepo não é recomendado para o estágio atual do projeto. O esforço total estimado é de ~30h distribuídas em 3 fases.

### 3.14 Recomendações de Documentação
*(Agente 29/15)*

**Contexto:** O README.md atual contém imprecisões (menciona React Hook Form + Zod e qrcode.react que não existem no projeto, afirma deploy como Static Export quando na verdade usa `output: 'standalone'` via Docker, e lista estrutura de diretórios divergente da real). Não há CHANGELOG.md, CONTRIBUTING.md, documentação de componentes, nem guia de deploy/manutenção.

#### 3.14.1 README — Reescrita Completa

Baseado nas melhores práticas de 2026 (fontes: audit de 100+ repositórios com 10k+ estrelas), o README deve seguir esta estrutura:

1. **Título + value proposition em 1 linha** — "Igreja Planalto: plataforma de campanhas e formulários com QR Code para igrejas. SaaS-ready com Next.js 14 + Supabase."
2. **Screenshot/GIF demonstrativo** — Projetos com hero image têm +35% de conversão em estrelas/engajamento.
3. **Badges relevantes** — License, build status, última atualização. Pular métricas de vaidade.
4. **Quick start em 30 segundos** — `cp .env.example .env.local && npm install && npm run dev`.
5. **Feature table** (tabelas escaneáveis, não bullet lists) — Ex: Gestão de Campanhas ✅ | Formulário Dinâmico ✅ | QR Code PNG/SVG/PDF ✅ | Analytics ✅ | Multi-igreja ✅ | RLS ✅.
6. **Seção "Por quê?"** — Explicar o problema: igrejas precisam de formulários com QR Code sem depender de plataformas caras.
7. **Links para documentação** — Manter README conciso (<1500 palavras), linkar para docs detalhadas.
8. **Corrigir erros factuais** — Remover React Hook Form, Zod, qrcode.react. Trocar "Static Export" por "Docker/Render (standalone)". Alinhar estrutura de diretórios com a real.

**Ação:** Reescrever `/home/tork/Projetos/igreja-planalto/README.md` do zero. [Ver Tarefa 3.14.1]

#### 3.14.2 Documentação de Componentes (Storybook + JSDoc)

Para um projeto com ~20 componentes de UI (Button, Card, Input, Modal, FormComponents, QRCodeGenerator etc.):

- **Storybook 8** é a ferramenta dominante em 2026, mas para projetos <50 componentes pode ser overkill. Alternativa leve: **Ladle** (Vite-first, mais rápido, feature-light).
- **Recomendação para este projeto:** Como são ~15 componentes e o time é pequeno, usar **JSDoc + TypeScript types** já existentes nos componentes e gerar documentação estática com **TypeDoc** ou manter no próprio Storybook se o projeto crescer.
- **Mínimo viável:** Adicionar comentários JSDoc nos componentes públicos (`@param`, `@returns`, `@example`) — o Storybook autodocs já extrai props table do TypeScript sem configuração extra.
- **CI:** Futuramente, adicionar validação que stories existam para cada componente público.

**Ação:** Adicionar JSDoc nos componentes principais (`Button.tsx`, `Modal.tsx`, `CampaignForm.tsx`, `QRCodeGenerator.tsx`). [Ver Tarefa 3.14.2]

#### 3.14.3 Changelog Automation

**Recomendação: release-please (Google)**

- **Por quê?** Para projetos pequenos sem publish em npm, o `release-please` é mais simples que `semantic-release`. Ele cria Release PRs automaticamente a partir de Conventional Commits, sem need de plugins complexos.
- **Funcionamento:** A cada push na `main`, analisa commits → cria/atualiza Release PR com changelog e version bump → ao mergear o PR, cria GitHub Release e atualiza CHANGELOG.md.
- **Setup:** Adicionar workflow `.github/workflows/release-please.yml` + `commitlint.config.js` para validar formato Conventional Commits nos PRs.
- **Padrão de commits:** `feat:`, `fix:`, `docs:`, `chore:`, `BREAKING CHANGE:` no footer para major.

**Ação:** Configurar release-please + commitlint. [Ver Tarefa 3.14.3]

#### 3.14.4 CONTRIBUTING.md

Para projetos pequenos (single team, <5 devs), o template deve ser enxuto mas cobrir:

1. **Código de Conduta** — Link para `CODE_OF_CONDUCT.md` (padrão Contributor Covenant).
2. **Como contribuir** — Reportar bugs (issue template), sugerir features, abrir PR.
3. **Setup local** — `cp .env.example .env.local`, `npm install`, `npm run dev`.
4. **Padrões de código** — TypeScript strict, ESLint (`npm run lint`), Prettier (após configurar).
5. **Commits** — Exigir Conventional Commits (`feat:`, `fix:`, etc).
6. **Processo de PR** — Fork → branch `feature/` → PR para `main` → review → merge.
7. **Checklist do PR** — `[ ]` itens: código segue estilo, auto-review, sem warnings, testes passam.

**Ação:** Criar `CONTRIBUTING.md` e `CODE_OF_CONDUCT.md` na raiz. [Ver Tarefa 3.14.4]

#### 3.14.5 Documentação Técnica para Deploy e Manutenção

Criar `docs/` na raiz com:

1. **`docs/deploy.md`** — Guia completo de deploy:
   - **Render (Web Service):** Build `npm run build`, Start `npm start` (standalone server). Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`.
   - **Docker:** Uso do multi-stage build existente. `docker build -t igreja-planalto . && docker run -p 3000:3000 igreja-planalto`.
   - **GitHub Actions:** Workflow atual faz type-check + build. Futuramente adicionar step de deploy automático para Render via webhook ou Render API.
   - **CI/CD atual:** O workflow `deploy.yml` só valida o build. Recomenda-se adicionar deploy automático com `render_trigger_deploy` ou webhook do Render.

2. **`docs/manutencao.md`** — Manutenção contínua:
   - **Atualização de dependências:** `npm outdated` mensal, `npx npm-check-updates -u` para major.
   - **Backup do banco:** Supabase Dashboard → Database → Backups (automático em planos pagos).
   - **Monitoramento:** Supabase Dashboard para erros de banco, Render Dashboard para logs de aplicação, UptimeRobot (grátis) para health check.
   - **SSL/Custom domain:** Configurar domínio personalizado no Render Dashboard.
   - **Storage:** Limpeza periódica de imagens não utilizadas no bucket Supabase.
   - **Segurança:** Revisar RLS policies no schema.sql, rotacionar chaves anon keys periodicamente, manter `@supabase/ssr` atualizado para patches de auth.
   - **Logs:** `render_list_logs` (MCP) ou dashboard do Render para debug.

3. **`docs/guia-rapido.md`** — Guia de 5 minutos para novo desenvolvedor:
   - Pré-requisitos (Node 20+, Supabase, Docker opcional)
   - `cp .env.example .env.local` e preencher variáveis
   - `npm run dev` → localhost:3000
   - Login padrão: criar conta em `/dashboard/register`
   - Schema SQL em `supabase/schema.sql` (aplicar manualmente no projeto Supabase)
   - Comandos úteis: `npm run lint`, `npm run type-check`, `npm run build`

**Ação:** Criar `docs/deploy.md`, `docs/manutencao.md`, `docs/guia-rapido.md`. [Ver Tarefa 3.14.5]

### 3.15 Recomendações de Monitoramento
*(Agente 30 - Relatório Completo de Monitoramento)*

#### Stack Recomendada

> **Nota de proporcionalidade:** 6 ferramentas de monitoramento é excessivo para o porte atual. A stack completa (Sentry + Pino + Lighthouse CI + web-vitals + Better Stack + Plausible) é aspiracional. Prioridade imediata é **Sentry** (error tracking) + **health check endpoint**. Adicionar Pino e Lighthouse CI gradualmente. Better Stack e Plausible podem esperar.

| Categoria | Ferramenta | Custo | Prioridade |
|-----------|-----------|-------|------------|
| APM + Error Tracking | **Sentry** | Gratuito (5k eventos/mês) | Alta |
| Logging Estruturado | **Pino** | Open source | Alta |
| Performance (Lab) | **Lighthouse CI** | Gratuito | Média |
| Performance (RUM) | **web-vitals** | Gratuito | Média |
| Uptime + Alertas | **Better Stack** | Gratuito (3 monitores) | Média |
| Analytics | **Plausible** | $9/mês ou self-host | Baixa |

---

#### 1. APM e Error Tracking: Sentry

**Por que Sentry:** Padrão da indústria para Next.js. Captura erros em client, server e edge runtimes com stack traces completos, source maps, session replay e tracing distribuído. Integra-se nativamente com o App Router do Next.js 14+.

**Instalação (wizard oficial - recomendado):**
```bash
npx @sentry/wizard@latest -i nextjs
```
O wizard detecta automaticamente o framework, cria os arquivos de configuração, gera um DSN, configura source maps e cria uma página de teste.

**O que o wizard cria (`@sentry/nextjs` v8+):**

| Arquivo | Runtime | Propósito |
|---------|---------|-----------|
| `src/instrumentation-client.ts` | Browser | `Sentry.init()` com replay, traces, logs |
| `src/sentry.server.config.ts` | Node.js | `Sentry.init()` server-side |
| `src/sentry.edge.config.ts` | Edge | `Sentry.init()` para middleware/edge |
| `src/instrumentation.ts` | Server/Edge | `register()` condicional + `onRequestError` |
| `src/app/global-error.tsx` | Browser | Error boundary do App Router |
| `src/app/sentry-example-page/` | Teste | Página para verificar integração |
| `.env.sentry-build-plugin` | Build | Auth token para upload de source maps |

**Configuração client (`instrumentation-client.ts`):**
```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
});
```

**Configuração server (`sentry.server.config.ts`):**
```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
});
```

**Configuração edge (`sentry.edge.config.ts`):**
```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
});
```

**Instrumentação (`instrumentation.ts`):**
```ts
import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
```

**Wrapping do `next.config.js`:**
```js
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  tunnelRoute: '/sentry-tunnel',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
```

**Server Actions (instrumentação manual necessária):**
```ts
import { withServerActionInstrumentation } from '@sentry/nextjs';
import { headers } from 'next/headers';

export async function serverAction(formData: FormData) {
  return withServerActionInstrumentation(
    'serverAction',
    { headers: headers() },
    async () => {
      // lógica
    },
  );
}
```

**Logs estruturados via Sentry (novo no v8):**
```ts
Sentry.logger.info('User action', { userId: '123' });
Sentry.logger.warn('Slow response', { duration: 5000 });
Sentry.logger.error('Operation failed', { reason: 'timeout' });
```

**Alertas recomendados no Sentry:**
- New issue: imediato (Slack #alerts)
- Regressão de issue resolvida: imediato
- High volume (>100 eventos/hora): alerta ao grupo
- P95 API > 3s: alerta de performance

**Sampling:**
- Erros: 100% (`sampleRate: 1.0`)
- Traces (performance): 10% produção (`tracesSampleRate: 0.1`)
- Session replay: apenas em erros (`replaysOnErrorSampleRate: 1.0`, `replaysSessionSampleRate: 0.1`)

**Filtro de ruído (`beforeSend`):**
```ts
beforeSend(event, hint) {
  const frames = event.exception?.values?.[0]?.stacktrace?.frames;
  if (frames?.some(f => f.filename?.includes('chrome-extension://'))) return null;
  if (hint.originalException instanceof TypeError &&
      hint.originalException.message === 'Failed to fetch') return null;
  return event;
}
```

**Impacto no bundle:** ~80-100KB Sentry SDK + ~40-50KB replay. Aceitável para app interno.

**Variáveis de ambiente necessárias:**
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@o000.ingest.sentry.io/000
SENTRY_ORG=igreja-planalto
SENTRY_PROJECT=igreja-planalto
SENTRY_AUTH_TOKEN=sntrys_xxx
```

---

#### 2. Logging Estruturado: Pino

**Por que Pino:** 5-10x mais rápido que Winston. JSON por padrão, redação de PII nativa, child loggers com correlação via AsyncLocalStorage, suporte nativo a ecossistema OpenTelemetry.

**Benchmark:** Pino ~650k-720k ops/sec vs Winston ~10k-15k ops/sec. A diferença torna-se mensurável no event loop acima de 1.000 req/min.

**Instalação:**
```bash
npm install pino
npm install -D pino-pretty       # apenas dev
```

**Logger raiz (`src/lib/logger.ts`):**
```ts
import pino from 'pino';

const level = process.env.LOG_LEVEL ?? 'info';

export const logger = pino({
  level,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: 'igreja-planalto',
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
      '*.creditCard',
      'req.headers["x-api-key"]',
    ],
    censor: '[REDACTED]',
  },
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
  transport: process.env.NODE_ENV === 'development' && process.stdout.isTTY
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:HH:MM:ss', ignore: 'pid,hostname' } }
    : undefined,
});
```

**Correlação com AsyncLocalStorage (`src/lib/logger.ts`):**
```ts
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

const als = new AsyncLocalStorage<{ requestId: string; userId?: string; ip?: string }>();

export function runWithContext<T>(
  context: { userId?: string; ip?: string },
  fn: () => T,
): T {
  return als.run({ requestId: randomUUID(), ...context }, fn);
}

export function getLogger(bindings?: Record<string, unknown>) {
  const ctx = als.getStore();
  return logger.child({ ...ctx, ...bindings });
}
```

**Uso no middleware (`src/middleware.ts`):**
```ts
import { runWithContext, getLogger } from '@/lib/logger';

export async function middleware(request: NextRequest) {
  return runWithContext(
    { ip: request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown' },
    () => {
      const log = getLogger();
      log.info({ path: request.nextUrl.pathname, method: request.method }, 'incoming request');
      // ...
    },
  );
}
```

**Níveis de log:**

| Nível | Uso | Alerta | Custo |
|-------|-----|--------|-------|
| `fatal` | Processo caindo, irrecuperável | Pager imediato | Crítico |
| `error` | Operação falhou, serviço continua | Alerta 5min | Alto |
| `warn` | Performance degradada, retry | Dashboard | Médio |
| `info` | Request completo, job finalizado | Nunca | Baixo |
| `debug` | Estado interno, cache hit/miss | Sob demanda | Análise |
| `trace` | Dados por iteração, payloads brutos | Nunca em produção | Diagnóstico |

**Produção:** rodar em `info`. Criar endpoint protegido `/api/admin/log-level` para ativar `debug` sob demanda sem redeploy.

```ts
export async function POST(request: Request) {
  const { level } = await request.json();
  if (!['fatal', 'error', 'warn', 'info', 'debug', 'trace'].includes(level)) {
    return NextResponse.json({ error: 'invalid level' }, { status: 400 });
  }
  logger.level = level;
  return NextResponse.json({ level });
}
```

**Nunca usar `pino-pretty` em produção** — reduz throughput em 20-30x por executar o formatador na main thread.

**Integração com Sentry:** enviar logs de erro do Pino para o Sentry:
```ts
const sentryStream = {
  write(rec: any) {
    if (rec.level >= 50) Sentry.captureException(new Error(rec.msg));
  },
};
```

---

#### 3. Monitoramento de Performance: Lighthouse CI + Core Web Vitals

**Estratégia em camadas:**

| Camada | Ferramenta | O que detecta | Quando |
|--------|-----------|---------------|--------|
| Lab (pré-merge) | **Lighthouse CI** | Regressões de score, recursos bloqueantes | Cada PR |
| RUM (contínuo) | **web-vitals** | Problemas reais por dispositivo/geografia | Produção |
| Field data | **Search Console** | CWV como o Google vê | Semanal (lag 28d) |

**Lighthouse CI — Configuração:**

Arquivo `lighthouserc.js` na raiz:

```js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/c/campo-do-planalto/campanha-de-natal',
      ],
      numberOfRuns: 3,
      settings: { onlyCategories: ['performance', 'seo', 'accessibility'] },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

**GitHub Actions — Integração no `.github/workflows/deploy.yml`:**

```yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli@0.15.x
    lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```
Instalar o GitHub App oficial do Lighthouse CI: https://github.com/apps/lighthouse-ci

**Real User Monitoring (RUM) com `web-vitals`:**

```bash
npm install web-vitals
```

Criar `src/lib/web-vitals.ts`:
```ts
'use client';

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

type MetricHandler = (metric: { name: string; value: number; rating: string }) => void;

export function reportWebVitals(onReport?: MetricHandler) {
  const report = onReport ?? ((metric) => {
    if (metric.rating !== 'good') {
      console.warn(`[CWV] ${metric.name}: ${metric.value} (${metric.rating})`);
    }
  });
  onCLS(report);
  onFCP(report);
  onINP(report);
  onLCP(report);
  onTTFB(report);
}
```

Componente para usar no root layout:
```tsx
'use client';
import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';

export function ReportWebVitals() {
  useEffect(() => { reportWebVitals(); }, []);
  return null;
}
```

**Métricas monitoradas:**

| Métrica | O que mede | Bom | Precisa melhorar | Ruim |
|---------|-----------|-----|------------------|------|
| LCP | Carregamento do maior elemento | ≤2.5s | ≤4.0s | >4.0s |
| INP | Responsividade a interações | ≤200ms | ≤500ms | >500ms |
| CLS | Estabilidade visual | ≤0.1 | ≤0.25 | >0.25 |
| FCP | Primeira pintura de conteúdo | ≤1.8s | ≤3.0s | >3.0s |
| TTFB | Tempo até primeiro byte | ≤800ms | ≤1.8s | >1.8s |

**Envio das métricas para Sentry:**
```ts
reportWebVitals(({ name, value, rating }) => {
  Sentry.metrics.distribution(`web-vitals.${name}`, value, {
    unit: name === 'CLS' ? 'none' : 'millisecond',
    tags: { rating },
  });
});
```

---

#### 4. Uptime Monitoring e Alertas: Better Stack

**Por que Better Stack (ex-Better Uptime):** Plano gratuito inclui 3 monitores HTTP, heartbeat, SSL monitoring, status page pública, notificações por e-mail/Slack/SMS/voz. Alternativas: UptimeRobot (mais simples, sem heartbeat), Checkly (mais caro).

**Plano gratuito Better Stack:**
- 3 monitores HTTP/SSL
- 5 checks/min
- Status page pública
- Heartbeat monitoring
- Notificações: e-mail + Slack + SMS (3/mês)

**Implementação:**

**1. Endpoint de health check (`src/app/api/health/route.ts`):**
```ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    status: 'ok' as const,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage().heapUsed,
    version: process.env.npm_package_version ?? '1.0.0',
  };
  return NextResponse.json(checks, { status: 200 });
}
```

**2. Endpoint de health check com dependências (opcional):**
```ts
export async function GET() {
  const checks: Record<string, string> = {};
  try {
    const supabase = createClient();
    const { error } = await supabase.from('churches').select('id').limit(1);
    checks.supabase = error ? `error: ${error.message}` : 'ok';
  } catch (e) {
    checks.supabase = `error: ${e}`;
  }
  const allOk = Object.values(checks).every(v => v === 'ok');
  return NextResponse.json(
    { status: allOk ? 'ok' : 'degraded', ...checks },
    { status: allOk ? 200 : 503 },
  );
}
```

**3. HEALTHCHECK no Dockerfile:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
```

**4. Configuração no Better Stack:**
- Monitor HTTP: `https://igrejaplanalto.onrender.com/api/health`
- Intervalo: 5 minutos, Timeout: 10s
- Regiões: US East, EU West (mínimo 2)
- Trigger: 2 falhas consecutivas
- Heartbeat: opcional para cron jobs futuros
- Status page: pública para transparência
- Notificações: Slack #alerts + e-mail do admin

**5. Monitor de SSL:** O Better Stack detecta automaticamente expiração de certificado SSL com alertas 30, 14, 7 e 1 dia antes.

**6. API do Better Stack (para automação):**
```bash
curl -X POST https://uptime.betterstack.com/api/v2/monitors \
  -H "Authorization: Bearer $BETTERSTACK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "monitor": {
      "monitor_type": "http",
      "url": "https://igrejaplanalto.onrender.com/api/health",
      "check_frequency": 300,
      "expected_status_code": 200,
      "timeout": 10,
      "regions": ["us-east", "eu-west"]
    }
  }'
```

---

#### 5. Analytics: Plausible

**Por que Plausible:** Script de ~1KB (45x menor que GA4), zero cookies (GDPR-ready sem banner), não é bloqueado por ad blockers, open source (possível self-host).

**Planos:**

| Plano | Preço | Eventos/mês | Sites |
|-------|-------|-------------|-------|
| Cloud Trial | Grátis | 2k | 1 |
| Cloud Plausible | $9/mês | 10k | Ilimitados |
| Cloud Business | $19/mês | 100k | Ilimitados |
| Self-hosted | Grátis | Ilimitado | Ilimitados |

**Integração com Next.js:**

**Opção 1 — Script no layout (recomendado, mais simples):**
```tsx
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          defer
          data-domain="igrejaplanalto.onrender.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Opção 2 — NPM package (`@plausible/analytics`):**
```bash
npm install plausible-tracker
```
```ts
// src/lib/analytics.ts
import Plausible from 'plausible-tracker';

export const plausible = Plausible({
  domain: 'igrejaplanalto.onrender.com',
});
```

**Eventos personalizados:**
```ts
plausible('formulario-enviado', { props: { campanha: 'natal-2024' } });
plausible('qr-code-gerado', { props: { formato: 'png' } });
```

**Metas recomendadas (configurar no dashboard do Plausible):**
- **Pageview:** `/c/*/*` (formulários de campanha)
- **Goal:** `formulario-enviado`
- **Goal:** `qr-code-gerado`
- **Goal:** `download-csv`
- **Goal:** `download-excel`

**Self-hosting Plausible (gratuito, sem limites):**
```bash
git clone https://github.com/plausible/analytics.git
cd analytics && docker compose up -d
```
Custo médio: ~$10-15/mês em VPS (2GB RAM, 1 CPU).

**Métricas disponíveis:** pageviews, visitantes únicos, bounce rate, duração da sessão, top páginas, top referrers, top países, metas e funis de conversão.

---

#### Resumo de Prioridades

| Ordem | Ação | Esforço | Impacto | Depende de |
|-------|------|---------|---------|------------|
| 1 | **Sentry** (error monitoring + source maps) | 1h | Crítico | Conta Sentry + DSN |
| 2 | **Pino** (logging estruturado) | 1h | Alto | Nenhuma |
| 3 | Endpoint `/api/health` | 20min | Alto | Nenhuma |
| 4 | **Better Stack** (uptime + SSL) | 1h | Alto | Conta Better Stack |
| 5 | **Lighthouse CI** no GitHub Actions | 2h | Médio | Token GitHub App |
| 6 | **web-vitals** RUM | 1h | Médio | Nenhuma |
| 7 | **Plausible** (analytics) | 1h | Baixo | Conta Plausible |

**Ordem de execução recomendada:**
1. Dia 1 (2h): Sentry + Health Check → visibilidade imediata de erros
2. Dia 1 (1h): Better Stack → alertas de downtime
3. Dia 2 (1h): Pino → logging estruturado
4. Dia 2 (2h): Lighthouse CI → barreira de qualidade pré-merge
5. Dia 2 (1h): web-vitals → RUM
6. Dia 3 (1h): Plausible → analytics

**Estimativa total:** ~8h de implementação, zero custo recorrente com plano gratuito.

---

## Seção 4: Validação de Coerência
### 4.1 Verificação de Compatibilidade
*(Agente 31 - Relatório de Verificação de Coerência)*

#### Resumo das Verificações Realizadas

O Agente 31/15 realizou uma leitura completa do ANALISE.md (~9345 linhas) e identificou conflitos entre recomendações, duplicações excessivas, itens fora de ordem de prioridade, recomendações inadequadas ao porte do projeto, e conexões faltantes entre seções. O checklist final de cada seção encontra-se ao final.

---

#### Conflitos Encontrados e Resolução

| # | Conflito | Seções | Resolução |
|---|----------|--------|-----------|
| 1 | **Estratégia de redução de bundle tripla**: 3.2 recomenda `optimizePackageImports`, 3.9 recomenda substituir recharts/jspdf/qrcode por alternativas, 3.12 recomenda dynamic imports. Três abordagens conflitantes para o mesmo problema. | 3.2.5, 3.9.2, 3.12.4 | **Resolvido**: Unificar em estratégia única — usar dynamic imports (`next/dynamic`) para recharts/qrcode/jspdf como passo imediato (menos invasivo). Substituição de bibliotecas (3.9.2) é arriscada (ChartKit/podpdf podem não ter manutenção) e deve ser avaliada separadamente. `optimizePackageImports` é complementar, não substituto. |
| 2 | **React Query vs SWR**: 3.1 recomenda TanStack Query, 3.2 menciona SWR como alternativa. Sem critério de decisão. | 3.1.3 (R7), 3.2.7 | **Resolvido**: Recomendar TanStack Query como padrão (mais recursos, DevTools, mutations otimistas). SWR mencionado apenas como alternativa se bundle for preocupação crítica. Seção 3.2 atualizada para referenciar 3.1 como recomendação primária. |
| 3 | **Rate limiting sem considerar dependência externa**: 3.3.7 recomenda Upstash Redis para rate limiting, mas o deploy é no Render sem Redis. A recomendação não menciona que Upstash é um serviço externo pago. | 3.3.7, 3.7 | **Resolvido**: Adicionar nota que rate limiting via Upstash requer conta externa. Alternativa: rate limiting via Render (plataforma) ou middleware simples baseado em IP sem Redis (para começar). |
| 4 | **Sistema de roles**: 1.9.15 recomenda "unificar" sem especificar direção. 3.3.3 recomenda migrar para `user_roles` como fonte única. As seções 1.11 e 1.12 apontam a confusão mas não convergem. | 1.9.15, 3.3.3, 1.11, 1.12 | **Resolvido**: Adotar recomendação de 3.3.3 como definitiva — migrar para `user_roles` como fonte única e remover `profiles.role`, ajustando RLS policies. Registrar em 1.9.15 e 1.11. |
| 5 | **`@types/jspdf` no plano de testes vs substituição de jspdf**: 2.1.1 instala `@types/jspdf` mas 3.9.2 recomenda substituir jspdf por podpdf. | 2.1.1, 3.9.2 | **Resolvido**: Remover `@types/jspdf` da lista de instalação em 2.1.1. Se a substituição não for realizada, reinstalar posteriormente. Adicionar nota de dependência entre as tarefas. |
| 6 | **Ordem de Server Components**: Diferentes seções propõem ordens diferentes para conversão a Server Components. | 3.1.1, 3.2.3, 3.11.4, 3.12.4 | **Resolvido**: Padronizar ordem: (1) Landing page, (2) Rota pública de campanha, (3) Dashboard stats via RPC, (4) Extração de leaf components. Alinhar com Tarefa 2.1. |

---

#### Duplicações Identificadas e Consolidades

As seguintes duplicações foram detectadas e resolvidas via cross-reference em vez de repetição:

| Tópico | Aparece em | Ação |
|--------|-----------|------|
| Duplicação de componentes UI (Button/Modal/Card) | 1.3, 1.7, 3.4, Tarefa 1.6 | Manter apenas em 1.3 e Tarefa 1.6; referenciar em 1.7 e 3.4 |
| Fonte Inter não carregada via next/font | 1.7, 3.2, 3.11, 3.12, Tarefa 2.4 | Manter em 1.7 (diagnóstico) e Tarefa 2.4 (execução); demais referenciar |
| URL hardcoded | 1.2, 1.5, 1.6, 1.9, 1.13, Tarefa 1.3 | Manter em 1.2 (diagnóstico) e Tarefa 1.3 (execução); demais referenciar |
| Dark mode ausente | 1.7 (2x), 3.4, 3.10 | Manter em 1.7 (diagnóstico) e 3.4.4 (recomendação); demais remover duplicação |
| Sem testes configurados | 1.1, 1.6, 1.15, 3.6 | Manter em 1.1 (menção inicial) e 3.6 (recomendação completa); demais referenciar |
| Schema `private` não criado | 1.11 (2x) | Consolidar em uma menção |
| RLS `insert_own_role` crítica | 1.9, 1.11, 3.3, 3.8 | Manter em 3.3.3 (solução completa); demais referenciar |

---

#### Ajustes Manuais Necessários

Os seguintes ajustes foram aplicados neste documento:

1. **Seção 2 (Testes)**: Adicionada nota de proporcionalidade — 1700 testes é meta aspiracional de longo prazo, não requisito imediato. Prioridade é configurar Vitest + ~50 testes iniciais (utils + componentes principais).

2. **Seção 3.9.2**: Adicionado aviso de risco — ChartKit, podpdf e @ttsalpha/qrcode são bibliotecas pouco estabelecidas. Dynamic imports com as bibliotecas atuais é a abordagem recomendada no curto prazo.

3. **Seção 3.12.5 (PWA)**: Adicionada nota de proporcionalidade — push notifications e background sync são futuros distantes. Prioridade é manifest.json + service worker básico.

4. **Seção 3.13.5 (Branded Types)**: Adicionada nota que branded types são avançados e opcionais; não bloquear tarefas por isso.

5. **Seção 3.15 (Monitoramento)**: Adicionada nota que a stack completa (6 ferramentas) é aspiracional. Prioridade imediata é Sentry + health check.

6. **Tarefas na Seção 5**: 
   - Tarefa 1.7 (renomear exportToCSV) movida para Fase 3 (prioridade baixa)
   - Adicionada Tarefa 1.8: Corrigir RLS `insert_own_role` (crítica de segurança)
   - Adicionada Tarefa 1.9: Adicionar security headers (crítica)
   - Adicionada Tarefa 1.10: Criar schema `private` e adicionar RPCs faltantes
   - Adicionada Tarefa 3.5: Regenerar database.ts para alinhar com schema.sql
   - Adicionada Tarefa 3.6: Atualizar README.md com informações corretas
   - Adicionada Tarefa 3.7: Aplicar cores dinâmicas do banco ao tema CSS
   - Tarefa 2.1: Adicionar especificamente a otimização do N+1 em useDashboardStats

---

#### Checklist Final de Todas as Seções

| Seção | Descrição | Status | Observação |
|-------|-----------|--------|------------|
| **1.1** | Estrutura e Configurações | ✅ Completa | Inventário completo de arquivos e configs |
| **1.2** | Rotas e Layouts | ✅ Completa | Árvore de diretórios detalhada, problemas identificados |
| **1.3** | Componentes | ✅ Completa | Todos os 9 componentes analisados, duplicação identificada |
| **1.4** | Libs e Utilitários | ✅ Completa | 5 arquivos analisados, bugs de nomenclatura encontrados |
| **1.5** | Dashboard (Admin) | ✅ Completa | 14 páginas analisadas em detalhe |
| **1.6** | Rotas Públicas e Campanhas | ✅ Completa | Fluxo de formulário público documentado |
| **1.7** | Estilos e Tema | ✅ Completa | Paleta, design system, responsividade, acessibilidade |
| **1.8** | Imports e Dependências | ✅ Completa | Análise de bundle, CI/CD, Docker, scripts |
| **1.9** | Middleware e Segurança | ✅ Completa | 15 subseções de segurança, vulnerabilidades catalogadas |
| **1.10** | Storage e Upload | ✅ Completa | Upload, componentes, limitações documentadas |
| **1.11** | Schema do Banco | ✅ Completa | 7 tabelas, RLS, índices, discrepâncias identificadas |
| **1.12** | Fluxo de Autenticação | ✅ Completa | Fluxos de login/logout/registro/sessão documentados |
| **1.13** | Render e Deploy | ✅ Completa | Contradição Docker vs README identificada |
| **1.14** | Supabase/Integrações | ✅ Completa | 22+ arquivos mapeados, problemas de performance |
| **1.15** | Resumo do Estado Atual | ✅ Completa | Síntese executiva dos Agentes 1-14 |
| **2.1** | Plano de Testes | ⚠️ Precisa Revisão | **1700 testes é desproporcional.** Reduzir para ~200 testes iniciais. Adicionar nota de proporcionalidade. |
| **3.1** | Recomendações de Arquitetura | ✅ Completa | Server-first, padrões de composição, migração por fases |
| **3.2** | Recomendações de Performance | ✅ Completa | Imagens, fontes, lazy loading, cache. **Conflito com 3.9.2 sobre substituição de libs resolvido.** |
| **3.3** | Recomendações de Segurança | ✅ Completa | CSP, RLS, CSRF, rate limiting. **Solução para `insert_own_role` documentada.** |
| **3.4** | Recomendações de UX/UI | ✅ Completa | Formulários, design system, loading states, dark mode |
| **3.5** | Recomendações de Código | ✅ Completa | TypeScript strict, flat config, clean code patterns |
| **3.6** | Recomendações de Testes | ✅ Completa | Testing Trophy, MSW, cobertura, a11y tests |
| **3.7** | Recomendações de Deploy/CI | ✅ Completa | Pipeline, Docker, preview, monitoramento |
| **3.8** | Recomendações de Banco | ✅ Completa | Índices, RLS, migrações, PITR. **Missing: criar schema `private`.** |
| **3.9** | Recomendações de Dependências | ⚠️ Precisa Revisão | **Risco alto em recomendar bibliotecas obscuras** (ChartKit, podpdf). Adicionar aviso. |
| **3.10** | Recomendações de Acessibilidade | ✅ Completa | WCAG 2.2, contraste, focus, ARIA, `prefers-reduced-motion` |
| **3.11** | Recomendações de SEO | ✅ Completa | Metadata API, JSON-LD, OG, Core Web Vitals, SEO local |
| **3.12** | Recomendações de Responsividade | ⚠️ Precisa Revisão | **PWA section superdimensionada para o porte do projeto.** Adicionar nota de proporcionalidade. |
| **3.13** | Recomendações de Manutenibilidade | ⚠️ Precisa Revisão | **Branded Types é advanced pattern opcional.** Adicionar nota. |
| **3.14** | Recomendações de Documentação | ✅ Completa | README, Storybook, changelog, CONTRIBUTING |
| **3.15** | Recomendações de Monitoramento | ⚠️ Precisa Revisão | **6 ferramentas é excessivo.** Priorizar Sentry + health check. Adicionar nota de proporcionalidade. |
| **4.1** | Verificação de Compatibilidade | ✅ Completa | Este relatório |
| **5** | Execução (Tarefas) | ⚠️ Precisa Revisão | **Tarefas críticas de segurança ausentes** (RLS, security headers, schema private). Tarefa 1.7 em prioridade errada. Tasks faltantes: RLS fix, security headers, schema private, database.ts regen, README update, cores dinâmicas. |
| **6** | Verificação Final | 🔲 Pendente | A ser preenchido pelos Agentes 47-61 |

**Legenda:** ✅ Completa | ⚠️ Precisa Revisão | 🔲 Pendente

---

## Seção 5: Execução
### 5.1 Tarefas a Implementar

#### PROMPT PARA AGENTES DE EXECUCAO

## Instrucoes Gerais

Antes de comecar, LEIA O ARQUIVO /home/tork/Projetos/igreja-planalto/ANALISE.md COMPLETAMENTE. Voce precisa entender o estado atual do projeto, os problemas identificados e as recomendacoes feitas pelos Agentes 1 a 14 (secao 1), pelos agentes de recomendacao (secao 3), e pela validacao de coerencia (secao 4).

Este prompt define as tarefas que devem ser implementadas, a ordem de execucao, os padroes de codigo a seguir e as verificacoes de qualidade obrigatorias.

---

## Fase 1: Correcoes Criticas e Infraestrutura Base (EXECUTAR PRIMEIRO)

### Tarefa 1.1 - Corrigir rota quebrada `/campanhas`
**Arquivo:** `src/app/page.tsx` (landing page)  
**O que fazer:** O link "Preencher minha ficha" aponta para `/campanhas` que nao existe. Criar uma pagina em `src/app/campanhas/page.tsx` que liste as campanhas publicas disponiveis (buscando do Supabase as campanhas com `is_active=true` e `is_public=true`) e redirecione para a rota `/c/[churchSlug]/[campaignSlug]` ao clicar em uma campanha. Alternativamente, redirecionar a rota `/campanhas` para uma pagina de listagem funcional.  
**Verificacao:** Acessar `/campanhas` no browser e verificar se nao retorna 404 e se exibe campanhas publicas.

### Tarefa 1.2 - Remover diretorio duplicado `"[id]"`
**Caminho:** `src/app/dashboard/campaigns/"[id]"` (com aspas)  
**O que fazer:** Remover este diretorio vazio e incorreto.  
**Verificacao:** Confirmar que `src/app/dashboard/campaigns/` contem apenas `[id]/`, `new/` e `page.tsx`.

### Tarefa 1.3 - Externalizar URL hardcoded
**Arquivo:** `src/app/dashboard/qrcodes/page.tsx`  
**O que fazer:** Substituir `'https://igrejaplanalto.onrender.com'` por `process.env.NEXT_PUBLIC_SITE_URL || 'https://igrejaplanalto.onrender.com'` (fallback para nao quebrar). Garantir que `.env.example` tenha `NEXT_PUBLIC_SITE_URL`.  
**Verificacao:** Buscar por qualquer ocorrencia de URLs hardcoded do Render no codigo.

### Tarefa 1.4 - Configurar Prettier
**O que fazer:** Criar `.prettierrc` na raiz com configuracao padrao (semi, singleQuote, tabWidth 2, trailingComma es5, printWidth 100). Integrar com ESLint instalando `eslint-config-prettier`. Adicionar script `format` no `package.json`.  
**Verificacao:** Executar `npx prettier --check src/` e confirmar que passa.

### Tarefa 1.5 - Adicionar loading.tsx, error.tsx, not-found.tsx
**Onde:** Em todas as pastas de rota (`/dashboard/`, `/dashboard/campaigns/`, `/dashboard/campaigns/new/`, `/dashboard/campaigns/[id]/edit/`, `/dashboard/login/`, `/dashboard/register/`, `/dashboard/reset-password/`, `/dashboard/qrcodes/`, `/dashboard/responses/`, `/dashboard/visitors/`, `/dashboard/users/`, `/dashboard/settings/`, `/c/[churchSlug]/[campaignSlug]/`, `/auth/callback/`).  
**O que fazer:** Criar `loading.tsx` com spinner padrao do projeto, `error.tsx` com mensagem generica e botao "Tentar novamente", `not-found.tsx` com mensagem "Pagina nao encontrada". Para o root layout, criar tambem.  
**Verificacao:** Simular um erro em uma pagina e verificar se o error.tsx e exibido.

### Tarefa 1.6 - Resolver duplicacao de componentes
**Arquivos envolvidos:** `src/components/ui/FormComponents.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Modal.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Input.tsx`  
**O que fazer:** Unificar os componentes duplicados:
- Manter `Button.tsx` como fonte unica de verdade para `Button`; fazer `FormComponents.tsx` re-exportar de `Button.tsx`.
- Manter `Modal.tsx` como fonte unica para `Modal`; fazer `FormComponents.tsx` re-exportar de `Modal.tsx`.
- Manter `Card.tsx` como fonte unica para `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge`; fazer `FormComponents.tsx` re-exportar de `Card.tsx`.
- Garantir que todos os imports no projeto apontem para os arquivos dedicados, nao para `FormComponents.tsx`.
- Remover as definicoes duplicadas de `FormComponents.tsx` (manter apenas componentes que existem SOMENTE la: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Label`, `Alert`, `DropdownMenu`).  
**Verificacao:** `npm run build` passa sem erros.

### Tarefa 1.7 - Corrigir nomenclatura em useSupabase.ts
**Arquivo:** `src/lib/hooks/useSupabase.ts`  
**O que fazer:** Renomear `exportToCSV` para `exportToExcel` na funcao retornada por `useResponses`. Criar uma funcao `exportToCSV` separada que de fato exporte CSV puro.  
**Verificacao:** Verificar que `responses/page.tsx` usa o nome correto.

### Tarefa 1.8 - Corrigir RLS `insert_own_role` (CRÍTICO - SEGURANÇA)
**Arquivo:** `supabase/schema.sql` (linha ~321)  
**O que fazer:** Substituir `CREATE POLICY "insert_own_role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (true);` por `CREATE POLICY "insert_own_role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND role = 'user');`. Isso impede que qualquer usuário autenticado se atribua `super_admin`. Aplicar no SQL Editor do Supabase.  
**Verificacao:** Tentar inserir `super_admin` em `user_roles` com outro user_id — deve ser rejeitado.

### Tarefa 1.9 - Adicionar security headers (CRÍTICO - SEGURANÇA)
**Arquivo:** `next.config.js`  
**O que fazer:** Adicionar a função `async headers()` com: `Strict-Transport-Security`, `X-Frame-Options (DENY)`, `X-Content-Type-Options (nosniff)`, `Referrer-Policy (strict-origin-when-cross-origin)`, `Permissions-Policy`. Conforme configuração da Seção 3.3.1.  
**Verificacao:** Executar `curl -I https://igrejaplanalto.onrender.com` e verificar headers presentes.

### Tarefa 1.10 - Criar schema `private` e adicionar RPCs faltantes
**Arquivo:** `supabase/schema.sql`  
**O que fazer:** (1) Adicionar `CREATE SCHEMA IF NOT EXISTS private;` antes da função `private.is_admin()`. (2) Adicionar as 3 RPCs faltantes (`create_user_with_role`, `change_user_password`, `delete_user_with_role`) com `SECURITY DEFINER`, `SET search_path = public`, e verificação explícita de role. (3) Adicionar `SET search_path = public` nas funções `handle_new_user` e `increment_campaign_views`.  
**Verificacao:** Aplicar o schema.sql atualizado no Supabase e verificar que as RPCs funcionam.

### Tarefa 1.11 - Adicionar RLS no Storage e limpeza de upload
**Arquivo:** `src/lib/supabase/upload.ts`  
**O que fazer:** (1) Sanitizar nome de arquivo substituindo por UUID: `${crypto.randomUUID()}.${safeExt}`. (2) Validar magic bytes (assinatura real do arquivo) no servidor. (3) Adicionar ao schema.sql políticas RLS para bucket `images`.  
**Verificacao:** Upload com nome `../../../etc/passwd.jpg` deve ser rejeitado ou sanitizado.

---

## Fase 2: Melhorias de Arquitetura e Performance (EXECUTAR EM SEGUNDO LUGAR)

### Tarefa 2.1 - Converter Landing Page e Rotas Publicas para Server Components + Otimizar Dashboard Stats
**Arquivos:** `src/app/page.tsx`, `src/app/c/[churchSlug]/[campaignSlug]/page.tsx`, `src/lib/hooks/useSupabase.ts`  
**O que fazer:** 
- Remover `'use client'` da landing page e rota publica de campanha. Mover a logica de fetch de dados para Server Components usando `supabase/server.ts`. O componente `CampaignForm` pode permanecer Client Component, mas deve ser importado dentro de um Server Component pai que passa os dados como props.
- **Otimizar useDashboardStats:** Substituir as 11 queries sequenciais por uma única RPC `get_dashboard_stats` no PostgreSQL que usa `COUNT` condicional e `GROUP BY`. Isso elimina o N+1 classico que faz 11 round-trips ao Supabase a cada carregamento do dashboard.  
**Verificacao:** Verificar no React DevTools que as paginas convertidas nao aparecem como Client Components. Verificar que o dashboard carrega em 1-2 queries em vez de 11+.

### Tarefa 2.2 - Middleware SSR: isolar contextos e tratar erros
**Arquivo:** `src/lib/supabase/server.ts`  
**O que fazer:** Adicionar tratamento de erro no `catch` dos metodos `set`/`remove` de cookies (pelo menos logar o erro com `console.error` em vez de catch vazio). Criar factory separada para `createRouteHandlerClient` (para Route Handlers) e `createServerActionClient` (para Server Actions) se necessario.  
**Verificacao:** Testar fluxo de login e verificar que cookies sao gerenciados corretamente.

### Tarefa 2.3 - Externalizar bucket name do Storage
**Arquivo:** `src/lib/supabase/upload.ts`  
**O que fazer:** Substituir `'images'` hardcoded por `process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'images'`. Adicionar a variavel em `.env.example`.  
**Verificacao:** Upload de imagem no dashboard funciona apos a mudanca.

### Tarefa 2.4 - Adicionar fontes via next/font e meta tags Open Graph
**Arquivo:** `src/app/layout.tsx`  
**O que fazer:** Importar e carregar a fonte `Inter` via `next/font/google`. Adicionar `generateMetadata` com Open Graph tags (title, description, image, url). Garantir que o `<html>` tenha `lang="pt-BR"`.  
**Verificacao:** Inspecionar o HTML gerado e confirmar que a fonte Inter e carregada e meta tags OG estao presentes.

### Tarefa 2.5 - Melhorar tratamento de erros no dashboard
**Arquivos:** Paginas do dashboard que usam `alert()` para erros  
**O que fazer:** Substituir `alert()` por um sistema de notificacao unificado. Criar um `Toast` ou `NotificationProvider` usando Context API. Implementar variantes: success, error, warning, info. Adicionar auto-dismiss. Integrar em todas as paginas do dashboard.  
**Verificacao:** Disparar um erro intencionalmente e verificar que aparece um toast estilizado em vez de alert() nativo.

---

## Fase 3: Aprimoramentos de Qualidade e UX (EXECUTAR POR ULTIMO)

### Tarefa 3.1 - Configurar testes automatizados
**O que fazer:** Instalar e configurar Vitest com `@testing-library/react` e `@testing-library/jest-dom`. Criar:
- Testes para `src/lib/utils.ts` (cn, slugify, formatDate, validateEmail, validatePhone, etc.)
- Testes para `src/components/ui/Button.tsx` (renderizacao, variantes, loading state)
- Testes para hooks em `src/lib/hooks/useSupabase.ts` (mockar Supabase)
- Testes de snapshot para componentes principais
Criar diretorio `src/__tests__/` com estrutura espelhada ao `src/`. Configurar `vitest.config.ts`. Adicionar script `test` e `test:run` no `package.json`.  
**Verificacao:** `npm run test` executa e todos os testes passam.

### Tarefa 3.2 - Corrigir exportacao Excel
**Arquivo:** `src/app/dashboard/responses/page.tsx`  
**O que fazer:** Substituir a exportacao falsa de Excel (CSV com extensao .xls) por uma implementacao real usando a biblioteca `xlsx` (SheetJS) ou manter CSV mas com extensao .csv correta. Se usar `xlsx`, instalar o pacote e gerar arquivo .xlsx genuino com sheet, colunas e dados.  
**Verificacao:** Baixar o arquivo Excel e abrir no Excel/LibreOffice - deve mostrar dados corretamente em colunas.

### Tarefa 3.3 - Adicionar tipos consistentes
**O que fazer:** Eliminar interfaces duplicadas/definidas manualmente nas paginas do dashboard. Usar os tipos de `src/types/database.ts` e `src/types/index.ts` em todo o projeto. Onde os tipos do banco nao cobrem campos computados, estender com `Pick`/`Omit`/intersection types em vez de redefinir.  
**Verificacao:** `npm run type-check` passa sem erros de tipo.

### Tarefa 3.4 - Limpeza final
**O que fazer:** 
- Remover o alias estranho `"[id]"` se ainda existir.
- Remover comments de codigo morto.
- Verificar se ha arquivos nao utilizados (componentes, hooks, utilitarios) e remove-los.
- Padronizar todos os imports para usar o alias `@/`.
- Executar `npm run lint` e corrigir todos os warnings.  
**Verificacao:** `npm run build` passa limpo, `npm run lint` sem erros.

### Tarefa 3.5 - Regenerar database.ts para alinhar com schema.sql
**Arquivo:** `src/types/database.ts`  
**O que fazer:** Regenerar os tipos TypeScript a partir do schema real do Supabase usando `supabase gen types typescript --linked > src/types/database.ts`. Corrigir as discrepâncias identificadas na Seção 1.11: adicionar coluna `whatsapp` em churches, adicionar `email` em profiles, adicionar `created_by` em campaigns, renomear `field_type`/`field_order` para corresponder ao schema, adicionar tipos `number`/`hidden`, adicionar colunas UTM em responses.  
**Verificacao:** `npm run type-check` passa sem erros. Tipos no código correspondem ao schema do banco.

### Tarefa 3.6 - Atualizar README.md com informações corretas
**Arquivo:** `README.md`  
**O que fazer:** Reescrever o README para refletir a stack real: Next.js 14 App Router + Supabase + Tailwind + Docker (standalone, não static export). Remover menções a React Hook Form, Zod, qrcode.react. Adicionar quick start, feature table, variáveis de ambiente necessárias, estrutura de diretórios atualizada, e fluxo de deploy (Render Web Service + Docker).  
**Verificacao:** README não contém mais informações incorretas (static export, bibliotecas inexistentes).

### Tarefa 3.7 - Aplicar cores dinâmicas do banco ao tema CSS
**Arquivo:** `src/app/layout.tsx`, `src/lib/supabase/server.ts`  
**O que fazer:** Criar um ThemeProvider (Server Component) que lê `primary_color` e `secondary_color` da tabela `churches` e as injeta como CSS custom properties no `<html>`. Definir fallback para `#C29560` e `#D4A86A` se o dado não estiver disponível. Remover a duplicação atual (cores fixas no tailwind.config.js + preview na settings).  
**Verificacao:** Alterar a cor primária na página de configurações e verificar que o tema do dashboard reflete a mudança sem redeploy.

---

## Padroes de Codigo Obrigatorios

1. **TypeScript estrito:** Respeitar `strict: true` do tsconfig. Nao usar `any`. Usar `unknown` quando o tipo nao for determinado.
2. **Server Components primeiro:** Novas paginas devem ser Server Components a menos que precisem de interatividade (useState, useEffect, onClick, onChange).
3. **'use client' no nivel minimo:** Colocar a diretiva `'use client'` o mais profundo possivel na arvore de componentes, nunca em paginas/layouts que podem ser Server Components.
4. **Imports limpos:** Usar alias `@/` para imports do src/. Nao usar imports relativos profundos (`../../../`).
5. **Nomes em portugues:** Componentes, funcoes e variaveis em portugues (coerente com o projeto). Tipos e interfaces em ingles (coerente com o codigo existente).
6. **Tailwind + cn():** Usar `cn()` de `@/lib/utils` para merge de classes condicionais. Nao usar string interpolation manual para classes Tailwind.
7. **Acessibilidade:** Todos os inputs devem ter `label` associado. Botoes icon devem ter `aria-label`. Formularios devem ter `onSubmit` com `preventDefault`.
8. **Nao quebrar o build:** Toda tarefa deve manter `npm run build` e `npm run type-check` funcionando. Se uma tarefa quebrar o build, ela deve ser ajustada antes de prosseguir.
9. **Commits atomicos:** Cada tarefa concluida deve ser commitada com mensagem descritiva em portugues.
10. **Nao remover funcionalidades existentes:** Nenhuma tarefa deve quebrar funcionalidades em producao. Toda mudanca deve ser testada localmente.

---

## Verificacoes de Qualidade Obrigatorias (antes de marcar como concluida)

- [ ] `npm run type-check` passa sem erros
- [ ] `npm run lint` passa sem erros
- [ ] `npm run build` passa sem erros
- [ ] Nenhum `console.log` foi deixado (exceto em tratamento de erros)
- [ ] Nenhum `alert()` foi introduzido
- [ ] Nenhum `any` foi usado (usar `unknown` se necessario)
- [ ] Nenhuma URL hardcoded foi introduzida
- [ ] Nenhuma chave/segredo hardcoded foi introduzida
- [ ] Componentes criados seguem o padrao de `forwardRef` + `cn()` + tipos exportados
- [ ] Paginas novas tem `loading.tsx`, `error.tsx` e `not-found.tsx` correspondentes
- [ ] Testes foram criados para funcionalidades novas (quando aplicavel)
- [ ] O codigo segue os padroes definidos acima

---

## Ordem de Execucao Resumida

```
FASE 1 (Critico):
  1.8 (RLS fix) -> 1.9 (Security headers) -> 1.10 (Schema private + RPCs) ->
  1.1 (Rota campanhas) -> 1.2 (Remover [id]) -> 1.3 (URL hardcoded) ->
  1.4 (Prettier) -> 1.5 (loading/error/not-found) -> 1.6 (Componentes duplicados) ->
  1.11 (Storage RLS)

FASE 2 (Arquitetura):
  2.1 -> 2.2 -> 2.3 -> 2.4 -> 2.5

FASE 3 (Qualidade):
  3.1 -> 3.2 -> 3.3 -> 1.7 (Renomear exportToCSV) -> 3.4 -> 3.5 -> 3.6 -> 3.7
```

**Nota:** Tarefa 1.7 (renomear exportToCSV) foi movida para Fase 3 por ser de baixo impacto. As tarefas 1.8 a 1.11 foram adicionadas como correções críticas de segurança ausentes na versão anterior.

Cada tarefa depende da anterior dentro da mesma fase. Fases podem ser executadas em paralelo por agentes diferentes, desde que as dependencias entre tarefas sejam respeitadas. Ao final de cada fase, execute `npm run build` e `npm run type-check` para garantir que nada esta quebrado antes de iniciar a fase seguinte.

---

## Seção 6: Verificação Final
### 6.1 Inspeção e Build

#### Relatório de Verificação de Checklist (17 arquivos)

Todos os 17 arquivos existem. Abaixo a análise detalhada de cada um:

---

**1. `.prettierrc`** ✅ OK
- JSON válido: `semi: true`, `singleQuote: true`, `trailingComma: "all"`, `tabWidth: 2`, `printWidth: 100`
- Configuração padrão e funcional. Sem problemas.

---

**2. `eslint.config.mjs`** ⚠️ PROBLEMAS
- Usa `FlatCompat` de `@eslint/eslintrc` para estender `next/core-web-vitals` e `next/typescript`
- Regras customizadas: `@typescript-eslint/no-unused-vars`, `no-explicit-any`, `react-hooks/exhaustive-deps`, `import/order`
- **Problemas:**
  - `@eslint/eslintrc` NÃO está listado em `package.json` devDependencies
  - `eslint-plugin-import` (requerido pela regra `import/order`) NÃO está no `package.json`
  - ESLint `^8.57.0` + flat config (`.mjs`) pode gerar incompatibilidade (flat config é nativo do ESLint 9+)

---

**3. `vitest.config.ts`** ⚠️ PROBLEMAS
- Config: `jsdom`, `globals: true`, setup file, cobertura v8 (70% thresholds), alias `@/` para `./src`
- **Problemas:**
  - `vitest`, `@vitejs/plugin-react`, `@testing-library/jest-dom`, `@testing-library/react`, `jsdom` NÃO estão no `package.json`
  - `@vitest/coverage-v8` (provedor de cobertura) também NÃO está listado
  - Execução direta falhará sem instalação prévia

---

**4. `src/__tests__/setup.ts`** ✅ OK
- Importa `@testing-library/jest-dom/vitest` e `cleanup` de `@testing-library/react`
- Executa `cleanup()` via `afterEach` do `vitest`
- Conteúdo correto. Sem problemas de lógica.

---

**5. `src/__tests__/components/ui/Button.test.tsx`** ✅ OK
- 3 testes: renderiza children, aplica classes de variante (`bg-primary`), estado disabled
- Importa `Button` de `@/components/ui/Button` (componente existente)
- Assertivas corretas (`toBeInTheDocument`, `toBeDisabled`, `toContain`)

---

**6. `src/__tests__/components/ui/FormComponents.test.tsx`** ✅ OK
- 7 testes abrangendo: Input (label, error, required), Select (options), Textarea (placeholder), Checkbox (label), Badge (text, variant, size)
- Importa de `@/components/ui/FormComponents` (componente existente)
- Cobre os principais componentes e props

---

**7. `src/__tests__/components/layout/Layout.test.tsx`** ✅ OK
- Mocks corretos para `next/navigation` (useRouter, usePathname, useSearchParams) e `@/lib/supabase/client`
- Testa renderização de children no Layout
- Sem problemas

---

**8. `src/__tests__/components/campaigns/CampaignForm.test.tsx`** ⚠️ PROBLEMA
- Mock básico para `next/navigation` e supabase client
- **Problema:** Único teste usa `toBeTruthy()` em vez de `toBeInTheDocument()` — assertiva mais fraca. Além disso, cobre apenas o estado de loading, sem testar renderização condicional, submissão, ou validação.

---

**9. `src/__tests__/lib/utils.test.ts`** ⚠️ PROBLEMA
- Testes para `cn` (3 casos), `slugify` (3 casos), `formatDate` (1 caso)
- **Problema:** Teste de `formatDate` usa apenas `toBeTruthy()` — não verifica o formato real (ex: `"26/07/2026"`). Teste de `slugify` com acentos (`"Campanha São João"`) depende de implementação de normalização Unicode.

---

**10. `src/app/loading.tsx`** ✅ OK
- Componente de loading global com `Loader2` (lucide-react) e texto "Carregando..."
- Layout: `min-h-screen` centralizado, fundo `primary-50`
- Conteúdo correto e funcional

---

**11. `src/app/error.tsx`** ✅ OK
- `'use client'` com props `error` e `reset`
- Exibe mensagem de erro e botão "Tentar novamente"
- Conteúdo correto e funcional

---

**12. `src/app/not-found.tsx`** ✅ OK
- Server component (sem `'use client'`)
- Exibe "404" e "Página não encontrada" com link "Voltar ao início"
- Usa `next/link` (Link)
- Conteúdo correto e funcional

---

**13. `src/app/dashboard/loading.tsx`** ✅ OK
- Loading específico do dashboard com `Loader2` e texto "Carregando..."
- Usa `h-full` (apropriado para layout aninhado)
- Conteúdo correto

---

**14. `src/app/dashboard/error.tsx`** ✅ OK
- `'use client'` com props `error` e `reset`
- Versão simplificada (sem `min-h-screen`, padding menor)
- Conteúdo correto

---

**15. `src/app/dashboard/not-found.tsx`** ✅ OK
- Server component, 404 com link "Voltar ao dashboard"
- Conteúdo correto

---

**16. `src/app/api/health/route.ts`** ✅ OK
- `GET` handler com `force-dynamic`
- Retorna JSON: `status: 'healthy'`, `timestamp` (ISO), `uptime`
- Health check funcional e bem estruturado

---

**17. `Dockerfile`** ❌ PROBLEMA
- Multi-stage build (base, deps, builder, runner)
- **HEALTHCHECK:** ✅ Presente (linhas 28-29) — executando `http://localhost:3000/api/health`
- **`--only=production`:** ❌ PRESENTE (linha 7: `npm ci --only=production`)
  - Isso impede o build de Next.js, que precisa de devDependencies (TypeScript, Tailwind, PostCSS) no estágio builder
  - O estágio `deps` deveria instalar TODAS as dependências (`npm ci` sem flags)

---

#### Resumo Final

| Status | Contagem |
|--------|----------|
| ✅ OK | 12 |
| ⚠️ Problemas menores | 3 (CampaignForm.test, utils.test, eslint.config) |
| ❌ Problemas críticos | 2 (Dockerfile, vitest.config/deps ausentes) |

**Problemas críticos a resolver:**
1. **Dockerfile:** Remover `--only=production` do estágio deps (linha 7)
2. **Dependências de teste ausentes:** Adicionar `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitest/coverage-v8` ao `package.json`

#### Relatório do Verificador 2 - Validação de Alterações de Código

| # | Item | Status | Detalhes |
|---|------|--------|----------|
| 1 | `src/middleware.ts` - Security headers | ✅ CORRETO | `X-Frame-Options: DENY` (L58), `X-Content-Type-Options: nosniff` (L59), `Content-Security-Policy` (L61-64) presentes. Também inclui `Referrer-Policy` (L60). |
| 2 | `src/app/page.tsx` - Link "/campanhas" → "/dashboard/campaigns" | ✅ CORRETO | Link na linha 51 agora aponta para `/dashboard/campaigns`. |
| 3 | `src/app/dashboard/qrcodes/page.tsx` - Hardcoded URL | ⚠️ PARCIAL | Usa `process.env.NEXT_PUBLIC_APP_URL` como primário (L26), mas mantém fallback hardcoded `https://igrejaplanalto.onrender.com`. Ideal seria usar apenas a env var (`const BASE_URL = process.env.NEXT_PUBLIC_APP_URL!;`). |
| 4 | `src/app/layout.tsx` - Inter font + metadata | ✅ CORRETO | Importa `Inter` de `next/font/google` (L2), configura com `variable: '--font-inter'` (L5-9), exporta `metadata` com OpenGraph (L11-24). |
| 5 | `tailwind.config.js` - fontFamily | ✅ CORRETO | Contém `sans: ['var(--font-inter)', 'system-ui', 'sans-serif']` (L30). |
| 6 | `supabase/schema.sql` - Storage RLS + insert_own_role | ✅ CORRETO | Storage policies presentes para bucket `images` (L348-362). `insert_own_role` corrigida com `WITH CHECK (user_id = auth.uid() AND role IN ('user', 'member') AND NOT EXISTS (...))` (L319-327). |
| 7 | `src/lib/hooks/useSupabase.ts` - Nomenclatura exportToExcel | ✅ CORRETO | Não há `exportToExcel`. Exportação nomeada como `exportToCSV` (L171) e `downloadCSV` (L195), consistentes com sua implementação. |
| 8 | `src/app/dashboard/responses/page.tsx` - Função renomeada | ✅ CORRETO | Export functions são locais: `exportCSV` (L100) e `exportAsExcel` (L124), usadas corretamente (L172, L176). |
| 9 | `package.json` - Test/prettier scripts + devDeps | ✅ CORRETO | Scripts: `prettier`, `prettier:fix`, `test`, `test:watch`, `test:coverage` (L11-15). DevDeps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (L41-45). |
| 10 | `src/app/dashboard/campaigns/` - Diretório "[id]" duplicado | ✅ CORRETO | Apenas um diretório `[id]/` presente (junto com `new/` e `page.tsx`). A duplicata `"[id]"` foi removida. |

**Resumo:** 9 itens corretos, 1 item com ressalva (item 3 - fallback hardcoded mantido).
