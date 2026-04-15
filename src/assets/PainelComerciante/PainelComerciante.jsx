import React, { useState } from 'react';
import './PainelComerciante.css';

const Comerciante = ({ onNavigate }) => {
  const [agricultores] = useState([
    {
      id: 1,
      nome: "Sítio São José",
      produtor: "José Silva",
      local: "Ribeirão Preto - SP",
      produtos: [
        { id: 101, nome: "Alface Crespa", preco: "R$ 3,50/un" },
        { id: 102, nome: "Tomate Italiano", preco: "R$ 8,90/kg" }
      ]
    },
    {
      id: 2,
      nome: "Fazenda Boa Vista",
      produtor: "Maria Oliveira",
      local: "Brotas - SP",
      produtos: [
        { id: 201, nome: "Banana Prata", preco: "R$ 5,00/kg" },
        { id: 202, nome: "Mandioca", preco: "R$ 4,00/kg" }
      ]
    },
    {
      id: 3,
      nome: "Sítio Campo Grande",
      produtor: "Antonio Pereira",
      local: "Valinhos - SP",
      produtos: [
        { id: 201, nome: "Tomate", preco: "R$ 4,50/kg" },
        { id: 202, nome: "Pepino", preco: "R$ 6,00/kg" }
      ]
    }
  ]);

  const [reservas, setReservas] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleReservar = (agri, prod) => {
    setReservas([{ id: nextId, agri: agri.nome, prod: prod.nome }, ...reservas]);
    setNextId(nextId + 1);
    alert(`Reserva de ${prod.nome} enviada para ${agri.nome}!`);
  };

  return (
    <div className="page-funcionalidades">
      <nav>
        <div className="logo">
          <img src="/public-images/logo_horizontal_ofc.png" alt="Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a onClick={() => onNavigate('home')} style={{ cursor: "pointer" }}>Início</a></li>
          <li><a onClick={() => onNavigate('fale-conosco')} style={{ cursor: "pointer" }}>Fale Conosco</a></li>
        </ul>
      </nav>

      <header>
        <div className="hero-content hero-painel">
          <h1>Portal do Comerciante</h1>
          <p className="tagline">Explore produtos direto do produtor e faça sua reserva.</p>
        </div>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">🚜 Agricultores Próximos</h2>
          <div className="cards-grid">
            {agricultores.map(agri => (
              <div key={agri.id} className="card">
                <span className="card-icon">👨‍🌾</span>
                <h3>{agri.nome}</h3>
                <p className="card-desc"><strong>Responsável:</strong> {agri.produtor}</p>
                <p className="card-temp" style={{ fontSize: '0.9em' }}>{agri.local}</p>
                
                <div className="produtos-lista-comerciante">
                  {agri.produtos.map(prod => (
                    <div key={prod.id} className="item-reserva">
                      <span>{prod.nome} - <strong>{prod.preco}</strong></span>
                      <button className="btn-entrada" onClick={() => handleReservar(agri, prod)}>
                        Reservar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {reservas.length > 0 && (
          <section className="section">
            <h2 className="section-title">📋 Minhas Reservas</h2>
            <div className="card" style={{ textAlign: 'left' }}>
              {reservas.map(res => (
                <p key={res.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  ✅ <strong>{res.prod}</strong> solicitado para <strong>{res.agri}</strong> - <span style={{ color: '#2e7d32' }}>Pendente</span>
                </p>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Comerciante;