"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Oferta } from "@/lib/types";
import { formatearPrecio, formatearTiempoRelativo } from "@/lib/mockData";

interface OfferCardProps {
    oferta: Oferta;
    onLike: (id: string) => void;
}

export default function OfferCard({ oferta, onLike }: OfferCardProps) {
    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [animandoLike, setAnimandoLike] = useState(false);

    const handleLike = () => {
        setAnimandoLike(true);
        onLike(oferta.id);
        setTimeout(() => setAnimandoLike(false), 300);
    };

    return (
        <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            {/* Header con usuario */}
            <div className="p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20">
                    <AvatarImage src={oferta.usuario.avatar} alt={oferta.usuario.nombre} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-300">
                        {oferta.usuario.nombre.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-semibold text-zinc-100">{oferta.usuario.nombre}</p>
                    <p className="text-sm text-zinc-400">{formatearTiempoRelativo(oferta.timestamp)}</p>
                </div>
            </div>

            {/* Imagen del producto con badge flotante */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={oferta.imagen}
                    alt={oferta.producto}
                    className="w-full h-full object-cover"
                />

                {/* Badge de descuento flotante */}
                <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="absolute top-4 right-4"
                >
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-4 py-2 shadow-lg">
                        -{oferta.porcentajeDescuento}%
                    </Badge>
                </motion.div>

                {/* Footer con glassmorphism */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4">
                    <h3 className="font-bold text-white text-lg mb-1">{oferta.producto}</h3>
                    <p className="text-emerald-400 font-semibold text-sm mb-2">{oferta.tienda}</p>
                    <div className="flex items-center gap-3">
                        <span className="text-zinc-400 line-through text-sm">
                            {formatearPrecio(oferta.precioOriginal)}
                        </span>
                        <span className="text-white font-bold text-xl">
                            {formatearPrecio(oferta.precioOferta)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Botones de interacción */}
            <div className="p-4 flex items-center gap-4 border-b border-zinc-800">
                <motion.button
                    onClick={handleLike}
                    className="flex items-center gap-2 group"
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={animandoLike ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart
                            className={`w-6 h-6 transition-colors ${oferta.likedByUser
                                    ? "fill-red-500 text-red-500"
                                    : "text-zinc-400 group-hover:text-red-500"
                                }`}
                        />
                    </motion.div>
                    <span className={`font-semibold ${oferta.likedByUser ? "text-red-500" : "text-zinc-400"}`}>
                        {oferta.likes}
                    </span>
                </motion.button>

                <button
                    onClick={() => setMostrarComentarios(!mostrarComentarios)}
                    className="flex items-center gap-2 group"
                >
                    <MessageCircle className="w-6 h-6 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                    <span className="text-zinc-400 font-semibold">{oferta.comentarios.length}</span>
                </button>
            </div>

            {/* Sección de comentarios expandible */}
            <AnimatePresence>
                {mostrarComentarios && oferta.comentarios.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-3 bg-zinc-900/50 max-h-64 overflow-y-auto">
                            {oferta.comentarios.map((comentario) => (
                                <div key={comentario.id} className="flex gap-3">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarImage src={comentario.usuario.avatar} alt={comentario.usuario.nombre} />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
                                            {comentario.usuario.nombre.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="bg-zinc-800/50 rounded-lg px-3 py-2">
                                            <p className="font-semibold text-sm text-zinc-200">
                                                {comentario.usuario.nombre}
                                            </p>
                                            <p className="text-sm text-zinc-300">{comentario.contenido}</p>
                                        </div>
                                        <p className="text-xs text-zinc-500 mt-1 ml-3">
                                            {formatearTiempoRelativo(comentario.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
