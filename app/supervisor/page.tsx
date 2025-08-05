"use client";

import VendedorCarousel from "@/components/ui/vendedor-carousel";
import WhatsappPanel from "@/components/ui/whatsapp-panel";
import { useState } from "react";

interface Vendedor {
  id: string;
  nome: string;
  avatar: string;
}

const vendedoresMock: Vendedor[] = [
  { id: "1", nome: "João", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "2", nome: "Maria", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: "3", nome: "Carlos", avatar: "https://i.pravatar.cc/150?img=5" },
];

export default function SupervisorDashboard() {
  const [vendedorSelecionado, setVendedorSelecionado] =
    useState<Vendedor | null>(null);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel do Supervisor</h1>

      <VendedorCarousel
        vendedores={vendedoresMock}
        onSelect={(vendedor) => setVendedorSelecionado(vendedor)}
      />

      {vendedorSelecionado && (
        <WhatsappPanel
          vendedorId={vendedorSelecionado.id}
          vendedorNome={vendedorSelecionado.nome}
        />
      )}
    </main>
  );
}
