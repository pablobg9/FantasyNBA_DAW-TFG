import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface League {
  id: string;
  name: string;
  code: string;
  size: number;
  participants: number;
  isPrivate: boolean;
  createdAt: string;
}

interface LeagueContextType {
  currentLeague: League | null;
  joinLeague: (code: string) => Promise<boolean>;
  getPublicLeagues: () => Promise<League[]>;
  leaveLeague: () => void;
  createLeague: (leagueData: League) => void;
}

export const LeagueContext = createContext<LeagueContextType>({
  currentLeague: null,
  joinLeague: async () => false,
  getPublicLeagues: async () => [],
  leaveLeague: () => {},
  createLeague: () => {}
});

export function LeagueProvider({ children }: { children: ReactNode }) {
  const [currentLeague, setCurrentLeague] = useState<League | null>(() => {
    const savedLeague = localStorage.getItem('currentLeague');
    return savedLeague ? JSON.parse(savedLeague) : null;
  });

  const leaveLeague = () => {
    setCurrentLeague(null);
    localStorage.removeItem('currentLeague');
  };

  const createLeague = (leagueData: League) => {
    setCurrentLeague(leagueData);
    localStorage.setItem('currentLeague', JSON.stringify(leagueData));
  };

  const joinLeague = async (code: string): Promise<boolean> => {
    const leagues = JSON.parse(localStorage.getItem('leagues') || '[]');
    const league = leagues.find((l: League) => l.code === code);
    
    if (league) {
      // Verificar si el usuario ya está en la liga
      if (currentLeague?.code === code) {
        setCurrentLeague(league); // Actualizar la liga actual sin sumar participante
        return true;
      }

      if (league.participants < league.size) {
        // Actualizar la liga en el array de ligas
        const updatedLeagues = leagues.map((l: League) => 
          l.code === code ? { ...l, participants: l.participants + 1 } : l
        );
        localStorage.setItem('leagues', JSON.stringify(updatedLeagues));
        
        // Actualizar la liga actual
        const updatedLeague = { ...league, participants: league.participants + 1 };
        setCurrentLeague(updatedLeague);
        localStorage.setItem('currentLeague', JSON.stringify(updatedLeague));
        return true;
      }
    }
    return false;
  };

  // Función para obtener ligas públicas
  const getPublicLeagues = async (): Promise<League[]> => {
    try {
      // Aquí normalmente harías una llamada a tu API
      // Por ahora simulamos la obtención desde localStorage
      const leagues = JSON.parse(localStorage.getItem('leagues') || '[]');
      return leagues.filter((league: League) => !league.isPrivate);
    } catch (error) {
      console.error('Error al obtener ligas públicas:', error);
      return [];
    }
  };

  return (
    <LeagueContext.Provider value={{ 
      currentLeague, 
      setCurrentLeague,
      joinLeague,
      getPublicLeagues,
      leaveLeague,
      createLeague
    }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error('useLeague must be used within a LeagueProvider');
  }
  return context;
} 