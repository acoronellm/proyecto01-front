import { NavLink } from 'react-router';
interface NavegacionProps {
  totalFavoritos: number;
}
function Navegacion() {
  return (
    <header className="flex flex-col gap-4 bg-marron px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8 font-sans">
      <span className="text-xl font-bold text-crema font-sans">Explorador</span>
      <nav className="grid grid-cols-2 gap-3 text-center font-sans text-crema sm:flex sm:flex-wrap sm:items-center sm:gap-5">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-durazno font-bold text-durazno'
              : 'text-beige hover:text-durazno'
          }
        >
          Inicio
        </NavLink>

        <NavLink to="/explorar" className={({ isActive }) =>
          isActive
            ? 'border-b-2 border-durazno font-bold text-durazno'
            : 'text-beige hover:text-durazno'
        }
        >Explorar</NavLink>
        <NavLink to="/favoritos" className={({ isActive }) =>
          isActive
            ? 'border-b-2 border-durazno font-bold text-durazno'
            : 'text-beige hover:text-durazno'
        }
        >
          Favoritos
        </NavLink>
        <NavLink to="/contacto" className={({ isActive }) =>
          isActive
            ? 'border-b-2 border-durazno font-bold text-durazno'
            : 'text-beige hover:text-durazno'
        }
        >Contacto</NavLink>
      </nav>
    </header>
  );
}

export default Navegacion;
