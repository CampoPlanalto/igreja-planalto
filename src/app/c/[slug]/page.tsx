'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { cn, formatDate, formatPhone } from '@/lib/utils';
import { Button, Input, Textarea, Select, Checkbox, RadioGroup } from '@/components/ui/FormComponents';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle, AlertCircle, Church, Calendar, MessageCircle } from 'lucide-react';

type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email';

interface CampaignField {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
    placeholder?: string;
    help_text?: string;
    order: number;
    validation_rules?: Record<string, unknown>;
    conditional_logic?: Record<string, unknown>;
}

interface Church {
    id: string;
    name: string;
    slug: string;
    whatsapp: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    primary_color: string;
    secondary_color: string;
    logo_url: string | null;
}

interface Campaign {
    id: string;
    church_id: string;
    title: string;
    slug: string;
    description: string | null;
    banner_url: string | null;
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
    is_public: boolean;
    qr_code_url: string | null;
    church: Church;
    settings?: {
        show_visitor_count?: boolean;
        allow_anonymous?: boolean;
        require_phone?: boolean;
        require_email?: boolean;
        thank_you_message?: string;
        redirect_url?: string | null;
        custom_fields?: CampaignField[];
    };
    created_at: string;
    updated_at: string;
}

interface FormData {
    [key: string]: string | string[] | boolean;
}

