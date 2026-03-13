import React from "react";
import "./Funcionalidades.css";

// Dados em objetos para manipulação futura com JS
const previsaoTempo = [
  { id: "1", dia: "Hoje", icon: "☀️", temp: "26°C", descricao: "Céu limpo e ensolarado" },
  { id: "2", dia: "Amanhã", icon: "🌧️", temp: "19°C", descricao: "Possibilidade de chuva" },
  { id: "3", dia: "Quinta-feira", icon: "🌦️", temp: "21°C", descricao: "Parcialmente nublado" },
  { id: "4", dia: "Sexta-feira", icon: "☁️", temp: "23°C", descricao: "Nublado com sol" },
];

const produtos = [
  { id: "1", nome: "Alface", icon: "🥬", unidade: "kg", estoque_atual: 70, estoque_minimo: 50 },
  { id: "2", nome: "Tomates", icon: "🍅", unidade: "kg", estoque_atual: 235, estoque_minimo: 200 },
  { id: "3", nome: "Abacaxi", icon: "🍍", unidade: "kg", estoque_atual: 100, estoque_minimo: 80 },
  { id: "4", nome: "Cenouras", icon: "🥕", unidade: "kg", estoque_atual: 55, estoque_minimo: 20 },
];

const alertas = [
  {
    id: "1",
    icon: "🌩️",
    titulo: "Alerta Meteorológico",
    descricao:
      "Possibilidade de tempestade na sexta-feira. Proteja suas culturas e equipamentos.",
  },
  {
    id: "2",
    icon: "📉",
    titulo: "Estoque Baixo",
    descricao:
      "Estoque de alface está baixo. Considere repor ou planejar nova colheita.",
  },
  {
    id: "3",
    icon: "📉",
    titulo: "Estoque Baixo",
    descricao:
      "Estoque de tomate está baixo. Considere repor ou planejar nova colheita.",
  },
];

// Valores exibidos na calculadora (somente visual)
const calculadoraValores = {
  area: 10,
  produtividade: 5.5,
  preco: 1200,
  producaoTotal: "55.00 t",
  receitaEstimada: "R$ 66.000,00",
  mediaPorHa: "R$ 6.600,00",
};

