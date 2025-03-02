import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      title: "Partidos en Vivo",
      description: "Mira partidos de la NBA en vivo y estadísticas en tiempo real",
      image: "/src/assets/home/canasta.png",
      enabled: false,
      path: "/live"
    },
    {
      id: 3,
      title: "Estadísticas",
      description: "Accede a estadísticas y análisis completos de la NBA",
      image:"/src/assets/home/stats.png",
      enabled: false,
      path: "/stats"
    },
    {
      id: 4,
      title: "Noticias y Actualizaciones",
      description: "Últimas noticias, traspasos y actualizaciones de la NBA",
      image: "/src/assets/home/noticias.png",
      enabled: false,
      path: "/news"
    }
  ];

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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 NBA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 