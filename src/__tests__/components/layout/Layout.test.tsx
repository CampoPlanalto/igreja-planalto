import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock supabase
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '1', email: 'test@test.com' } }, error: null }),
      signOut: vi.fn(),
    },
  }),
}));

import Layout from '@/components/layout/Layout';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div>Conteúdo</div>
      </Layout>
    );
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});