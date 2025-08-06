import { DynamicStructuredTool, StructuredTool } from '@langchain/core/tools';
import { z } from 'zod'; // ⚠️ zod deve ser importado assim
import { conversasFake } from '@/data/whatsapp-chats';

export const analyseConversationSchema = z.object({
  objetive: z
    .string()
    .describe(
      'O objetivo da conversa do ponto de vista do vendedor, como "fechar venda" ou "qualificar lead".'
    ),
  argumentativeAnalyse: z.boolean().default(true),
  leadsExtraction: z.boolean().default(true),
});
