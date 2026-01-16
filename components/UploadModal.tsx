"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);
    const [arrastrando, setArrastrando] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setArrastrando(true);
    };

    const handleDragLeave = () => {
        setArrastrando(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setArrastrando(false);

        const archivo = e.dataTransfer.files[0];
        if (archivo && archivo.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagenPreview(e.target?.result as string);
            };
            reader.readAsDataURL(archivo);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = e.target.files?.[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagenPreview(e.target?.result as string);
            };
            reader.readAsDataURL(archivo);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        // Simular subida a base de datos
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Oferta subida exitosamente");
        setCargando(false);
        onClose();
        setImagenPreview(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!cargando ? onClose : undefined}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <Card className="w-full max-w-2xl bg-slate-950 border-zinc-800 p-6 max-h-[90vh] overflow-y-auto relative overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                    Subir Nueva Oferta
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    disabled={cargando}
                                    className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Zona de drag & drop */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 group ${arrastrando
                                        ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]"
                                        : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50"
                                        }`}
                                >
                                    {imagenPreview ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-zinc-700">
                                            <img
                                                src={imagenPreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setImagenPreview(null)}
                                                disabled={cargando}
                                                className="absolute top-2 right-2 shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <ImageIcon className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <p className="text-zinc-300 mb-2 font-medium">
                                                Arrastra una imagen aquí
                                            </p>
                                            <p className="text-zinc-500 text-sm mb-4">
                                                o haz clic para buscar en tus archivos
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                                className="hidden"
                                                id="file-input"
                                                disabled={cargando}
                                            />
                                            <label htmlFor="file-input">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={cargando}
                                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                                    onClick={() => document.getElementById("file-input")?.click()}
                                                >
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Seleccionar Imagen
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Campos del formulario */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">
                                            Nombre del Producto
                                        </label>
                                        <Input
                                            required
                                            disabled={cargando}
                                            placeholder="Ej: Aceite de Oliva Extra Virgen 1L"
                                            className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 h-11"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">
                                            Supermercado
                                        </label>
                                        <Input
                                            required
                                            disabled={cargando}
                                            placeholder="Ej: Supermercado Nacional"
                                            className="bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 h-11"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">
                                                Precio Original
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">RD$</span>
                                                <Input
                                                    required
                                                    type="number"
                                                    step="0.01"
                                                    disabled={cargando}
                                                    placeholder="450.00"
                                                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 h-11"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-emerald-400 mb-2 ml-1">
                                                Precio Oferta
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/70 text-sm">RD$</span>
                                                <Input
                                                    required
                                                    type="number"
                                                    step="0.01"
                                                    disabled={cargando}
                                                    placeholder="299.00"
                                                    className="pl-10 bg-zinc-900/50 border-emerald-500/30 focus:border-emerald-500 focus:ring-emerald-500/20 text-emerald-100 placeholder:text-zinc-600 h-11 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-3 pt-4 border-t border-zinc-900">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        disabled={cargando}
                                        className="flex-1 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 h-11"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={cargando}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-11 relative"
                                    >
                                        {cargando ? (
                                            <>
                                                <span className="opacity-0">Publicar Oferta</span>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                </div>
                                            </>
                                        ) : (
                                            "Publicar Oferta"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
