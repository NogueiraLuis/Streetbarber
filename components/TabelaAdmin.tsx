import React from "react";

interface TabelaAdminProps {
  colunas: string[];
  loading?: boolean;
  vazio?: boolean;
  mensagemVazio?: string;
  children: React.ReactNode;
}

export default function TabelaAdmin({
  colunas,
  loading = false,
  vazio = false,
  mensagemVazio = "Nenhum registo encontrado.",
  children,
}: TabelaAdminProps) {
  if (loading) {
    return <p className="loading-text">Carregando...</p>;
  }

  return (
    <table className="table-agen">
      <thead>
        <tr>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {vazio ? (
          <tr>
            <td
              colSpan={colunas.length}
              style={{ textAlign: "center", padding: "1.5rem", color: "#888" }}
            >
              {mensagemVazio}
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
}
