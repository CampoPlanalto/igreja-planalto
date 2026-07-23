'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import { cn, formatDate, formatPhone } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input, Textarea, Select, Checkbox, RadioGroup, Label } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Card';
import { CheckCircle, AlertCircle, Loader2, Church, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';

type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'phone' | 'email' | 'number';

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
    settings: {
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
    const router = useRouter();
    const slug = params.slug as string;

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    const supabase = createClient();

    // Fetch campaign on mount
    useEffect(() => {
        async function fetchCampaign() {
            try {
                const { data, error } = await supabase
                    .from('campaigns')
                    .select('*')
                    .eq('slug', slug)
                    .eq('is_active', true)
                    .eq('is_public', true)
                    .single();

                if (error) throw error;
                if (!data) throw new Error('Campanha não encontrada');

                setCampaign(data);

                // Increment view count
                await supabase.rpc('increment_campaign_views', { campaign_uuid: data.id });

                // Fetch current view count
                const { count } = await supabase
                    .from('campaign_views')
                    .select('*', { count: 'exact', head: true })
                    .eq('campaign_id', data.id);
                setViewCount(count || 0);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar campanha');
            } finally {
                setLoading(false);
            }
        }

        fetchCampaign();
    }, [slug, supabase]);

    // Validate field
    const validateField = (field: CampaignField, value: string | string[] | boolean): string | null => {
        if (field.required) {
            if (field.type === 'checkbox') {
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    return `${field.label} é obrigatório`;
                }
            } else if (field.type === 'radio') {
                if (!value) {
                    return `${field.label} é obrigatório`;
                }
            } else if (!value || (typeof value === 'string' && value.trim() === '')) {
                return `${field.label} é obrigatório`;
            }
        }

        if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
            return 'Email inválido';
        }

        if (field.type === 'phone' && value) {
            const cleaned = (value as string).replace(/\D/g, '');
            if (cleaned.length < 10 || cleaned.length > 11) {
                return 'Telefone inválido';
            }
        }

        if (field.validation_rules) {
            const rules = field.validation_rules as Record<string, unknown>;
            if (rules.minLength && typeof value === 'string' && value.length < (rules.minLength as number)) {
                return `Mínimo ${rules.minLength} caracteres`;
            }
            if (rules.maxLength && typeof value === 'string' && value.length > (rules.maxLength as number)) {
                return `Máximo ${rules.maxLength} caracteres`;
            }
            if (rules.pattern && typeof value === 'string') {
                const regex = new RegExp(rules.pattern as string);
                if (!regex.test(value)) {
                    return rules.patternMessage as string || 'Formato inválido';
                }
            }
        }

        return null;
    };

    // Handle input change
    const handleChange = (fieldId: string, value: string | string[] | boolean) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));

        // Clear error on change
        const error = validateField(
            campaign?.settings?.custom_fields?.find(f => f.id === fieldId)!,
            value
        );
        setErrors(prev => {
            const next = { ...prev };
            if (error) next[fieldId] = error;
            else delete next[fieldId];
            return next;
        });
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaign) return;

        // Validate all fields
        const fields = campaign.settings?.custom_fields || [];
        const newErrors: Record<string, string> = {};

        fields.forEach(field => {
            const value = formData[field.id];
            const error = validateField(field, value);
            if (error) newErrors[field.id] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);

        try {
            // Prepare response data
            const responseData: Record<string, unknown> = {};
            fields.forEach(field => {
                responseData[field.id] = formData[field.id];
            });

            // Extract common fields for easy querying
            const visitorName = formData[fields.find(f => f.type === 'text' && f.label.toLowerCase().includes('nome'))?.id || ''] as string;
            const visitorPhone = formData[fields.find(f => f.type === 'phone')?.id || ''] as string;
            const visitorEmail = formData[fields.find(f => f.type === 'email')?.id || ''] as string;

            const { error } = await supabase
                .from('responses')
                .insert({
                    campaign_id: campaign.id,
                    data: responseData,
                    visitor_name: visitorName || null,
                    visitor_phone: visitorPhone || null,
                    visitor_email: visitorEmail || null,
                });

            if (error) throw error;

            setSubmitted(true);
            setShowSuccess(true);
            setFormData({});

            // Redirect if configured
            if (campaign.settings?.redirect_url) {
                setTimeout(() => {
                    window.location.href = campaign.settings!.redirect_url!;
                }, 3000);
            }
        } catch (err) {
            console.error('Submit error:', err);
            setErrors({ submit: 'Erro ao enviar formulário. Tente novamente.' });
        } finally {
            setSubmitting(false);
        }
    };

    // Render field based on type
    const renderField = (field: CampaignField) => {
        const fieldError = errors[field.id];
        const value = formData[field.id];
        const commonProps = {
            id: field.id,
            label: field.label,
            error: fieldError,
            hint: field.help_text,
            required: field.required,
            onChange: (val: string | string[] | boolean) => handleChange(field.id, val),
        };

        switch (field.type) {
            case 'textarea':
                return (
                    <Textarea
                        {...commonProps}
                        placeholder={field.placeholder}
                        value={(value as string) || ''}
                        rows={3}
                    />
                );

            case 'select':
                return (
                    <Select
                        {...commonProps}
                        placeholder={field.placeholder}
                        value={(value as string) || ''}
                        options={field.options?.map(opt => ({ value: opt, label: opt })) || []}
                    />
                );

            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option, idx) => (
                            <Checkbox
                                key={idx}
                                id={`${field.id}-${idx}`}
                                label={option}
                                checked={(value as string[])?.includes(option) || false}
                                onChange={(checked) => {
                                    const current = (formData[field.id] as string[]) || [];
                                    const next = checked
                                        ? [...current, option]
                                        : current.filter(o => o !== option);
                                    handleChange(field.id, next);
                                }}
                            />
                        ))}
                    </div>
                );

            case 'radio':
                return (
                    <RadioGroup
                        {...commonProps}
                        name={field.id}
                        value={(value as string) || ''}
                        options={field.options?.map(opt => ({ value: opt, label: opt })) || []}
                    />
                );

            case 'date':
                return (
                    <Input
                        {...commonProps}
                        type="date"
                        value={(value as string) || ''}
                        placeholder={field.placeholder}
                    />
                );

            case 'phone':
                return (
                    <Input
                        {...commonProps}
                        type="tel"
                        placeholder={field.placeholder || '(00) 00000-0000'}
                        value={(value as string) || ''}
                        onChange={(e) => {
                            const formatted = formatPhone(e.target.value);
                            handleChange(field.id, formatted);
                        }}
                    />
                );

            case 'email':
                return (
                    <Input
                        {...commonProps}
                        type="email"
                        placeholder={field.placeholder || 'seu@email.com'}
                        value={(value as string) || ''}
                    />
                );

            case 'number':
                return (
                    <Input
                        {...commonProps}
                        type="number"
                        placeholder={field.placeholder}
                        value={(value as string) || ''}
                    />
                );

            default: // text
                return (
                    <Input
                        {...commonProps}
                        type="text"
                        placeholder={field.placeholder}
                        value={(value as string) || ''}
                    />
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-600">Carregando campanha...</p>
                </div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Campanha não encontrada</h1>
                    <p className="text-gray-600 mb-6">
                        {error || 'Esta campanha não existe ou não está disponível no momento.'}
                    </p>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Voltar
                    </Button>
                </div>
            </div>
        );
    }

    const fields = campaign.settings?.custom_fields || [];
    const sortedFields = [...fields].sort((a, b) => a.order - b.order);

    // Check conditional logic
    const visibleFields = sortedFields.filter(field => {
        if (!field.conditional_logic) return true;
        const logic = field.conditional_logic as Record<string, unknown>;
        const dependsOn = logic.dependsOn as string;
        const equals = logic.equals;
        if (!dependsOn) return true;
        const depValue = formData[dependsOn];
        return depValue === equals;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Banner */}
            <div className="relative">
                {campaign.banner_url && (
                    <img
                        src={campaign.banner_url}
                        alt={campaign.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                )}
                {!campaign.banner_url && (
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary-600 to-primary-800" />
                )}

                <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="w-full p-6 md:p-8 text-white">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center space-x-3 mb-4">
                                <Church className="h-10 w-10 text-white" />
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold">{campaign.title}</h1>
                                    {campaign.description && (
                                        <p className="text-lg md:text-xl opacity-90 mt-1">{campaign.description}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm opacity-90">
                                {campaign.start_date && (
                                    <span className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Início: {formatDate(campaign.start_date)}</span>
                                    </span>
                                )}
                                {campaign.end_date && (
                                    <span className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Fim: {formatDate(campaign.end_date)}</span>
                                    </span>
                                )}
                                {campaign.settings?.show_visitor_count && (
                                    <span className="flex items-center space-x-1">
                                        <span className="bg-white/20 px-3 py-1 rounded-full">
                                            {viewCount} visitas
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 -mt-6 md:-mt-10 relative z-10">
                <Card className="shadow-xl">
                    <CardHeader className="pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Preencha sua ficha</h2>
                        <p className="text-gray-600 mt-1">
                            Todos os campos marcados com * são obrigatórios
                        </p>
                    </CardHeader>

                    <CardBody>
                        {showSuccess ? (
                            <div className="text-center py-12">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {campaign.settings?.thank_you_message || 'Obrigado por preencher!'}
                                </h3>
                                <p className="text-gray-600">
                                    Sua resposta foi registrada com sucesso.
                                    {campaign.settings?.redirect_url && ' Redirecionando...'}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                {errors.submit && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
                                        {errors.submit}
                                    </div>
                                )}

                                {visibleFields.map((field) => (
                                    <div key={field.id} className={cn('space-y-1', field.required && 'required')}>
                                        {renderField(field)}
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-gray-100">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        loading={submitting}
                                        disabled={submitted}
                                    >
                                        Enviar Formulário
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

            {/* Success Modal */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Sucesso!"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {campaign.settings?.thank_you_message || 'Obrigado por preencher!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Sua resposta foi registrada com sucesso.
                    </p>
                    <Button onClick={() => setShowSuccess(false)} className="w-full">
                        Fechar
                    </Button>
                </div>
            </Modal>
        </div>
    );
}