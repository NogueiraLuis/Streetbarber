"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/src/lib/supabase";

export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  subtitle?: string;
  showLogout?: boolean;
  hideOnDesktop?: boolean;
  footerLink?: {
    label: string;
    href: string;
    icon?: string;
  };
}

export default function Sidebar({
  menuItems,
  subtitle = "StreetBarber",
  showLogout = false,
  hideOnDesktop = false,
  footerLink,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Botão Superior que aparece apenas no celular */}
      <div className={`mobile-menu-btn ${hideOnDesktop ? "only-mobile" : ""}`}>
        <button
          className="menu-toggle-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Alternar menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay escuro para fechar ao clicar fora no celular */}
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

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "open" : ""} ${hideOnDesktop ? "hide-on-desktop" : ""}`}>
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
          {subtitle && <h2>{subtitle}</h2>}
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
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon && <span className="icon">{item.icon}</span>}
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {(footerLink || showLogout) && (
          <div className="sidebar-footer">
            {footerLink && (
              <Link
                href={footerLink.href}
                className="btn-voltar"
                onClick={() => setMenuOpen(false)}
              >
                {footerLink.icon && <span>{footerLink.icon}</span>}{" "}
                {footerLink.label}
              </Link>
            )}

            {showLogout && (
              <button onClick={handleLogout} className="btn-logout">
                🚪 Sair
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}