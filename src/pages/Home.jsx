import { useState, useEffect } from "react";
import { CardOferta } from "../components/CardOferta";
import { api } from "../services/api";
import { Header } from "../components/Header";
export default function Home() {
  const [ofertas, setOfertas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarOfertas() {
      try {
        const resposta = await api.get("/ofertas");
        setOfertas(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar ofertas", erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarOfertas();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <Header />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Troque Conhecimento
          </h1>
          <p className="text-lg text-slate-600">
            Encontre a habilidade que deseja aprender ou partilhe o que sabe.
          </p>

          <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-slate-200 inline-block w-full max-w-2xl">
            <p className="text-slate-400">Barra de filtros em construção...</p>
          </div>
        </div>

        {carregando ? (
          <p className="text-center text-slate-500">
            carregando conhecimentos...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ofertas.map((oferta) => (
              <CardOferta key={oferta.id} oferta={oferta} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
