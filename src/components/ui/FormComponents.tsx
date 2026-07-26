'use client';

// Re-exports from dedicated component files
export { Button, ButtonGroup, IconButton } from './Button';
export { Card, CardHeader, CardBody, CardFooter, Badge, Divider } from './Card';
export { Input } from './Input';
export { Modal, ConfirmDialog, AlertDialog } from './Modal';

// Components unique to FormComponents (no dedicated file)
import { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = { label?: string; error?: string; hint?: string };

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
                        error && 'border-primary-500 focus:ring-primary-500',
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
            {error && <p className="text-sm text-primary-600" role="alert">{error}</p>}
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
        info: 'bg-primary-50 border-primary-200 text-primary-800',
        success: 'bg-primary-50 border-primary-200 text-primary-800',
        warning: 'bg-primary-50 border-primary-200 text-primary-800',
        danger: 'bg-primary-50 border-primary-200 text-primary-800',
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
