import { IRoles } from "./../../../data/roles";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, selectedRole } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt ausente" }, { status: 400 });
  }

  const promptFinal = `
Você é um especialista em produtos de veterinária animal. Responda a pergunta abaixo de forma clara e objetiva:

Pergunta:
${prompt}
`;

  try {
    const respostaLLM = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // ou "gpt-4o" se desejar
          messages: [
            {
              role: "system",
              content: selectedRole.content,
            },
            {
              role: "user",
              content: promptFinal,
            },
          ],
        }),
      }
    );

    const json = await respostaLLM.json();

    if (!respostaLLM.ok) {
      console.error("Erro da OpenAI:", json);
      return NextResponse.json(
        { error: "Erro ao consultar o modelo da OpenAI" },
        { status: 500 }
      );
    }

    const resposta =
      json.choices?.[0]?.message?.content || "Sem resposta gerada.";

    return NextResponse.json({ resposta });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar resposta" },
      { status: 500 }
    );
  }
}
