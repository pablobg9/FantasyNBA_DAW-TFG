import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Equipos from './components/Equipos';
import LeagueSelection from './components/LeagueSelection';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { LeagueProvider } from './context/LeagueContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LeagueProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <LeagueSelection />
              </ProtectedRoute>
            } />
            
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            <Route path="/teams" element={
              <ProtectedRoute>
                <Equipos imput="" />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </LeagueProvider>
    </AuthProvider>
  );
}

export default App;
