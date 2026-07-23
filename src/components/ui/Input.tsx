'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, label, error, hint, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label">{label}</label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        'input',
                        error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, label, error, hint, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label">{label}</label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'input min-h-[100px] resize-y',
                        error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
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

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, label, error, hint, options, placeholder, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="label">{label}</label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        'input',
                        error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
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

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-start space-x-3">
                <input
                    ref={ref}
                    type="checkbox"
                    className={cn(
                        'h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2',
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label className="text-sm text-gray-700 cursor-pointer mt-0.5">
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
    options, 
    value, 
    onChange, 
    name, 
    error, 
    hint,
    className 
}: {
    label?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    error?: string;
    hint?: string;
    className?: string;
}) => {
    return (
        <div className={cn('space-y-2', className)}>
            {label && <label className="label">{label}</label>}
            <div className="space-y-2" role="radiogroup" aria-label={label}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="mt-1 text-sm text-gray-500">
                    {hint}
                </p>
            )}
        </div>
    );
};

export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn('label', className)}
                {...props}
            >
                {children}
            </label>
        );
    }
);

Label.displayName = 'Label';