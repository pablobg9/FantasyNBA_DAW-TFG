import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinLeague } from '../services/leagueService';

const LeagueSelection: React.FC = () => {
  const navigate = useNavigate();
  const [leagueCode, setLeagueCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLeague, setCurrentLeague] = useState(null);

  const handleJoinLeague = async () => {
    setError('');
    if (!leagueCode.trim()) {
      setError('Por favor, introduce el código de la liga');
      return;
    }

    // Verificar si ya estás en esta liga
    if (currentLeague?.code === leagueCode) {
      navigate('/home');
      return;
    }

    setLoading(true);
    try {
      const success = await joinLeague(leagueCode);
      if (success) {
        navigate('/home');
      } else {
        setError('No se pudo unir a la liga. Verifica el código e inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Error al unirse a la liga');
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default LeagueSelection; 