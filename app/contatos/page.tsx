'use client'

import { useState } from 'react'

type Departamento = 'Vendas' | 'Financeiro' | 'RH' | 'Transporte'

interface Contato {
  nome: string
  telefone: string
  cargo: string
  departamento: Departamento
}

const contatos: Contato[] = [
  { nome: 'Lucas Pereira', telefone: '(11) 98765-4321', cargo: 'Consultor', departamento: 'Vendas' },
  { nome: 'Mariana Lopes', telefone: '(11) 91234-5678', cargo: 'Gerente de Vendas', departamento: 'Vendas' },
  { nome: 'Carlos Souza', telefone: '(11) 93456-7890', cargo: 'Analista Financeiro', departamento: 'Financeiro' },
  { nome: 'Ana Martins', telefone: '(11) 92345-6789', cargo: 'Coordenadora', departamento: 'RH' },
  { nome: 'Paulo Lima', telefone: '(11) 96543-2109', cargo: 'Motorista', departamento: 'Transporte' },
  { nome: 'Beatriz Alves', telefone: '(11) 98723-1987', cargo: 'Assistente RH', departamento: 'RH' },
  { nome: 'Rogério Dias', telefone: '(11) 99012-4576', cargo: 'Supervisor Transporte', departamento: 'Transporte' },
  { nome: 'Fernanda Costa', telefone: '(11) 99888-1122', cargo: 'Contadora', departamento: 'Financeiro' },
]

const departamentos: Departamento[] = ['Vendas', 'Financeiro', 'RH', 'Transporte']

export default function ContatosPage() {
  const [ativo, setAtivo] = useState<Departamento | null>(null)

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Contatos por Departamento</h1>

      <div className="flex gap-4 mb-6">
        {departamentos.map(dep => (
          <button
            key={dep}
            onClick={() => setAtivo(ativo === dep ? null : dep)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              ativo === dep ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'
            }`}
          >
            {dep}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {departamentos.map(dep => {
          const lista = contatos.filter(c => c.departamento === dep)
          if (ativo && ativo !== dep) return null

          return (
            <div key={dep}>
              <h2 className="text-xl font-semibold mb-4">{dep}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lista.map(contato => (
                  <div key={contato.nome} className="bg-white shadow rounded-lg p-4 border">
                    <h3 className="text-lg font-bold">{contato.nome}</h3>
                    <p className="text-sm text-gray-600">{contato.cargo}</p>
                    <p className="text-sm text-gray-700 mt-2">{contato.telefone}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
