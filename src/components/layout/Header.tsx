import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Fantasy NBA
          </Link>
          <div className="space-x-4">
            <Link to="/leagues" className="hover:text-blue-200">
              Ligas
            </Link>
            <Link to="/players" className="hover:text-blue-200">
              Jugadores
            </Link>
            <Link to="/profile" className="hover:text-blue-200">
              Mi Perfil
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 