import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLeague } from '../context/LeagueContext';

export default function Home() {
  const navigate = useNavigate();
  const { currentLeague, leaveLeague } = useLeague();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [newSize, setNewSize] = useState(currentLeague?.size || 4);

  useEffect(() => {
    if (!currentLeague) {
      navigate('/');
    }
  }, [currentLeague, navigate]);

  const leagueSizes = [4, 6, 8, 10, 12, 14, 18, 20];

  const handleLeaveLeague = () => {
    leaveLeague();
    setShowLeaveModal(false);
    navigate('/');
  };

  const handleUpdateSize = () => {
    const updatedLeague = {
      ...currentLeague,
      size: newSize
    };
    localStorage.setItem('currentLeague', JSON.stringify(updatedLeague));
    setShowSizeModal(false);
    window.location.reload(); // Recargar para actualizar los datos
  };

  const menuItems = [
    {
      id: 1,
      title: "Equipos",
      description: "Explora todos los equipos de la NBA, sus plantillas y cuerpo técnico",
      image: "/src/assets/home/eeuu_teams.png",
      enabled: true,
      path: "/teams"
    },
    {
      id: 2,
      title: "Mercado",
      description: "Demuestra tu conocimiento sobre la NBA",
      image: "/src/assets/home/mercado.png",
      enabled: false,
      path: "/live"
    },
    {
      id: 3,
      title: "MI Equipo",
      description: "Haz que merezca la pena ser tu fan",
      image:"/src/assets/home/equipo.png",
      enabled: false,
      path: "/stats"
    },
    {
      id: 4,
      title: "Clasificación",
      description: "No te pierdas como avanza tu equipo en la clasificación",
      image: "/src/assets/home/clasificacion.png",
      enabled: false,
      path: "/news"
    }
  ];

  if (!currentLeague) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/src/assets/home/portada.png"
            alt="NBA Fantasy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 
                         tracking-tight leading-none">
              NBA Fantasy
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl animate-slideUp">
              Experimenta la emoción del baloncesto profesional con actualizaciones en tiempo real, 
              estadísticas e información completa sobre los equipos.
            </p>
          </div>
        </div>
      </div>

      {/* Current League Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9082a] to-[#17408B] opacity-10"></div>
            
            <div className="relative p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* League Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentLeague.name}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Código: {currentLeague.code}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {currentLeague.isPrivate ? 'Liga Privada' : 'Liga Pública'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* League Stats */}
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#c9082a]">
                      {currentLeague.participants}/{currentLeague.size}
                    </div>
                    <div className="text-sm text-gray-600">Participantes</div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>

                    {/* Settings Dropdown */}
                    {showSettings && (
                      <div className="fixed transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[100] border border-gray-100">
                        <button
                          onClick={() => {
                            setShowSizeModal(true);
                            setShowSettings(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Modificar participantes
                        </button>
                        <button
                          onClick={() => {
                            setShowLeaveModal(true);
                            setShowSettings(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Abandonar liga
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 
                       transition-all duration-300 ${hoveredCard === item.id ? 'transform scale-[1.02]' : ''} 
                       ${!item.enabled && 'opacity-75'}`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <button
                    onClick={() => item.enabled && navigate(item.path)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 
                             ${item.enabled 
                               ? 'bg-[#c9082a] text-white hover:bg-[#e60932]' 
                               : 'bg-gray-500 text-gray-200 cursor-not-allowed'
                             }`}
                    disabled={!item.enabled}
                  >
                    {item.enabled ? 'Explorar Ahora' : 'Próximamente'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Update Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Modificar número de participantes
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nuevo número de participantes
              </label>
              <select
                value={newSize}
                onChange={(e) => setNewSize(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                {leagueSizes.map(size => (
                  <option key={size} value={size}>{size} jugadores</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateSize}
                className="px-4 py-2 text-sm font-medium text-white bg-[#c9082a] hover:bg-[#e60932] rounded-md"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave League Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <svg className="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¿Abandonar la liga?
              </h3>
              <p className="text-sm text-gray-500">
                Esta acción no se puede deshacer. Perderás acceso a la liga y a todos sus datos.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleLeaveLeague}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Abandonar liga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 NBA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 