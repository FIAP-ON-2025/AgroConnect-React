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
    descricao: "Possibilidade de tempestade na sexta-feira. Proteja suas culturas e equipamentos.",
  },
  {
    id: "2",
    icon: "📉",
    titulo: "Estoque Baixo",
    descricao: "Estoque de alface está baixo. Considere repor ou planejar nova colheita.",
  },
  {
    id: "3",
    icon: "📉",
    titulo: "Estoque Baixo",
    descricao: "Estoque de tomate está baixo. Considere repor ou planejar nova colheita.",
  },
];

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
    { id: "1", dia: "Hoje", icon: "☀️", temp: "26°C", descricao: "Céu limpo e ensolarado", detalhesHorario: [] },
    { id: "2", dia: "Amanhã", icon: "🌧️", temp: "19°C", descricao: "Possibilidade de chuva", detalhesHorario: [] },
    { id: "3", dia: "15/04", icon: "🌦️", temp: "21°C", descricao: "Parcialmente nublado", detalhesHorario: [] },
    { id: "4", dia: "16/04", icon: "☁️", temp: "23°C", descricao: "Nublado com sol", detalhesHorario: [] },
  ];

  const [previsaoTempo, setPrevisaoTempo] = React.useState(previsaoTempoInicial);
  const [diaSelecionadoId, setDiaSelecionadoId] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [unidade, setUnidade] = React.useState("Kg");
  const [validade, setValidade] = React.useState("");
  const [estoqueMinimo, setEstoqueMinimo] = React.useState("");
  
  const [listaProdutos, setListaProdutos] = React.useState(() => {
  const dadosSalvos = localStorage.getItem('produtosAgro');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });
  
  const [peso, setPeso] = React.useState("");
  const [editandoId, setEditandoId] = React.useState(null);

  const handleExcluir = (idParaRemover) => {
    setListaProdutos(listaProdutos.filter((produto) => produto.id !== idParaRemover));
  };

  const handleEditar = (produto) => {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setQuantidade(produto.quantidade);
    setUnidade(produto.unidade);
    setValidade(produto.validade || "");
    setEstoqueMinimo(produto.estoqueMinimo || "");
    setPeso(produto.peso || "");

    
  const secaoCadastro = document.querySelector(".section-cadastro");
  if (secaoCadastro) {
    secaoCadastro.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  
  React.useEffect(() => {
  const listaEmTexto = JSON.stringify(listaProdutos);
  localStorage.setItem('produtosAgro', listaEmTexto);
  console.log("Dados salvos no LocalStorage!");
  }, [listaProdutos]); 

  const handleCadastrar = () => {
    if (nome === "" || quantidade === "") {
      alert("Por favor, preencha o nome e a quantidade antes de cadastrar!");
      return;
    }
    if (editandoId) {
      const listaAtualizada = listaProdutos.map((produto) => {
        if (produto.id === editandoId) {
          return {
          ...produto,
          nome,
          quantidade,
          unidade,
          validade,
          estoqueMinimo,
          peso
          };
        }
        return produto;
      });

      setListaProdutos(listaAtualizada);
      setEditandoId(null);
    } else {
      const novoProduto = {
      id: Date.now().toString(),
      nome: nome,
      quantidade: quantidade,
      unidade: unidade,
      validade: validade,
      estoqueMinimo: estoqueMinimo,
      peso: peso,
      }; 

      setListaProdutos([...listaProdutos, novoProduto]); 
    }
      
    setNome("");
    setQuantidade("");
    setUnidade("Kg");
    setValidade("");
    setEstoqueMinimo("");
    setPeso("");
  };

    

    
    

  return (
    <div className="page-funcionalidades">
      <nav>
        <div className="logo">
          <img src="/public-images/logo_horizontal_ofc.png" alt="Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>Início</a></li>
          <li><a onClick={() => onNavigate("fale-conosco")} style={{ cursor: "pointer" }}>Fale Conosco</a></li>
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
              <div key={item.id} className="card" onClick={() => setDiaSelecionadoId(item.id)} style={{ cursor: "pointer" }}>
                <span className="card-icon">{item.icon}</span>
                <h3>{item.dia}</h3>
                <p className="card-temp">{item.temp}</p>
                <p className="card-desc">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="section section-cadastro">
          <h2 className="section-title">🚜 Cadastrar Nova Colheita</h2>
          <div className="card">
            
            <div className="input-group">
              <label>Nome do Produto</label>
              <input type="text" placeholder="Ex: Alface" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Quantidade Colhida (itens/frutos)</label>
              <input type="number" placeholder="Ex: 50" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Unidade de Medida</label>
              <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
                <option value="Kg">Quilos (Kg)</option>
                <option value="g">Gramas (g)</option>
                <option value="un">Unidades (un)</option>
              </select>
            </div>

      
            {unidade !== "un" && (
              <div className="input-group">
                <label>Peso Total Colhido ({unidade})</label>
                <input type="number" placeholder="Ex: 120" value={peso} onChange={(e) => setPeso(e.target.value)} />
              </div>
            )}

            <div className="input-group">
              <label>Prazo de Validade</label>
              <input type="date" value={validade} onChange={(e) => setValidade(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Estoque Mínimo (Alerta!)</label>
              <input type="number" placeholder="Ex: 10" value={estoqueMinimo} onChange={(e) => setEstoqueMinimo(e.target.value)} />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleCadastrar}>
              Cadastrar Produto
            </button>
          </div>
        </section>

        
        <section className="section">
          <h2 className="section-title">📊 Resumo da Produção</h2>
          <div className="cards-grid">
            {listaProdutos.map((produto) => (
              <div key={produto.id} className="card">
                <span className="card-icon">{produto.icon}</span>
                <h3>{produto.nome}</h3>
                <p className="card-estoque">
                  Estoque: {produto.quantidade} unidades
                  {produto.peso && (
                    <span style={{ display: "block", fontSize: "0.9em", marginTop: "4px" }}>
                      Peso Total: {produto.peso} {produto.unidade}
                    </span>
                  )}
                </p>
                <div className="buttons-group" style={{ justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-primary" onClick={() => handleEditar(produto)}>Atualizar</button>
                  <button className="btn btn-outline" onClick={() => handleExcluir(produto.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>

          <div className="content-section content-section-vencimento">
            <div className="content-text">
              <h2>📅 Vencimento da Safra</h2>
              <p>Vencimento aproximado: <strong>15/03/2025</strong></p>
            </div>
          </div>
        </section>

        
        <section className="section">
          <h2 className="section-title">⚠️ Alertas Importantes</h2>
          <div className="cards-grid">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="card card-alerta">
                <span className="card-icon">{alerta.icon}</span>
                <h3>{alerta.titulo}</h3>
                <p>{alerta.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-bottom">
          <p>© 2025 AgroConnect. Transformando a agricultura.</p>
        </div>
      </footer>
    </div>
  );
}