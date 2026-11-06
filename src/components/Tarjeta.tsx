
import { Link } from 'react-router';
import type { Pokemon } from '../types/pokemon';

interface TarjetaPokemonProps {
  pokemon: Pokemon;
  esFavorito: boolean;
  onToggleFavorito: (id: number) => void;
}

function TarjetaPokemon({
  pokemon,
  esFavorito,
  onToggleFavorito
}: TarjetaPokemonProps) {
  return (
    <article className="relative rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">

      {/* Enlace que permite abrir el detalle desde toda la tarjeta */}
      <Link
        to={`/detalles/${pokemon.id}`}
        aria-label={`Ver detalles de ${pokemon.nombre}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pokemon-azul"
      />

      <span className="text-sm text-gray-500">
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      {/* Botón independiente para agregar o quitar favoritos */}
      <button
        type="button"
        onClick={() => onToggleFavorito(pokemon.id)}
        aria-label={
          esFavorito
            ? `Quitar a ${pokemon.nombre} de favoritos`
            : `Agregar a ${pokemon.nombre} a favoritos`
        }
        aria-pressed={esFavorito}
        title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className={`absolute right-3 top-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border text-2xl shadow-sm transition hover:scale-110 ${
          esFavorito
            ? 'border-yellow-400 bg-pokemon-amarillo text-marron'
            : 'border-beige bg-white text-gray-500 hover:text-yellow-600'
        }`}
      >
        <span aria-hidden="true">
          {esFavorito ? '★' : '☆'}
        </span>
      </button>

      {pokemon.imagen && (
        <img
          src={pokemon.imagen}
          alt={`Imagen de ${pokemon.nombre}`}
          className="mx-auto h-40 w-full object-contain"
          loading="lazy"
        />
      )}

      <h2 className="mt-3 text-xl font-bold capitalize text-marron">
        {pokemon.nombre}
      </h2>

      <div className="mt-2 flex flex-wrap gap-2">
        {pokemon.tipos.map((tipo) => (
          <span
            key={tipo}
            className="rounded-full bg-beige px-3 py-1 text-xs font-medium capitalize text-marron"
          >
            {tipo}
          </span>
        ))}
      </div>

    </article>
  );
}

export default TarjetaPokemon;