export default function CampaignPage() {
    const params = useParams();
    const slugParam = params.slug;
    const slug = typeof slugParam === 'string' ? slugParam : '';

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function fetchCampaign() {
            try {
                if (!slug) {
                    setError('Campanha não encontrada');
                    return;
                }

                const supabase = createClient();

                const { data, error: fetchError } = await supabase
                    .from('campaigns')
                    .select('*, church:churches!inner(*)')
                    .eq('slug', slug)
                    .eq('is_active', true)
                    .eq('is_public', true)
                    .single();

                if (cancelled) return;
                if (fetchError) throw fetchError;
                if (!data) throw new Error('Campanha não encontrada');

                setCampaign(data);

                const { error: rpcError } = await supabase.rpc('increment_campaign_views', { campaign_uuid: data.id });
                if (rpcError) {
                    console.error('Error incrementing view count:', rpcError);
                }

                const { count } = await supabase
                    .from('campaign_views')
                    .select('*', { count: 'exact', head: true })
                    .eq('campaign_id', data.id);

                if (!cancelled) {
                    setViewCount(count ?? 0);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Erro ao carregar campanha');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchCampaign();

        return () => { cancelled = true; };
    }, [slug]);

    const validateField = (field: CampaignField, value: string | string[] | boolean): string | null => {
        if (field.required) {
            if (field.type === 'checkbox') {
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    return `${field.label} é obrigatório`;
                }
            } else if (!value || (typeof value === 'string' && value.trim() === '')) {
                return `${field.label} é obrigatório`;
            }
        }

        if (field.type === 'email' && typeof value === 'string' && value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Email inválido';
            }
        }

        if (field.type === 'phone' && typeof value === 'string' && value) {
            const cleaned = value.replace(/\D/g, '');
            if (cleaned.length < 10 || cleaned.length > 11) {
                return 'Telefone inválido';
            }
        }

        if (field.validation_rules && typeof value === 'string') {
            const rules = field.validation_rules;
            if (typeof rules.minLength === 'number' && value.length < rules.minLength) {
                return `Mínimo ${rules.minLength} caracteres`;
            }
            if (typeof rules.maxLength === 'number' && value.length > rules.maxLength) {
                return `Máximo ${rules.maxLength} caracteres`;
            }
            if (typeof rules.pattern === 'string') {
                const regex = new RegExp(rules.pattern);
                if (!regex.test(value)) {
                    return typeof rules.patternMessage === 'string' ? rules.patternMessage : 'Formato inválido';
                }
            }
        }

        return null;
    };

    const handleChange = (fieldId: string, value: string | string[] | boolean) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));

        const fields = campaign?.settings?.custom_fields;
        const field = fields?.find(f => f.id === fieldId);
        if (field) {
            const error = validateField(field, value);
            setErrors(prev => {
                const next = { ...prev };
                if (error) {
                    next[fieldId] = error;
                } else {
                    delete next[fieldId];
                }
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaign) return;

        const fields = campaign.settings?.custom_fields ?? [];
        const newErrors: Record<string, string> = {};

        for (const field of fields) {
            const value = formData[field.id];
            const error = validateField(field, value);
            if (error) {
                newErrors[field.id] = error;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);

        try {
            const supabase = createClient();

            const responseData: Record<string, unknown> = {};
            for (const field of fields) {
                responseData[field.id] = formData[field.id];
            }

            const nameField = fields.find(f => f.type === 'text' && f.label.toLowerCase().includes('nome'));
            const phoneField = fields.find(f => f.type === 'phone');
            const emailField = fields.find(f => f.type === 'email');

            const nameValue = nameField ? formData[nameField.id] : undefined;
            const phoneValue = phoneField ? formData[phoneField.id] : undefined;
            const emailValue = emailField ? formData[emailField.id] : undefined;

            const { error: insertError } = await supabase
                .from('responses')
                .insert({
                    campaign_id: campaign.id,
                    data: responseData,
                    visitor_name: typeof nameValue === 'string' ? nameValue : null,
                    visitor_phone: typeof phoneValue === 'string' ? phoneValue : null,
                    visitor_email: typeof emailValue === 'string' ? emailValue : null,
                });

            if (insertError) throw insertError;

            setSubmitted(true);
            setShowSuccess(true);
            setFormData({});

            const redirectUrl = campaign.settings?.redirect_url;
            if (redirectUrl) {
                setTimeout(() => {
                    try {
                        const url = new URL(redirectUrl);
                        if (url.protocol === 'http:' || url.protocol === 'https:') {
                            window.location.href = url.toString();
                        }
                    } catch {
                        console.warn('URL de redirecionamento inválida:', redirectUrl);
                    }
                }, 3000);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setErrors({ submit: 'Erro ao enviar formulário. Tente novamente.' });
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (field: CampaignField) => {
        const fieldError = errors[field.id];
        const value = formData[field.id];
        const strValue = typeof value === 'string' ? value : '';

        const onChangeString = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            handleChange(field.id, e.target.value);
        };

        switch (field.type) {
            case 'textarea':
                return (
                    <Textarea
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        placeholder={field.placeholder}
                        value={strValue}
                        rows={3}
                        onChange={onChangeString}
                    />
                );

            case 'select':
                return (
                    <Select
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        placeholder={field.placeholder}
                        value={strValue}
                        options={field.options?.map(opt => ({ value: opt, label: opt })) ?? []}
                        onChange={onChangeString}
                    />
                );

            case 'checkbox': {
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <div className="space-y-2">
                        <p className="label">{field.label}{field.required ? ' *' : ''}</p>
                        {field.options?.map((option, idx) => (
                            <Checkbox
                                key={idx}
                                id={`${field.id}-${idx}`}
                                label={option}
                                checked={selectedValues.includes(option)}
                                onChange={() => {
                                    const next = selectedValues.includes(option)
                                        ? selectedValues.filter(o => o !== option)
                                        : [...selectedValues, option];
                                    handleChange(field.id, next);
                                }}
                            />
                        ))}
                        {field.help_text && !fieldError && (
                            <p className="text-sm text-gray-500">{field.help_text}</p>
                        )}
                        {fieldError && (
                            <p className="text-sm text-primary-600" role="alert">{fieldError}</p>
                        )}
                    </div>
                );
            }

            case 'radio':
                return (
                    <RadioGroup
                        label={field.label}
                        name={field.id}
                        value={strValue}
                        options={field.options?.map(opt => ({ value: opt, label: opt })) ?? []}
                        onChange={(v: string) => handleChange(field.id, v)}
                        error={fieldError}
                    />
                );

            case 'date':
                return (
                    <Input
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        type="date"
                        value={strValue}
                        placeholder={field.placeholder}
                        onChange={onChangeString}
                    />
                );

            case 'phone':
                return (
                    <Input
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        type="tel"
                        placeholder={field.placeholder ?? '(00) 00000-0000'}
                        value={strValue}
                        onChange={(e) => {
                            const formatted = formatPhone(e.target.value);
                            handleChange(field.id, formatted);
                        }}
                    />
                );

            case 'email':
                return (
                    <Input
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        type="email"
                        placeholder={field.placeholder ?? 'seu@email.com'}
                        value={strValue}
                        onChange={onChangeString}
                    />
                );

            default:
                return (
                    <Input
                        id={field.id}
                        label={field.label}
                        error={fieldError}
                        hint={field.help_text}
                        type="text"
                        placeholder={field.placeholder}
                        value={strValue}
                        onChange={onChangeString}
                    />
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-50">
                <div className="w-full h-64 md:h-80 skeleton" />
                <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 -mt-6 md:-mt-10 relative z-10">
                    <div className="rounded-xl border border-primary-100 bg-white p-6 shadow-sm">
                        <div className="skeleton h-8 w-64 mb-4" />
                        <div className="skeleton h-4 w-48 mb-8" />
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="mb-6">
                                <div className="skeleton h-4 w-32 mb-2" />
                                <div className="skeleton h-12 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
                <div className="text-center max-w-md animate-fade-in-up">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                        <AlertCircle className="h-10 w-10 text-primary-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Campanha não encontrada</h1>
                    <p className="text-gray-600 mb-8">
                        {error ?? 'Esta campanha não existe ou não está disponível no momento.'}
                    </p>
                    <div className="flex justify-center gap-3">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Voltar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const fields = campaign.settings?.custom_fields ?? [];
    const sortedFields = [...fields].sort((a, b) => a.order - b.order);

    const visibleFields = sortedFields.filter(field => {
        if (!field.conditional_logic) return true;
        const logic = field.conditional_logic;
        const dependsOn = typeof logic.dependsOn === 'string' ? logic.dependsOn : undefined;
        if (!dependsOn) return true;
        const depValue = formData[dependsOn];
        return depValue === logic.equals;
    });

    return (
        <div className={cn('min-h-screen bg-primary-50')}>
            <div className="relative">
                {campaign.banner_url ? (
                    <img
                        src={campaign.banner_url}
                        alt={campaign.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                ) : (
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary-600 to-primary-800" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="w-full p-6 md:p-8 text-white">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-4">
                                <Church className="h-10 w-10 shrink-0" />
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold">{campaign.title}</h1>
                                    {campaign.description && (
                                        <p className="text-lg md:text-xl opacity-90 mt-1">{campaign.description}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm opacity-90">
                                {campaign.start_date && (
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Início: {formatDate(campaign.start_date)}</span>
                                    </span>
                                )}
                                {campaign.end_date && (
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Fim: {formatDate(campaign.end_date)}</span>
                                    </span>
                                )}
                                {campaign.settings?.show_visitor_count && (
                                    <span className="bg-white/20 px-3 py-1 rounded-full">
                                        {viewCount} visitas
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 -mt-6 md:-mt-10 relative z-10">
                <Card className="shadow-xl">
                    <CardHeader className="pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Preencha sua ficha</h2>
                        <p className="text-gray-600 mt-1">
                            Todos os campos marcados com * são obrigatórios
                        </p>
                    </CardHeader>
                    <CardBody>
                        {showSuccess || submitted ? (
                            <div className="text-center py-12 animate-fade-in-up">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                                    <CheckCircle className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {campaign.settings?.thank_you_message ?? 'Obrigado por preencher!'}
                                </h3>
                                <p className="text-gray-600">
                                    Sua resposta foi registrada com sucesso.
                                    {campaign.settings?.redirect_url ? ' Redirecionando...' : ''}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                {errors.submit && (
                                    <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-primary-700" role="alert">
                                        {errors.submit}
                                    </div>
                                )}

                                {visibleFields.map(field => (
                                    <div key={field.id} className="space-y-1">
                                        {renderField(field)}
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-gray-100">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Enviando...' : 'Enviar Formulário'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardBody>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Dúvidas? Entre em contato conosco.
                </p>
            </div>

            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Sucesso!"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                        <CheckCircle className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {campaign.settings?.thank_you_message ?? 'Obrigado por preencher!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Sua resposta foi registrada com sucesso.
                    </p>
                    <Button onClick={() => setShowSuccess(false)} className="w-full">
                        Fechar
                    </Button>
                </div>
            </Modal>

            {(() => {
                const whatsappNumber = campaign.church?.whatsapp || campaign.church?.phone || '';
                const cleanNumber = whatsappNumber.replace(/\D/g, '');
                if (!cleanNumber) return null;
                return (
                    <a
                        href={`https://wa.me/${cleanNumber}?text=Olá! Tenho dúvidas sobre a campanha.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors animate-fade-in-up"
                        aria-label="Fale conosco pelo WhatsApp"
                    >
                        <MessageCircle className="h-7 w-7" />
                    </a>
                );
            })()}
        </div>
    );
}
