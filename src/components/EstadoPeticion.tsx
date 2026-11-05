
interface EstadoPeticionProps {
  tipo: 'loading' | 'error' | 'empty';
  mensaje: string;
}

function EstadoPeticion({ tipo, mensaje }: EstadoPeticionProps) {
  const configuracion = {
    loading: {
      simbolo: '◓',
      titulo: 'Cargando Pokémon...',
      color: 'text-pokemon-azul'
    },
    error: {
      simbolo: '!',
      titulo: '¡Algo salió mal!',
      color: 'text-red-700'
    },
    empty: {
      simbolo: '?',
      titulo: 'Sin resultados',
      color: 'text-marron'
    }
  };

  const estado = configuracion[tipo];

  return (
    <div
      role={tipo === 'error' ? 'alert' : 'status'}
      className="mx-auto my-8 flex max-w-lg flex-col items-center gap-3 rounded-xl border border-beige bg-white p-8 text-center shadow-sm"
    >
      <span
        aria-hidden="true"
        className={`text-5xl font-bold ${estado.color}`}
      >
        {estado.simbolo}
      </span>

      <h2 className="text-xl font-bold text-marron">
        {estado.titulo}
      </h2>

      <p className="text-gray-700">{mensaje}</p>
    </div>
  );
}

export default EstadoPeticion;
