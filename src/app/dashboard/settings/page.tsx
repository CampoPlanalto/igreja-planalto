'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import {
    Settings,
    Save,
    Image,
    Palette,
    Globe,
    MapPin,
    User,
    Users,
    Shield,
    Loader2,
    AlertCircle,
    CheckCircle,
    Plus,
    Trash2,
    Church,
    Mail,
} from 'lucide-react';
import { cn, slugify } from '@/lib/utils';
import type { Database } from '@/types/database';

type ChurchRow = Database['public']['Tables']['churches']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

interface AlertState {
    type: 'success' | 'error';
    message: string;
}

const TABS = [
    { id: 'profile', label: 'Perfil', icon: Church },
    { id: 'contact', label: 'Contato', icon: Mail },
    { id: 'social', label: 'Redes Sociais', icon: Globe },
    { id: 'colors', label: 'Personalização', icon: Palette },
    { id: 'config', label: 'Configurações', icon: Settings },
    { id: 'users', label: 'Usuários', icon: Shield },
    { id: 'my-profile', label: 'Meu Perfil', icon: User },
];

export default function SettingsPage() {
    const supabase = createClient();

    const [activeTab, setActiveTab] = useState('profile');
    const [church, setChurch] = useState<ChurchRow | null>(null);
    const [profiles, setProfiles] = useState<ProfileRow[]>([]);
    const [currentProfile, setCurrentProfile] = useState<ProfileRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [alert, setAlert] = useState<AlertState | null>(null);

    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'church_admin' | 'member'>('member');
    const [inviting, setInviting] = useState(false);

    const [deleteProfileId, setDeleteProfileId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [formName, setFormName] = useState('');
    const [formSlug, setFormSlug] = useState('');
    const [formSlogan, setFormSlogan] = useState('');
    const [formLogoUrl, setFormLogoUrl] = useState('');
    const [formBannerUrl, setFormBannerUrl] = useState('');

    const [formAddress, setFormAddress] = useState('');
    const [formPhone, setFormPhone] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formWebsite, setFormWebsite] = useState('');

    const [formFacebook, setFormFacebook] = useState('');
    const [formInstagram, setFormInstagram] = useState('');
    const [formYoutube, setFormYoutube] = useState('');
    const [formWhatsapp, setFormWhatsapp] = useState('');

    const [formPrimaryColor, setFormPrimaryColor] = useState('#0ea5e9');
    const [formSecondaryColor, setFormSecondaryColor] = useState('#22c55e');

    const [formAllowRegistration, setFormAllowRegistration] = useState(true);
    const [formRequireApproval, setFormRequireApproval] = useState(true);
    const [formNotificationEmail, setFormNotificationEmail] = useState('');

    const [myName, setMyName] = useState('');
    const [myAvatarUrl, setMyAvatarUrl] = useState('');

    const slugManuallyEdited = useRef(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (alert) {
            const t = setTimeout(() => setAlert(null), 4000);
            return () => clearTimeout(t);
        }
    }, [alert]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const { data: { user } } = await supabase.auth.getUser();

            const { data: churchData } = await supabase
                .from('churches')
                .select('*')
                .limit(1)
                .single();

            if (churchData) {
                setChurch(churchData);
                setFormName(churchData.name);
                setFormSlug(churchData.slug);
                setFormSlogan(churchData.slogan || '');
                setFormLogoUrl(churchData.logo_url || '');
                setFormBannerUrl(churchData.banner_url || '');
                setFormAddress(churchData.address || '');
                setFormPhone(churchData.phone || '');
                setFormEmail(churchData.email || '');
                setFormWebsite(churchData.website || '');

                const social = (churchData.social_links || {}) as Record<string, string>;
                setFormFacebook(social.facebook || '');
                setFormInstagram(social.instagram || '');
                setFormYoutube(social.youtube || '');
                setFormWhatsapp(social.whatsapp || '');

                setFormPrimaryColor(churchData.primary_color || '#0ea5e9');
                setFormSecondaryColor(churchData.secondary_color || '#22c55e');

                const settings = (churchData.settings || {}) as Record<string, unknown>;
                setFormAllowRegistration((settings.allow_registration as boolean) ?? true);
                setFormRequireApproval((settings.require_approval as boolean) ?? true);
                setFormNotificationEmail((settings.notification_email as string) || '');

                if (churchData.id) {
                    const { data: profilesData } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('church_id', churchData.id)
                        .order('created_at', { ascending: true });

                    if (profilesData) {
                        setProfiles(profilesData);
                    }
                }
            }

            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    setCurrentProfile(profileData);
                    setMyName(profileData.name || '');
                    setMyAvatarUrl(profileData.avatar_url || '');
                }
            }
        } catch (err) {
            console.error('Error loading settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (type: 'success' | 'error', message: string) => {
        setAlert({ type, message });
    };

    const handleNameChange = (value: string) => {
        setFormName(value);
        if (!slugManuallyEdited.current) {
            setFormSlug(slugify(value));
        }
    };

    const saveChurch = async (section: string, updates: Record<string, unknown>) => {
        if (!church) return;
        try {
            setSaving(section);
            const { error } = await supabase
                .from('churches')
                .update(updates)
                .eq('id', church.id);

            if (error) throw error;
            setChurch(prev => prev ? { ...prev, ...updates } : null);
            showAlert('success', 'Salvo com sucesso!');
        } catch (err) {
            showAlert('error', err instanceof Error ? err.message : 'Erro ao salvar');
        } finally {
            setSaving(null);
        }
    };

    const handleSaveProfile = () => saveChurch('profile', {
        name: formName,
        slug: formSlug,
        slogan: formSlogan || null,
        logo_url: formLogoUrl || null,
        banner_url: formBannerUrl || null,
    });

    const handleSaveContact = () => saveChurch('contact', {
        address: formAddress || null,
        phone: formPhone || null,
        email: formEmail || null,
        website: formWebsite || null,
    });

    const handleSaveSocial = () => saveChurch('social', {
        social_links: {
            facebook: formFacebook || undefined,
            instagram: formInstagram || undefined,
            youtube: formYoutube || undefined,
            whatsapp: formWhatsapp || undefined,
        },
    });

    const handleSaveColors = () => saveChurch('colors', {
        primary_color: formPrimaryColor,
        secondary_color: formSecondaryColor,
    });

    const handleSaveConfig = () => saveChurch('config', {
        settings: {
            allow_registration: formAllowRegistration,
            require_approval: formRequireApproval,
            notification_email: formNotificationEmail || null,
        },
    });

    const handleSaveMyProfile = async () => {
        if (!currentProfile) return;
        try {
            setSaving('my-profile');
            const { error } = await supabase
                .from('profiles')
                .update({
                    name: myName || null,
                    avatar_url: myAvatarUrl || null,
                })
                .eq('id', currentProfile.id);

            if (error) throw error;
            setCurrentProfile(prev => prev ? { ...prev, name: myName || null, avatar_url: myAvatarUrl || null } : null);
            showAlert('success', 'Perfil atualizado!');
        } catch (err) {
            showAlert('error', err instanceof Error ? err.message : 'Erro ao salvar');
        } finally {
            setSaving(null);
        }
    };

    const handleInviteUser = async () => {
        if (!inviteEmail || !church) return;
        try {
            setInviting(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            const { data, error } = await supabase
                .from('profiles')
                .insert({
                    id: crypto.randomUUID(),
                    email: inviteEmail,
                    name: null,
                    avatar_url: null,
                    role: inviteRole,
                    church_id: church.id,
                })
                .select()
                .single();

            if (error) throw error;

            setProfiles(prev => [...prev, data]);
            setShowInviteModal(false);
            setInviteEmail('');
            setInviteRole('member');
            showAlert('success', 'Usuário convidado com sucesso!');
        } catch (err) {
            showAlert('error', err instanceof Error ? err.message : 'Erro ao convidar');
        } finally {
            setInviting(false);
        }
    };

    const handleRemoveUser = async () => {
        if (!deleteProfileId) return;
        try {
            setDeleting(true);
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', deleteProfileId);

            if (error) throw error;

            setProfiles(prev => prev.filter(p => p.id !== deleteProfileId));
            setShowDeleteModal(false);
            setDeleteProfileId(null);
            showAlert('success', 'Usuário removido!');
        } catch (err) {
            showAlert('error', err instanceof Error ? err.message : 'Erro ao remover');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500 mt-1">Gerencie as configurações da sua igreja</p>
                </div>
            </div>

            {alert && (
                <div className={cn(
                    'mb-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium',
                    alert.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                )}>
                    {alert.type === 'success' ? <CheckCircle className="h-5 w-5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 flex-shrink-0" />}
                    {alert.message}
                </div>
            )}

            <div className="flex overflow-x-auto gap-1 mb-6 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0',
                                activeTab === tab.id
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {activeTab === 'profile' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Church className="h-5 w-5 text-primary-600" />
                            Perfil da Igreja
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Nome da Igreja"
                                value={formName}
                                onChange={e => handleNameChange(e.target.value)}
                                placeholder="Igreja Campo do Planalto"
                            />
                            <Input
                                label="Slug"
                                value={formSlug}
                                onChange={e => {
                                    slugManuallyEdited.current = true;
                                    setFormSlug(e.target.value);
                                }}
                                placeholder="igreja-campo-planalto"
                                hint="Usado na URL da igreja"
                            />
                        </div>
                        <Input
                            label="Slogan"
                            value={formSlogan}
                            onChange={e => setFormSlogan(e.target.value)}
                            placeholder="Uma igreja para todas as gerações"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    label="URL do Logo"
                                    value={formLogoUrl}
                                    onChange={e => setFormLogoUrl(e.target.value)}
                                    placeholder="https://exemplo.com/logo.png"
                                />
                                {formLogoUrl ? (
                                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                        <img src={formLogoUrl} alt="Logo preview" className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                                        <Image className="h-8 w-8" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="URL do Banner"
                                    value={formBannerUrl}
                                    onChange={e => setFormBannerUrl(e.target.value)}
                                    placeholder="https://exemplo.com/banner.png"
                                />
                                {formBannerUrl ? (
                                    <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                        <img src={formBannerUrl} alt="Banner preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                ) : (
                                    <div className="w-full h-24 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                                        <Image className="h-8 w-8" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSaveProfile} loading={saving === 'profile'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Perfil
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {activeTab === 'contact' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary-600" />
                            Contato
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <Textarea
                            label="Endereço"
                            value={formAddress}
                            onChange={e => setFormAddress(e.target.value)}
                            placeholder="SQN 308, Bloco C, Loja 12 - Brasília, DF"
                            rows={3}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Telefone"
                                value={formPhone}
                                onChange={e => setFormPhone(e.target.value)}
                                placeholder="(61) 99999-9999"
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                                placeholder="contato@igrejacampodoplanalto.com"
                            />
                        </div>
                        <Input
                            label="Website"
                            value={formWebsite}
                            onChange={e => setFormWebsite(e.target.value)}
                            placeholder="https://igrejacampodoplanalto.com"
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleSaveContact} loading={saving === 'contact'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Contato
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {activeTab === 'social' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-primary-600" />
                            Redes Sociais
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Facebook"
                                value={formFacebook}
                                onChange={e => setFormFacebook(e.target.value)}
                                placeholder="https://facebook.com/igrejacampodoplanalto"
                            />
                            <Input
                                label="Instagram"
                                value={formInstagram}
                                onChange={e => setFormInstagram(e.target.value)}
                                placeholder="https://instagram.com/igrejacampodoplanalto"
                            />
                            <Input
                                label="YouTube"
                                value={formYoutube}
                                onChange={e => setFormYoutube(e.target.value)}
                                placeholder="https://youtube.com/@igrejacampodoplanalto"
                            />
                            <Input
                                label="WhatsApp"
                                value={formWhatsapp}
                                onChange={e => setFormWhatsapp(e.target.value)}
                                placeholder="+5561999999999"
                                hint="Número com código do país"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSaveSocial} loading={saving === 'social'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Redes Sociais
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {activeTab === 'colors' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Palette className="h-5 w-5 text-primary-600" />
                            Personalização
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="label">Cor Primária</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={formPrimaryColor}
                                            onChange={e => setFormPrimaryColor(e.target.value)}
                                            className="h-10 w-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                                        />
                                    </div>
                                    <Input
                                        value={formPrimaryColor}
                                        onChange={e => setFormPrimaryColor(e.target.value)}
                                        placeholder="#0ea5e9"
                                        className="font-mono"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="label">Cor Secundária</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={formSecondaryColor}
                                            onChange={e => setFormSecondaryColor(e.target.value)}
                                            className="h-10 w-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                                        />
                                    </div>
                                    <Input
                                        value={formSecondaryColor}
                                        onChange={e => setFormSecondaryColor(e.target.value)}
                                        placeholder="#22c55e"
                                        className="font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                            <p className="text-sm font-medium text-gray-700 mb-3">Prévia</p>
                            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                <div className="h-20" style={{ backgroundColor: formPrimaryColor }} />
                                <div className="p-4 bg-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: formPrimaryColor }}>
                                            IP
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Igreja Campo do Planalto</p>
                                            <p className="text-xs text-gray-500">Vila Planalto</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: formPrimaryColor }}>
                                            Principal
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: formSecondaryColor }}>
                                            Secundário
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSaveColors} loading={saving === 'colors'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Cores
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {activeTab === 'config' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary-600" />
                            Configurações
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                                <div>
                                    <p className="font-medium text-gray-900">Permitir Cadastro</p>
                                    <p className="text-sm text-gray-500">Permitir que novos usuários se cadastrem na igreja</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={formAllowRegistration}
                                    onClick={() => setFormAllowRegistration(!formAllowRegistration)}
                                    className={cn(
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                                        formAllowRegistration ? 'bg-primary-600' : 'bg-gray-200'
                                    )}
                                >
                                    <span className={cn(
                                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                        formAllowRegistration ? 'translate-x-5' : 'translate-x-0'
                                    )} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                                <div>
                                    <p className="font-medium text-gray-900">Exigir Aprovação</p>
                                    <p className="text-sm text-gray-500">Novos cadastros precisam de aprovação manual</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={formRequireApproval}
                                    onClick={() => setFormRequireApproval(!formRequireApproval)}
                                    className={cn(
                                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                                        formRequireApproval ? 'bg-primary-600' : 'bg-gray-200'
                                    )}
                                >
                                    <span className={cn(
                                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                        formRequireApproval ? 'translate-x-5' : 'translate-x-0'
                                    )} />
                                </button>
                            </div>
                        </div>
                        <Input
                            label="Email para Notificações"
                            type="email"
                            value={formNotificationEmail}
                            onChange={e => setFormNotificationEmail(e.target.value)}
                            placeholder="admin@igrejacampodoplanalto.com"
                            hint="Notificações serão enviadas para este email"
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleSaveConfig} loading={saving === 'config'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Configurações
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {activeTab === 'users' && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary-600" />
                            Usuários
                        </h2>
                        <Button onClick={() => setShowInviteModal(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Convidar Usuário
                        </Button>
                    </CardHeader>
                    <CardBody className="p-0">
                        {profiles.length === 0 ? (
                            <div className="p-12 text-center">
                                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-gray-500">Nenhum usuário encontrado</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {profiles.map(profile => (
                                            <tr key={profile.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
                                                            {profile.name ? profile.name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{profile.name || '—'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{profile.email}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={profile.role === 'super_admin' ? 'gold' : profile.role === 'church_admin' ? 'primary' : 'gray'}>
                                                        {profile.role === 'super_admin' ? 'Super Admin' : profile.role === 'church_admin' ? 'Admin' : 'Membro'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {profile.role !== 'super_admin' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setDeleteProfileId(profile.id);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}

            {activeTab === 'my-profile' && (
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary-600" />
                            Meu Perfil
                        </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                label="Nome"
                                value={myName}
                                onChange={e => setMyName(e.target.value)}
                                placeholder="Seu nome"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                label="URL do Avatar"
                                value={myAvatarUrl}
                                onChange={e => setMyAvatarUrl(e.target.value)}
                                placeholder="https://exemplo.com/avatar.png"
                            />
                            {myAvatarUrl ? (
                                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                                    <img src={myAvatarUrl} alt="Avatar preview" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>
                            ) : (
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                                    <User className="h-8 w-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSaveMyProfile} loading={saving === 'my-profile'}>
                                <Save className="h-4 w-4 mr-2" />
                                Salvar Perfil
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            <Modal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                title="Convidar Usuário"
                size="sm"
            >
                <div className="space-y-4">
                    <Input
                        label="Email do usuário"
                        type="email"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="usuario@email.com"
                    />
                    <Select
                        label="Função"
                        value={inviteRole}
                        onChange={e => setInviteRole(e.target.value as 'church_admin' | 'member')}
                        options={[
                            { value: 'church_admin', label: 'Administrador' },
                            { value: 'member', label: 'Membro' },
                        ]}
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="secondary" onClick={() => setShowInviteModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleInviteUser} loading={inviting} disabled={!inviteEmail}>
                            Convidar
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={showDeleteModal}
                onClose={() => { setShowDeleteModal(false); setDeleteProfileId(null); }}
                onConfirm={handleRemoveUser}
                title="Remover Usuário"
                message="Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita."
                confirmText="Remover"
                cancelText="Cancelar"
                variant="danger"
                loading={deleting}
            />
        </div>
    );
}
