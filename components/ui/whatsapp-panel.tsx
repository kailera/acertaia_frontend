'use client'
import { useState } from 'react'

interface WhatsappPanelProps {
  vendedorId: string
  vendedorNome: string
}

const contatosFake = [
  { id: 'c1', nome: 'João Cliente' },
  { id: 'c2', nome: 'Maria Compradora' },
  { id: 'c3', nome: 'Pedro Interessado' }
]

const conversasFake = {
  c1: [
    { remetente: 'cliente', texto: 'Oi, tem o produto X disponível?' },
    { remetente: 'vendedor', texto: 'Olá! Sim, temos sim.' },
    { remetente: 'cliente', texto: 'Qual o valor à vista?' },
    { remetente: 'vendedor', texto: 'Está por R$ 150, com 10% de desconto à vista.' }
  ],
  c2: [
    { remetente: 'cliente', texto: 'Esse produto é original?' },
    { remetente: 'vendedor', texto: 'Sim, 100% original e com garantia!' },
    { remetente: 'cliente', texto: 'Ótimo. Quero comprar.' }
  ],
  c3: [
    { remetente: 'cliente', texto: 'Olá, me interessei pela oferta de ontem.' },
    { remetente: 'vendedor', texto: 'Olá! Ainda temos unidades. Posso garantir a promoção pra você.' }
  ]
}

export default function WhatsappPanel({ vendedorId, vendedorNome }: WhatsappPanelProps) {
  const [contatoSelecionado, setContatoSelecionado] = useState<string>('c1')

  return (
    <div className="w-full h-[500px] border rounded-lg shadow-md mt-6 bg-white flex">
      {/* Sidebar de Contatos */}
      <div className="w-1/4 border-r bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-md font-semibold mb-3">Contatos</h2>
        {contatosFake.map(contato => (
          <div
            key={contato.id}
            onClick={() => setContatoSelecionado(contato.id)}
            className={`p-2 rounded cursor-pointer ${
              contato.id === contatoSelecionado
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-200'
            }`}
          >
            {contato.nome}
          </div>
        ))}
      </div>

      {/* Tela de Conversa */}
      <div className="w-3/4 flex flex-col justify-between p-4">
        <div className="border-b pb-2 mb-2">
          <h2 className="text-lg font-semibold">
            {vendedorNome} conversando com{' '}
            {contatosFake.find(c => c.id === contatoSelecionado)?.nome}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 bg-gray-50 p-4 rounded">
          {conversasFake[contatoSelecionado]?.map((mensagem, idx) => (
            <div
              key={idx}
              className={`max-w-md p-2 rounded-lg ${
                mensagem.remetente === 'vendedor'
                  ? 'self-start bg-green-100'
                  : 'self-end bg-gray-200 text-right'
              }`}
            >
              {mensagem.texto}
            </div>
          ))}
        </div>

        <div className="mt-3">
          <input
            disabled
            type="text"
            placeholder="Digite uma mensagem..."
            className="w-full p-2 border rounded bg-gray-200 text-gray-500"
          />
        </div>
      </div>
    </div>
  )
}

