import { Link } from 'react-router';

function Inicio() {


  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-5xl font-bold text-rojo sm:text-7xl lg:text-8xl">
        Pokedex
      </h1>



      <Link to="/explorar" className="inline-block rounded-lg bg-terracota px-5 py-3 text-white">
        Explorar Pokémon
      </Link>
    </section>
  );
}

export default Inicio;
