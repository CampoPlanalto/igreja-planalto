'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = { label?: string; error?: string; hint?: string };

export const Input = forwardRef<HTMLInputElement, BaseProps & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, label, error, hint, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        'input',
                        error && 'border-primary-500 focus:ring-primary-500',
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${props.id}-error`} className="mt-1 text-sm text-primary-600" role="alert">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${props.id}-hint`} className="mt-1 text-sm text-gray-500">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';