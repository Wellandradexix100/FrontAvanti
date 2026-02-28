import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout({ children }) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        isOpen={sidebarAberta}
        fecharSidebar={() => setSidebarAberta(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        <Header abrirSidebar={() => setSidebarAberta(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
