"use client";

import { useState } from "react";
import OfferCard from "@/components/OfferCard";
import Navigation from "@/components/Navigation";
import UploadModal from "@/components/UploadModal";
import { ofertasIniciales } from "@/lib/mockData";
import { Oferta } from "@/lib/types";

export default function Home() {
  const [ofertas, setOfertas] = useState<Oferta[]>(ofertasIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleLike = (id: string) => {
    setOfertas((prev) =>
      prev.map((oferta) =>
        oferta.id === id
          ? {
            ...oferta,
            likedByUser: !oferta.likedByUser,
            likes: oferta.likedByUser ? oferta.likes - 1 : oferta.likes + 1,
          }
          : oferta
      )
    );
  };

  return (
    <>
      <Navigation onUploadClick={() => setModalAbierto(true)} />

      {/* Contenedor principal con padding para navegación */}
      <div className="min-h-screen pb-20 md:pl-64 md:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-lg border-b border-zinc-800 px-6 py-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-emerald-500 md:hidden">OfertasRD</h1>
            <p className="text-zinc-400 text-sm mt-1">Descubre las mejores ofertas</p>
          </div>
        </header>

        {/* Feed de ofertas */}
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {ofertas.map((oferta) => (
            <OfferCard key={oferta.id} oferta={oferta} onLike={handleLike} />
          ))}
        </main>
      </div>

      {/* Modal de subida */}
      <UploadModal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />
    </>
  );
}
