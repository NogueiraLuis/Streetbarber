"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";

export interface Barbeiro {
  id: string;
  nome: string;
}

export interface Agendamento {
  id?: string;
  nome_cliente: string;
  email_cliente: string;
  telefone_cliente?: string;
  barbeiro_id: string;
  servico_id?: string;
  data_hora: string;
  status?: "agendado" | "concluido" | "cancelado";
}

export default function AgenPage() {
  // 1. ESTADOS (Valores do formulário e dados do banco)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [barbeiroId, setBarbeiroId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  // Estado para armazenar a lista de barbeiros vinda do Supabase
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  // =========================================================
  // 2. O USEEFFECT FICA AQUI!
  // =========================================================
  useEffect(() => {
    async function carregarBarbeiros() {
      const { data: dadosBarbeiros, error } = await supabase
        .from("barbeiros")
        .select("id, nome");

      if (error) {
        console.error("Erro ao buscar barbeiros:", error.message);
      } else if (dadosBarbeiros) {
        setBarbeiros(dadosBarbeiros); // Salva os barbeiros no estado
      }
    }

    carregarBarbeiros();
  }, []); // <- Array vazio: roda só uma vez ao carregar a página

  // 3. FUNÇÃO DE SUBMETER O FORMULÁRIO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoAgendamento: Agendamento = {
      nome_cliente: nome,
      email_cliente: email,
      telefone_cliente: telefone,
      barbeiro_id: barbeiroId,
      data_hora: `${data}T${horario}:00`,
    };

    const { error } = await supabase
      .from("agendamentos")
      .insert([novoAgendamento]);

    if (error) {
      alert("Erro ao agendar: " + error.message);
    } else {
      alert("Agendado com sucesso!");
    }
  };

  // 4. RETORNO DO JSX
  return (
    <main className="hero">

      <header>
        <strong>AGENDAMENTO</strong>
      </header>
      <form onSubmit={handleSubmit}>
        {/* ... inputs de nome, email, data ... */}
        <section className="inputs-container">
          <div className="inputs">
            <h2>Nome:</h2>
            <input className='input-box' type="text" placeholder="digite seu nome" required />
          </div>

          <div className="inputs">
            <h2>Email:</h2>
            <input className='input-box' type="email" placeholder="Digite seu Email" required />
          </div>

          <div className="inputs">
            <h2>Selecione um Profissional:</h2>
            {/* Select alimentado pelos barbeiros buscados no useEffect */}
            <select
              value={barbeiroId}
              onChange={(e) => setBarbeiroId(e.target.value)}
              className="select"
            >
              <option value="" className="options">Nenhum Selecionado</option>
              {barbeiros.map((barbeiro) => (
                <option key={barbeiro.id} value={barbeiro.id}>
                  {barbeiro.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="inputs">
            <h2>Data:</h2>
            <input className='input-box' type="date" required />
          </div>
        </section>

        <button type="submit">Finalizar</button>
      </form>
    </main>
  );
}
