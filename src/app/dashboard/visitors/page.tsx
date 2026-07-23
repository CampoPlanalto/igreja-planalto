'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  Search,
  Download,
  Phone,
  Mail,
  Users,
  Loader2,
  Clock,
  ChevronRight,
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

type GroupedVisitor = {
  key: string;
  name: string;
  phone: string | null;
  email: string | null;
  count: number;
  lastSubmission: string;
  campaigns: { id: string; title: string }[];
  responses: ResponseWithCampaign[];
};

export default function VisitorsPage() {
  const supabase = createClient();
  const [responses, setResponses] = useState<ResponseWithCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<GroupedVisitor | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('responses')
        .select('*, campaigns(title, slug)')
        .order('created_at', { ascending: false });

      if (data) setResponses(data as ResponseWithCampaign[]);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const groupedVisitors = useMemo(() => {
    const map = new Map<string, GroupedVisitor>();

    responses.forEach((r) => {
      const key = r.visitor_name || r.visitor_phone || r.visitor_email || `anon-${r.id.slice(0, 8)}`;
      if (!map.has(key)) {
        map.set(key, {
          key,
          name: r.visitor_name || 'Anônimo',
          phone: r.visitor_phone,
          email: r.visitor_email,
          count: 0,
          lastSubmission: r.created_at,
          campaigns: [],
          responses: [],
        });
      }

      const v = map.get(key)!;
      v.count += 1;
      if (r.created_at > v.lastSubmission) v.lastSubmission = r.created_at;
      if (r.campaigns) {
        const exists = v.campaigns.some((c) => c.id === r.campaign_id);
        if (!exists) v.campaigns.push({ id: r.campaign_id, title: r.campaigns.title });
      }
      v.responses.push(r);
    });

    return Array.from(map.values()).sort((a, b) => b.lastSubmission.localeCompare(a.lastSubmission));
  }, [responses]);

  const filteredVisitors = useMemo(() => {
    if (!search) return groupedVisitors;
    const q = search.toLowerCase();
    return groupedVisitors.filter((v) => {
      return (
        v.name.toLowerCase().includes(q) ||
        (v.phone || '').includes(q) ||
        (v.email || '').toLowerCase().includes(q)
      );
    });
  }, [groupedVisitors, search]);

  const viewVisitor = (visitor: GroupedVisitor) => {
    setSelectedVisitor(visitor);
    setShowModal(true);
  };

  const exportCSV = useCallback(() => {
    if (!filteredVisitors.length) return;

    const headers = ['Nome', 'Telefone', 'Email', 'Total de Respostas', 'Última Resposta', 'Campanhas'];
    const rows = filteredVisitors.map((v) => [
      v.name,
      v.phone || '',
      v.email || '',
      String(v.count),
      formatDateTime(v.lastSubmission),
      v.campaigns.map((c) => c.title).join('; '),
    ]);

    const csvEscape = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) return `"${val.replace(/"/g, '""')}"`;
      return val;
    };

    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.map(csvEscape).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `visitantes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link);
  }, [filteredVisitors]);

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
          <h1 className="text-2xl font-bold text-gray-900">Visitantes</h1>
          <p className="text-gray-600 mt-1">
            {formatNumber(filteredVisitors.length)} visitante{filteredVisitors.length !== 1 ? 's' : ''} encontrado{filteredVisitors.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-1" />
          Exportar CSV
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nome, telefone ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredVisitors.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum visitante encontrado</h4>
            <p className="text-gray-500">Os visitantes aparecerão aqui quando preencherem os formulários das campanhas.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVisitors.map((visitor) => (
            <Card
              key={visitor.key}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => viewVisitor(visitor)}
            >
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg flex-shrink-0">
                      {getInitials(visitor.name)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{visitor.name}</p>
                      <p className="text-sm text-gray-500">
                        {visitor.count} resposta{visitor.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>

                <div className="space-y-2 text-sm">
                  {visitor.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                      {formatPhone(visitor.phone)}
                    </div>
                  )}
                  {visitor.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{visitor.email}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                    {formatDateTime(visitor.lastSubmission)}
                  </div>
                </div>

                {visitor.campaigns.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-gray-100">
                    {visitor.campaigns.slice(0, 3).map((c) => (
                      <Badge key={c.id} variant="primary" className="text-xs">
                        {c.title}
                      </Badge>
                    ))}
                    {visitor.campaigns.length > 3 && (
                      <Badge variant="gray" className="text-xs">
                        +{visitor.campaigns.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedVisitor?.name || 'Visitante'}
        size="lg"
      >
        {selectedVisitor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium text-gray-900">{selectedVisitor.phone ? formatPhone(selectedVisitor.phone) : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 break-all">{selectedVisitor.email || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Respostas</p>
                <p className="font-medium text-gray-900">{formatNumber(selectedVisitor.count)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Campanhas Participadas</p>
              <div className="flex flex-wrap gap-2">
                {selectedVisitor.campaigns.map((c) => (
                  <Badge key={c.id} variant="primary">{c.title}</Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3 border-b border-gray-100 pb-2">
                Todas as Respostas ({selectedVisitor.responses.length})
              </p>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {selectedVisitor.responses.map((r) => (
                  <Card key={r.id} className="border border-gray-100">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="primary" className="text-xs">
                          {r.campaigns?.title || 'Campanha removida'}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatDateTime(r.created_at)}</span>
                      </div>
                      {r.data && Object.keys(r.data).length > 0 && (
                        <div className="space-y-1.5 text-sm">
                          {Object.entries(r.data).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-2">
                              <span className="font-medium text-gray-700 w-1/3 flex-shrink-0">{key}:</span>
                              <span className="text-gray-600">
                                {value === null || value === undefined
                                  ? '-'
                                  : typeof value === 'boolean'
                                    ? value ? 'Sim' : 'Não'
                                    : String(value)}
                              </span>
                            </div>
                          ))}
                          {Object.keys(r.data).length > 4 && (
                            <p className="text-xs text-gray-400 italic">
                              + {Object.keys(r.data).length - 4} campo{Object.keys(r.data).length - 4 !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

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
