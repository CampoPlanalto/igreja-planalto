'use client';

import { usePathname } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/Layout';

const authRoutes = ['/dashboard/login', '/dashboard/register', '/dashboard/reset-password', '/dashboard/logout'];

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    if (isAuthRoute) {
        return <>{children}</>;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
