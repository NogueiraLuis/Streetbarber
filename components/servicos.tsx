interface CardProps {
    id: number,
    title: string,
    info: string
}

export default function CardServicos({ title, info, id }: CardProps) {
    return (
        <div className="cardProduto">
            <h2 className="title-servico">{title}</h2>
            <p className="info-servico">{info}</p>
        </div>
    )
}
