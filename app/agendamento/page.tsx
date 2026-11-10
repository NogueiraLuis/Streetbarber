"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";

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
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

  const horariosDisponiveis = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

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

  // 3. BUSCAR HORÁRIOS OCUPADOS
  useEffect(() => {
    async function buscarHorariosOcupados() {
      if (!data || !barbeiroId) {
        setHorariosOcupados([]);
        return;
      }

      const { data: agendamentos, error } = await supabase
        .from("agendamentos")
        .select("data_hora")
        .eq("barbeiro_id", barbeiroId)
        .gte("data_hora", `${data}T00:00:00`)
        .lte("data_hora", `${data}T23:59:59`);

      if (error) {
        console.error("Erro ao buscar horários ocupados:", error.message);
        return;
      }

      if (agendamentos) {
        const ocupados = agendamentos.map((item) => {
          // Extrai o "HH:MM" de "YYYY-MM-DDTHH:MM:SS"
          return item.data_hora.split("T")[1].substring(0, 5);
        });
        setHorariosOcupados(ocupados);
      }
    }

    buscarHorariosOcupados();
  }, [data, barbeiroId]);

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
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
              {horariosDisponiveis.map((item) => {
                const isSelecionado = horario === item;
                const isOcupado = horariosOcupados.includes(item); // 👈 Verifica se já está ocupado

                return (
                  <button
                    type="button"
                    key={item}
                    disabled={isOcupado} // 👈 Bloqueia o clique
                    onClick={() => setHorario(item)}
                    className={`py-2 px-3 rounded-md text-md font-medium transition-all border ${
                      isOcupado
                        ? "bg-zinc-800 text-zinc-600 border-zinc-800 cursor-not-allowed line-through" // Estilo ocupado
                        : isSelecionado
                          ? "bg-amber-500 text-zinc-950 border-amber-500 font-bold shadow-md cursor-pointer" // Estilo selecionado
                          : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 cursor-pointer" // Estilo padrão
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="submit-container">
          <button
            className={`btn-submit ${!horario || !data ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            type="submit"
            disabled={!horario || !data}
          >
            Finalizar
          </button>

          <Link className="btn-agen-voltar" href="/">
            Voltar
          </Link>
        </section>
      </form>
    </main>
  );
}
