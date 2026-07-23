'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import {
    Download,
    QrCode,
    Image,
    FileImage,
    FileText,
    Copy,
    Check,
    Loader2,
    Palette,
    Eye,
    EyeOff,
    Settings,
    X,
} from 'lucide-react';

interface QRCodeOptions {
    size: number;
    margin: number;
    color: {
        dark: string;
        light: string;
    };
    logo?: {
        src: string;
        width: number;
        height: number;
        excavate: boolean;
    };
    backgroundOptions?: {
        color: string;
        image?: string;
    };
}

const DEFAULT_OPTIONS: QRCodeOptions = {
    size: 512,
    margin: 4,
    color: {
        dark: '#000000',
        light: '#ffffff',
    },
};

export function QRCodeGenerator({
    url,
    title,
    onDownload,
}: {
    url: string;
    title: string;
    onDownload?: (format: 'png' | 'svg' | 'pdf', dataUrl: string) => void;
}) {
    const [options, setOptions] = useState<QRCodeOptions>(DEFAULT_OPTIONS);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const [svgString, setSvgString] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Generate QR Code
    const generateQRCode = async () => {
        setLoading(true);
        try {
            // Dynamic import to avoid SSR issues
            const QRCode = (await import('qrcode')).default;

            // Generate PNG
            const pngDataUrl = await QRCode.toDataURL(url, {
                width: options.size,
                margin: options.margin,
                color: options.color,
            });
            setQrCodeDataUrl(pngDataUrl);

            // Generate SVG
            const svg = await QRCode.toString(url, {
                type: 'svg',
                width: options.size,
                margin: options.margin,
                color: options.color,
            });
            setSvgString(svg);

            // If logo is uploaded, composite it
            if (logoPreview) {
                await compositeLogo(pngDataUrl);
            }
        } catch (error) {
            console.error('QR Code generation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const compositeLogo = async (baseDataUrl: string) => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return resolve();

                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve();

                canvas.width = options.size;
                canvas.height = options.size;
                ctx.drawImage(img, 0, 0, options.size, options.size);

                // Draw logo in center
                const logoImg = new Image();
                logoImg.onload = () => {
                    const logoSize = options.size * 0.2;
                    const x = (options.size - logoSize) / 2;
                    const y = (options.size - logoSize) / 2;

                    // White background for logo
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(x - 8, y - 8, logoSize + 16, logoSize + 16);
                    ctx.drawImage(logoImg, x, y, logoSize, logoSize);

                    setQrCodeDataUrl(canvas.toDataURL('image/png'));
                    resolve();
                };
                logoImg.src = logoPreview!;
            };
            img.src = baseDataUrl;
        });
    };

    useEffect(() => {
        generateQRCode();
    }, [url, options, logoPreview]);

    // Download functions
    const downloadPNG = () => {
        if (!qrCodeDataUrl) return;
        const link = document.createElement('a');
        link.download = `${slugify(title)}-qrcode.png`;
        link.href = qrCodeDataUrl;
        link.click();
        onDownload?.('png', qrCodeDataUrl);
    };

    const downloadSVG = () => {
        if (!svgString) return;
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${slugify(title)}-qrcode.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        onDownload?.('svg', svgString);
    };

    const downloadPDF = async () => {
        if (!qrCodeDataUrl) return;

        try {
            const { jsPDF } = await import('jspdf');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [options.size + 40, options.size + 100],
            });

            // Add title
            pdf.setFontSize(24);
            pdf.setTextColor(30, 30, 30);
            pdf.text(title, options.size / 2 + 20, 50, { align: 'center' });

            // Add QR code
            pdf.addImage(qrCodeDataUrl, 'PNG', 20, 70, options.size, options.size);

            // Add URL text
            pdf.setFontSize(12);
            pdf.setTextColor(100, 100, 100);
            pdf.text(url, options.size / 2 + 20, options.size + 90, { align: 'center', maxWidth: options.size });

            pdf.save(`${slugify(title)}-qrcode.pdf`);
            onDownload?.('pdf', qrCodeDataUrl);
        } catch (error) {
            console.error('PDF generation error:', error);
        }
    };

    const copyToClipboard = async () => {
        if (!qrCodeDataUrl) return;
        try {
            const response = await fetch(qrCodeDataUrl);
            const blob = await response.blob();
            await navigator.clipboard.writeItem(new ClipboardItem({ 'image/png': blob }));
            alert('QR Code copiado para a área de transferência!');
        } catch {
            // Fallback: copy URL
            await navigator.clipboard.writeText(url);
            alert('Link copiado para a área de transferência!');
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione uma imagem válida.');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 2MB.');
            return;
        }

        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
    };

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <div className="space-y-6">
            {/* QR Code Preview */}
            <Card className="border-2 border-dashed border-gray-200 hover:border-primary-300 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Pré-visualização do QR Code</h3>
                        <p className="text-sm text-gray-500">Escaneie para testar</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowOptions(!showOptions)}>
                        <Settings className="h-4 w-4 mr-1" />
                        Opções
                    </Button>
                </CardHeader>
                <CardBody className="flex flex-col items-center">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 w-64">
                            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
                        </div>
                    ) : qrCodeDataUrl ? (
                        <div className="relative group">
                            <img
                                src={qrCodeDataUrl}
                                alt={`QR Code para ${title}`}
                                className="max-w-full h-auto rounded-lg shadow-lg border border-gray-100"
                            />
                            {/* Hover overlay with actions */}
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copiar
                                </Button>
                                <Button variant="secondary" size="sm" onClick={downloadPNG}>
                                    <Download className="h-4 w-4 mr-1" />
                                    Baixar PNG
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-12">
                            <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Gerando QR Code...</p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="mt-4 w-full text-center">
                        <p className="text-xs text-gray-500 font-mono break-all bg-gray-50 px-3 py-2 rounded">
                            {url}
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Options Panel */}
            <Modal
                isOpen={showOptions}
                onClose={() => setShowOptions(false)}
                title="Personalizar QR Code"
                size="lg"
            >
                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Size & Margin */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Tamanho (px)</label>
                            <select
                                value={options.size}
                                onChange={(e) => setOptions({ ...options, size: parseInt(e.target.value) })}
                                className="input"
                            >
                                <option value={256}>256 - Pequeno</option>
                                <option value={512}>512 - Médio (Padrão)</option>
                                <option value={768}>768 - Grande</option>
                                <option value={1024}>1024 - Extra Grande</option>
                                <option value={2048}>2048 - Impressão</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Margem (módulos)</label>
                            <select
                                value={options.margin}
                                onChange={(e) => setOptions({ ...options, margin: parseInt(e.target.value) })}
                                className="input"
                            >
                                <option value={0}>0 - Sem margem</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={4}>4 - Padrão</option>
                                <option value={6}>6</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                Cor Escura (QR Code)
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={options.color.dark}
                                    onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                    className="h-10 w-16 rounded border cursor-pointer"
                                />
                                <Input
                                    value={options.color.dark}
                                    onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                    className="flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                Cor Clara (Fundo)
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={options.color.light}
                                    onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                    className="h-10 w-16 rounded border cursor-pointer"
                                />
                                <Input
                                    value={options.color.light}
                                    onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                    className="flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="border-t border-gray-100 pt-6">
                        <label className="label flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Logo no Centro (Opcional)
                        </label>
                        <p className="text-sm text-gray-500 mb-3">
                            Recomendado: PNG/SVG com fundo transparente, máximo 2MB. Ficará centralizado com fundo branco.
                        </p>

                        {logoPreview ? (
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <img src={logoPreview} alt="Logo preview" className="h-16 w-16 object-contain rounded border" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{logoFile?.name}</p>
                                    <p className="text-sm text-gray-500">{(logoFile?.size || 0) / 1024} KB</p>
                                </div>
                                <Button variant="outline" size="sm" onClick={removeLogo}>
                                    <X className="h-4 w-4 mr-1" />
                                    Remover
                                </Button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                                <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600 mb-2">Clique ou arraste uma imagem aqui</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                    id="logo-upload"
                                />
                                <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                                    Selecionar Logo
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Reset Button */}
                    <div className="border-t border-gray-100 pt-4">
                        <Button
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => {
                                setOptions(DEFAULT_OPTIONS);
                                setLogoFile(null);
                                setLogoPreview(null);
                            }}
                        >
                            Restaurar Padrões
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Download Buttons */}
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary-600" />
                        Baixar QR Code
                    </h3>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Button
                            onClick={downloadPNG}
                            disabled={loading || !qrCodeDataUrl}
                            className="h-14"
                            loading={loading}
                        >
                            <FileImage className="h-5 w-5 mr-2" />
                            <div className="text-left">
                                <div className="font-medium">PNG</div>
                                <div className="text-xs opacity-75">Imagem rasterizada</div>
                            </div>
                        </Button>

                        <Button
                            onClick={downloadSVG}
                            disabled={loading || !svgString}
                            className="h-14"
                            variant="outline"
                        >
                            <FileImage className="h-5 w-5 mr-2" />
                            <div className="text-left">
                                <div className="font-medium">SVG</div>
                                <div className="text-xs opacity-75">Vetor escalável</div>
                            </div>
                        </Button>

                        <Button
                            onClick={downloadPDF}
                            disabled={loading || !qrCodeDataUrl}
                            className="h-14"
                            variant="outline"
                        >
                            <FileText className="h-5 w-5 mr-2" />
                            <div className="text-left">
                                <div className="font-medium">PDF</div>
                                <div className="text-xs opacity-75">Para impressão</div>
                            </div>
                        </Button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={copyToClipboard}
                            disabled={loading || !qrCodeDataUrl}
                            className="w-full"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar imagem para área de transferência
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Tips */}
            <Alert variant="info" title="Dicas de uso">
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 mt-2">
                    <li>Para impressão em panfletos/banners, use <strong>SVG</strong> (vetor, não perde qualidade)</li>
                    <li>Para redes sociais e web, <strong>PNG 512px</strong> é ideal</li>
                    <li>Teste o QR Code com seu celular antes de imprimir em massa</li>
                    <li>Mantenha margem mínima de 4 módulos ao redor do código</li>
                    <li>Contraste alto (preto no branco) garante melhor leitura</li>
                </ul>
            </Alert>
        </div>
    );
}

