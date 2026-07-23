'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('card', className)}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('card-header', className)}
                {...props}
            />
        );
    }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('card-body', className)}
                {...props}
            />
        );
    }
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('card-footer', className)}
                {...props}
            />
        );
    }
);

CardFooter.displayName = 'CardFooter';

export const Badge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: 'badge-primary',
            success: 'badge-success',
            warning: 'badge-warning',
            danger: 'badge-danger',
            gold: 'badge-gold',
            gray: 'bg-gray-100 text-gray-800',
        };

        return (
            <span
                ref={ref}
                className={cn('badge', variants[variant], className)}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

export const Divider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
    ({ className, ...props }, ref) => {
        return (
            <hr
                ref={ref}
                className={cn('border-gray-200', className)}
                {...props}
            />
        );
    }
);

Divider.displayName = 'Divider';