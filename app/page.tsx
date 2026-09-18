import Image from "next/image";
import meuLogo from "@/public/logo.png";
import CardServicos from '@/components/servicos'
import Link from "next/link";
import { Limelight } from "next/font/google";

const limeLight = Limelight({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-limelight",
});

export default function HomePage() {
  return (
    <main className="hero">
      <div className="header">
        <div className="logo" style={{ width: "4.5rem" }}>
          <Image
            src={meuLogo}
            alt="Logo da empresa"
            placeholder="blur"
            className="logo"
          />
        </div>

        <nav className="navegacao-principal">
          <ul className={`lista-links ${limeLight.className}`}>
            <li>
              <Link href="/loja">Loja</Link>
            </li>
            <li>
              <Link href="/galeria">Galeria</Link>
            </li>
            <li>
              <Link href="/tabela-valores">Valores</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
          </ul>
        </nav>

        <button className={`btn-agen ${limeLight.className}`}>
          Agendar Corte
        </button>
      </div>

      <div className="sessoes">
        <section className="home">
          <div>
            <Image src="/title-home.png" width={1100} height={200} alt="Street Barbershop"/>
          </div>

          <span className="slogan">
            <p><strong>MUDAR SEU ESTILO É O PRIMEIRO PASSO PRA SUA AUTOESTIMA FICAR LÁ EM CIMA!</strong></p>
            <p>Horário de funcionamento: 08:00 às 20:00 - Seg a Sáb</p>
          </span>
        </section>

        <section className="servicos">
            <div>
                <Image src='/title-servicos.png' width={400} height={200} alt='Serviços'/>
            </div>

            <div className="tipo-servicos">
                <section></section>
            </div>
        </section>
        <section className="equipe">a</section>
        <section className="unidade">a</section>
      </div>
    </main>
  );
}
