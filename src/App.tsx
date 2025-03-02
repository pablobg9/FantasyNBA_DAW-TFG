import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Equipos from './components/Equipos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Equipos imput="" />} />
      </Routes>
    </Router>
  );
}

export default App;
