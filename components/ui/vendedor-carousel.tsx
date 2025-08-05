"use client";

import { useState } from "react";

interface Vendedor {
  id: string;
  nome: string;
  avatar: string;
}

interface Props {
  vendedores: Vendedor[];
  onSelect: (vendedor: Vendedor) => void;
}

export default function VendedorCarousel({ vendedores, onSelect }: Props) {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {vendedores.map((vendedor) => (
        <div
          key={vendedor.id}
          className={`flex flex-col items-center cursor-pointer transition-transform ${
            selecionado === vendedor.id ? "scale-110" : ""
          }`}
          onClick={() => {
            setSelecionado(vendedor.id);
            onSelect(vendedor);
          }}
        >
          <img
            src={vendedor.avatar}
            alt={vendedor.nome}
            className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
          />
          <span className="text-sm mt-1">{vendedor.nome}</span>
        </div>
      ))}
    </div>
  );
}
