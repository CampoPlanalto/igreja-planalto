import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  }),
}));

import CampaignForm from '@/components/campaigns/CampaignForm';

describe('CampaignForm', () => {
  it('renders form title', () => {
    render(<CampaignForm campaignSlug="teste" churchSlug="igreja" />);
    expect(screen.getByText('Carregando...')).toBeTruthy();
  });
});