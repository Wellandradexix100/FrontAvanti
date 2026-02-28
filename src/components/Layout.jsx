import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
