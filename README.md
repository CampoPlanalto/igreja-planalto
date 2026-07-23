# Igreja Planalto - Campaign & Form Platform

A modern, QR-native campaign and form platform for churches. Built with Next.js 14, Supabase, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password + OAuth)
- **Forms**: React Hook Form + Zod
- **QR Codes**: qrcode.react
- **Charts**: Recharts
- **Deployment**: Render (Static Export)

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public campaign pages
│   ├── api/               # API routes
│   └── globals.css
├── components/
│   ├── ui/                # Base UI components
│   ├── forms/             # Form components
│   ├── campaigns/         # Campaign components
│   ├── dashboard/         # Dashboard components
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── utils/             # Utility functions
│   └── hooks/             # Custom React hooks
├── types/                 # TypeScript types
└── styles/                # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Render account (for deployment)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Schema

The platform uses a flexible campaign-based architecture:

- **churches** - Church/organization settings
- **campaigns** - Campaigns with dynamic forms
- **campaign_fields** - Configurable form fields
- **responses** - Form submissions
- **users** - Admin users (via Supabase Auth)

## Features

- ✅ Campaign management (CRUD)
- ✅ Dynamic form builder
- ✅ QR code generation (PNG/SVG/PDF)
- ✅ Public campaign pages
- ✅ Admin dashboard with analytics
- ✅ Response management (filter, export CSV/Excel)
- ✅ Multi-church support (SaaS ready)
- ✅ Row Level Security (RLS)
- ✅ Mobile-first responsive design

## Deployment

### Render (Static Site)

1. Connect GitHub repository to Render
2. Create new Static Site
3. Build Command: `npm run build`
4. Publish Directory: `out`
5. Add environment variables
6. Deploy

### Custom Domain

Configure in Render dashboard under Settings > Custom Domains.

## License

MIT