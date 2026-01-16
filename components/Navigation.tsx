"use client";

import { Home, TrendingUp, User, Bell, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface NavigationProps {
    onUploadClick: () => void;
}

export default function Navigation({ onUploadClick }: NavigationProps) {
    const navItems = [
        { icon: Home, label: "Inicio", active: true },
        { icon: TrendingUp, label: "Tendencias", active: false },
        { icon: Bell, label: "Notificaciones", active: false },
        { icon: User, label: "Perfil", active: false },
    ];

    return (
        <>
            {/* Navegación móvil (bottom) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 z-40 md:hidden">
                <div className="flex items-center justify-around px-4 py-3">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="flex flex-col items-center gap-1 relative group"
                        >
                            <item.icon
                                className={`w-6 h-6 transition-colors ${item.active ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-200"
                                    }`}
                            />
                            <span
                                className={`text-xs font-medium ${item.active ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-200"
                                    }`}
                            >
                                {item.label}
                            </span>
                            {item.active && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Navegación desktop (sidebar) */}
            <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex-col p-6 z-40">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-emerald-500">OfertasRD</h1>
                    <p className="text-sm text-zinc-400">Comparte y descubre ofertas</p>
                </div>

                <div className="flex-1 space-y-2">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.active
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onUploadClick}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Subir Oferta
                </button>
            </nav>

            {/* Botón flotante móvil (FAB) */}
            <motion.button
                onClick={onUploadClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-20 right-6 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 md:hidden"
            >
                <Plus className="w-6 h-6" />
            </motion.button>
        </>
    );
}
