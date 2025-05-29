import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function LeagueSelection() {
  const navigate = useNavigate();
  const { currentLeague, joinLeague, getPublicLeagues, createLeague } = useLeague();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [leagueCode, setLeagueCode] = useState('');
  const [error, setError] = useState('');
  const [publicLeagues, setPublicLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [newLeagueSize, setNewLeagueSize] = useState(4);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    loadPublicLeagues();
  }, []);

  const loadPublicLeagues = async () => {
    setLoading(true);
    try {
      const leagues = await getPublicLeagues();
      setPublicLeagues(leagues);
    } catch (error) {
      console.error('Error loading public leagues:', error);
    }
    setLoading(false);
  };

  const handleJoinLeague = async () => {
    setError('');
    if (!leagueCode.trim()) {
      setError('Por favor, introduce el código de la liga');
      return;
    }

    // Verificar si ya estás en esta liga
    if (currentLeague?.code === leagueCode) {
      setShowJoinModal(false);
      setLeagueCode('');
      navigate('/home');
      return;
    }

    setLoading(true);
    try {
      const success = await joinLeague(leagueCode);
      if (success) {
        setShowJoinModal(false);
        setLeagueCode('');
        navigate('/home');
      } else {
        setError('No se pudo unir a la liga. Verifica el código e inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error al unirse a la liga');
    }
    setLoading(false);
  };

  const handleCreateLeague = async () => {
    try {
      // Generar un código único para la liga
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const newLeague = {
        id: Date.now().toString(),
        name: newLeagueName || `Liga ${code}`,
        code,
        size: newLeagueSize,
        participants: 1,
        isPrivate,
        createdAt: new Date().toISOString()
      };

      // Guardar la liga en localStorage
      const leagues = JSON.parse(localStorage.getItem('leagues') || '[]');
      leagues.push(newLeague);
      localStorage.setItem('leagues', JSON.stringify(leagues));

      // Usar la función createLeague del contexto para establecer la liga actual
      createLeague(newLeague);

      // Cerrar el modal y limpiar el formulario
      setShowCreateModal(false);
      setNewLeagueName('');
      setNewLeagueSize(4);
      setIsPrivate(true);

      // Redirigir al home
      navigate('/home');
    } catch (error) {
      console.error('Error al crear la liga:', error);
      setError('Error al crear la liga. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NBA Fantasy
          </h1>
          <p className="text-xl text-gray-600">
            Únete a una liga existente o crea una nueva
          </p>
        </div>

        {/* Botones principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-[#17408B] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-white"
          >
            <h2 className="text-2xl font-bold mb-2">Unirse a una Liga</h2>
            <p>Únete a una liga existente usando un código</p>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#c9082a] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-white"
          >
            <h2 className="text-2xl font-bold mb-2">Crear Nueva Liga</h2>
            <p>Inicia tu propia liga y comparte el código con amigos</p>
          </button>
        </div>

        {/* Modal para crear liga */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Crear Nueva Liga
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Liga
                </label>
                <input
                  type="text"
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Introduce el nombre de la liga"
                  className="w-full p-2 border rounded-lg mb-4"
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Participantes
                </label>
                <select
                  value={newLeagueSize}
                  onChange={(e) => setNewLeagueSize(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg mb-4"
                >
                  {[4, 6, 8, 10, 12, 14, 18, 20].map(size => (
                    <option key={size} value={size}>{size} jugadores</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="h-4 w-4 text-[#c9082a] border-gray-300 rounded focus:ring-[#c9082a]"
                  />
                  <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700">
                    Liga Privada
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {isPrivate 
                    ? "Solo los usuarios con el código podrán unirse a la liga" 
                    : "Cualquier usuario podrá ver y unirse a la liga"}
                </p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewLeagueName('');
                    setNewLeagueSize(4);
                    setIsPrivate(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateLeague}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#c9082a] hover:bg-[#e60932] rounded-md"
                >
                  Crear Liga
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de ligas públicas */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ligas Públicas</h2>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9082a] mx-auto"></div>
            </div>
          ) : publicLeagues.length > 0 ? (
            <div className="space-y-4">
              {publicLeagues.map((league) => (
                <div
                  key={league.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{league.name}</h3>
                    <p className="text-sm text-gray-600">
                      {league.participants}/{league.size} participantes
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setLeagueCode(league.code);
                      handleJoinLeague();
                    }}
                    className="px-4 py-2 bg-[#17408B] text-white rounded-lg hover:bg-[#1e4fa3] transition-colors"
                    disabled={league.participants >= league.size}
                  >
                    {league.participants >= league.size ? 'Llena' : 'Unirse'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-4">
              No hay ligas públicas disponibles en este momento
            </p>
          )}
        </div>

        {/* Modal para unirse a liga */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Unirse a una Liga
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de la Liga
                </label>
                <input
                  type="text"
                  value={leagueCode}
                  onChange={(e) => setLeagueCode(e.target.value.toUpperCase())}
                  placeholder="Introduce el código"
                  className="w-full p-2 border rounded-lg"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    setError('');
                    setLeagueCode('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleJoinLeague}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#17408B] hover:bg-[#1e4fa3] rounded-md disabled:opacity-50"
                >
                  {loading ? 'Uniéndose...' : 'Unirse'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 