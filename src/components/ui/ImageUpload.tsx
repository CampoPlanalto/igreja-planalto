'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadImage } from '@/lib/supabase/upload';

interface ImageUploadProps {
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  label?: string;
  className?: string;
  previewClassName?: string;
}

let idCounter = 0;

export default function ImageUpload({ currentUrl, onUpload, label, className, previewClassName }: ImageUploadProps) {
  const [uid] = useState(() => `image-upload-${++idCounter}`);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Selecione uma imagem válida');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    setError(null);

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);

    setUploading(true);
    try {
      const url = await uploadImage(file, `upload-${Date.now()}`);
      onUpload(url);
    } catch (err) {
      setError('Erro ao fazer upload. Verifique as permissões do Storage.');
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="label">{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={handleChange}
        className="hidden"
        id={uid}
      />

      {preview ? (
        <div className={cn('relative inline-block', previewClassName)}>
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg object-cover border border-gray-200"
            style={{ maxHeight: 200 }}
          />
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-colors"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary-600" />
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Clique para selecionar uma imagem</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF ou WebP até 5MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
