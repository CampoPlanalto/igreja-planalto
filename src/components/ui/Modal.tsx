'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
}: ModalProps) {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[90vw]',
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
            onClose();
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 z-50 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                aria-describedby={description ? 'modal-description' : undefined}
            >
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    aria-hidden="true"
                    onClick={closeOnOverlayClick ? onClose : undefined}
                />
                <div className="flex min-h-full items-center justify-center p-4">
                    <div
                        className={cn(
                            'w-full bg-white rounded-xl shadow-xl transform transition-all',
                            sizes[size]
                        )}
                        onKeyDown={handleKeyDown}
                    >
                        {(title || showCloseButton) && (
                            <div className="flex items-start justify-between p-6 border-b border-gray-100">
                                <div>
                                    {title && (
                                        <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <p id="modal-description" className="mt-1 text-sm text-gray-500">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                {showCloseButton && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onClose}
                                        aria-label="Fechar modal"
                                        className="h-8 w-8 p-0"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                )}
                            </div>
                        )}
                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        );
}



interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    loading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'primary',
    loading = false,
}: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm} loading={loading}>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
}

export function AlertDialog({ isOpen, onClose, title, message, buttonText = 'OK' }: AlertDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end">
                <Button onClick={onClose}>{buttonText}</Button>
            </div>
        </Modal>
    );
}