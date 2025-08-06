"use strict";
exports.__esModule = true;
exports.analyseConversationSchema = void 0;
var zod_1 = require("zod"); // ⚠️ zod deve ser importado assim
exports.analyseConversationSchema = zod_1.z.object({
    objetive: zod_1.z
        .string()
        .describe('O objetivo da conversa do ponto de vista do vendedor, como "fechar venda" ou "qualificar lead".'),
    argumentativeAnalyse: zod_1.z.boolean()["default"](true),
    leadsExtraction: zod_1.z.boolean()["default"](true)
});
