'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import {
    Users, Plus, Shield, Search, Edit2, Trash2, Key, Mail, Loader2, AlertCircle, CheckCircle, Crown
} from 'lucide-react';

interface UserWithRole {
    user_id: string;
    role: string;
    email: string | null;
    name: string | null;
    created_at: string | null;
}

const roleOptions = [
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'church_admin', label: 'Admin Igreja' },
    { value: 'secretary', label: 'Secretário' },
    { value: 'receptionist', label: 'Recepcionista' },
    { value: 'user', label: 'Usuário' },
];

const roleBadgeVariant: Record<string, 'danger' | 'primary' | 'warning' | 'success' | 'gray'> = {
    super_admin: 'danger',
    church_admin: 'primary',
    secretary: 'warning',
    receptionist: 'success',
    user: 'gray',
};

const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    church_admin: 'Admin Igreja',
    secretary: 'Secretário',
    receptionist: 'Recepcionista',
    user: 'Usuário',
};

export default function UsersPage() {
    const supabase = createClient();
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
    const [processing, setProcessing] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [createErrors, setCreateErrors] = useState<Record<string, string>>({});

    const [editRole, setEditRole] = useState('user');

    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchCurrentUserRole();
    }, []);

    const fetchCurrentUserRole = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .single();
            if (data) setCurrentUserRole(data.role);
        } catch { }
    };

    useEffect(() => {
        if (currentUserRole) fetchUsers();
    }, [currentUserRole]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data: roles, error } = await supabase
                .from('user_roles')
                .select('user_id, role, created_at');

            if (error) throw error;

            const userIds = (roles || []).map(r => r.user_id);

            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, email, name')
                .in('id', userIds);

            const profileMap = new Map((profiles || []).map(p => [p.id, p]));

            const mapped: UserWithRole[] = (roles || []).map((item) => {
                const profile = profileMap.get(item.user_id);
                return {
                    user_id: item.user_id,
                    role: item.role,
                    email: profile?.email ?? null,
                    name: profile?.name ?? null,
                    created_at: item.created_at ?? null,
                };
            });

            setUsers(mapped);
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Erro ao carregar usuários' });
        } finally {
            setLoading(false);
        }
    };

    const validateCreateForm = () => {
        const errors: Record<string, string> = {};
        if (!createForm.name.trim()) errors.name = 'Nome é obrigatório';
        if (!createForm.email.trim()) errors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(createForm.email)) errors.email = 'Email inválido';
        if (!createForm.password) errors.password = 'Senha é obrigatória';
        else if (createForm.password.length < 6) errors.password = 'Mínimo 6 caracteres';
        setCreateErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreate = async () => {
        if (!validateCreateForm()) return;
        setProcessing(true);
        try {
            const { error } = await supabase.rpc('create_user_with_role', {
                user_email: createForm.email,
                user_password: createForm.password,
                user_name: createForm.name,
                user_role: createForm.role,
            });
            if (error) throw error;
            setFeedback({ type: 'success', message: 'Usuário criado com sucesso' });
            setShowCreateModal(false);
            setCreateForm({ name: '', email: '', password: '', role: 'user' });
            fetchUsers();
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Erro ao criar usuário' });
        } finally {
            setProcessing(false);
        }
    };

    const handleEditRole = async () => {
        if (!selectedUser) return;
        setProcessing(true);
        try {
            const { error } = await supabase
                .from('user_roles')
                .update({ role: editRole })
                .eq('user_id', selectedUser.user_id);
            if (error) throw error;
            setFeedback({ type: 'success', message: 'Função atualizada com sucesso' });
            setShowEditModal(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Erro ao atualizar função' });
        } finally {
            setProcessing(false);
        }
    };

    const handleChangePassword = async () => {
        if (!selectedUser || !newPassword) return;
        if (newPassword.length < 6) {
            setFeedback({ type: 'error', message: 'Senha deve ter no mínimo 6 caracteres' });
            return;
        }
        setProcessing(true);
        try {
            const { error } = await supabase.rpc('change_user_password', {
                target_user_id: selectedUser.user_id,
                new_password: newPassword,
            });
            if (error) throw error;
            setFeedback({ type: 'success', message: 'Senha alterada com sucesso' });
            setShowPasswordModal(false);
            setNewPassword('');
            setSelectedUser(null);
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Erro ao alterar senha' });
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        setProcessing(true);
        try {
            const { error } = await supabase.rpc('delete_user_with_role', {
                target_user_id: selectedUser.user_id,
            });
            if (error) throw error;
            setFeedback({ type: 'success', message: 'Usuário removido com sucesso' });
            setShowDeleteModal(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Erro ao remover usuário' });
        } finally {
            setProcessing(false);
        }
    };

    const filteredUsers = users.filter(u =>
        (u.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (u.email?.toLowerCase() || '').includes(search.toLowerCase())
    );

    if (currentUserRole !== 'super_admin') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Shield className="h-16 w-16 text-primary-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Restrito</h2>
                    <p className="text-gray-500">Apenas super administradores podem gerenciar usuários.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
                    <p className="text-gray-500 mt-1">
                        {users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Usuário
                </Button>
            </div>

            {feedback && (
                <div className={`flex items-center p-4 rounded-lg border ${
                    feedback.type === 'success'
                        ? 'bg-primary-50 border-primary-200 text-primary-800'
                        : 'bg-primary-50 border-primary-200 text-primary-800'
                }`} role="alert">
                    {feedback.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <p className="text-sm flex-1">{feedback.message}</p>
                    <button
                        onClick={() => setFeedback(null)}
                        className="ml-2 text-current opacity-50 hover:opacity-100"
                    >
                        &times;
                    </button>
                </div>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                                {search ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                                        <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.user_id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                                        {user.role === 'super_admin' ? (
                                                            <Crown className="h-5 w-5 text-primary-600" />
                                                        ) : (
                                                            <Users className="h-5 w-5 text-primary-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {user.name || 'Sem nome'}
                                                            {user.role === 'super_admin' && (
                                                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    <Crown className="h-3 w-3 mr-0.5" />
                                                                    EU
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{user.email || '-'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={roleBadgeVariant[user.role] || 'gray'}>
                                                    {roleLabels[user.role] || user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setEditRole(user.role);
                                                            setShowEditModal(true);
                                                        }}
                                                        title="Alterar função"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setNewPassword('');
                                                            setShowPasswordModal(true);
                                                        }}
                                                        title="Alterar senha"
                                                    >
                                                        <Key className="h-4 w-4" />
                                                    </Button>
                                                    {user.role !== 'super_admin' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            title="Remover usuário"
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
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

            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Novo Usuário" size="lg">
                <div className="space-y-4">
                    <Input
                        id="create-name"
                        label="Nome completo"
                        placeholder="Nome do usuário"
                        value={createForm.name}
                        onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                        error={createErrors.name}
                    />
                    <Input
                        id="create-email"
                        label="Email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={createForm.email}
                        onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                        error={createErrors.email}
                    />
                    <Input
                        id="create-password"
                        label="Senha"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={createForm.password}
                        onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                        error={createErrors.password}
                    />
                    <Select
                        id="create-role"
                        label="Função"
                        options={roleOptions}
                        value={createForm.role}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setCreateForm({ ...createForm, role: e.target.value })}
                    />
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleCreate} loading={processing}>
                            <Plus className="h-4 w-4 mr-2" />
                            Criar Usuário
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Alterar Função" size="sm">
                <div className="space-y-4">
                    {selectedUser && (
                        <div className="text-sm text-gray-600 mb-2">
                            Alterando função de: <strong>{selectedUser.name || selectedUser.email}</strong>
                        </div>
                    )}
                    <Select
                        id="edit-role"
                        label="Nova função"
                        options={roleOptions}
                        value={editRole}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditRole(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleEditRole} loading={processing}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Alterar Senha" size="sm">
                <div className="space-y-4">
                    {selectedUser && (
                        <div className="text-sm text-gray-600 mb-2">
                            Alterando senha de: <strong>{selectedUser.name || selectedUser.email}</strong>
                        </div>
                    )}
                    <Input
                        id="new-password"
                        label="Nova senha"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleChangePassword} loading={processing}>
                            <Key className="h-4 w-4 mr-2" />
                            Alterar Senha
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Remover Usuário"
                message={
                    selectedUser
                        ? `Tem certeza que deseja remover "${selectedUser.name || selectedUser.email}"? Esta ação não pode ser desfeita.`
                        : 'Tem certeza que deseja remover este usuário?'
                }
                confirmText="Remover"
                variant="danger"
                loading={processing}
            />
        </div>
    );
}
