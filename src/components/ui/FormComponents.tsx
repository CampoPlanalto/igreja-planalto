'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = { label?: string; error?: string; hint?: string };

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg' | 'xl' }>(
    ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
            outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
            ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
            gold: 'bg-church-gold text-white hover:bg-primary-700 focus:ring-primary-500',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
            xl: 'px-8 py-4 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

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
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
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

export const Textarea = forwardRef<HTMLTextAreaElement, BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, label, error, hint, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'input min-h-[100px] resize-y',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
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

Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, BaseProps & { options?: { value: string; label: string }[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, label, error, hint, options, placeholder, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        'input',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
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

Select.displayName = 'Select';

export const Checkbox = forwardRef<HTMLInputElement, BaseProps & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-start space-x-3">
                <input
                    ref={ref}
                    type="checkbox"
                    className={cn(
                        'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500',
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label className="text-sm text-gray-700 cursor-pointer" htmlFor={props.id}>
                        {label}
                    </label>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';

export const RadioGroup = ({ 
    label, 
    name, 
    options, 
    value, 
    onChange, 
    error, 
    className,
    ...rest
}: { 
    label: string;
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
    [key: string]: unknown;
}) => {
    return (
        <div className={cn('space-y-2', className)}>
            <label className="label">{label}</label>
            <div className="space-y-2" role="radiogroup" aria-label={label}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        </div>
    );
};

export const Label = ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <label className={cn('label', className)} {...props}>
            {children}
        </label>
    );
};

export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('card', className)} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('card-header', className)} {...props}>
            {children}
        </div>
    );
};

export const CardBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('card-body', className)} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('card-footer', className)} {...props}>
            {children}
        </div>
    );
};

export const Badge = ({ children, variant = 'primary', className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gold' }) => {
    const variants = {
        primary: 'badge-primary',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        gold: 'badge-gold',
    };

    return (
        <span className={cn('badge', variants[variant], className)} {...props}>
            {children}
        </span>
    );
};

export const Alert = ({ 
    children, 
    variant = 'info', 
    className, 
    title,
    onClose 
}: React.HTMLAttributes<HTMLDivElement> & { 
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    onClose?: () => void;
}) => {
    const variants = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        danger: 'bg-red-50 border-red-200 text-red-800',
    };

    return (
        <div className={cn('rounded-lg border p-4', variants[variant], className)} role="alert">
            <div className="flex">
                <div className="flex-1">
                    {title && <h4 className="font-medium mb-1">{title}</h4>}
                    <div className="text-sm">{children}</div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-4 text-current opacity-50 hover:opacity-100"
                        aria-label="Fechar alerta"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer,
    size = 'md'
}: { 
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
                <div className={cn('relative w-full bg-white rounded-xl shadow-xl', sizes[size])}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            aria-label="Fechar modal"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">{children}</div>
                    {footer && (
                        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const DropdownMenu = ({ 
    trigger, 
    items 
}: { 
    trigger: React.ReactNode;
    items: { label: string; onClick: () => void; icon?: React.ReactNode; danger?: boolean }[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center">
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50" role="menu">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => { item.onClick(); setIsOpen(false); }}
                            className={cn(
                                'w-full px-4 py-2 text-left text-sm flex items-center space-x-2',
                                item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100'
                            )}
                            role="menuitem"
                        >
                            {item.icon && <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
