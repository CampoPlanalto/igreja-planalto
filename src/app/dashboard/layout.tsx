'use client';

import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/Layout';
import { ToastProvider } from '@/components/ui/Toast';
import { ChurchProvider } from '@/lib/hooks/useChurch';

const authRoutes = ['/dashboard/login', '/dashboard/register', '/dashboard/reset-password', '/dashboard/logout'];

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    if (isAuthRoute) {
        return <ToastProvider>{children}</ToastProvider>;
    }

    return (
        <ChurchProvider>
            <ToastProvider>
                <DashboardLayout>{children}</DashboardLayout>
            </ToastProvider>
        </ChurchProvider>
    );
}
