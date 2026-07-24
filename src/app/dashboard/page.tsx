'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import {
    LayoutDashboard,
    FileText,
    QrCode,
    Users,
    Settings,
    Plus,
    Search,
    Filter,
    Download,
    Edit,
    Trash2,
    Eye,
    Copy,
    Archive,
    ChevronDown,
    Calendar,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Users as UsersIcon,
    Heart,
    MapPin,
    Clock,
    Loader2,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { cn, formatDate, formatDateTime, formatNumber, getInitials, formatPhone } from '@/lib/utils';
import { QRCodeGenerator, BatchQRCodeGenerator } from '@/components/campaigns/QRCodeGenerator';

interface Campaign {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    banner_url: string | null;
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
    is_public: boolean;
    settings: Record<string, unknown>;
    created_at: string;
    updated_at: string;
    _count?: {
        responses: number;
        views: number;
    };
}

interface Response {
    id: string;
    campaign_id: string;
    data: Record<string, unknown>;
    visitor_name: string | null;
    visitor_phone: string | null;
    visitor_email: string | null;
    created_at: string;
}

interface DashboardStats {
    total_campaigns: number;
    active_campaigns: number;
    total_visitors: number;
    visitors_today: number;
    visitors_this_week: number;
    visitors_this_month: number;
    conversion_rate: number;
    decisions_for_christ: number;
    prayer_requests: number;
    visits_requested: number;
    discipleship_interested: number;
    membership_interested: number;
}

