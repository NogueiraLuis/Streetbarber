"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import CardTable from "@/components/CardTable";
import { Agendamento } from "@/src/types/agendamento";
import TabelaAdmin from "@/components/TabelaAdmin";

export default function AdminPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [loading, setLoading] = useState(true);

  // Estado para controlar qual agendamento está sendo editado no Modal
  const [agendamentoEditando, setAgendamentoEditando] =
    useState<Agendamento | null>(null);

  const [novoNome, setNovoNome] = useState("");

  const [novoEmail, setNovoEmail] = useState("");

  // BUSCAR AGENDAMENTOS
  const buscarAgendamentos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agendamentos")
      .select("id, nome_cliente, email_cliente, barbeiros (nome)");

    if (!error && data) {
      setAgendamentos(data as unknown as Agendamento[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  // -------------------------------------------------------------
  // FUNÇÃO 1: EXCLUIR AGENDAMENTO
  // -------------------------------------------------------------
  const handleExcluir = async (id: string) => {
    const confirmou = confirm(
      "Tem certeza que deseja excluir este agendamento?",
    );
    if (!confirmou) return;

    const { error } = await supabase.from("agendamentos").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir: " + error.message);
    } else {
      // Atualiza a lista na tela sem precisar fazer outro fetch
      setAgendamentos((prev) => prev.filter((item) => item.id !== id));
      alert("Agendamento excluído com sucesso!");
    }
  };

  // -------------------------------------------------------------
  // FUNÇÃO 2: ABRIR MODAL DE EDIÇÃO
  // -------------------------------------------------------------
  const handleAbrirEdicao = (id: string) => {
    const item = agendamentos.find((a) => a.id === id);
    if (item) {
      setAgendamentoEditando(item);
      setNovoNome(item.nome_cliente);
      setNovoEmail(item.email_cliente);
    }
  };

  // -------------------------------------------------------------
  // FUNÇÃO 3: SALVAR ALTERAÇÕES DA EDIÇÃO
  // -------------------------------------------------------------
  const handleSalvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendamentoEditando) return;

    const { error } = await supabase
      .from("agendamentos")
      .update({
        nome_cliente: novoNome,
        email_cliente: novoEmail,
      })
      .eq("id", agendamentoEditando.id);

    if (error) {
      alert("Erro ao atualizar: " + error.message);
    } else {
      alert("Agendamento atualizado!");
      setAgendamentoEditando(null); // Fecha o modal
      buscarAgendamentos(); // Recarrega a lista atualizada
    }
  };

  return (
    <main className="admin-hero">
      <header className="admin-title">
        <h1>AGENDAMENTOS</h1>
      </header>

      <section className="agen-container">
        {/* COMPONENTE REUTILIZÁVEL DE TABELA */}
        <TabelaAdmin
          colunas={["Nome", "Email", "Barbeiro", "Ações"]}
          loading={loading}
          vazio={agendamentos.length === 0}
          mensagemVazio="Nenhum agendamento encontrado."
        >
          <TabelaAdmin colunas={["Nome", "Email", "Barbeiro", "Ações"]}>
            {agendamentos.map((item) => (
              <CardTable
                key={item.id}
                dados={[
                  item.nome_cliente,
                  item.email_cliente,
                  item.barbeiros?.nome || "Não informado",
                ]}
                onEditar={() => handleAbrirEdicao(item.id)}
                onExcluir={() => handleExcluir(item.id)}
              />
            ))}
          </TabelaAdmin>
        </TabelaAdmin>
      </section>

      {/* MODAL SIMPLES DE EDIÇÃO */}
      {agendamentoEditando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Agendamento</h2>
            <form className="modal-form" onSubmit={handleSalvarEdicao}>
              <div className="input-modal">
                <label>Nome:</label>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  required
                />
              </div>

              <div className="input-modal">
                <label>Email:</label>
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="btn-submit">
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setAgendamentoEditando(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
