import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { obtenerPokemon } from '../api';
import type { Pokemon } from '../types/pokemon';
import ModalConfirmacion from '../components/ModalConfirmacion';
import EstadoPeticion from '../components/EstadoPeticion';
interface DetalleProps {
  favoritos: number[];
  onToggleFavorito: (id: number) => void;
}
function Detalle({ favoritos, onToggleFavorito }: DetalleProps) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setCargando(true);
    setError(null);
    setPokemon(null);

    if (id === undefined) {
      setError('No se proporcionó un ID de Pokémon.');
      setCargando(false);
      return () => controller.abort();
    }

    obtenerPokemon(id, controller.signal)
      .then((encontrado) => {
        if (controller.signal.aborted) return;

        setPokemon(encontrado ?? null);
        setCargando(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo cargar el Pokémon.'
        );

        setCargando(false);
      });

    return () => controller.abort();
  }, [id]);



if (cargando) {
  return (
    <EstadoPeticion
      tipo="loading"
      mensaje="Estamos consultando la información del Pokémon."
    />
  );
}

if (error) {
  return (
    <EstadoPeticion
      tipo="error"
      mensaje={error}
    />
  );
}

if (!pokemon) {
  return (
    <EstadoPeticion
      tipo="empty"
      mensaje="No encontramos este Pokémon. Verifica el número o intenta con otro."
    />
  );
}


  const esFavorito = favoritos.includes(pokemon.id);

  return (
    <article className="mx-auto max-w-3xl space-y-6">

      <header>
        <p className="text-sm text-gray-500">
          #{String(pokemon.id).padStart(3, '0')}
        </p>

        <h1 className="text-4xl font-bold capitalize text-marron">
          {pokemon.nombre}
        </h1>
      </header>

      {pokemon.imagen && (
        <img
          src={pokemon.imagen}
          alt={`Imagen de ${pokemon.nombre}`}
          className="mx-auto h-64 w-full object-contain sm:h-80"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {pokemon.tipos.map((tipo) => (
          <span
            key={tipo}
            className="rounded-full bg-beige px-4 py-2 text-sm font-medium capitalize text-marron"
          >
            {tipo}
          </span>
        ))}
      </div>


      {esFavorito ? (
        <ModalConfirmacion
          titulo="Quitar de favoritos"
          mensaje={`¿Quieres quitar a ${pokemon.nombre} de tus favoritos?`}
          textoBoton="Quitar de favoritos"
          textoConfirmar="Confirmar"
          onConfirmar={() => onToggleFavorito(pokemon.id)}
          peligro
        />
      ) : (
        <button
          type="button"
          onClick={() => onToggleFavorito(pokemon.id)}
          className="rounded-lg bg-terracota px-5 py-3 text-white hover:opacity-90"
        >
          Agregar a favoritos
        </button>
      )}


      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
          <h2 className="font-semibold">Altura</h2>
          <p>{pokemon.altura} m</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow-sm">
          <h2 className="font-semibold">Peso</h2>
          <p>{pokemon.peso} kg</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold">
          Habilidades
        </h2>

        <ul className="flex flex-wrap gap-2">
          {pokemon.habilidades.map((habilidad) => (
            <li
              key={habilidad}
              className="rounded-lg bg-white px-4 py-2 capitalize shadow-sm"
            >
              {habilidad.replaceAll('-', ' ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">
          Estadísticas
        </h2>

        <ul className="space-y-2">
          {pokemon.estadisticas.map((estadistica) => (
            <li
              key={estadistica.nombre}
              className="flex justify-between border-b border-beige py-2"
            >
              <span className="capitalize">
                {estadistica.nombre.replaceAll('-', ' ')}
              </span>

              <span>{estadistica.valor}</span>
            </li>
          ))}
        </ul>
      </section>

    </article>
  );

}

export default Detalle;
