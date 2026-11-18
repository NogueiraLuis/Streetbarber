"use client";
import Image from "next/image";
import CardServicos from "@/components/servicos";
import Link from "next/link";
import { Limelight } from "next/font/google";
import { servicos } from "@/src/data/listaCortes";

const limeLight = Limelight({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-limelight",
});

export default function HomePage() {
  return (
    <main className="hero">
      <div className="header">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Evita que a página dê um salto seco
            window.scrollTo({
              top: 0,
              behavior: "smooth", // Faz a rolagem suave até o topo
            });
          }}
          style={{ display: "inline-block" }}
        >
          <div className="logo" style={{ width: "4.5rem", cursor: "pointer" }}>
            <Image
              src="/home/logo.webp"
              width={200}
              height={300}
              alt="Logo da empresa"
              className="logo"
            />
          </div>
        </Link>
        <nav className="navegacao-principal">
          <ul className={`lista-links ${limeLight.className}`}>
            <li>
              <Link href="/sobre">Sobre Nós</Link>
            </li>
          </ul>
        </nav>

        <div className="btn-nav">
          <Link href="/admin" className="admin-link">
            Admin
          </Link>
          <button className={`btn-agen ${limeLight.className}`}>
            <Link href="/agendamento">Agendar corte</Link>
          </button>
 
        </div>
      </div>

      <div className="sessoes">
        <section className="home">
          <div>
            <Image
              src="/home/logo.webp"
              width={500}
              height={100}
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
              src="/home/galeria/title-galeria.png"
              width={600}
              height={400}
              alt="Equipe"
            />
          </div>

          <section className="grade-fotos">
            <Image
              src="/home/galeria/corte-ex1.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/home/galeria/corte-ex2.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/home/galeria/corte-ex3.jpg"
              width={200}
              height={200}
              alt="Equipe"
              className="foto"
            />
            <Image
              src="/home/galeria/corte-ex4.jpg"
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
              src="/home/equipe/title-equipe.png"
              width={600}
              height={400}
              alt="Equipe"
            />
          </div>

          <section className="barbeiros">
            <Image
              src="/home/equipe/barbeiros.png"
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
        <section className="footer">
          <footer className="footer-container">
            <div className="footer-content">
              {/* Coluna 1: Marca */}
              <div className="footer-col">
                <h3 className="footer-title">STREET BARBERSHOP</h3>
              </div>

              {/* Coluna 3: Contacto */}
              <div className="footer-col">
                <h4>Contato</h4>
                <p>📍 Rua Exemplo, 123 — Centro</p>
                <p>📱 (00) 99999-9999</p>
                <p>📸 @streetbarbershop</p>
              </div>
            </div>

            {/* Linha Inferior */}
            <div className="footer-bottom">
              <p>
                &copy; {new Date().getFullYear()} Street Barbershop. Todos os
                direitos reservados.
              </p>

              {/* Link discreto do Admin */}
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
