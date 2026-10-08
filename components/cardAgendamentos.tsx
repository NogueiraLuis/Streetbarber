import Image from "next/image";

interface Agendamento {
  id: string;
  nome_cliente: string;
  email_cliente: string;
  barbeiros: string
  onExcluir: (id: string) => void
  onEditar: (id: string) => void
}

export default function CardAgen({ nome_cliente, email_cliente, barbeiros, id, onExcluir,
  onEditar}: Agendamento) {
  return (
    <tr className="card-agen">
      <td>
        <strong className="td">{nome_cliente}</strong>
      </td>
      <td>
        <strong className="td">{email_cliente}</strong>
      </td>
      <td>
        <strong className="td">{barbeiros}</strong>
      </td>
      <td>
        <div className="inputs-agen">
          <button
            className="excluir-btn
            "
            onClick={() => onExcluir(id)}
            type="button"
          >
            <Image
              src="/admin/trash.png"
              width={17.5}
              height={25}
              alt="lixeira"
            />
          </button>
          <button onClick={() => onEditar(id)} className="editar-btn" type="button">
            editar
          </button>
        </div>
      </td>
    </tr>
  );
}
