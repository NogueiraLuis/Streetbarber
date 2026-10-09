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
  // 1. ESTADOS
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [barbeiroId, setBarbeiroId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  // 2. BUSCAR BARBEIROS
  useEffect(() => {
    async function carregarBarbeiros() {
      const { data: dadosBarbeiros, error } = await supabase
        .from("barbeiros")
        .select("id, nome");

      if (error) {
        console.error("Erro ao buscar barbeiros:", error.message);
      } else if (dadosBarbeiros) {
        setBarbeiros(dadosBarbeiros);
      }
    }

    carregarBarbeiros();
  }, []);

  // 3. SUBMIT DO FORMULÁRIO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trava de segurança caso algum campo passe despercebido
    if (!data || !horario) {
      alert("Selecione a data e o horário do agendamento!");
      return;
    }

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
      // Limpa os campos após o sucesso
      setNome("");
      setEmail("");
      setTelefone("");
      setBarbeiroId("");
      setData("");
      setHorario("");
    }
  };

  // 4. RETORNO DO JSX
  return (
    <main className="agen-hero">
      <header className="agen-title">
        <strong>AGENDAMENTO</strong>
      </header>
      <form className="form-agen" onSubmit={handleSubmit}>
        <section className="inputs-container">
          {/* NOME */}
          <div className="inputs">
            <h2>Nome:</h2>
            <input
              className="input-box"
              type="text"
              placeholder="digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="inputs">
            <h2>Email:</h2>
            <input
              className="input-box"
              type="email"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* TELEFONE (Opcional) */}
          <div className="inputs">
            <h2>Telefone:</h2>
            <input
              className="input-box"
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          {/* PROFISSIONAL */}
          <div className="inputs">
            <h2>Selecione um Profissional:</h2>
            <select
              value={barbeiroId}
              onChange={(e) => setBarbeiroId(e.target.value)}
              className="select"
              required
            >
              <option value="" className="options">
                Nenhum Selecionado
              </option>
              {barbeiros.map((barbeiro) => (
                <option key={barbeiro.id} value={barbeiro.id}>
                  {barbeiro.nome}
                </option>
              ))}
            </select>
          </div>

          {/* DATA */}
          <div className="inputs">
            <h2>Data:</h2>
            <input
              className="input-box"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          {/* HORÁRIO (Faltava este input no formulário) */}
          <div className="inputs">
            <h2>Horário:</h2>
            <input
              className="input-box"
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
            />
          </div>
        </section>

        <section className="submit-container">
          <button className="btn-submit" type="submit">
            Finalizar
          </button>
        </section>
      </form>
    </main>
  );
}