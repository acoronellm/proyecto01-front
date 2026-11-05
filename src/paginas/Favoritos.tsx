import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { obtenerPokemon } from '../api';
import type { Pokemon } from '../types/pokemon';
import ModalConfirmacion from '../components/ModalConfirmacion';

interface FavoritosProps {
  favoritos: number[];
  onQuitar: (id: number) => void;
}
function Favoritos({ favoritos, onQuitar }: FavoritosProps) {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);




  useEffect(() => {
    const controller = new AbortController();

    if (favoritos.length === 0) {
      setPokemones([]);
      setCargando(false);
      setError(null);
      return () => controller.abort();
    }

    async function cargarFavoritos() {
      setCargando(true);
      setError(null);

      try {
        const resultados = await Promise.all(
          favoritos.map((id) =>
            obtenerPokemon(id, controller.signal)
          )
        );

        if (!controller.signal.aborted) {
          const validos = resultados.filter(
            (pokemon): pokemon is Pokemon =>
              pokemon !== undefined
          );

          setPokemones(validos);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los favoritos.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarFavoritos();

    return () => controller.abort();
  }, [favoritos]);


  if (cargando && favoritos.length > 0) {
    return <p role="status">Cargando favoritos...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  if (favoritos.length === 0) {
    return (
      <section>
        <h1 className="mb-6 text-3xl font-bold text-rojo">Favoritos</h1>
        <p>
          Aún no tienes favoritos. <Link to="/explorar"className="text-rojo">Explorar Pokémon</Link>.
        </p>
      </section>
    );
  }



  const lista = [...pokemones].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es')
  );

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-durazno">Favoritos</h1>




      <ul className="space-y-3">
        {lista.map((pokemon) => (
          <li
            key={pokemon.id}
            className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm"
          >
            {pokemon.imagen && (
              <img
                src={pokemon.imagen}
                alt={`Imagen de ${pokemon.nombre}`}
                className="h-16 w-16 object-contain"
                loading="lazy"
              />
            )}

            <Link
              to={`/detalles/${pokemon.id}`}
              className="flex-1 font-medium capitalize text-marron"
            >
              {pokemon.nombre}
            </Link>

            <ModalConfirmacion
              titulo="Quitar de favoritos"
              mensaje={`¿Quieres quitar a ${pokemon.nombre} de tus favoritos?`}
              textoBoton="Quitar"
              textoConfirmar="Confirmar"
              onConfirmar={() => onQuitar(pokemon.id)}
              peligro
            />
          </li>
        ))}
      </ul>

    </section>
  );
}

export default Favoritos;
