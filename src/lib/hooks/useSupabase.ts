'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { Campaign, CampaignField, Response, DashboardStats, VisitorTrend } from '@/types';

export function useCampaigns(churchId?: string) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchCampaigns = useCallback(async () => {
        if (!churchId) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .eq('church_id', churchId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCampaigns(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar campanhas');
        } finally {
            setLoading(false);
        }
    }, [churchId, supabase]);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const createCampaign = async (campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) => {
        const { data, error } = await supabase
            .from('campaigns')
            .insert(campaign)
            .select()
            .single();

        if (error) throw error;
        setCampaigns((prev) => [data, ...prev]);
        return data;
    };

    const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
        const { data, error } = await supabase
            .from('campaigns')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        setCampaigns((prev) => prev.map((c) => (c.id === id ? data : c)));
        return data;
    };

    const deleteCampaign = async (id: string) => {
        const { error } = await supabase.from('campaigns').delete().eq('id', id);
        if (error) throw error;
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
    };

    return { campaigns, loading, error, createCampaign, updateCampaign, deleteCampaign, refetch: fetchCampaigns };
}

export function useCampaignFields(campaignId?: string) {
    const [fields, setFields] = useState<CampaignField[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchFields = useCallback(async () => {
        if (!campaignId) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('campaign_fields')
                .select('*')
                .eq('campaign_id', campaignId)
                .order('order', { ascending: true });

            if (error) throw error;
            setFields(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar campos');
        } finally {
            setLoading(false);
        }
    }, [campaignId, supabase]);

    useEffect(() => {
        fetchFields();
    }, [fetchFields]);

    const createField = async (field: Omit<CampaignField, 'id' | 'created_at' | 'updated_at'>) => {
        const { data, error } = await supabase
            .from('campaign_fields')
            .insert(field)
            .select()
            .single();

        if (error) throw error;
        setFields((prev) => [...prev, data].sort((a, b) => a.order - b.order));
        return data;
    };

    const updateField = async (id: string, updates: Partial<CampaignField>) => {
        const { data, error } = await supabase
            .from('campaign_fields')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        setFields((prev) => prev.map((f) => (f.id === id ? data : f)));
        return data;
    };

    const deleteField = async (id: string) => {
        const { error } = await supabase.from('campaign_fields').delete().eq('id', id);
        if (error) throw error;
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    const reorderFields = async (fieldIds: string[]) => {
        const updates = fieldIds.map((id, index) =>
            supabase.from('campaign_fields').update({ order: index }).eq('id', id)
        );
        await Promise.all(updates);
        fetchFields();
    };

    return { fields, createField, updateField, deleteField, reorderFields, refetch: fetchFields };
}

export function useResponses(campaignId?: string) {
    const [responses, setResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchResponses = useCallback(async () => {
        if (!campaignId) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('responses')
                .select('*')
                .eq('campaign_id', campaignId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setResponses(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar respostas');
        } finally {
            setLoading(false);
        }
    }, [campaignId, supabase]);

    useEffect(() => {
        fetchResponses();
    }, [fetchResponses]);

    const exportToCSV = () => {
        if (responses.length === 0) return '';

        const headers = [
            'ID',
            'Nome',
            'Telefone',
            'Email',
            'Data',
            ...(responses[0].data ? Object.keys(responses[0].data as object) : []),
        ];

        const rows = responses.map((r) => [
            r.id,
            r.visitor_name || '',
            r.visitor_phone || '',
            r.visitor_email || '',
            formatDate(r.created_at),
            ...(r.data ? Object.values(r.data as object).map(String) : []),
        ]);

        return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    };

    const exportToExcel = () => {
        const csv = exportToCSV();
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `respostas-${campaignId}-${formatDate(new Date())}.csv`;
        link.click();
    };

    return { responses, loading, error, exportToCSV: exportToExcel, refetch: fetchResponses };
}

export function useDashboardStats(churchId?: string) {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [trends, setTrends] = useState<VisitorTrend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const fetchStats = useCallback(async () => {
        if (!churchId) return;
        try {
            setLoading(true);

            // Total campaigns
            const { count: totalCampaigns } = await supabase
                .from('campaigns')
                .select('*', { count: 'exact', head: true })
                .eq('church_id', churchId);

            // Active campaigns
            const { count: activeCampaigns } = await supabase
                .from('campaigns')
                .select('*', { count: 'exact', head: true })
                .eq('church_id', churchId)
                .eq('is_active', true);

            // Total visitors
            const { count: totalVisitors } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ));

            // Today's visitors
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const { count: visitorsToday } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .gte('created_at', today.toISOString());

            // This week
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const { count: visitorsThisWeek } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .gte('created_at', weekAgo.toISOString());

            // This month
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            const { count: visitorsThisMonth } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .gte('created_at', monthAgo.toISOString());

            // Decisions for Christ
            const { count: decisions } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .contains('data', { 'Aceitei Jesus': true });

            // Prayer requests
            const { count: prayers } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .contains('data', { 'Tenho um pedido de oração': true });

            // Visits requested
            const { count: visits } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .contains('data', { 'Quero receber uma visita em casa': true });

            // Discipleship interest
            const { count: discipleship } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .contains('data', { 'Desejo participar de um pequeno grupo': true });

            // Membership interest
            const { count: membership } = await supabase
                .from('responses')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .contains('data', { 'Tenho interesse em ser membro': true });

            setStats({
                total_campaigns: totalCampaigns || 0,
                active_campaigns: activeCampaigns || 0,
                total_visitors: totalVisitors || 0,
                visitors_today: visitorsToday || 0,
                visitors_this_week: visitorsThisWeek || 0,
                visitors_this_month: visitorsThisMonth || 0,
                conversion_rate: totalVisitors ? Math.round((decisions / totalVisitors) * 100) : 0,
            });

            // Fetch trends for last 30 days
            const { data: trendData } = await supabase
                .from('responses')
                .select('created_at')
                .in('campaign_id', (
                    supabase.from('campaigns').select('id').eq('church_id', churchId)
                ))
                .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
                .order('created_at', { ascending: true });

            if (trendData) {
                const dailyCounts: Record<string, number> = {};
                trendData.forEach((r) => {
                    const date = new Date(r.created_at).toISOString().split('T')[0];
                    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
                });
                setTrends(
                    Object.entries(dailyCounts)
                        .map(([date, count]) => ({ date, count }))
                        .sort((a, b) => a.date.localeCompare(b.date))
                );
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar estatísticas');
        } finally {
            setLoading(false);
        }
    }, [churchId, supabase]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, trends, loading, error, refetch: fetchStats };
}