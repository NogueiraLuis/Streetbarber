"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/src/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Estado para controlar se a sidebar está aberta ou fechada no celular
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { label: "Agendamentos", href: "/admin", icon: "📅" },
    { label: "Barbeiros", href: "/admin/barbeiros", icon: "💈" },
  ];

  return (
    <>
      {/* Botão Superior que aparece apenas no celular */}
      <div className="mobile-menu-btn">
        <span>
          <Image
            src="/home/logo.webp"
            width={100}
            height={200}
            alt="Logo da empresa"
            className="logo"
          />
        </span>
        <button
          className="menu-toggle-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay escuro opcional para quando o menu estiver aberto no celular (fecha ao clicar fora) */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* A Sidebar recebe a classe .open quando o estado for true */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>
            <Image
              src="/home/logo.webp"
              width={200}
              height={100}
              alt="Logo da empresa"
              className="logo"
            />
          </span>
          <span>Painel Admin</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={() => setMenuOpen(false)} // Fecha o menu ao clicar num link no celular
                  >
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link
            href="/"
            className="btn-voltar"
            onClick={() => setMenuOpen(false)}
          >
            🏠 Voltar ao Site
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Sair
          </button>
        </div>
      </aside>
    </>
  );
}
