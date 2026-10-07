import Image from "next/image";

interface CardProps {
    nome: string,
    email: string,
    barbeiro: string,
}

export default function CardAgen ({nome, email, barbeiro}: CardProps) {
    return(

    <tr className="card-agen">
        <td><strong className="td">{nome}</strong></td>
        <td><strong className="td">{email}</strong></td>
        <td><strong className="td">{barbeiro}</strong></td>
        <td className="inputs-agen">
            <button type="button">
                <Image
                src='/admin/lixeira.png'
                width={15}
                height={15}
                alt="lixeira"
                />
            </button>
            <button type="button">
                editar
            </button>
        </td>
    </tr>
    )
}