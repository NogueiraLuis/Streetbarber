import Image from "next/image";
import Link from "next/link";
import { Limelight } from "next/font/google";
const limeLight = Limelight({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-limelight",
});

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
            Fundada em 1997, a Street Barbershop une tradição, modernidade e
            arte urbana para oferecer serviços especializados em cortes
            masculinos e visagismo. Nosso espaço conta com área kids, ambiente
            acessível para pessoas com deficiência e sala de espera com snacks e
            bebidas, garantindo conforto e inclusão para todos. Nossa equipe é
            capacitada para proporcionar uma experiência diferenciada, com
            serviços como barboterapia com toalhas quentes e acabamentos
            impecáveis. Mais do que cuidar da aparência, buscamos elevar a
            autoestima e a confiança de cada cliente. Nosso compromisso com a
            qualidade e a satisfação nos destaca entre as barbearias de
            Uberlândia e região.
          </p>
        </section>
        <span className="sbr-nos-btn">
          <button type="button">
            <Link className={`voltar-home ${limeLight.className}`} href="/">
              Voltar
            </Link>
          </button>
        </span>
      </div>
    </main>
  );
}