export default function Funcionalidades({ onNavigate }) {
  return (
    <div className="page-funcionalidades">
      <nav>
        <div className="logo">
          <img
            src="/public-images/logo_horizontal_ofc.png"
            alt="AgroConnect Logo"
            className="logo-img"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
              Início
            </a>
          </li>
          <li>
            <a onClick={() => onNavigate("fale-conosco")} style={{ cursor: "pointer" }}>
              Fale Conosco
            </a>
          </li>
        </ul>
      </nav>

      <header>
        <div className="hero-content hero-painel">
          <h1>Painel de Controle</h1>
          <p className="tagline">Gerencie sua produção de forma inteligente</p>
        </div>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">☀️ Previsão do Tempo</h2>
          <div className="cards-grid">
            {previsaoTempo.map((item) => (
              <div key={item.id} className="card">
                <span className="card-icon">{item.icon}</span>
                <h3>{item.dia}</h3>
                <p className="card-temp">{item.temp}</p>
                <p className="card-desc">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">📊 Resumo da Produção</h2>
          <div className="cards-grid">
            {produtos.map((produto) => (
              <div key={produto.id} className="card">
                <span className="card-icon">{produto.icon}</span>
                <h3 className="card-produto-nome">{produto.nome}</h3>
                <p id={produto.id} className="card-estoque">
                  Estoque: {produto.estoque_atual} {produto.unidade}
                </p>
                <div className="buttons-group buttons-estoque">
                  <button type="button" className="btn btn-primary btn-estoque">
                    Dar Entrada
                  </button>
                  <button type="button" className="btn btn-outline btn-estoque">
                    Dar Baixa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="content-section content-section-vencimento">
            <div className="content-text">
              <h2>📅 Vencimento da Safra</h2>
              <p>
                Vencimento aproximado: <strong>15/03/2025</strong>
              </p>
              <p>Planeje suas ações e notifique os beneficiários.</p>
              <div className="buttons-group">
                <button type="button" className="btn btn-primary">
                  <i className="fa-solid fa-bell" aria-hidden="true" /> Notificar Beneficiários
                </button>
              </div>
            </div>
            <div className="content-visual content-visual-emoji">📅</div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">⚠️ Alertas Importantes</h2>
          <div className="cards-grid">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="card card-alerta">
                <span className="card-icon">{alerta.icon}</span>
                <h3 className="card-alerta-titulo">{alerta.titulo}</h3>
                <p className="card-alerta-desc">{alerta.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">🧮 Calculadora de Safra</h2>
          <div className="content-section">
            <div className="content-text">
              <h2>Calcule sua Produção</h2>
              <p>
                Estime a produção total, receita esperada e média por hectare.
              </p>
              <div className="calculadora-inputs">
                <div className="input-group">
                  <label htmlFor="area">
                    <i className="fa-solid fa-ruler-combined" aria-hidden="true" /> Área (hectares)
                  </label>
                  <input
                    id="area"
                    type="number"
                    placeholder="Ex: 10"
                    defaultValue={calculadoraValores.area}
                    aria-label="Área em hectares"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="produtividade">
                    <i className="fa-solid fa-chart-line" aria-hidden="true" /> Produtividade (t/ha)
                  </label>
                  <input
                    id="produtividade"
                    type="number"
                    placeholder="Ex: 5.5"
                    step="0.1"
                    defaultValue={calculadoraValores.produtividade}
                    aria-label="Produtividade por hectare"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="preco">
                    <i className="fa-solid fa-dollar-sign" aria-hidden="true" /> Preço por tonelada (R$)
                  </label>
                  <input
                    id="preco"
                    type="number"
                    placeholder="Ex: 1200"
                    defaultValue={calculadoraValores.preco}
                    aria-label="Preço por tonelada"
                  />
                </div>
                <button type="button" className="btn btn-primary btn-calcular">
                  <i className="fa-solid fa-calculator" aria-hidden="true" /> Calcular Safra
                </button>
              </div>
            </div>
            <div className="content-visual content-visual-resultados">
              <div className="resultados-emoji">📊</div>
              <div id="resultados" className="resultados-lista">
                <div className="resultado-item resultado-producao">
                  <div className="resultado-label">📦 Produção Total</div>
                  <div id="producaoTotal" className="resultado-valor">
                    {calculadoraValores.producaoTotal}
                  </div>
                </div>
                <div className="resultado-item resultado-receita">
                  <div className="resultado-label">💰 Receita Estimada</div>
                  <div id="receitaEstimada" className="resultado-valor">
                    {calculadoraValores.receitaEstimada}
                  </div>
                </div>
                <div className="resultado-item resultado-media">
                  <div className="resultado-label">📈 Média por Hectare</div>
                  <div id="mediaPorHa" className="resultado-valor">
                    {calculadoraValores.mediaPorHa}
                  </div>
                </div>
                <button type="button" className="btn btn-secondary btn-comerciantes">
                  <i className="fa-solid fa-handshake" aria-hidden="true" /> Contatar Comerciantes
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre</h4>
            <ul>
              <li><a href="#/">Quem Somos</a></li>
              <li><a href="#/">Nossa Missão</a></li>
              <li><a href="#/">Carreiras</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#/">Blog</a></li>
              <li><a href="#/">Documentação</a></li>
              <li><a href="#/">Suporte</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#/">Privacidade</a></li>
              <li><a href="#/">Termos de Uso</a></li>
              <li><a href="#/">Cookies</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Conecte-se</h4>
            <ul>
              <li><a href="#/">Twitter</a></li>
              <li><a href="#/">LinkedIn</a></li>
              <li><a href="#/">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2025 AgroConnect. Todos os direitos reservados. Transformando a agricultura, combatendo a fome.
          </p>
        </div>
      </footer>
    </div>
  );
}
