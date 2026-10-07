/* import { useState, useEffect } from 'react' */
import CardAgen from "@/components/cardAgendamentos";

export default function AdminPage() {
  const agendamentos = [
    { id: "1", nome: "Louis", email: "abs@gmail.com", barbeiro: "bruno" },
    { id: "2", nome: "Louis", email: "abs@gmail.com", barbeiro: "bruno" },
    { id: "3", nome: "Louis", email: "abs@gmail.com", barbeiro: "bruno" },
    { id: "4", nome: "Louis", email: "abs@gmail.com", barbeiro: "bruno" },
  ];

  return (
    <main className="admin-hero">
      <header className="admin-title">
        <h1>ADMINISTRAÇÃO</h1>
      </header>

      <section className="agen-container">
        <table className="table-agen">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Barbeiro</th>
              <th>admin</th>
            </tr>
          </thead>

          <tbody>
            {agendamentos.map((item) => (
                  <CardAgen
                    key={item.id}
                    nome={item.nome}
                    email={item.email}
                    barbeiro={item.barbeiro}
                  />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
