'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardBody, CardHeader, Badge, Divider } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select, Checkbox } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/FormComponents';
import {
    Save, Loader2, ArrowLeft, Plus, Trash2, Edit, ChevronUp, ChevronDown, FileText, GripVertical
} from 'lucide-react';
import { cn, generateSlug } from '@/lib/utils';

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

const FIELD_TYPES = [
    { value: 'text', label: 'Texto' },
    { value: 'textarea', label: 'Área de Texto' },
    { value: 'select', label: 'Seleção' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio' },
    { value: 'date', label: 'Data' },
    { value: 'phone', label: 'Telefone' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Número' },
];

const FIELD_TYPE_VARIANTS: Record<string, 'primary' | 'success' | 'warning' | 'gold'> = {
    text: 'primary',
    textarea: 'primary',
    select: 'warning',
    checkbox: 'success',
    radio: 'success',
    date: 'gold',
    phone: 'primary',
    email: 'primary',
    number: 'primary',
};

interface CampaignField {
    id: string;
    campaign_id: string;
    label: string;
    type: string;
    required: boolean;
    options: string[] | null;
    placeholder: string | null;
    order: number;
}

interface CampaignForm {
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    is_public: boolean;
    event_type: string;
    thank_you_message: string;
    redirect_url: string;
    show_visitor_count: boolean;
    allow_anonymous: boolean;
}

function defaultForm(): CampaignForm {
    return {
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
    };
}

export default function EditCampaignPage() {
    const router = useRouter();
    const params = useParams();
    const campaignId = params.id as string;
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState<CampaignForm>(defaultForm());

    const [fields, setFields] = useState<CampaignField[]>([]);

    const [fieldModalOpen, setFieldModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<CampaignField | null>(null);
    const [fieldForm, setFieldForm] = useState({
        label: '',
        type: 'text',
        required: false,
        placeholder: '',
        options: [] as string[],
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const [deleteFieldId, setDeleteFieldId] = useState<string | null>(null);
    const [showDeleteFieldModal, setShowDeleteFieldModal] = useState(false);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const { data: campaign, error: campErr } = await supabase
                .from('campaigns')
                .select('*')
                .eq('id', campaignId)
                .single();

            if (campErr) {
                if (campErr.code === 'PGRST116') {
                    setNotFound(true);
                } else {
                    throw campErr;
                }
                return;
            }

            const settings = (campaign.settings as Record<string, any>) || {};

            setForm({
                title: campaign.title || '',
                slug: campaign.slug || '',
                description: campaign.description || '',
                start_date: campaign.start_date ? campaign.start_date.split('T')[0] : '',
                end_date: campaign.end_date ? campaign.end_date.split('T')[0] : '',
                is_active: campaign.is_active ?? true,
                is_public: campaign.is_public ?? true,
                event_type: settings.event_type || 'geral',
                thank_you_message: settings.thank_you_message || 'Obrigado por preencher!',
                redirect_url: settings.redirect_url || '',
                show_visitor_count: settings.show_visitor_count ?? true,
                allow_anonymous: settings.allow_anonymous ?? false,
            });

            const { data: fieldsData } = await supabase
                .from('campaign_fields')
                .select('*')
                .eq('campaign_id', campaignId)
                .order('order', { ascending: true });

            setFields(fieldsData || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar campanha');
        } finally {
            setLoading(false);
        }
    }, [campaignId, supabase]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleTitleChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            title: value,
            slug: value ? generateSlug(value) : prev.slug,
        }));
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            setError('Título é obrigatório');
            return;
        }

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const settings = {
                event_type: form.event_type,
                thank_you_message: form.thank_you_message,
                redirect_url: form.redirect_url || null,
                show_visitor_count: form.show_visitor_count,
                allow_anonymous: form.allow_anonymous,
            };

            const { error: updateErr } = await supabase
                .from('campaigns')
                .update({
                    title: form.title.trim(),
                    slug: form.slug,
                    description: form.description.trim() || null,
                    start_date: form.start_date || null,
                    end_date: form.end_date || null,
                    is_active: form.is_active,
                    is_public: form.is_public,
                    settings,
                })
                .eq('id', campaignId);

            if (updateErr) throw updateErr;

            setSuccess('Campanha salva com sucesso!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar campanha');
        } finally {
            setSaving(false);
        }
    };

    const openAddField = () => {
        setEditingField(null);
        setFieldForm({ label: '', type: 'text', required: false, placeholder: '', options: [] });
        setFieldErrors({});
        setFieldModalOpen(true);
    };

    const openEditField = (field: CampaignField) => {
        setEditingField(field);
        setFieldForm({
            label: field.label,
            type: field.type,
            required: field.required,
            placeholder: field.placeholder || '',
            options: field.options || [],
        });
        setFieldErrors({});
        setFieldModalOpen(true);
    };

    const validateField = () => {
        const errs: Record<string, string> = {};
        if (!fieldForm.label.trim()) errs.label = 'Label é obrigatório';
        if (['select', 'checkbox', 'radio'].includes(fieldForm.type) && fieldForm.options.length === 0) {
            errs.options = 'Adicione pelo menos uma opção';
        }
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSaveField = async () => {
        if (!validateField()) return;

        try {
            const payload = {
                campaign_id: campaignId,
                label: fieldForm.label.trim(),
                type: fieldForm.type,
                required: fieldForm.required,
                options: ['select', 'checkbox', 'radio'].includes(fieldForm.type) ? fieldForm.options : null,
                placeholder: fieldForm.placeholder || null,
            };

            if (editingField) {
                const { data, error: updateErr } = await supabase
                    .from('campaign_fields')
                    .update(payload)
                    .eq('id', editingField.id)
                    .select()
                    .single();

                if (updateErr) throw updateErr;

                setFields(prev =>
                    prev.map(f => f.id === editingField.id ? data as CampaignField : f)
                );
            } else {
                const maxOrder = fields.reduce((max, f) => Math.max(max, f.order), -1);
                const { data, error: insertErr } = await supabase
                    .from('campaign_fields')
                    .insert({ ...payload, order: maxOrder + 1 })
                    .select()
                    .single();

                if (insertErr) throw insertErr;

                setFields(prev => [...prev, data as CampaignField]);
            }

            setFieldModalOpen(false);
        } catch (err) {
            alert('Erro ao salvar campo: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const handleDeleteField = async () => {
        if (!deleteFieldId) return;
        try {
            const { error: delErr } = await supabase
                .from('campaign_fields')
                .delete()
                .eq('id', deleteFieldId);

            if (delErr) throw delErr;

            setFields(prev => prev.filter(f => f.id !== deleteFieldId));
            setShowDeleteFieldModal(false);
            setDeleteFieldId(null);
        } catch (err) {
            alert('Erro ao excluir campo: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        }
    };

    const moveField = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= fields.length) return;

        const newFields = [...fields];
        const temp = newFields[index];
        newFields[index] = { ...newFields[index], order: newFields[targetIndex].order };
        newFields[targetIndex] = { ...newFields[targetIndex], order: temp.order };
        [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];

        setFields(newFields);

        try {
            await supabase.from('campaign_fields').update({ order: newFields[index].order }).eq('id', newFields[index].id);
            await supabase.from('campaign_fields').update({ order: newFields[targetIndex].order }).eq('id', newFields[targetIndex].id);
        } catch (err) {
            console.error('Erro ao reordenar:', err);
        }
    };

    const addOption = () => {
        setFieldForm(prev => ({ ...prev, options: [...prev.options, ''] }));
    };

    const updateOption = (index: number, value: string) => {
        setFieldForm(prev => {
            const newOptions = [...prev.options];
            newOptions[index] = value;
            return { ...prev, options: newOptions };
        });
    };

    const removeOption = (index: number) => {
        setFieldForm(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index),
        }));
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

    if (notFound) {
        return (
            <>
                <div className="text-center py-16">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Campanha não encontrada</h2>
                    <p className="text-gray-500 mb-6">A campanha que você está procurando não existe ou foi removida.</p>
                    <Button onClick={() => router.push('/dashboard/campaigns')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar para Campanhas
                    </Button>
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
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">Editar Campanha</h1>
                    <p className="text-gray-600 mt-1">{form.title || 'Carregando...'}</p>
                </div>
                <Button onClick={handleSave} loading={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                </Button>
            </div>

            {error && (
                <Alert variant="danger" className="mb-6" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert variant="success" className="mb-6" onClose={() => setSuccess(null)}>
                    {success}
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
                            required
                        />
                        <Input
                            label="Slug"
                            placeholder="url-amigavel"
                            value={form.slug}
                            onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
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

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Construtor de Formulário</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Adicione e organize os campos do formulário da campanha
                            </p>
                        </div>
                        <Button onClick={openAddField}>
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Campo
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {fields.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-gray-500 mb-2">Nenhum campo adicionado</p>
                            <p className="text-sm text-gray-400 mb-4">
                                Clique em "Adicionar Campo" para criar o formulário da campanha
                            </p>
                            <Button variant="outline" onClick={openAddField}>
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Primeiro Campo
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <button
                                            onClick={() => moveField(index, 'up')}
                                            disabled={index === 0}
                                            className={cn(
                                                'p-0.5 rounded transition-colors',
                                                index === 0
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                            )}
                                            title="Mover para cima"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => moveField(index, 'down')}
                                            disabled={index === fields.length - 1}
                                            className={cn(
                                                'p-0.5 rounded transition-colors',
                                                index === fields.length - 1
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                            )}
                                            title="Mover para baixo"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0" />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900 truncate">
                                                {field.label}
                                            </span>
                                            {field.required && (
                                                <span className="text-red-500 text-sm">*</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={FIELD_TYPE_VARIANTS[field.type] || 'primary'}>
                                                {FIELD_TYPES.find(t => t.value === field.type)?.label || field.type}
                                            </Badge>
                                            {field.placeholder && (
                                                <span className="text-xs text-gray-400 truncate">
                                                    Placeholder: {field.placeholder}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEditField(field)}
                                            title="Editar campo"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setDeleteFieldId(field.id);
                                                setShowDeleteFieldModal(true);
                                            }}
                                            title="Excluir campo"
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>

            <Modal
                isOpen={fieldModalOpen}
                onClose={() => setFieldModalOpen(false)}
                title={editingField ? 'Editar Campo' : 'Adicionar Campo'}
                size="lg"
            >
                <div className="space-y-4">
                    <Input
                        label="Label do Campo"
                        placeholder="Ex: Nome completo"
                        value={fieldForm.label}
                        onChange={e => setFieldForm(prev => ({ ...prev, label: e.target.value }))}
                        error={fieldErrors.label}
                        required
                    />

                    <Select
                        label="Tipo de Campo"
                        value={fieldForm.type}
                        onChange={e => setFieldForm(prev => ({ ...prev, type: e.target.value }))}
                        options={FIELD_TYPES}
                    />

                    <Checkbox
                        label="Campo obrigatório"
                        checked={fieldForm.required}
                        onChange={e => setFieldForm(prev => ({ ...prev, required: e.target.checked }))}
                    />

                    <Input
                        label="Placeholder"
                        placeholder="Texto de exemplo dentro do campo..."
                        value={fieldForm.placeholder}
                        onChange={e => setFieldForm(prev => ({ ...prev, placeholder: e.target.value }))}
                    />

                    {['select', 'checkbox', 'radio'].includes(fieldForm.type) && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="label">Opções</label>
                                <Button variant="outline" size="sm" onClick={addOption}>
                                    <Plus className="h-3 w-3 mr-1" />
                                    Adicionar
                                </Button>
                            </div>
                            {fieldErrors.options && (
                                <p className="text-sm text-red-600">{fieldErrors.options}</p>
                            )}
                            <div className="space-y-2">
                                {fieldForm.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <Input
                                            placeholder={`Opção ${idx + 1}`}
                                            value={option}
                                            onChange={e => updateOption(idx, e.target.value)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeOption(idx)}
                                            className="text-red-600 hover:text-red-700 flex-shrink-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setFieldModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveField}>
                            <Save className="h-4 w-4 mr-2" />
                            {editingField ? 'Atualizar' : 'Adicionar'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={showDeleteFieldModal}
                onClose={() => { setShowDeleteFieldModal(false); setDeleteFieldId(null); }}
                onConfirm={handleDeleteField}
                title="Excluir Campo"
                message="Tem certeza que deseja excluir este campo? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                variant="danger"
            />
        </>
    );
}
