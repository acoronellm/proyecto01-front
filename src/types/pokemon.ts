
export interface Pokemon {
  id: number;
  nombre: string;
  imagen: string | null;
  tipos: string[];
  habilidades: string[];
  altura: number;
  peso: number;
  estadisticas: {
    nombre: string;
    valor: number;
  }[];
}

export interface PokemonAPI {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
