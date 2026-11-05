import { Link } from 'react-router';

function Inicio() {


  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-8xl font-bold text-rojo">
        Pokedex
      </h1>



      <Link to="/explorar" className="inline-block rounded-lg bg-terracota px-5 py-3 text-white">
        Explorar Pokémon
      </Link>
    </section>
  );
}

export default Inicio;
