import React from "react";
import "./PainelAgricultor.css";

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

export default function PainelAgricultor({ onNavigate }) {
  const previsaoTempoInicial = [
    {
      id: "1",
      dia: "Hoje",
      icon: "☀️",
      temp: "26°C",
      descricao: "Céu limpo e ensolarado",
      detalhesHorario: [],
    },
    {
      id: "2",
      dia: "Amanhã",
      icon: "🌧️",
      temp: "19°C",
      descricao: "Possibilidade de chuva",
      detalhesHorario: [],
    },
    {
      id: "3",
      dia: "15/04",
      icon: "🌦️",
      temp: "21°C",
      descricao: "Parcialmente nublado",
      detalhesHorario: [],
    },
    {
      id: "4",
      dia: "16/04",
      icon: "☁️",
      temp: "23°C",
      descricao: "Nublado com sol",
      detalhesHorario: [],
    },
  ];

  const [previsaoTempo, setPrevisaoTempo] = React.useState(previsaoTempoInicial);
  const [diaSelecionadoId, setDiaSelecionadoId] = React.useState(null);

  React.useEffect(() => {
    async function carregarPrevisao() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-28.45&longitude=-52.20&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m&forecast_days=4&timezone=America%2FSao_Paulo"
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();

        if (!data.daily || !data.hourly) {
          return;
        }

        const {
          time: dailyTime,
          temperature_2m_max,
          temperature_2m_min,
          precipitation_sum,
          uv_index_max,
        } = data.daily;

        const {
          time: hourlyTime,
          temperature_2m: hourlyTemperature,
          precipitation: hourlyPrecipitation,
          cloudcover: hourlyCloudcover,
          windspeed_10m: hourlyWindspeed,
        } = data.hourly;

        const itensPrevisao = dailyTime.map((diaIso, index) => {
          const tempMax = Math.round(temperature_2m_max[index]);
          const tempMin = Math.round(temperature_2m_min[index]);
          const chuvaDia = precipitation_sum[index];
          const uvMax = uv_index_max[index];

          let labelDia;
          if (index === 0) {
            labelDia = "Hoje";
          } else if (index === 1) {
            labelDia = "Amanhã";
          } else {
            const dataFormatada = new Date(diaIso).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            });
            labelDia = dataFormatada;
          }

          // Agrupa os dados horários para este dia
          const detalhesHorario = [];
          hourlyTime.forEach((timeStr, idxHora) => {
            if (timeStr.startsWith(diaIso)) {
              const hora = timeStr.split("T")[1]; // "HH:MM"
              detalhesHorario.push({
                horario: hora,
                temperatura: hourlyTemperature[idxHora],
                chuva: hourlyPrecipitation[idxHora],
                nuvens: hourlyCloudcover[idxHora],
                vento: hourlyWindspeed[idxHora],
              });
            }
          });

          const mediaChuvaHorario =
            detalhesHorario.length > 0
              ? detalhesHorario.reduce((acc, item) => acc + item.chuva, 0) /
                detalhesHorario.length
              : 0;

          let icon = "☀️";
          if (mediaChuvaHorario >= 5) {
            icon = "🌧️";
          } else if (mediaChuvaHorario >= 1) {
            icon = "🌦️";
          } else if (mediaChuvaHorario > 0) {
            icon = "⛅";
          }

          return {
            id: String(index + 1),
            dia: labelDia,
            icon,
            temp: `${tempMin}°C / ${tempMax}°C`,
            descricao: `Chuva no dia: ${chuvaDia.toFixed(1)} mm · UV máx: ${uvMax.toFixed(
              1
            )}`,
            detalhesHorario,
          };
        });

        setPrevisaoTempo(itensPrevisao);
      } catch (error) {}
    }

    carregarPrevisao();
  }, []);

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
              <div
                key={item.id}
                className={`card ${diaSelecionadoId === item.id ? "card-selecionado" : ""}`}
                onClick={() =>
                  setDiaSelecionadoId((prev) => (prev === item.id ? null : item.id))
                }
                style={{ cursor: "pointer" }}
              >
                <span className="card-icon">{item.icon}</span>
                <h3>{item.dia}</h3>
                <p className="card-temp">{item.temp}</p>
                <p className="card-desc">{item.descricao}</p>
              </div>
            ))}
          </div>
          {diaSelecionadoId && (
            <div className="previsao-detalhada">
              {(() => {
                const diaSelecionado = previsaoTempo.find(
                  (dia) => dia.id === diaSelecionadoId
                );
                if (!diaSelecionado) return null;
                return (
                  <>
                    <h3 className="previsao-detalhada-titulo">
                      Detalhe horário - {diaSelecionado.dia}
                    </h3>
                    <div className="previsao-detalhada-lista">
                      {diaSelecionado.detalhesHorario.map((hora) => (
                        <div key={hora.horario} className="previsao-detalhada-item">
                          <span className="previsao-detalhada-hora">{hora.horario}</span>
                          <span className="previsao-detalhada-temp">
                            {hora.temperatura.toFixed(1)}°C
                          </span>
                          <span className="previsao-detalhada-chuva">
                            Chuva: {hora.chuva.toFixed(1)} mm
                          </span>
                          <span className="previsao-detalhada-nuvens">
                            Nuvens: {hora.nuvens}%
                          </span>
                          <span className="previsao-detalhada-vento">
                            Vento: {hora.vento.toFixed(1)} km/h
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
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
