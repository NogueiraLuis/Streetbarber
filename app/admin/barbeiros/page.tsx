"use client";
import TabelaAdmin from "@/components/TabelaAdmin";
import LinhaAdmin from "@/components/CardTable";
import ModalAdmin from "@/components/ModalAdmin";
import { Barbeiros } from "@/src/types/barbeiros";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

export default function barberPage() {
  const [barbeiros, setBarbeiros] = useState<Barbeiros[]>([]);

  const [loading, setLoading] = useState(true);

  const [barbeiroEditando, setBarbeiroEditando] = useState<Barbeiros | null>(
    null,
  );

  const [isModalAberto, setIsModalAberto] = useState(false);

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");

  const buscarBarbeiros = async () => {
    setLoading(true);

    const { data: dadosBarbeiros, error } = await supabase
      .from("barbeiros")
      .select("id, nome, email, telefone");

    //Perguntar o motivo de ser escrito assim!
    if (!error && dadosBarbeiros) {
      setBarbeiros(dadosBarbeiros as unknown as Barbeiros[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    buscarBarbeiros();
  }, []);

  // Função para ABRIR MODAL DE CRIAÇÃO
  const handleAbrirCriacao = () => {
    setBarbeiroEditando(null); // Limpa o barbeiro selecionado
    setNovoNome("");
    setNovoEmail("");
    setNovoTelefone("");
    setIsModalAberto(true);
  };

  const handleAbrirEdicao = (id: string) => {
  const item = barbeiros.find((b) => b.id === id);
  if (item) {
    setBarbeiroEditando(item);
    setNovoNome(item.nome);
    setNovoEmail(item.email);
    setNovoTelefone(item.telefone);
    setIsModalAberto(true);
  }
};

  // Função de FECHAR MODAL
  const handleFecharModal = () => {
    setIsModalAberto(false);
    setBarbeiroEditando(null);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (barbeiroEditando?.id) {
      // ------------------- MODO EDIÇÃO (.update) -------------------
      const { error } = await supabase
        .from("barbeiros")
        .update({
          nome: novoNome,
          email: novoEmail,
          telefone: novoTelefone,
        })
        .eq("id", barbeiroEditando.id);

      if (error) {
        alert("Erro ao atualizar barbeiro: " + error.message);
      } else {
        alert("Barbeiro atualizado com sucesso!");
        handleFecharModal();
        buscarBarbeiros(); // Recarrega do banco
      }
    } else {
      // ------------------- MODO CRIAÇÃO (.insert) -------------------
      const { error } = await supabase.from("barbeiros").insert([
        {
          nome: novoNome,
          email: novoEmail,
          telefone: novoTelefone,
        },
      ]);

      if (error) {
        alert("Erro ao cadastrar barbeiro: " + error.message);
      } else {
        alert("Barbeiro cadastrado com sucesso!");
        handleFecharModal();
        buscarBarbeiros(); // Recarrega a lista com o novo item
      }
    }
  };

  async function excluirBarbeiro(id: string) {
    const confirmou = confirm("Tem certeza que deseja excluir este barbeiro?");
    if (!confirmou) return;

    const { error } = await supabase.from("barbeiros").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir: " + error.message);
    } else {
      // Atualiza a lista na tela sem precisar fazer outro fetch
      buscarBarbeiros();
      alert("Barbeiro excluído com sucesso!");
    }
  }

  return (
    <main className="admin-hero">
      <header className="admin-title">
        <h1>BARBEIROS</h1>
      </header>

      <section className="agen-container">
        <div className="btn-add-container">
          <button className="btn-add" onClick={handleAbrirCriacao}>
            Adicionar Barbeiro
          </button>
        </div>
        <TabelaAdmin
          colunas={["Nome", "Email", "Telefone", "Ações"]}
          vazio={barbeiros.length === 0}
        >
          {barbeiros.map((item) => (
            <LinhaAdmin
              key={item.id}
              dados={[item.nome, item.email, item.telefone]}
              onExcluir={() => excluirBarbeiro(item.id)}
              onEditar={() => handleAbrirEdicao(item.id)}
            />
          ))}
        </TabelaAdmin>
      </section>

      {/* MODAL SIMPLES DE EDIÇÃO */}
      <ModalAdmin
        titulo="Editar Barbeiro"
        isOpen={!!isModalAberto} // Transforma o objeto em booleano (true se existir um agendamento)
        onClose={handleFecharModal}
        onSubmit={handleSalvar}
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
        <div className="input-modal">
          <label>Telefone:</label>
          <input
            type="text"
            value={novoTelefone}
            onChange={(e) => setNovoTelefone(e.target.value)}
            required
          />
        </div>
      </ModalAdmin>
    </main>
  );
}
