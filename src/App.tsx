import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Navegacion from './components/Navegacion';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import Detalle from './paginas/Detalle';
import Favoritos from './paginas/Favoritos';
import NoEncontrada from './paginas/NoEncontrada';
import Contacto from './paginas/Contacto';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
function leerFavoritos(): number[] {
  try {
    const guardados = localStorage.getItem('favoritos');

    if (!guardados) return [];

    const datos: unknown = JSON.parse(guardados);

    if (!Array.isArray(datos)) return [];

    return datos.filter(
      (id): id is number =>
        typeof id === 'number' && Number.isFinite(id)
    );
  } catch {
    return [];
  }
}

function App() {
  const [favoritos, setFavoritos] = useState<number[]>(leerFavoritos);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorito(id: number): void {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
      toast.info('Pokémon eliminado de favoritos.');
    } else {
      setFavoritos([...favoritos, id]);
      toast.success('Pokémon agregado a favoritos.');
    }
  }


  return (
    <div className="min-h-screen bg-crema text-marron font-sans">
      
      <Navegacion />
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/explorar" element={<Catalogo />} />
          <Route
            path="/detalles/:id"
            element={
              <Detalle favoritos={favoritos} onToggleFavorito={toggleFavorito} />
            }
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} onQuitar={toggleFavorito} />}
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        duration={3000}
        richColors
        closeButton
      />
    </div>
  );
}

export default App;
