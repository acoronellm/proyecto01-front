
import { Link } from 'react-router';
import type { Pokemon } from '../types/pokemon';

interface TarjetaPokemonProps {
  pokemon: Pokemon;
}

function TarjetaPokemon({ pokemon }: TarjetaPokemonProps) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">

      <span className="text-sm text-gray-500">
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      {pokemon.imagen && (
        <img
          src={pokemon.imagen}
          alt={`Imagen de ${pokemon.nombre}`}
          className="mx-auto h-40 w-full object-contain"
          loading="lazy"
        />
      )}

      <h3 className="mt-3 text-xl font-bold capitalize">
        <Link
          to={`/detalles/${pokemon.id}`}
          className="text-marron hover:text-terracota"
        >
          {pokemon.nombre}
        </Link>
      </h3>

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
