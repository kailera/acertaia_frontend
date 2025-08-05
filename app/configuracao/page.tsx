"use client";

import { defaultRoles as DefaultRoles, IRoles } from "@/data/roles";
import { useEffect, useState } from "react";

export default function ConfiguracaoPage() {
  const [prompt, setPrompt] = useState("");
  const [promptsSalvos, setPromptsSalvos] = useState<string[]>([]);
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [roleSelecionada, setRoleSelecionada] = useState<IRoles | null>(null);

  // Carrega dados do localStorage
  useEffect(() => {
    const rolesArmazenadas = localStorage.getItem("roles");
    const promptsArmazenados = localStorage.getItem("prompts");

    if (rolesArmazenadas) {
      setRoles(JSON.parse(rolesArmazenadas));
    } else {
      setRoles(DefaultRoles);
      localStorage.setItem("roles", JSON.stringify(DefaultRoles));
    }

    if (promptsArmazenados) {
      setPromptsSalvos(JSON.parse(promptsArmazenados));
    }
  }, []);

  // Atualiza localStorage quando roles mudam
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(promptsSalvos));
  }, [promptsSalvos]);

  const salvarPrompt = () => {
    if (prompt.trim() === "") return;
    setPromptsSalvos((prev) => [...prev, prompt.trim()]);
    setPrompt("");
  };

  const atualizarRole = (index: number, novoContent: string) => {
    const novasRoles = [...roles];
    novasRoles[index].content = novoContent;
    setRoles(novasRoles);
  };

  const resetarRolesParaPadrao = () => {
    setRoles(DefaultRoles);
    localStorage.setItem("roles", JSON.stringify(DefaultRoles));
  };

  const enviarPromptParaLLM = async (
    texto: string,
    role: IRoles | null = null
  ) => {
    setLoading(true);
    setResposta("");

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: texto,
          selectedRole: role
            ? {
                role: "system",
                content: role.content,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (data.resposta) {
        setResposta(data.resposta);
      } else {
        setResposta("Erro ao obter resposta.");
      }
    } catch (err) {
      console.error(err);
      setResposta("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Configuração de Prompts</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite seu prompt aqui..."
        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={salvarPrompt}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar Prompt
      </button>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Roles Disponíveis</h2>
        <button
          onClick={resetarRolesParaPadrao}
          className="text-sm text-red-600 hover:underline"
        >
          Restaurar Roles Padrão
        </button>
      </div>

      <ul className="space-y-4 mt-2">
        {roles.map((role, index) => (
          <li key={index} className="border p-4 rounded bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-gray-800">{role.role}</strong>
              <button
                onClick={() => setRoleSelecionada(role)}
                className="text-sm text-blue-600 hover:underline"
              >
                Selecionar esta Role
              </button>
            </div>
            <textarea
              value={role.content}
              onChange={(e) => atualizarRole(index, e.target.value)}
              className="w-full border p-2 rounded text-sm"
              rows={4}
            />
          </li>
        ))}
      </ul>

      {roleSelecionada && (
        <p className="mt-4 text-sm text-green-700">
          Role selecionada: <strong>{roleSelecionada.role}</strong>
        </p>
      )}

      {promptsSalvos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Prompts Salvos</h2>
          <ul className="space-y-2">
            {promptsSalvos.map((p, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded bg-white shadow-sm"
              >
                <span className="text-gray-800 w-full">{p}</span>
                <button
                  onClick={() => enviarPromptParaLLM(p, roleSelecionada)}
                  className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Enviar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p className="mt-6 text-blue-600">Carregando resposta...</p>}
      {resposta && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <h3 className="font-semibold mb-2">Resposta do LLM:</h3>
          <p className="whitespace-pre-line">{resposta}</p>
        </div>
      )}
    </div>
  );
}