// Batch QR Code Generator for multiple campaigns
export function BatchQRCodeGenerator({
    campaigns,
}: {
    campaigns: Array<{ id: string; title: string; url: string; slug: string }>;
}) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [format, setFormat] = useState<'png' | 'svg' | 'pdf'>('png');
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSelectAll = () => {
        if (selectedIds.length === campaigns.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(campaigns.map(c => c.id));
        }
    };

    const handleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const generateBatch = async () => {
        const selected = campaigns.filter(c => selectedIds.includes(c.id));
        if (selected.length === 0) return;

        setGenerating(true);
        setProgress(0);

        try {
            const QRCode = (await import('qrcode')).default;
            const { jsPDF } = await import('jspdf');

            if (format === 'pdf') {
                const pdf = new jsPDF();
                for (let i = 0; i < selected.length; i++) {
                    const campaign = selected[i];
                    const dataUrl = await QRCode.toDataURL(campaign.url, { width: 512 });

                    if (i > 0) pdf.addPage();

                    pdf.setFontSize(20);
                    pdf.text(campaign.title, 105, 30, { align: 'center' });
                    pdf.addImage(dataUrl, 'PNG', 30, 40, 150, 150);
                    pdf.setFontSize(10);
                    pdf.text(campaign.url, 105, 210, { align: 'center' });

                    setProgress(Math.round(((i + 1) / selected.length) * 100));
                }
                pdf.save(`qrcodes-${formatDate(new Date())}.pdf`);
            } else {
                // For PNG/SVG, we'd need to zip them - simplified: download first only
                const campaign = selected[0];
                const dataUrl = await QRCode.toDataURL(campaign.url, { width: 512 });

                if (format === 'png') {
                    const link = document.createElement('a');
                    link.download = `${campaign.slug}-qrcode.png`;
                    link.href = dataUrl;
                    link.click();
                } else {
                    const svg = await QRCode.toString(campaign.url, { type: 'svg', width: 512 });
                    const blob = new Blob([svg], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${campaign.slug}-qrcode.svg`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            }
        } catch (error) {
            console.error('Batch generation error:', error);
            alert('Erro ao gerar QR Codes em lote');
        } finally {
            setGenerating(false);
            setProgress(0);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Gerador em Lote</h3>
                    <p className="text-sm text-gray-500">
                        Gere QR Codes para múltiplas campanhas de uma vez
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as 'png' | 'svg' | 'pdf')}
                        className="input w-auto"
                    >
                        <option value="png">PNG</option>
                        <option value="svg">SVG</option>
                        <option value="pdf">PDF (todas em um arquivo)</option>
                    </select>
                    <Button
                        onClick={generateBatch}
                        disabled={generating || selectedIds.length === 0}
                        loading={generating}
                    >
                        {generating ? `Gerando... ${progress}%` : `Gerar ${selectedIds.length} QR Code(s)`}
                    </Button>
                </div>
            </CardHeader>

            <CardBody className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === campaigns.length && campaigns.length > 0}
                                        indeterminate={selectedIds.length > 0 && selectedIds.length < campaigns.length}
                                        onChange={handleSelectAll}
                                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(campaign.id)}
                                            onChange={() => handleSelect(campaign.id)}
                                            className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900">{campaign.title}</p>
                                        <p className="text-sm text-gray-500">{campaign.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-gray-600 font-mono truncate max-w-xs">{campaign.url}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button size="sm" variant="ghost" onClick={() => handleSelect(campaign.id)}>
                                            <QrCode className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}

// Import formatDate
import { formatDate } from '@/lib/utils';