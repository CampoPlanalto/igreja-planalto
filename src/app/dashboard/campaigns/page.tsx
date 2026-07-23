'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/Modal';
import {
    FileText, Plus, Search, Edit, Trash2, Copy, Archive, Calendar, Loader2
} from 'lucide-react';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import type { Database } from '@/types/database';

type Campaign = Database['public']['Tables']['campaigns']['Row'] & {
    responses_count?: number;
    views_count?: number;
};

export default function CampaignsPage() {
    const router = useRouter();
    const supabase = createClient();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [archiveId, setArchiveId] = useState<string | null>(null);
    const [showArchiveModal, setShowArchiveModal] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('campaigns')
                .select('*, responses(count), campaign_views(count)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const mapped = (data || []).map((item: any) => ({
                ...item,
                responses_count: item.responses?.[0]?.count ?? 0,
                views_count: item.campaign_views?.[0]?.count ?? 0,
            }));

            setCampaigns(mapped);
        } catch (err) {
            console.error('Erro ao carregar campanhas:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const { error } = await supabase.from('campaigns').delete().eq('id', deleteId);
            if (error) throw error;
            setCampaigns(prev => prev.filter(c => c.id !== deleteId));
            setShowDeleteModal(false);
            setDeleteId(null);
        } catch (err) {
            alert('Erro ao excluir: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const handleArchiveToggle = async (campaign: Campaign) => {
        try {
            const { error } = await supabase
                .from('campaigns')
                .update({ is_active: !campaign.is_active })
                .eq('id', campaign.id);
            if (error) throw error;
            setCampaigns(prev =>
                prev.map(c => c.id === campaign.id ? { ...c, is_active: !c.is_active } : c)
            );
            setShowArchiveModal(false);
            setArchiveId(null);
        } catch (err) {
            alert('Erro ao atualizar: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const handleDuplicate = async (campaign: Campaign) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .insert({
                    church_id: campaign.church_id,
                    title: `${campaign.title} (Cópia)`,
                    slug: `${campaign.slug}-copia-${Date.now()}`,
                    description: campaign.description,
                    banner_url: campaign.banner_url,
                    start_date: campaign.start_date,
                    end_date: campaign.end_date,
                    is_active: false,
                    is_public: campaign.is_public,
                    settings: campaign.settings,
                })
                .select()
                .single();

            if (error) throw error;

            const { data: fields } = await supabase
                .from('campaign_fields')
                .select('*')
                .eq('campaign_id', campaign.id);

            if (fields && fields.length > 0) {
                const newFields = fields.map(f => ({
                    campaign_id: data.id,
                    label: f.label,
                    type: f.type,
                    required: f.required,
                    options: f.options,
                    placeholder: f.placeholder,
                    order: f.order,
                }));
                await supabase.from('campaign_fields').insert(newFields);
            }

            setCampaigns(prev => [{
                ...data,
                responses_count: 0,
                views_count: 0,
            }, ...prev]);
            router.push(`/dashboard/campaigns/${data.id}/edit`);
        } catch (err) {
            alert('Erro ao duplicar: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const filtered = campaigns.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && c.is_active) ||
            (statusFilter === 'inactive' && !c.is_active);
        return matchesSearch && matchesStatus;
    });

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Campanhas</h1>
                    <p className="text-gray-600 mt-1">
                        Gerencie suas campanhas evangelísticas
                    </p>
                </div>
                <Button onClick={() => router.push('/dashboard/campaigns/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Campanha
                </Button>
            </div>

            <Card className="mb-8">
                <CardBody className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por título..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'active', 'inactive'] as const).map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={cn(
                                        'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                                        statusFilter === status
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    )}
                                >
                                    {status === 'all' ? 'Todas' : status === 'active' ? 'Ativas' : 'Inativas'}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>

            {filtered.length === 0 ? (
                <Card>
                    <CardBody className="p-12 text-center">
                        <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                            {campaigns.length === 0 ? 'Nenhuma campanha criada' : 'Nenhuma campanha encontrada'}
                        </h4>
                        <p className="text-gray-500 mb-6">
                            {campaigns.length === 0
                                ? 'Crie sua primeira campanha para começar a receber visitantes'
                                : 'Tente ajustar sua busca ou filtros'}
                        </p>
                        {campaigns.length === 0 && (
                            <Button onClick={() => router.push('/dashboard/campaigns/new')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Campanha
                            </Button>
                        )}
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Respostas</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Visualizações</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Criado em</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filtered.map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{campaign.title}</p>
                                                    {campaign.start_date && (
                                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                                            <Calendar className="h-3.5 w-3.5 mr-1" />
                                                            {formatDate(campaign.start_date)}
                                                            {campaign.end_date && <> — {formatDate(campaign.end_date)}</>}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <span className="text-sm text-gray-500">{campaign.slug}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={campaign.is_active ? 'success' : 'danger'}>
                                                    {campaign.is_active ? 'Ativa' : 'Inativa'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center hidden lg:table-cell">
                                                <span className="font-medium text-gray-900">{formatNumber(campaign.responses_count || 0)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center hidden lg:table-cell">
                                                <span className="text-gray-600">{formatNumber(campaign.views_count || 0)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-left hidden sm:table-cell">
                                                <span className="text-sm text-gray-500">{formatDate(campaign.created_at)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.push(`/dashboard/campaigns/${campaign.id}/edit`)}
                                                        title="Editar"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDuplicate(campaign)}
                                                        title="Duplicar"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setArchiveId(campaign.id);
                                                            setShowArchiveModal(true);
                                                        }}
                                                        title={campaign.is_active ? 'Arquivar' : 'Ativar'}
                                                    >
                                                        <Archive className={cn('h-4 w-4', !campaign.is_active && 'text-green-600')} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setDeleteId(campaign.id);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        title="Excluir"
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            )}

            <ConfirmDialog
                isOpen={showDeleteModal}
                onClose={() => { setShowDeleteModal(false); setDeleteId(null); }}
                onConfirm={handleDelete}
                title="Excluir Campanha"
                message="Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                variant="danger"
            />

            <ConfirmDialog
                isOpen={showArchiveModal}
                onClose={() => { setShowArchiveModal(false); setArchiveId(null); }}
                onConfirm={() => {
                    const campaign = campaigns.find(c => c.id === archiveId);
                    if (campaign) handleArchiveToggle(campaign);
                }}
                title={archiveId && campaigns.find(c => c.id === archiveId)?.is_active ? 'Arquivar Campanha' : 'Ativar Campanha'}
                message={archiveId && campaigns.find(c => c.id === archiveId)?.is_active
                    ? 'Deseja arquivar esta campanha? Ela ficará inativa e não será mais acessível via QR Code.'
                    : 'Deseja ativar esta campanha? Ela ficará disponível novamente.'}
                confirmText={archiveId && campaigns.find(c => c.id === archiveId)?.is_active ? 'Arquivar' : 'Ativar'}
                cancelText="Cancelar"
                variant={archiveId && campaigns.find(c => c.id === archiveId)?.is_active ? 'primary' : 'primary'}
            />
        </>
    );
}
