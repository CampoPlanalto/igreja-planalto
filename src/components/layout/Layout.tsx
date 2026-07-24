'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
    LayoutDashboard,
    Users,
    FileText,
    QrCode,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Church,
    Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Campanhas', href: '/dashboard/campaigns', icon: FileText },
    { name: 'QR Codes', href: '/dashboard/qrcodes', icon: QrCode },
    { name: 'Visitantes', href: '/dashboard/visitors', icon: Users },
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .single();
            if (data) setUserRole(data.role);
        };
        fetchRole();
    }, []);

    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                aria-label="Menu lateral"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <Church className="h-8 w-8 text-primary-600" />
                            <span className="font-semibold text-lg text-gray-900">Planalto</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Fechar menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Navegação principal">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    )}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            );
                        })}

                        {userRole === 'super_admin' && (
                            <>
                                <div className="pt-3 pb-1">
                                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
                                </div>
                                <Link
                                    href="/dashboard/users"
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        pathname.startsWith('/dashboard/users')
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    )}
                                >
                                    <Shield className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                                    Usuários
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/dashboard/logout"
                            className={cn(
                                'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors'
                            )}
                        >
                            <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
                            Sair
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    aria-label="Abrir menu"
                    aria-expanded="false"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <Church className="h-7 w-7 text-primary-600" />
                    <span className="font-semibold text-lg text-gray-900">Planalto</span>
                </Link>
                <div className="w-10" />
            </div>
        </header>
    );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-primary-50">

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <div className="lg:pl-64">
                <main className="min-h-[calc(100vh-4rem)] pt-16 lg:pt-0">
                    <div className="container-custom py-6 lg:py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-primary-50">
            <header className="bg-white border-b border-gray-200">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <Church className="h-8 w-8 text-primary-600" />
                            <span className="font-semibold text-lg text-gray-900">Planalto</span>
                        </Link>
                        <Link
                            href="/admin/login"
                            className="btn-primary text-sm hidden sm:block"
                        >
                            Área Administrativa
                        </Link>
                    </div>
                </div>
            </header>
            <main>{children}</main>
            <footer className="bg-primary-100 border-t border-[#e5dcc8] py-8">
                <div className="container-custom text-center text-sm text-gray-500">
                    <p>Igreja Campo do Planalto - Vila Planalto</p>
                </div>
            </footer>
        </div>
    );
}