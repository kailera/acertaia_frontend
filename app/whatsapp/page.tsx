"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function VendasDashboard() {
  const [mensagem, setMensagem] = useState("");
  const [respostaIA, setRespostaIA] = useState<string | null>(null);

  const simularResposta = () => {
    setRespostaIA(
      "⚠️ Detecção: Argumento fraco. Sugestão: Reforce os benefícios do produto com base na dor do cliente."
    );
  };

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">
        Agente IA - Análise de Vendas via WhatsApp
      </h1>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna 1: Simulação */}
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-semibold">
                Simulação de Conversa (WhatsApp)
              </h2>

              <div className="border rounded-md h-96 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 px-3 py-2 rounded-lg">
                      Olá! Temos um combo com desconto hoje!
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="inline-block bg-green-100 px-3 py-2 rounded-lg">
                      Qual o valor?
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 px-3 py-2 rounded-lg">
                      Apenas R$ 99, com entrega grátis!
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite uma nova mensagem..."
                />
                <Button onClick={simularResposta}>Enviar</Button>
              </div>

              {respostaIA && (
                <div className="bg-yellow-100 p-3 rounded text-sm mt-2">
                  <strong>IA:</strong> {respostaIA}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Coluna 2: Status do Vendedor */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Status do Vendedor</h2>
              <ul className="text-sm space-y-1">
                <li>✅ Meta individual: 70% atingida</li>
                <li>📊 Meta da equipe: 85% atingida</li>
                <li>🕒 Última atividade: 3h atrás</li>
                <li>💡 Insight: Use gatilhos mentais no fechamento</li>
                <li>🎯 Desafio de hoje: Reativar 2 clientes inativos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Notificações Recentes</h2>
              <ul className="text-sm list-disc list-inside">
                <li>
                  📬 Correção enviada ao vendedor João sobre argumento fraco
                </li>
                <li>🔥 Desafio do dia liberado para todos os vendedores</li>
                <li>⚠️ Inatividade detectada no vendedor Carlos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
