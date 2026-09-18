interface CardProps {
    title: string,
    info: string
}

export default function CardServicos({ title, info }: CardProps) {
    return (
        <div>
            <h2 className="title-servico">{title}</h2>
            <p className="info-servico">{info}</p>
        </div>
    )
}
