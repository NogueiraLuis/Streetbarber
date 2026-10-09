import React from "react";

interface LinhaAdminProps {
  // Recebe um array com os valores de cada coluna (pode ser texto, número ou elementos JSX como foto)
  dados: (string | number | React.ReactNode)[]; 
  onEditar?: () => void;
  onExcluir?: () => void;
}

export default function LinhaAdmin({ dados, onEditar, onExcluir }: LinhaAdminProps) {
  return (
    <tr className="card-table">
      {dados.map((valor, index) => (
        <td key={index}>{valor}</td>
      ))}
      <td className="actions-cell">
        {onEditar && (
          <button className="btn-edit" onClick={onEditar}>
            Editar
          </button>
        )}
        {onExcluir && (
          <button className="btn-delete" onClick={onExcluir}>
            Excluir
          </button>
        )}
      </td>
    </tr>
  );
}