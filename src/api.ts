
import type { Pokemon, PokemonAPI } from './types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

interface ListaPokemonAPI {
  results: {
    name: string;
    url: string;
  }[];
}

interface TipoAPI {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonResumen {
  id: number;
  nombre: string;
}

interface ListaPokemonAPI {
  results: {
    name: string;
    url: string;
  }[];
}

interface DetalleTipoAPI {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}


async function consultarAPI<T>(
  endpoint: string,
  signal?: AbortSignal
): Promise<T> {
  const respuesta = await fetch(`${API_URL}/${endpoint}`, {
    signal,
  });

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los Pokémon');
  }

  return (await respuesta.json()) as T;
}

// Convertir respuesta de PokéAPI a nuestro formato
function normalizarPokemon(pokemon: PokemonAPI): Pokemon {
  return {
    id: pokemon.id,
    nombre: pokemon.name,
    imagen:
      pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default,
    tipos: pokemon.types.map(
      (item) => item.type.name
    ),
    habilidades: pokemon.abilities.map(
      (item) => item.ability.name
    ),
    altura: pokemon.height / 10,
    peso: pokemon.weight / 10,
    estadisticas: pokemon.stats.map((item) => ({
      nombre: item.stat.name,
      valor: item.base_stat,
    })),
  };
}

// Obtener Pokémon para el catálogo
export async function obtenerPokemones(
  signal?: AbortSignal
): Promise<Pokemon[]> {
  const datos = await consultarAPI<ListaPokemonAPI>(
    'pokemon?limit=20&offset=0',
    signal
  );

  const pokemones = await Promise.all(
    datos.results.map(async (item) => {
      const pokemon = await consultarAPI<PokemonAPI>(
        `pokemon/${item.name}`,
        signal
      );

      return normalizarPokemon(pokemon);
    })
  );

  return pokemones;
}

// Obtener Pokémon individual
export async function obtenerPokemon(
  id: number | string,
  signal?: AbortSignal
): Promise<Pokemon | undefined> {
  try {
    const datos = await consultarAPI<PokemonAPI>(
      `pokemon/${encodeURIComponent(id)}`,
      signal
    );

    return normalizarPokemon(datos);
  } catch (error) {
    if (signal?.aborted) throw error;

    if (error instanceof Error &&
      error.message === 'No se pudieron cargar los Pokémon') {
      throw error;
    }

    throw error;
  }
}

// Obtener tipos
export async function obtenerTipos(
  signal?: AbortSignal
): Promise<string[]> {
  const datos = await consultarAPI<TipoAPI>(
    'type',
    signal
  );

  return datos.results.map((tipo) => tipo.name);
}

export async function obtenerListadoPokemon(
  signal?: AbortSignal
): Promise<PokemonResumen[]> {
  const datos = await consultarAPI<ListaPokemonAPI>(
    'pokemon?limit=100000&offset=0',
    signal
  );

  return datos.results.map((item) => {
    const partes = item.url.split('/').filter(Boolean);

    return {
      id: Number(partes[partes.length - 1]),
      nombre: item.name
    };
  });
}

export async function obtenerPokemonPorTipo(
  tipo: string,
  signal?: AbortSignal
): Promise<string[]> {
  const datos = await consultarAPI<DetalleTipoAPI>(
    `type/${encodeURIComponent(tipo)}`,
    signal
  );

  return datos.pokemon.map(
    (item) => item.pokemon.name
  );
}

export async function obtenerDetallesPokemon(
  nombres: string[],
  signal?: AbortSignal
): Promise<Pokemon[]> {
  return Promise.all(
    nombres.map(async (nombre) => {
      const datos = await consultarAPI<PokemonAPI>(
        `pokemon/${encodeURIComponent(nombre)}`,
        signal
      );

      return normalizarPokemon(datos);
    })
  );
}
