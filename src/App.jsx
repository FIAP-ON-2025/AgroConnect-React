import { useState } from 'react';
import FaleConosco from './assets/FaleConosco/FaleConosco';
import Home from "./assets/Home/Home";
import Cadastro from "./assets/Cadastro/cadastro";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'cadastro' && <Cadastro onNavigate={setCurrentPage} />}
      {currentPage === 'fale-conosco' && <FaleConosco onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;