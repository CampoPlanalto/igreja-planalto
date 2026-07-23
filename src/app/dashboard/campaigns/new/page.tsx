'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select, Checkbox } from '@/components/ui/Input';
import { Alert } from '@/components/ui/FormComponents';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { generateSlug } from '@/lib/utils';

const CAMPAIGN_TYPES = [
    { value: 'geral', label: 'Geral' },
    { value: 'evangelismo', label: 'Evangelismo' },
    { value: 'congresso', label: 'Congresso' },
    { value: 'conferencia', label: 'Conferência' },
    { value: 'ebf', label: 'EBF' },
    { value: 'discipulado', label: 'Discipulado' },
    { value: 'batismo', label: 'Batismo' },
    { value: 'retiro', label: 'Retiro' },
    { value: 'infantil', label: 'Evento Infantil' },
    { value: 'acao_social', label: 'Ação Social' },
];

export default function NewCampaignPage() {
    const router = useRouter();
    const supabase = createClient();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [churchId, setChurchId] = useState<string | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        start_date: '',
        end_date: '',
        is_active: true,
        is_public: true,
        event_type: 'geral',
        thank_you_message: 'Obrigado por preencher!',
        redirect_url: '',
        show_visitor_count: true,
        allow_anonymous: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('church_id')
                        .eq('id', user.id)
                        .single();
                    if (profile?.church_id) {
                        setChurchId(profile.church_id);
                    }
                }
            } catch (err) {
                console.error('Erro ao carregar perfil:', err);
            } finally {
                setLoadingProfile(false);
            }
        };
        loadProfile();
    }, []);

    const handleTitleChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            title: value,
            slug: generateSlug(value),
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.title.trim()) newErrors.title = 'Título é obrigatório';
        if (!form.slug.trim()) newErrors.slug = 'Slug é obrigatório';
        if (form.start_date && form.end_date && form.start_date > form.end_date) {
            newErrors.end_date = 'Data final deve ser posterior à data inicial';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;
        if (!churchId) {
            setError('Perfil da igreja não encontrado');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const settings = {
                event_type: form.event_type,
                thank_you_message: form.thank_you_message,
                redirect_url: form.redirect_url || null,
                show_visitor_count: form.show_visitor_count,
                allow_anonymous: form.allow_anonymous,
            };

            const { data, error: insertError } = await supabase
                .from('campaigns')
                .insert({
                    church_id: churchId,
                    title: form.title.trim(),
                    slug: form.slug,
                    description: form.description.trim() || null,
                    start_date: form.start_date || null,
                    end_date: form.end_date || null,
                    is_active: form.is_active,
                    is_public: form.is_public,
                    settings,
                })
                .select()
                .single();

            if (insertError) throw insertError;

            router.push(`/dashboard/campaigns/${data.id}/edit`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar campanha');
        } finally {
            setSaving(false);
        }
    };

    if (loadingProfile) {
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
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/campaigns')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nova Campanha</h1>
                    <p className="text-gray-600 mt-1">Crie uma nova campanha para sua igreja</p>
                </div>
            </div>

            {error && (
                <Alert variant="danger" className="mb-6" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Card className="mb-8">
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Informações da Campanha</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Input
                            label="Título da Campanha"
                            placeholder="Ex: Campanha de Natal 2024"
                            value={form.title}
                            onChange={e => handleTitleChange(e.target.value)}
                            error={errors.title}
                            required
                        />
                        <Input
                            label="Slug"
                            placeholder="url-amigavel"
                            value={form.slug}
                            onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                            error={errors.slug}
                            hint="URL amigável para a campanha"
                            required
                        />
                    </div>

                    <Textarea
                        label="Descrição"
                        placeholder="Descreva o propósito da campanha..."
                        value={form.description}
                        onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                            label="Data de Início"
                            type="date"
                            value={form.start_date}
                            onChange={e => setForm(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                        <Input
                            label="Data de Término"
                            type="date"
                            value={form.end_date}
                            onChange={e => setForm(prev => ({ ...prev, end_date: e.target.value }))}
                            error={errors.end_date}
                        />
                    </div>

                    <Select
                        label="Tipo de Campanha"
                        value={form.event_type}
                        onChange={e => setForm(prev => ({ ...prev, event_type: e.target.value }))}
                        options={CAMPAIGN_TYPES}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Checkbox
                            label="Campanha ativa"
                            checked={form.is_active}
                            onChange={e => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
                        />
                        <Checkbox
                            label="Campanha pública"
                            checked={form.is_public}
                            onChange={e => setForm(prev => ({ ...prev, is_public: e.target.checked }))}
                        />
                    </div>
                </CardBody>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Configurações do Formulário</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                    <Textarea
                        label="Mensagem de Agradecimento"
                        placeholder="Mensagem exibida após o preenchimento..."
                        value={form.thank_you_message}
                        onChange={e => setForm(prev => ({ ...prev, thank_you_message: e.target.value }))}
                        rows={3}
                    />

                    <Input
                        label="URL de Redirecionamento (opcional)"
                        placeholder="https://..."
                        value={form.redirect_url}
                        onChange={e => setForm(prev => ({ ...prev, redirect_url: e.target.value }))}
                        hint="Se preenchido, o visitante será redirecionado após enviar o formulário"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Checkbox
                            label="Mostrar contagem de visitantes"
                            checked={form.show_visitor_count}
                            onChange={e => setForm(prev => ({ ...prev, show_visitor_count: e.target.checked }))}
                        />
                        <Checkbox
                            label="Permitir anônimo"
                            checked={form.allow_anonymous}
                            onChange={e => setForm(prev => ({ ...prev, allow_anonymous: e.target.checked }))}
                        />
                    </div>
                </CardBody>
            </Card>

            <div className="flex items-center justify-end gap-4">
                <Button variant="secondary" onClick={() => router.push('/dashboard/campaigns')}>
                    Cancelar
                </Button>
                <Button onClick={handleSave} loading={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Campanha
                </Button>
            </div>
        </>
    );
}
