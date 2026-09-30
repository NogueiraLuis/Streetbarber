import Image from "next/image";

export default function SobrePage() {
  return (
    <main className="sobre-hero">
      <header className="sobre-title">
        <Image
          src="/sobre-nos/sobrenos.png"
          width={500}
          height={300}
          alt="Sobre Nós"
        />
      </header>
      <div className="sobre-conteudo">
        <section className="sobre-text">
          <p className="text">
            Fundada em 1997, a Street Barbershop tem a função de ser uma
            barbearia moderna e profissional especializada em cortes masculinos,
            com trabalho na área do visagismo masculino e com estilo de arte
            urbana, mantendo a tradição de entregar sempre o melhor atendimento
            e serviço. Oferecemos um ambiente exclusivo ao público, contendo
            área kids, uma área especial para pessoas com deficiências e uma
            área de espera contendo uma máquina de vendas com snacks,
            refrigerantes, etc., a fim de ser um local diferenciado não só pelo
            conforto e atendimento personalizado, mas por oferecer uma melhor
            experiência para pessoas com deficiências, que na maioria dos casos
            não são tratadas como deveriam e muitas vezes são tratadas de forma
            desigual e não são atendidas. Nossos barbeiros são treinados para
            oferecer uma experiência incrível, com barboterapia com toalhas
            quentes e um acabamento impecável. Devolvendo a sua autoestima e
            confiança. Aqui não aceitamos cliente insatisfeito, não é à toa que
            somos a barbearia de Uberlândia e região com melhor índice de
            avaliação no Google.
          </p>
        </section>
        <section className="sobre-img">
          <Image
            src="/sobre-nos/sobre-area.png"
            width={300}
            height={300}
            alt=""
            className="img"
          />
          <Image
            src="/sobre-nos/sobre-ex2.png"
            width={300}
            height={300}
            alt=""
            className="img"
          />
          <Image
            src="/sobre-nos/sobre-ex3.jpg"
            width={300}
            height={300}
            alt=""
            className="img"
          />
          <Image
            src="/sobre-nos/sobre-ex1.jpg"
            width={300}
            height={300}
            alt=""
            className="img"
          />
        </section>
      </div>
    </main>
  );
}
