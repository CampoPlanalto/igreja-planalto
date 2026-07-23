'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { QRCodeGenerator, BatchQRCodeGenerator } from '@/components/campaigns/QRCodeGenerator';
import {
  Search,
  QrCode,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CampaignItem = {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
};

const BASE_URL = 'https://igreja-planalto.onrender.com';

export default function QRCodesPage() {
  const supabase = createClient();
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [batchSelected, setBatchSelected] = useState<string[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('campaigns')
        .select('id, title, slug, is_active')
        .order('title');

      if (data) setCampaigns(data as CampaignItem[]);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = useMemo(() => {
    if (!search) return campaigns;
    const q = search.toLowerCase();
    return campaigns.filter((c) => c.title.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q));
  }, [campaigns, search]);

  const toggleBatchSelect = (id: string) => {
    setBatchSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (batchSelected.length === filteredCampaigns.length) {
      setBatchSelected([]);
    } else {
      setBatchSelected(filteredCampaigns.map((c) => c.id));
    }
  };

  const openQRGenerator = (campaign: CampaignItem) => {
    setSelectedCampaign(campaign);
    setShowQRModal(true);
  };

  const batchCampaignsForQR = useMemo(() => {
    return campaigns
      .filter((c) => batchSelected.includes(c.id))
      .map((c) => ({
        id: c.id,
        title: c.title,
        url: `${BASE_URL}/c/${c.slug}`,
        slug: c.slug,
      }));
  }, [campaigns, batchSelected]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
          <p className="text-gray-600 mt-1">Gere e baixe QR Codes para suas campanhas</p>
        </div>
      </div>

      {campaigns.length > 0 && (
        <BatchQRCodeGenerator campaigns={batchCampaignsForQR} />
      )}

      <Card className="mt-6">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Campanhas</h3>
            <p className="text-sm text-gray-500">{filteredCampaigns.length} campanha{filteredCampaigns.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar campanhas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardBody className="p-0">
          {filteredCampaigns.length === 0 ? (
            <div className="p-12 text-center">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma campanha encontrada</h4>
              <p className="text-gray-500">Crie campanhas primeiro para gerar QR Codes.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        checked={batchSelected.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">URL</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCampaigns.map((campaign) => {
                    const campaignUrl = `${BASE_URL}/c/${campaign.slug}`;
                    const isSelected = batchSelected.includes(campaign.id);
                    return (
                      <tr key={campaign.id} className={cn('hover:bg-gray-50', isSelected && 'bg-primary-50/50')}>
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleBatchSelect(campaign.id)}
                            className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">{campaign.title}</p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <code className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{campaign.slug}</code>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <a
                            href={campaignUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
                          >
                            {campaignUrl}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Badge variant={campaign.is_active ? 'success' : 'danger'}>
                            {campaign.is_active ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openQRGenerator(campaign)}
                          >
                            <QrCode className="h-4 w-4 mr-1" />
                            Gerar QR Code
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title={selectedCampaign ? `QR Code - ${selectedCampaign.title}` : 'QR Code'}
        size="xl"
      >
        {selectedCampaign && (
          <QRCodeGenerator
            url={`${BASE_URL}/c/${selectedCampaign.slug}`}
            title={selectedCampaign.title}
          />
        )}
      </Modal>
    </>
  );
}
