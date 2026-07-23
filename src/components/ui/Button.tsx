'use client';

import { forwardRef, type HTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, variant = 'primary', size = 'md', disabled, loading, children, ...props }, ref) => {
        const variants = {
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            outline: 'btn-outline',
            gold: 'btn-gold',
            ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
            xl: 'px-8 py-4 text-xl',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'btn',
                    variants[variant],
                    sizes[size],
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export const ButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            {children}
        </div>
    );
};

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-label': string }>(
    ({ className, 'aria-label': ariaLabel, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn('p-2 rounded-lg hover:bg-gray-100 transition-colors', className)}
                aria-label={ariaLabel}
                {...props}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';