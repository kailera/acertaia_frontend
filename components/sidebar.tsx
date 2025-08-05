"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Vendedor", path: "/whatsapp" },
  { name: "Configuração", path: "/configuracao" },
  { name: "Contatos", path: "/contatos" },
  { name: "Supervisor", path: "/supervisor" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Painel</h2>
      <nav className="space-y-2">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "block px-4 py-2 rounded hover:bg-gray-200 transition",
              pathname === route.path ? "bg-gray-200 font-semibold" : ""
            )}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
