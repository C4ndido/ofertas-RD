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
            <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800 z-40 md:hidden">
                <div className="flex items-center justify-around px-4 py-3">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="flex flex-col items-center gap-1 relative group w-16"
                        >
                            <div className={`
                 p-1 rounded-xl transition-all duration-300
                 ${item.active ? "bg-emerald-500/10" : "bg-transparent"}
              `}>
                                <item.icon
                                    className={`w-6 h-6 transition-colors ${item.active ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-200"
                                        }`}
                                />
                            </div>
                            <span
                                className={`text-[10px] font-medium transition-colors ${item.active ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300"
                                    }`}
                            >
                                {item.label}
                            </span>
                            {item.active && (
                                <motion.div
                                    layoutId="activeTabMobile"
                                    className="absolute -top-3 w-8 h-1 bg-emerald-500 rounded-b-full shadow-lg shadow-emerald-500/50"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Navegación desktop (sidebar) */}
            <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800 flex-col p-6 z-40">
                <div className="mb-8 pl-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                        OfertasRD
                    </h1>
                    <p className="text-sm text-zinc-500 font-medium">Comunidad de Ahorro</p>
                </div>

                <div className="flex-1 space-y-2">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all group relative overflow-hidden ${item.active ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                                }`}
                        >
                            {item.active && (
                                <motion.div
                                    layoutId="activeTabDesktop"
                                    className="absolute inset-0 bg-emerald-500 shadow-md shadow-emerald-500/20"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    style={{ borderRadius: 9999 }}
                                />
                            )}

                            <div className="relative z-10 flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${item.active ? "text-white" : ""}`} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onUploadClick}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
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
                className="fixed bottom-24 right-5 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-900/50 flex items-center justify-center z-50 md:hidden border border-white/10"
            >
                <Plus className="w-7 h-7" />
            </motion.button>
        </>
    );
}
