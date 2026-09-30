interface CardProps {
    id: number,
    title: string,
    info: string
    price: string
}

export default function CardServicos({ title, info, id, price }: CardProps) {
    return (
        <div className="cardProduto">
            <h2 className="title-servico">{title} - {price}</h2>
            <p className="info-servico">{info}</p>
        </div>
    )
}
