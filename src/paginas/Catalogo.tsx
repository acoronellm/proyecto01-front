
import { useEffect, useMemo, useState } from 'react'; import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';
import { obtenerListadoPokemon, obtenerPokemonPorTipo, obtenerDetallesPokemon, obtenerTipos } from '../api';
import type { PokemonResumen } from '../api';
import TarjetaPokemon from '../components/Tarjeta';
import type { Pokemon } from '../types/pokemon';
import { toast } from 'sonner';
import EstadoPeticion from '../components/EstadoPeticion';
interface CatalogoProps {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
}

function Catalogo({
  favoritos,
  toggleFavorito
}: CatalogoProps) {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [listado, setListado] = useState<PokemonResumen[]>([]);
  const [nombresTipo, setNombresTipo] = useState<string[]>([]);
  const [tipoCargado, setTipoCargado] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const [cargandoDetalles, setCargandoDetalles] = useState(true);
  const [cargandoTipo, setCargandoTipo] = useState(false);

  const POR_PAGINA = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const tipo = searchParams.get('tipo') ?? 'todos';

  // Obtener los tipos disponibles
  useEffect(() => {
    const controller = new AbortController();

    obtenerTipos(controller.signal)
      .then((datos) => {
        if (!controller.signal.aborted) {
          setTipos(datos);
        }
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          console.error('Error cargando tipos:', err);
        }
      });

    return () => controller.abort();
  }, []);

  // Obtener los Pokémon

  useEffect(() => {
    const controller = new AbortController();

    async function cargarListado() {
      setCargando(true);
      setError(null);

      try {
        const datos = await obtenerListadoPokemon(
          controller.signal
        );

        if (!controller.signal.aborted) {
          setListado(datos);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          const mensaje = err instanceof Error
            ? err.message
            : 'No se pudieron cargar los Pokémon.';

          setError(mensaje);
          toast.error(mensaje);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarListado();

    return () => controller.abort();
  }, []);


  useEffect(() => {
    const controller = new AbortController();

    if (tipo === 'todos') {
      setNombresTipo([]);
      setTipoCargado('todos');
      setCargandoTipo(false);
      return () => controller.abort();
    }

    async function cargarTipo() {
      setCargandoTipo(true);
      setTipoCargado(null);
      setError(null);

      try {
        const nombres = await obtenerPokemonPorTipo(
          tipo,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setNombresTipo(nombres);
          setTipoCargado(tipo);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError('No se pudo filtrar por tipo.');
          toast.error('No se pudo filtrar por tipo.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargandoTipo(false);
        }
      }
    }

    cargarTipo();

    return () => controller.abort();
  }, [tipo]);

  // Filtrar Pokémon por nombre y tipo
  const filtrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    const nombres = new Set(nombresTipo);

    return listado.filter((pokemon) => {
      const coincideBusqueda =
        pokemon.nombre.includes(texto) ||
        String(pokemon.id).includes(texto);

      const coincideTipo =
        tipo === 'todos' ||
        nombres.has(pokemon.nombre);

      return coincideBusqueda && coincideTipo;
    });
  }, [listado, nombresTipo, busqueda, tipo]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(filtrados.length / POR_PAGINA)
  );

  const paginaActual = Math.min(pagina, totalPaginas);

  const paginaPokemon = useMemo(() => {
    const inicio = (paginaActual - 1) * POR_PAGINA;

    return filtrados.slice(inicio, inicio + POR_PAGINA);
  }, [filtrados, paginaActual]);

  // Obtener detalles de los Pokémon de la página actual
  useEffect(() => {
    const controller = new AbortController();

    if (cargando || cargandoTipo || tipoCargado !== tipo || error) {
      return () => controller.abort();
    }

    async function cargarDetalles() {
      setCargandoDetalles(true);
      setPokemones([]);

      try {
        const datos = await obtenerDetallesPokemon(
          paginaPokemon.map((pokemon) => pokemon.nombre),
          controller.signal
        );

        if (!controller.signal.aborted) {
          setPokemones(datos);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          const mensaje = err instanceof Error
            ? err.message
            : 'No se pudieron cargar los detalles.';

          setError(mensaje);
          toast.error(mensaje);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargandoDetalles(false);
        }
      }
    }

    cargarDetalles();

    return () => controller.abort();
  }, [
    paginaPokemon,
    cargando,
    cargandoTipo,
    tipoCargado,
    tipo,
    error
  ]);

  // Cambiar el tipo seleccionado
  function cambiarTipo(e: ChangeEvent<HTMLSelectElement>) {
    const valor = e.target.value;
    setPagina(1);
    if (valor === 'todos') {
      setSearchParams({});
    } else {
      setSearchParams({ tipo: valor });
    }
  }


  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-rojo">
        Explorar Pokémon
      </h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="buscar-pokemon"
            className="mb-2 block font-medium"
          >
            Buscar Pokémon
          </label>

          <input
            id="buscar-pokemon"
            type="search"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
            placeholder="Ejemplo: pikachu"
            className="w-full rounded-lg border border-beige bg-white p-3"
          />
        </div>

        <div>
          <label
            htmlFor="tipo-pokemon"
            className="mb-2 block font-medium"
          >
            Tipo
          </label>

          <select
            id="tipo-pokemon"
            value={tipo}
            onChange={cambiarTipo}
            className="w-full rounded-lg border border-beige bg-white p-3 capitalize"
          >
            <option value="todos">Todos</option>

            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(cargando || cargandoTipo || cargandoDetalles || tipoCargado !== tipo) && !error && (
        <EstadoPeticion
          tipo="loading"
          mensaje="Estamos consultando los datos de la Pokédex."
        />)}

      {error && (
        <EstadoPeticion
          tipo="error"
          mensaje={error}
        />
      )}

      {!cargando && !cargandoTipo && !cargandoDetalles && tipoCargado === tipo && !error && (
        <>
          <p className="mb-4 text-gray-600">
            {filtrados.length} Pokémon encontrados
          </p>

          {pokemones.length === 0 ? (
            <EstadoPeticion
              tipo="empty"
              mensaje="No encontramos Pokémon con esos criterios. Prueba otro nombre o tipo."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pokemones.map((pokemon) => (
                <TarjetaPokemon
                  key={pokemon.id}
                  pokemon={pokemon}
                  esFavorito={favoritos.includes(pokemon.id)}
                  onToggleFavorito={toggleFavorito}
                />
              ))}
            </div>
          )}

          {totalPaginas > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">              <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => setPagina(paginaActual - 1)}
              className="rounded-lg bg-terracota px-4 py-2 text-white disabled:opacity-40"
            >
              Anterior
            </button>

              <span className="text-center text-sm sm:text-base">
                Página {paginaActual} de {totalPaginas}
              </span>

              <button
                type="button"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPagina(paginaActual + 1)}
                className="rounded-lg bg-terracota px-4 py-2 text-white disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          )}

        </>
      )}
    </section>
  );
}

export default Catalogo;
