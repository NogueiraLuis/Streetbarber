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
    title: "Degradê Clássico (Low, Mid ou High Fade)",
    price: "R$ 45,00",
    info: "Transição suave nas laterais com acabamento limpo, ajustado na altura de preferência (baixa, média ou alta).",
  },
  {
    id: 2,
    title: "Degradê Navalhado (Razor Fade)",
    price: "R$ 50,00",
    info: "Degradê raspado no limite com navalha nas laterais para maior durabilidade e alto contraste no visual.",
  },
  {
    id: 3,
    title: "Corte Americano (Taper Fade)",
    price: "R$ 40,00",
    info: "Degradê leve focado exclusivamente na nuca e nas têmporas, preservando o volume e comprimento no topo.",
  },
  {
    id: 4,
    title: "Buzz Cut com Risco",
    price: "R$ 35,00",
    info: "Corte baixo uniforme na máquina, finalizado com contorno bem marcado e risco lateral na navalha.",
  },
  {
    id: 5,
    title: "Mullet Street",
    price: "R$ 55,00",
    info: "Estilo urbano com laterais em degradê, topo levemente texturizado e nuca mais longa.",
  },
  {
    id: 6,
    title: "Corte Social na Tesoura",
    price: "R$ 40,00",
    info: "Modelagem clássica ajustada no formato do rosto, trabalhada na tesoura para um caimento alinhado e natural.",
  },
  {
    id: 7,
    title: "Freestyle com Desenho",
    price: "R$ 65,00",
    info: "Corte no degradê com adição de riscos geométricos ou arte personalizada traçada à navalha.",
  },
  {
    id: 8,
    title: "Corte + Platinado (Nevou)",
    price: "R$ 120,00",
    info: "Corte à escolha combinado com processo de descoloração global para atingir o tom platinado/branco.",
  },
];

export default function HomePage() {

  return (
    <main className="hero">
      <div className="header">
        <div className="logo" style={{ width: "4.5rem" }}>
          <Image
            src="/home/logo.png"
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
              <Link href="/sobre">Sobre</Link>
            </li>
          </ul>
        </nav>

        <button className={`btn-agen ${limeLight.className}`}>
          <Link href='/agendamento'>Agendar corte</Link>
        </button>
      </div>

      <div className="sessoes">
        <section className="home">
          <div>
            <Image
              src="/home/title-home.png"
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
              src="/servicos/title-servicos.png"
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
                  price={item.price}
                />
              ))}
            </section>
          </div>
        </section>
        <section className="galeria">
          <div>
            <Image
              src="/galeria/title-galeria.png"
              width={600}
              height={400}
              alt="Equipe"
            />
          </div>

          <section className="grade-fotos">
            <Image
              src="/galeria/corte-ex1.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/galeria/corte-ex2.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/galeria/corte-ex3.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/galeria/corte-ex4.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
          </section>
        </section>
        <section className="equipe">
          <div>
            <Image
              src="/equipe/title-equipe.png"
              width={600}
              height={400}
              alt="Equipe"
            />
          </div>

          <section className="barbeiros">
            <Image
              src="/equipe/barbeiros.png"
              width={800}
              height={400}
              alt="barbeiros"
            />
          </section>
        </section>
        <section className="unidade">
          <div>
            <Image
              src="/unidade/title-unidade.png"
              width={600}
              height={400}
              alt="Nossa Unidade"
            />
          </div>

          <section className="unidade-local-img">
            <Image
              className="local-img"
              src="/unidade/und-local.png"
              width={350}
              height={500}
              alt="Unidade Local"
            />

            <div className="social-midia"></div>
          </section>
        </section>
      </div>
    </main>
  );
}
