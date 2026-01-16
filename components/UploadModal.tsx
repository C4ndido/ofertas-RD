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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para subir la oferta
        console.log("Subiendo oferta...");
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <Card className="w-full max-w-2xl bg-slate-950 border-zinc-800 p-6 max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-zinc-100">Subir Nueva Oferta</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
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
                                    className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${arrastrando
                                            ? "border-emerald-500 bg-emerald-500/10"
                                            : "border-zinc-700 hover:border-zinc-600"
                                        }`}
                                >
                                    {imagenPreview ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
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
                                                className="absolute top-2 right-2"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <motion.div
                                                animate={arrastrando ? { scale: 1.1 } : { scale: 1 }}
                                                className="mx-auto w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center"
                                            >
                                                <ImageIcon className="w-8 h-8 text-emerald-500" />
                                            </motion.div>
                                            <p className="text-zinc-300 mb-2">
                                                Arrastra una imagen aquí o haz clic para seleccionar
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                                className="hidden"
                                                id="file-input"
                                            />
                                            <label htmlFor="file-input">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
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
                                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                                            Nombre del Producto
                                        </label>
                                        <Input
                                            required
                                            placeholder="Ej: Aceite de Oliva Extra Virgen 1L"
                                            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                                            Supermercado
                                        </label>
                                        <Input
                                            required
                                            placeholder="Ej: Supermercado Nacional"
                                            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                                Precio Original (RD$)
                                            </label>
                                            <Input
                                                required
                                                type="number"
                                                step="0.01"
                                                placeholder="450.00"
                                                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                                Precio de Oferta (RD$)
                                            </label>
                                            <Input
                                                required
                                                type="number"
                                                step="0.01"
                                                placeholder="299.00"
                                                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                                    >
                                        Publicar Oferta
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
