import { useState } from "react";
import FaleConosco from "./assets/FaleConosco/FaleConosco";
import Home from "./assets/Home/Home";
import Cadastro from "./assets/Cadastro/cadastro";
import PainelAgricultor from "./assets/PainelAgricultor/PainelAgricultor";
import PainelComerciante from "./assets/PainelComerciante/PainelComerciante";
import Familia from "./assets/Familia/Familia";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [notificacoes, setNotificacoes] = useState([]);
  const adicionarReserva = (novaReserva) => {
    setNotificacoes((prev) => [novaReserva, ...prev]);
  };

  return (
    <div className="App">
      {currentPage === "home" && <Home onNavigate={setCurrentPage} />}
      {currentPage === "cadastro" && <Cadastro onNavigate={setCurrentPage} />}
      {currentPage === "fale-conosco" && (
        <FaleConosco onNavigate={setCurrentPage} />
      )}
      {currentPage === "painel-agricultor" && (
        <PainelAgricultor
          onNavigate={setCurrentPage}
          perfilAtivo={{ nome: "Sítio São José", produtor: "José Silva" }}
          notificacoesExternas={notificacoes}
        />
      )}

      {currentPage === "painel-comerciante" && (
        <PainelComerciante
          onNavigate={setCurrentPage}
          onReservar={adicionarReserva}
        />
      )}

      {currentPage === "Familia" && (
        <Familia onNavigate={setCurrentPage} onReservar={adicionarReserva} />
      )}
    </div>
  );
}

export default App;
