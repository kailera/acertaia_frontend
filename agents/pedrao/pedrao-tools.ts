import { DynamicTool, StructuredTool } from "@langchain/core/tools";
import { analyseConversationSchema } from "./pedrao-schema";
import { conversasFake } from "@/data/whatsapp-chats";
import { z } from "zod";

export class ChatAnalysisTool extends StructuredTool<
  typeof analyseConversationSchema
> {
  name = "analisar_conversas_whatsapp";
  description =
    "Carrega conversas de WhatsApp de vendedores e define parâmetros de análise para o agente.";
  schema = analyseConversationSchema;

  // Método que executa a tool
  async _call(input: z.infer<typeof analyseConversationSchema>) {
    const { objetive, argumentativeAnalyse, leadsExtraction } = input;

    // Aqui você simula um "fetch" ao banco de dados
    const conversations = conversasFake; // ou fetch real no futuro

    return JSON.stringify({
      status: "Conversas carregadas com sucesso!",
      totalChats: Object.keys(conversations).length,
      conversations, // cuidado com tamanho do contexto
      analysisInstructions: {
        objetive,
        argumentativeAnalyse,
        leadsExtraction,
      },
    });
  }
}

export const ChatAnalysis = new DynamicTool({
  name: "ChatAnalysis",
  description: "Analisa o histórico de mensagens fake de WhatsApp.",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  func: async (_input: string) => {
    const conversas = conversasFake;
    const todasConversas = Object.values(conversas); // agora é um array
    return `Análise automática das conversas:\n${JSON.stringify(todasConversas.slice(0, todasConversas.length), null, 2)}...`;
  }
});

