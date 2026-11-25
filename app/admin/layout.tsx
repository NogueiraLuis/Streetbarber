import Sidebar from "@/components/Sidebar";

const adminMenu = [
  { label: "Agendamentos", href: "/admin", icon: "📅" },
  { label: "Barbeiros", href: "/admin/barbeiros", icon: "💈" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <Sidebar
        menuItems={adminMenu}
        subtitle="Painel Admin"
        showLogout={true}
        footerLink={{ label: "Voltar ao Site", href: "/", icon: "🏠" }}
      />
      <main className="admin-page-content">{children}</main>
    </div>
  );
}