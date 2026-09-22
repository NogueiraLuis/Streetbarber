import Image from "next/image";
import CardServicos from "@/components/servicos";
import Link from "next/link";
import { Limelight } from "next/font/google";

const limeLight = Limelight({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-limelight",
});

const servicos = [
  {
    id: 1,
    title: "Corte de Cabelo",
    info: "Corte moderno ou clássico com lavagem e finalização incluídas.",
  },
  {
    id: 2,
    title: "Barba Completa",
    info: "Modelagem, alinhamento com navalha e hidratação com óleos especiais.",
  },
  {
    id: 3,
    title: "Combo Cabelo + Barba",
    info: "O serviço completo para renovar o visual com atendimento personalizado.",
  },
  {
    id: 4,
    title: "Pezinho / Acabamento",
    info: "Ajuste rápido dos contornos do cabelo e da barba para manter o corte em dia.",
  },
  {
    id: 5,
    title: "Tratamento Capilar",
    info: "Hidratação profunda e massagem no couro cabeludo para fortalecer os fios.",
  },
];

export default function HomePage() {
  return (
    <main className="hero">
      <div className="header">
        <div className="logo" style={{ width: "4.5rem" }}>
          <Image
            src="/logo.png"
            width={200}
            height={300}
            alt="Logo da empresa"
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
            <Image
              src="/title-home.png"
              width={1100}
              height={200}
              alt="Street Barbershop"
            />
          </div>

          <span className="slogan">
            <p>
              <strong>
                MUDAR SEU ESTILO É O PRIMEIRO PASSO PRA SUA AUTOESTIMA FICAR LÁ
                EM CIMA!
              </strong>
            </p>
            <p>Horário de funcionamento: 08:00 às 20:00 - Seg a Sáb</p>
          </span>
        </section>

        <section className="servicos">
          <div>
            <Image
              src="/title-servicos.png"
              width={400}
              height={200}
              alt="Serviços"
            />
          </div>

          <div className="container-servicos">
            <section className="tipo-servicos">
              {servicos.map((item) => (
                <CardServicos
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  info={item.info}
                />
              ))}
            </section>
            <section className="image-servicos">
              <Image
              className="servico-img"
              src="/servico-img.jpg"
              width={350}
              height={100}
              alt="barbeiro"/>
            </section>
          </div>
        </section>
        <section className="equipe">
          <div>
            <Image
              src="/title-equipe.png"
              width={600}
              height={400}
              alt="Equipe"
            />
          </div>

          <section className="barbeiros">
            <Image
              src="/barbeiros.png"
              width={800}
              height={400}
              alt="barbeiros"
            />
          </section>
        </section>
        <section className="unidade">
          <div>
            <Image 
            src="/title-unidade.png"
            width={600}
            height={400}
            alt="Nossa Unidade" />
          </div>

          <section className="unidade-local-img">
            <Image 
            className="local-img"
            src="/und-local.png"
            width={350}
            height={500}
            alt="Unidade Local" />

            <div className="social-midia">

            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
