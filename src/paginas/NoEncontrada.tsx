import { Link } from 'react-router';

function NoEncontrada() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <h1 className="mb-6 text-8xl font-bold text-rojo">404</h1>
      <p>No encontramos esa página.</p>
      <Link to="/" className="text-rojo">Volver al inicio</Link>
    </section>
  );
}

export default NoEncontrada;
