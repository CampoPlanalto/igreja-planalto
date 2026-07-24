'use client';

import { useParams } from 'next/navigation';
import CampaignForm from '@/components/campaigns/CampaignForm';

export default function ChurchCampaignPage() {
  const params = useParams();
  const churchSlug = typeof params.churchSlug === 'string' ? params.churchSlug : '';
  const campaignSlug = typeof params.campaignSlug === 'string' ? params.campaignSlug : '';

  return <CampaignForm churchSlug={churchSlug} campaignSlug={campaignSlug} />;
}
