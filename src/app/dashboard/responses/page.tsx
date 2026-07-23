'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  Search,
  Download,
  Filter,
  Eye,
  Users,
  Calendar,
  Phone,
  Mail,
  Loader2,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatDateTime, formatPhone, getInitials, formatNumber } from '@/lib/utils';

type ResponseWithCampaign = {
  id: string;
  campaign_id: string;
  data: Record<string, unknown>;
  visitor_name: string | null;
  visitor_phone: string | null;
  visitor_email: string | null;
  created_at: string;
  campaigns: { title: string; slug: string } | null;
};

export default function ResponsesPage() {
  const supabase = createClient();
  const [responses, setResponses] = useState<ResponseWithCampaign[]>([]);
  const [campaigns, setCampaigns] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCampaign, setFilterCampaign] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<ResponseWithCampaign | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: campaignsData }, { data: responsesData }] = await Promise.all([
        supabase.from('campaigns').select('id, title').order('title'),
        supabase.from('responses').select('*, campaigns(title, slug)').order('created_at', { ascending: false }),
      ]);
      if (campaignsData) setCampaigns(campaignsData);
      if (responsesData) setResponses(responsesData as ResponseWithCampaign[]);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      if (search) {
        const q = search.toLowerCase();
        const name = (r.visitor_name || '').toLowerCase();
        const phone = (r.visitor_phone || '').toLowerCase();
        const email = (r.visitor_email || '').toLowerCase();
        if (!name.includes(q) && !phone.includes(q) && !email.includes(q)) return false;
      }
      if (filterCampaign && r.campaign_id !== filterCampaign) return false;
      if (dateStart && r.created_at < dateStart) return false;
      if (dateEnd) {
        const end = new Date(dateEnd);
        end.setHours(23, 59, 59, 999);
        if (new Date(r.created_at) > end) return false;
      }
      return true;
    });
  }, [responses, search, filterCampaign, dateStart, dateEnd]);

  const allDataKeys = useMemo(() => {
    const keys = new Set<string>();
    filteredResponses.forEach((r) => { if (r.data) Object.keys(r.data).forEach((k) => keys.add(k)); });
    return Array.from(keys);
  }, [filteredResponses]);

  const csvEscape = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n') || val.includes('\r')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const exportCSV = useCallback(() => {
    if (!filteredResponses.length) return;
    const headers = ['Nome', 'Telefone', 'Email', 'Campanha', 'Data', ...allDataKeys];
    const rows = filteredResponses.map((r) => [
      csvEscape(r.visitor_name || ''),
      csvEscape(r.visitor_phone || ''),
      csvEscape(r.visitor_email || ''),
      csvEscape(r.campaigns?.title || ''),
      csvEscape(formatDateTime(r.created_at)),
      ...allDataKeys.map((k) => {
        const v = r.data?.[k];
        return csvEscape(v !== null && v !== undefined ? String(v) : '');
      }),
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `respostas-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredResponses, allDataKeys]);

  const exportExcel = useCallback(() => {
    if (!filteredResponses.length) return;
    const headers = ['Nome', 'Telefone', 'Email', 'Campanha', 'Data', ...allDataKeys];
    const rows = filteredResponses.map((r) => [
      csvEscape(r.visitor_name || ''),
      csvEscape(r.visitor_phone || ''),
      csvEscape(r.visitor_email || ''),
      csvEscape(r.campaigns?.title || ''),
      csvEscape(formatDateTime(r.created_at)),
      ...allDataKeys.map((k) => {
        const v = r.data?.[k];
        return csvEscape(v !== null && v !== undefined ? String(v) : '');
      }),
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `respostas-${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredResponses, allDataKeys]);

  const viewDetails = (response: ResponseWithCampaign) => {
    setSelectedResponse(response);
    setShowModal(true);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Respostas</h1>
          <p className="text-gray-600 mt-1">
            {formatNumber(filteredResponses.length)} resposta{filteredResponses.length !== 1 ? 's' : ''} encontrada{filteredResponses.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" />
            Exportar CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-1" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardBody className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtros
              {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
              <Select
                options={[
                  { value: '', label: 'Todas as campanhas' },
                  ...campaigns.map((c) => ({ value: c.id, label: c.title })),
                ]}
                value={filterCampaign}
                onChange={(e) => setFilterCampaign(e.target.value)}
              />
              <Input type="date" label="Data inicial" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
              <Input type="date" label="Data final" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
            </div>
          )}
        </CardBody>
      </Card>

      {filteredResponses.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma resposta encontrada</h4>
            <p className="text-gray-500">As respostas aparecerão aqui quando visitantes preencherem os formulários das campanhas.</p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <Card>
              <CardBody className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitante</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Telefone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredResponses.map((response) => (
                      <tr key={response.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => viewDetails(response)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium flex-shrink-0">
                              {getInitials(response.visitor_name || 'A')}
                            </div>
                            <span className="ml-3 font-medium text-gray-900">
                              {response.visitor_name || 'Anônimo'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="primary" className="text-xs">
                            {response.campaigns?.title || 'Campanha removida'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-gray-600">
                            {response.visitor_phone ? formatPhone(response.visitor_phone) : '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-600">{response.visitor_email || '-'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{formatDateTime(response.created_at)}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); viewDetails(response); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>

          <div className="md:hidden space-y-3">
            {filteredResponses.map((response) => (
              <Card key={response.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => viewDetails(response)}>
                <CardBody className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium flex-shrink-0">
                        {getInitials(response.visitor_name || 'A')}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{response.visitor_name || 'Anônimo'}</p>
                        <Badge variant="primary" className="text-xs mt-1">{response.campaigns?.title || 'Campanha removida'}</Badge>
                      </div>
                    </div>
                    <Eye className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {response.visitor_phone && (
                      <div className="flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {formatPhone(response.visitor_phone)}
                      </div>
                    )}
                    {response.visitor_email && (
                      <div className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {response.visitor_email}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                      {formatDateTime(response.created_at)}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes da Resposta"
        size="lg"
      >
        {selectedResponse && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Visitante</p>
                <p className="font-medium text-gray-900">{selectedResponse.visitor_name || 'Anônimo'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Campanha</p>
                <p className="font-medium text-gray-900">{selectedResponse.campaigns?.title || 'Campanha removida'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium text-gray-900">
                  {selectedResponse.visitor_phone ? formatPhone(selectedResponse.visitor_phone) : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 break-all">{selectedResponse.visitor_email || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Envio</p>
                <p className="font-medium text-gray-900">{formatDateTime(selectedResponse.created_at)}</p>
              </div>
            </div>

            {selectedResponse.data && Object.keys(selectedResponse.data).length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3 border-b border-gray-100 pb-2">Dados do Formulário</p>
                <div className="space-y-3">
                  {Object.entries(selectedResponse.data).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1">
                      <span className="text-sm font-medium text-gray-700 sm:w-1/3 flex-shrink-0">{key}</span>
                      <span className="text-sm text-gray-600">
                        {value === null || value === undefined
                          ? '-'
                          : typeof value === 'boolean'
                            ? value ? 'Sim' : 'Não'
                            : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
