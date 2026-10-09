'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { label: "Agendamentos", href: "/admin", icon: "📅" },
    { label: "Barbeiros", href: "/admin/barbeiros", icon: "💈" },
    { label: "Serviços", href: "/admin/servicos", icon: "✂️" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>STREET BARBER</h2>
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
        <Link href="/" className="btn-voltar">
          🏠 Voltar ao Site
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}