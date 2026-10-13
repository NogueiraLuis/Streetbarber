"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { Agendamento } from "@/src/types/agendamento";
import ModalAdmin from "@/components/ModalAdmin";
import TabelaAdmin from "@/components/TabelaAdmin";
import LinhaAdmin from "@/components/CardTable";

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
      buscarAgendamentos()
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
      buscarAgendamentos()// Recarrega a lista atualizada
      setAgendamentoEditando(null); // Fecha o modal
      alert("Agendamento atualizado!");
    }
  };

  return (
    <main className="admin-hero">
      <header className="admin-title">
        <h1>AGENDAMENTOS</h1>
      </header>

      <section className="agen-container">
        {/* COMPONENTE REUTILIZÁVEL DE TABELA */}
        <TabelaAdmin colunas={["Nome", "Email", "Barbeiro", "Ações"]}
        vazio={agendamentos.length === 0}>
          {agendamentos.map((item) => (
            <LinhaAdmin
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
      </section>

      {/* USO DO MODAL REUTILIZÁVEL */}
      <ModalAdmin
        titulo="Editar Agendamento"
        isOpen={!!agendamentoEditando} // Transforma o objeto em booleano (true se existir um agendamento)
        onClose={() => setAgendamentoEditando(null)}
        onSubmit={handleSalvarEdicao}
      >
        <div className="input-modal">
          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
        </div>

        <div className="input-modal">
          <label>E-mail:</label>
          <input
            type="email"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            required
          />
        </div>
      </ModalAdmin>

    </main>
  );
}