interface VisitorTrend {
    date: string;
    count: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [trends, setTrends] = useState<VisitorTrend[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [recentResponses, setRecentResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // QR Code modal state
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [showQRModal, setShowQRModal] = useState(false);

    // Delete modal
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Archive modal
    const [archiveId, setArchiveId] = useState<string | null>(null);
    const [showArchiveModal, setShowArchiveModal] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);

            // Fetch stats
            const { data: campaignsData } = await supabase
                .from('campaigns')
                .select('*, responses(count)')
                .order('created_at', { ascending: false });

            if (campaignsData) {
                setCampaigns(campaignsData);

                // Calculate stats
                const total = campaignsData.length;
                const active = campaignsData.filter(c => c.is_active).length;
                const totalVisitors = campaignsData.reduce((sum, c) => sum + (c.responses?.[0]?.count || 0), 0);

                setStats({
                    total_campaigns: total,
                    active_campaigns: active,
                    total_visitors: totalVisitors,
                    visitors_today: 0, // Would need separate query
                    visitors_this_week: 0,
                    visitors_this_month: 0,
                    conversion_rate: 0,
                    decisions_for_christ: 0,
                    prayer_requests: 0,
                    visits_requested: 0,
                    discipleship_interested: 0,
                    membership_interested: 0,
                });
            }

            // Fetch trends (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: responsesData } = await supabase
                .from('responses')
                .select('created_at, campaign_id')
                .in('campaign_id', campaignsData?.map(c => c.id) || [])
                .gte('created_at', thirtyDaysAgo.toISOString())
                .order('created_at', { ascending: true });

            if (responsesData) {
                const dailyCounts: Record<string, number> = {};
                responsesData.forEach(r => {
                    const date = new Date(r.created_at).toISOString().split('T')[0];
                    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
                });

                // Fill missing days with 0
                const filledTrends: VisitorTrend[] = [];
                for (let d = new Date(thirtyDaysAgo); d <= new Date(); d.setDate(d.getDate() + 1)) {
                    const dateStr = d.toISOString().split('T')[0];
                    filledTrends.push({ date: dateStr, count: dailyCounts[dateStr] || 0 });
                }
                setTrends(filledTrends);
            }

            // Fetch recent responses
            const { data: recentData } = await supabase
                .from('responses')
                .select('*')
                .in('campaign_id', campaignsData?.map(c => c.id) || [])
                .order('created_at', { ascending: false })
                .limit(10);

            if (recentData) {
                setRecentResponses(recentData);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
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

    const handleArchive = async () => {
        if (!archiveId) return;
        try {
            const { error } = await supabase
                .from('campaigns')
                .update({ is_active: false })
                .eq('id', archiveId);
            if (error) throw error;
            setCampaigns(prev => prev.map(c => c.id === archiveId ? { ...c, is_active: false } : c));
            setShowArchiveModal(false);
            setArchiveId(null);
        } catch (err) {
            alert('Erro ao arquivar: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const handleDuplicate = async (campaign: Campaign) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .insert({
                    ...campaign,
                    id: undefined,
                    title: `${campaign.title} (Cópia)`,
                    slug: `${campaign.slug}-copia-${Date.now()}`,
                    is_active: false,
                    created_at: undefined,
                    updated_at: undefined,
                })
                .select()
                .single();

            if (error) throw error;

            // Duplicate fields
            const { data: fields } = await supabase
                .from('campaign_fields')
                .select('*')
                .eq('campaign_id', campaign.id);

            if (fields && fields.length > 0) {
                const newFields = fields.map(f => ({
                    ...f,
                    id: undefined,
                    campaign_id: data.id,
                    created_at: undefined,
                    updated_at: undefined,
                }));
                await supabase.from('campaign_fields').insert(newFields);
            }

            setCampaigns(prev => [data, ...prev]);
            router.push(`/dashboard/campaigns/${data.id}/edit`);
        } catch (err) {
            alert('Erro ao duplicar: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
            </div>
        );
    }

    // Color palette for charts
    const COLORS = ['#C29560', '#D4A86A', '#E8C08A', '#A67D4D', '#F5D5A8', '#866540'];

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Visão geral das campanhas e visitantes da Igreja Campo do Planalto
                    </p>
                </div>
                <Button onClick={() => router.push('/dashboard/campaigns/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Campanha
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total de Campanhas"
                    value={stats?.total_campaigns || 0}
                    icon={FileText}
                    color="bg-primary-100 text-primary-700"
                    trend={`${stats?.active_campaigns || 0} ativas`}
                    trendIcon={CheckCircle}
                />
                <StatCard
                    title="Total de Visitantes"
                    value={formatNumber(stats?.total_visitors || 0)}
                    icon={UsersIcon}
                    color="bg-primary-100 text-primary-700"
                    trend={`+${stats?.visitors_today || 0} hoje`}
                    trendIcon={TrendingUp}
                />
                <StatCard
                    title="Decisões por Cristo"
                    value={formatNumber(stats?.decisions_for_christ || 0)}
                    icon={Heart}
                    color="bg-primary-50 text-primary-600"
                    trend={`${stats?.conversion_rate || 0}% conversão`}
                    trendIcon={TrendingUp}
                />
                <StatCard
                    title="Pedidos de Oração"
                    value={formatNumber(stats?.prayer_requests || 0)}
                    icon={AlertCircle}
                    color="bg-primary-50 text-primary-600"
                    trend={`${stats?.visits_requested || 0} visitas solicitadas`}
                    trendIcon={MapPin}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Visitors Trend Chart */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Visitantes nos Últimos 30 Dias</h3>
                                <p className="text-sm text-gray-500">Tendência de preenchimento de formulários</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={trends}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C29560" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C29560" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5dcc8" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={date => formatDate(date, { month: 'short', day: 'numeric' })}
                                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    axisLine={{ stroke: '#e5dcc8' }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    axisLine={{ stroke: '#e5dcc8' }}
                                    tickFormatter={formatNumber}
                                />
                                <Tooltip
                                    formatter={(value: number) => [formatNumber(value), 'Visitantes']}
                                    labelFormatter={date => formatDate(date, { weekday: 'short', day: 'numeric', month: 'short' })}
                                    contentStyle={{
                                        backgroundColor: '#FFF8F0',
                                        border: '1px solid #e5dcc8',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#C29560"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorVisitors)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>

                {/* Campaign Performance */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-gray-900">Desempenho das Campanhas</h3>
                        <p className="text-sm text-gray-500">Top 6 campanhas por visitantes</p>
                    </CardHeader>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={campaigns
                                    .slice(0, 6)
                                    .map(c => ({
                                        name: c.title.length > 20 ? c.title.slice(0, 20) + '...' : c.title,
                                        visitantes: c._count?.responses || 0,
                                        views: c._count?.views || 0,
                                    }))
                                    .reverse()}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis
                                    type="number"
                                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickFormatter={formatNumber}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    axisLine={false}
                                    width={140}
                                />
                                <Tooltip
                                    formatter={(value: number) => [formatNumber(value), 'Visitantes']}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="visitantes" fill="#C29560" radius={[0, 4, 4, 0]} maxBarSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Quick Actions */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
                    </CardHeader>
                    <CardBody className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => router.push('/dashboard/campaigns/new')}>
                            <FileText className="h-5 w-5 text-primary-600" />
                            <span>Criar Nova Campanha</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => router.push('/dashboard/qrcodes')}>
                            <QrCode className="h-5 w-5 text-primary-600" />
                            <span>Gerenciar QR Codes</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => router.push('/dashboard/visitors')}>
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <span>Ver Todos os Visitantes</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => router.push('/dashboard/responses')}>
                            <Download className="h-5 w-5 text-primary-600" />
                            <span>Exportar Respostas</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3" onClick={() => router.push('/dashboard/settings')}>
                            <Settings className="h-5 w-5 text-primary-600" />
                            <span>Configurações da Igreja</span>
                        </Button>
                    </CardBody>
                </Card>

                {/* Recent Responses */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Respostas Recentes</h3>
                            <p className="text-sm text-gray-500">Últimos 10 visitantes cadastrados</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/responses')}>
                            Ver todos
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardBody className="p-0">
                        {recentResponses.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <UsersIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                <p>Nenhuma resposta ainda</p>
                                <p className="text-sm">As respostas aparecerão aqui quando visitantes preencherem os formulários</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitante</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Telefone</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {recentResponses.map((response) => {
                                            const campaign = campaigns.find(c => c.id === response.campaign_id);
                                            return (
                                                <tr key={response.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
                                                                {getInitials(response.visitor_name || 'Visitante')}
                                                            </div>
                                                            <span className="ml-3 font-medium text-gray-900">
                                                                {response.visitor_name || 'Não informado'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm text-gray-600">{campaign?.title || 'Campanha removida'}</span>
                                                    </td>
                                                    <td className="px-4 py-3 hidden md:table-cell">
                                                        <span className="text-sm text-gray-600">{response.visitor_phone ? formatPhone(response.visitor_phone) : '-'}</span>
                                                    </td>
                                                    <td className="px-4 py-3 hidden lg:table-cell">
                                                        <span className="text-sm text-gray-600">{response.visitor_email || '-'}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm text-gray-600">{formatDateTime(response.created_at)}</span>
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
            </div>

            {/* Campaigns Overview */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Todas as Campanhas</h3>
                        <p className="text-sm text-gray-500">Gerencie suas campanhas e gere QR Codes</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Buscar campanhas..." className="w-64" />
                        <Button variant="outline" onClick={() => router.push('/dashboard/campaigns')}>
                            Ver todos
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {campaigns.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhuma campanha criada</h4>
                            <p className="text-gray-500 mb-6">Crie sua primeira campanha para começar a receber visitantes</p>
                            <Button onClick={() => router.push('/dashboard/campaigns/new')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Campanha
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Tipo / Evento</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Período</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visitantes</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visualizações</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{campaign.title}</p>
                                                    <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.slug}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <Badge variant={campaign.settings?.event_type === 'evangelism' ? 'gold' : 'primary'}>
                                                    {(campaign.settings?.event_type as string) || 'Geral'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                    {campaign.start_date && (
                                                        <>
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            <span>{formatDate(campaign.start_date)}</span>
                                                        </>
                                                    )}
                                                    {campaign.end_date && (
                                                        <>
                                                            <span className="mx-1">até</span>
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            <span>{formatDate(campaign.end_date)}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={campaign.is_active ? 'success' : 'danger'}>
                                                    {campaign.is_active ? 'Ativa' : 'Inativa'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-medium text-gray-900">{campaign._count?.responses || 0}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-gray-600">{campaign._count?.views || 0}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedCampaign(campaign);
                                                            setShowQRModal(true);
                                                        }}
                                                        title="QR Code"
                                                    >
                                                        <QrCode className="h-4 w-4" />
                                                    </Button>
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
                                                    {campaign.is_active ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => { setArchiveId(campaign.id); setShowArchiveModal(true); }}
                                                            title="Arquivar"
                                                        >
                                                            <Archive className="h-4 w-4" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => { setDeleteId(campaign.id); setShowDeleteModal(true); }}
                                                            title="Excluir"
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* QR Code Modal */}
            <Modal
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                title="QR Code da Campanha"
                size="lg"
            >
                {selectedCampaign && (
                    <QRCodeGenerator
                        url={`${window.location.origin}/c/${selectedCampaign.slug}`}
                        title={selectedCampaign.title}
                    />
                )}
            </Modal>

            {/* Delete Confirm Modal */}
            <ConfirmDialog
                isOpen={showDeleteModal}
                onClose={() => { setShowDeleteModal(false); setDeleteId(null); }}
                onConfirm={handleDelete}
                title="Excluir Campanha"
                message="Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita e todas as respostas associadas serão perdidas."
                confirmText="Excluir"
                cancelText="Cancelar"
                variant="danger"
            />

            {/* Archive Confirm Modal */}
            <ConfirmDialog
                isOpen={showArchiveModal}
                onClose={() => { setShowArchiveModal(false); setArchiveId(null); }}
                onConfirm={handleArchive}
                title="Arquivar Campanha"
                message="Deseja arquivar esta campanha? Ela ficará inativa e não será mais acessível via QR Code, mas os dados serão preservados."
                confirmText="Arquivar"
                cancelText="Cancelar"
                variant="primary"
            />
        </>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    icon: Icon,
    color,
    trend,
    trendIcon: TrendIcon,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: string;
    trendIcon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <Card>
            <CardBody className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                        {trend && (
                            <div className="flex items-center mt-2 text-sm text-green-600">
                                <TrendIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium">{trend}</span>
                            </div>
                        )}
                    </div>
                    <div className={cn('p-3 rounded-xl', color)}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}