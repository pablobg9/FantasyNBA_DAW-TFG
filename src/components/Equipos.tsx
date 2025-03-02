import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';

interface Team {
  id: number;
  name: string;
  logo: string;
  coach: string;
  starters: string[];
  bench: string[];
}

interface NBAData {
  year: number;
  teams: Team[];
}

interface EquiposProps {
  imput: string;
}

export default function Equipos({ imput }: EquiposProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchInput, setSearchInput] = useState<string>(imput);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchInput) {
      import('../mocks/with-results.json').then((mockData: NBAData) => {
        setTeams(mockData.teams);
      }).catch((error) => {
        console.error("Error al cargar los equipos de la NBA:", error);
        setTeams([]);
      });
      return;
    }

    const debounceTimeout = setTimeout(() => {
      import('../mocks/with-results.json').then((mockData: NBAData) => {
        const filteredTeams = mockData.teams.filter((team) =>
          team.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setTeams(filteredTeams);
      }).catch((error) => {
        console.error("Error al cargar los equipos de la NBA:", error);
        setTeams([]);
      });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-4 py-6 sm:py-8">
      <Header imput={searchInput} setImput={setSearchInput} />
      
      <div className="max-w-7xl mx-auto mb-6 mt-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 
                     inline-flex items-center 
                     bg-[#1d428a] p-3 rounded-lg
                     shadow-md hover:shadow-lg
                     text-white hover:bg-[#c9082a]
                     transition-all duration-300 group"
          aria-label="Volver a la página principal"
        >
          <span className="group-hover:-translate-x-1 transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </span>
        </button>

        {teams.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 
                        animate-fadeIn">
            {teams.map((team, index) => (
              <li
                key={team.id}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg 
                         hover:transform hover:scale-[1.02] transition-all duration-300 
                         border border-gray-100 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6
                               hover:transform hover:translate-x-1 transition-transform duration-300">
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="h-20 w-20 sm:h-24 sm:w-24 object-contain transform hover:scale-110 
                               transition-transform duration-300"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-1 
                                 hover:text-[#c9082a] transition-colors duration-300">
                        {team.name}
                      </h3>
                      <p className="text-gray-600">
                        Entrenador: <span className="text-[#1a1a1a]">{team.coach}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="transform hover:translate-x-1 transition-transform duration-300">
                      <h4 className="text-base sm:text-lg font-semibold text-[#1a1a1a] mb-3 
                                 flex items-center justify-center sm:justify-start">
                        <span className="bg-[#c9082a]/10 text-[#c9082a] px-3 py-1 rounded-full text-sm">
                          Quinteto Inicial
                        </span>
                      </h4>
                      <ul className="space-y-2">
                        {team.starters.map((player, index) => {
                          const [position, name] = player.split(" | ");
                          return (
                            <li 
                              key={`starter-${index}`} 
                              className="flex justify-between items-center py-1 border-b border-gray-200 
                                       last:border-0 text-sm sm:text-base hover:bg-gray-50 
                                       transition-colors duration-200 px-2 rounded"
                            >
                              <span className="text-[#c9082a] font-medium">{position}</span>
                              <span className="text-[#1a1a1a]">{name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    <div className="transform hover:translate-x-1 transition-transform duration-300">
                      <h4 className="text-base sm:text-lg font-semibold text-[#1a1a1a] mb-3 
                                 flex items-center justify-center sm:justify-start">
                        <span className="bg-[#1d428a]/10 text-[#1d428a] px-3 py-1 rounded-full text-sm">
                          Banco
                        </span>
                      </h4>
                      <ul className="space-y-2">
                        {team.bench.map((player, index) => {
                          const [position, name] = player.split(" | ");
                          return (
                            <li 
                              key={`bench-${index}`} 
                              className="flex justify-between items-center py-1 border-b border-gray-200 
                                       last:border-0 text-sm sm:text-base hover:bg-gray-50 
                                       transition-colors duration-200 px-2 rounded"
                            >
                              <span className="text-[#1d428a] font-medium">{position}</span>
                              <span className="text-[#1a1a1a]">{name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 animate-fadeIn">
            <p className="text-lg sm:text-xl text-gray-600 text-center">
              No se encontraron equipos que coincidan con ese nombre.
            </p>
            <p className="text-gray-500 mt-2 text-center">
              Intenta buscar otro equipo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
