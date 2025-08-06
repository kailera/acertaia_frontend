import { PedraoAgent } from "@/agents/pedrao/pedrao-agent";
import { HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userPrompt = body.prompt;

    if (!userPrompt) {
      return NextResponse.json(
        { error: "Prompt obrigatório" },
        { status: 400 }
      );
    }

    const result = await PedraoAgent.invoke({
      messages: [new HumanMessage(userPrompt)],
    });

    const lastMessage = result.messages[result.messages.length - 1];

    return NextResponse.json({ result: lastMessage.content });
  } catch (error) {
    console.error("Erro ao processar análise:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
