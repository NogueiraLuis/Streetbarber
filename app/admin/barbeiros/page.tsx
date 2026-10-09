"use client";
import TabelaAdmin from "@/components/TabelaAdmin";
import CardAgen from "@/components/CardTable";
import { barbeiros } from "@/src/types/barbeiros";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

interface Barbeiros {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export default function barberPage() {
  const [barbeiros, setBarbeiros] = useState<Barbeiros[]>([]);

  const [loading, setLoading] = useState(true);

  const buscarBarbeiros = async () => {
    setLoading(true);

    const { data: dadosBarbeiros, error } = await supabase
      .from("barbeiros")
      .select("nome, email, telefone");

    //Perguntar o motivo de ser escrito assim!
    if (!error && dadosBarbeiros) {
      setBarbeiros(dadosBarbeiros as unknown as Barbeiros[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    buscarBarbeiros();
  }, []);

  function editarBarbeiro(id: string): void {
    throw new Error("Function not implemented.");
  }

  function excluirBarbeiro(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <TabelaAdmin
      colunas={["Nome", "Email", "Telefone", "Ações"]}
      vazio={barbeiros.length === 0}
    >
      {barbeiros.map((item) => (
        <CardAgen onExcluir={handleExcluir} onEditar={handleAbrirEdicao} />
      ))}
    </TabelaAdmin>
  );
}
