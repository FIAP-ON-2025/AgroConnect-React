import React from "react";
import "./PainelAgricultor.css";

const alertasFixos = [
  {
    id: "1",
    icon: "🌩️",
    titulo: "Alerta Meteorológico",
    descricao:
      "Possibilidade de tempestade na sexta-feira. Proteja suas culturas e equipamentos.",
  },
];

export default function PainelAgricultor({ onNavigate }) {
  const previsaoTempoInicial = [];

  const [previsaoTempo, setPrevisaoTempo] =
    React.useState(previsaoTempoInicial);
  const [diaSelecionadoId, setDiaSelecionadoId] = React.useState(null);

  const [nome, setNome] = React.useState("");
  const [unidade, setUnidade] = React.useState("Kg");
  const [validade, setValidade] = React.useState("");
  const [estoqueMinimo, setEstoqueMinimo] = React.useState("");

  const [listaProdutos, setListaProdutos] = React.useState(() => {
    const dadosSalvos = localStorage.getItem("produtosAgro");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const alertas = React.useMemo(() => {
    const alertasEstoque = listaProdutos
      .map((produto) => {
        const atual = Number(produto.estoqueAtual || 0);
        const minimo = Number(produto.estoqueMinimo || 0);

        if (atual <= 0) {
          return {
            id: `estoque-${produto.id}`,
            icon: "🚨",
            titulo: "Estoque Zerado",
            descricao: `O produto ${produto.nome} está com estoque zerado. Estoque atual: ${atual} ${produto.unidade}. Reposição urgente.`,
          };
        }

        if (minimo > 0 && atual < minimo) {
          return {
            id: `estoque-${produto.id}`,
            icon: "📉",
            titulo: "Estoque Baixo",
            descricao: `Estoque de ${produto.nome} está baixo. Estoque atual: ${atual} ${produto.unidade}. Estoque mínimo: ${minimo} ${produto.unidade}.`,
          };
        }

        return null;
      })
      .filter(Boolean);

    return [...alertasFixos, ...alertasEstoque];
  }, [listaProdutos]);

  const [estoqueAtual, setEstoqueAtual] = React.useState("");
  const [editandoId, setEditandoId] = React.useState(null);
  const [produtoMovimento, setProdutoMovimento] = React.useState(null);
  const [tipoMovimento, setTipoMovimento] = React.useState(null);
  const [valorMovimento, setValorMovimento] = React.useState("");
  const [notificacao, setNotificacao] = React.useState(null);

  React.useEffect(() => {
    async function carregarPrevisao() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-23.563039&longitude=-46.635854&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m&forecast_days=4&timezone=America%2FSao_Paulo"
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

          const detalhesHorario = [];

          hourlyTime.forEach((timeStr, idxHora) => {
            if (timeStr.startsWith(diaIso)) {
              const hora = timeStr.split("T")[1];

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

          const mediaNuvensHorario =
            detalhesHorario.length > 0
              ? detalhesHorario.reduce((acc, item) => acc + item.nuvens, 0) /
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

          if (mediaChuvaHorario === 0) {
            if (mediaNuvensHorario >= 80) {
              icon = "☁️";
            } else if (mediaNuvensHorario >= 40) {
              icon = "⛅";
            }
          }

          return {
            id: String(index + 1),
            dia: labelDia,
            icon,
            temp: `${tempMin}°C / ${tempMax}°C`,
            descricao: `Chuva no dia: ${chuvaDia.toFixed(
              1
            )} mm · UV máx: ${uvMax.toFixed(1)}`,
            detalhesHorario,
          };
        });

        setPrevisaoTempo(itensPrevisao);
      } catch {
        // Sem ação: falha ao carregar previsão meteorológica não deve quebrar a tela.
      }
    }

    carregarPrevisao();
  }, []);

  const obterStatusEstoque = React.useCallback((produto) => {
    const atual = Number(produto.estoqueAtual ?? 0);
    const minimo = Number(produto.estoqueMinimo ?? 0);

    if (atual <= 0) {
      return {
        nivel: "ZERADO",
        icon: "🚨",
        titulo: "Estoque Zerado",
        descricao: `O estoque de ${produto.nome} está zerado. Estoque atual: ${atual} ${produto.unidade}. Reposição urgente.`,
      };
    }

    if (minimo > 0 && atual < minimo) {
      return {
        nivel: "BAIXO",
        icon: "📉",
        titulo: "Estoque Baixo",
        descricao: `Estoque de ${produto.nome} está baixo. Estoque atual: ${atual} ${produto.unidade}. Estoque mínimo: ${minimo} ${produto.unidade}.`,
      };
    }

    return {
      nivel: "NORMAL",
      icon: "✅",
      titulo: "Estoque Normal",
      descricao: `O produto ${produto.nome} está com estoque em nível normal.`,
    };
  }, []);

  // Watch: dispara toast quando o status de estoque do produto muda
  // (ex.: NORMAL -> BAIXO ou qualquer -> ZERADO).
  const estoqueStatusAnteriorRef = React.useRef(new Map());
  React.useEffect(() => {
    const anterior = estoqueStatusAnteriorRef.current;
    const proximo = new Map();

    const novosZerados = [];
    const novosBaixos = [];

    listaProdutos.forEach((produto) => {
      const status = obterStatusEstoque(produto).nivel;
      proximo.set(produto.id, status);

      const statusAnterior = anterior.get(produto.id);
      if (statusAnterior === status) return;

      if (status === "ZERADO") novosZerados.push(produto);
      if (status === "BAIXO") novosBaixos.push(produto);
    });

    estoqueStatusAnteriorRef.current = proximo;

    if (novosZerados.length > 0) {
      const nomes = novosZerados
        .slice(0, 3)
        .map((p) => p.nome)
        .join(", ");
      const extra = novosZerados.length > 3 ? ` (+${novosZerados.length - 3})` : "";

      setNotificacao({
        tipo: "erro",
        mensagem: `🚨 Alerta crítico: ${novosZerados.length} produto(s) com estoque zerado (${nomes}${extra}).`,
      });
      return;
    }

    if (novosBaixos.length > 0) {
      const nomes = novosBaixos
        .slice(0, 3)
        .map((p) => p.nome)
        .join(", ");
      const extra = novosBaixos.length > 3 ? ` (+${novosBaixos.length - 3})` : "";

      setNotificacao({
        tipo: "erro",
        mensagem: `📉 Alerta: ${novosBaixos.length} produto(s) com estoque abaixo do mínimo (${nomes}${extra}).`,
      });
    }
  }, [listaProdutos, obterStatusEstoque]);

  const handleExcluir = (idParaRemover) => {
    setListaProdutos(
      listaProdutos.filter((produto) => produto.id !== idParaRemover)
    );
  };

  const handleEditar = (produto) => {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setUnidade(produto.unidade);
    setValidade(produto.validade || "");
    setEstoqueMinimo(produto.estoqueMinimo || "");
    setEstoqueAtual(produto.estoqueAtual ?? "");

    const secaoCadastro = document.querySelector(".section-cadastro");
    if (secaoCadastro) {
      secaoCadastro.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  React.useEffect(() => {
    const listaEmTexto = JSON.stringify(listaProdutos);
    localStorage.setItem("produtosAgro", listaEmTexto);
    console.log("Dados salvos no LocalStorage!");
  }, [listaProdutos]);

  const handleCadastrar = () => {
    if (nome === "" || estoqueAtual === "") {
      setNotificacao({
        tipo: "erro",
        mensagem:
          "Por favor, preencha o nome e o estoque atual antes de cadastrar!",
      });
      return;
    }

    if (editandoId) {
      const listaAtualizada = listaProdutos.map((produto) => {
        if (produto.id === editandoId) {
          return {
            ...produto,
            nome,
            unidade,
            validade,
            estoqueMinimo,
            estoqueAtual,
          };
        }
        return produto;
      });

      setListaProdutos(listaAtualizada);
      setEditandoId(null);
      setNotificacao({
        tipo: "sucesso",
        mensagem: "Produto atualizado com sucesso!",
      });
    } else {
      const novoProduto = {
        id: Date.now().toString(),
        nome: nome,
        unidade: unidade,
        validade: validade,
        estoqueMinimo: estoqueMinimo,
        estoqueAtual: estoqueAtual,
      };

      setListaProdutos([...listaProdutos, novoProduto]);
      setNotificacao({
        tipo: "sucesso",
        mensagem: "Produto cadastrado com sucesso!",
      });
    }

    setNome("");
    setUnidade("Kg");
    setValidade("");
    setEstoqueMinimo("");
    setEstoqueAtual("");
  };

  const darEntradaProduto = (idProduto) => {
    const valor = Number(valorMovimento.replace(",", "."));

    if (Number.isNaN(valor) || valor <= 0) {
      setNotificacao({
        tipo: "erro",
        mensagem: "Informe um valor numérico maior que zero.",
      });
      return;
    }

    setListaProdutos((produtosAnteriores) =>
      produtosAnteriores.map((produto) => {
        if (produto.id !== idProduto) return produto;

        const estoqueAtualNumero = Number(produto.estoqueAtual || 0);

        return {
          ...produto,
          estoqueAtual: estoqueAtualNumero + valor,
        };
      })
    );

    setNotificacao({
      tipo: "sucesso",
      mensagem: "Entrada de estoque registrada com sucesso!",
    });
  };

  const darBaixaProduto = (idProduto) => {
    const valor = Number(valorMovimento.replace(",", "."));

    if (Number.isNaN(valor) || valor <= 0) {
      setNotificacao({
        tipo: "erro",
        mensagem: "Informe um valor numérico maior que zero.",
      });
      return;
    }

    const produtoSelecionado = listaProdutos.find(
      (produto) => produto.id === idProduto
    );

    if (!produtoSelecionado) {
      setNotificacao({
        tipo: "erro",
        mensagem: "Produto não encontrado.",
      });
      return;
    }

    const estoqueAtualNumero = Number(produtoSelecionado.estoqueAtual || 0);
    const novoEstoque = estoqueAtualNumero - valor;

    if (novoEstoque < 0) {
      setNotificacao({
        tipo: "erro",
        mensagem:
          "A quantidade em estoque não pode ficar menor que zero. Ajuste o valor da baixa.",
      });
      return;
    }

    setListaProdutos((produtosAnteriores) =>
      produtosAnteriores.map((produto) => {
        if (produto.id !== idProduto) return produto;

        return {
          ...produto,
          estoqueAtual: novoEstoque,
        };
      })
    );

    if (novoEstoque === 0) {
      return;
    }

    setNotificacao({
      tipo: "sucesso",
      mensagem: "Baixa de estoque registrada com sucesso!",
    });
  };

  const abrirModalMovimento = (produto, tipo) => {
    setProdutoMovimento(produto);
    setTipoMovimento(tipo);
    setValorMovimento("");
  };

  const fecharModalMovimento = () => {
    setProdutoMovimento(null);
    setTipoMovimento(null);
    setValorMovimento("");
  };

  const confirmarMovimento = () => {
    if (!produtoMovimento || !tipoMovimento) return;

    if (tipoMovimento === "entrada") {
      darEntradaProduto(produtoMovimento.id);
    } else {
      darBaixaProduto(produtoMovimento.id);
    }

    fecharModalMovimento();
  };

  return (
    <div className="page-funcionalidades">
      {notificacao && (
        <div
          className={`toast-notificacao toast-notificacao-${notificacao.tipo}`}
          onClick={() => setNotificacao(null)}
        >
          <span>{notificacao.mensagem}</span>
          <button
            type="button"
            className="toast-notificacao-fechar"
            onClick={(e) => {
              e.stopPropagation();
              setNotificacao(null);
            }}
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      )}

      <nav>
        <div className="logo">
          <img
            src="/public-images/logo_horizontal_ofc.png"
            alt="Logo"
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
            <a
              onClick={() => onNavigate("fale-conosco")}
              style={{ cursor: "pointer" }}
            >
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
                className={`card ${diaSelecionadoId === item.id ? "card-selecionado" : ""
                  }`}
                onClick={() =>
                  setDiaSelecionadoId((prev) =>
                    prev === item.id ? null : item.id
                  )
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
            <div
              className="previsao-detalhada"
              onClick={() => setDiaSelecionadoId(null)}
            >
              {(() => {
                const diaSelecionado = previsaoTempo.find(
                  (dia) => dia.id === diaSelecionadoId
                );

                if (!diaSelecionado) return null;

                return (
                  <div
                    className="previsao-detalhada-conteudo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="previsao-detalhada-header">
                      <h3 className="previsao-detalhada-titulo">
                        Detalhe horário - {diaSelecionado.dia}
                      </h3>
                      <button
                        type="button"
                        className="previsao-detalhada-fechar"
                        onClick={() => setDiaSelecionadoId(null)}
                        aria-label="Fechar detalhes da previsão"
                      >
                        ×
                      </button>
                    </div>

                    <div className="previsao-detalhada-lista">
                      {diaSelecionado.detalhesHorario.map((hora) => (
                        <div
                          key={hora.horario}
                          className="previsao-detalhada-item"
                        >
                          <span className="previsao-detalhada-hora">
                            {hora.horario}
                          </span>
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
                  </div>
                );
              })()}
            </div>
          )}
        </section>

        <section className="section section-cadastro">
          <h2 className="section-title">🚜 Cadastrar Nova Colheita</h2>

          <div className="card">
            <div className="input-group">
              <label>Nome do Produto</label>
              <input
                type="text"
                placeholder="Ex: Alface"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Unidade de Medida</label>
              <select
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              >
                <option value="Kg">Quilos (Kg)</option>
                <option value="g">Gramas (g)</option>
                <option value="un">Unidades (un)</option>
              </select>
            </div>

            <div className="input-group">
              <label>Estoque Atual ({unidade})</label>
              <input
                type="number"
                placeholder="Ex: 120"
                value={estoqueAtual}
                onChange={(e) => setEstoqueAtual(e.target.value)}
                disabled={!!editandoId}
              />
            </div>

            <div className="input-group">
              <label>Prazo de Validade</label>
              <input
                type="date"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Estoque Mínimo (Alerta!)</label>
              <input
                type="number"
                placeholder="Ex: 10"
                value={estoqueMinimo}
                onChange={(e) => setEstoqueMinimo(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={editandoId ? "btn-update" : "btn btn-primary"}
              onClick={handleCadastrar}
            >
              {editandoId ? "Atualizar Produto" : "Cadastrar Produto"}
            </button>
          </div>
        </section>

        {listaProdutos.length > 0 && (
          <section className="section">
            <h2 className="section-title">📊 Resumo da Produção</h2>

            <div className="cards-grid">
              {listaProdutos.map((produto) => {
                const status = obterStatusEstoque(produto);

                return (
                  <div key={produto.id} className="card card-produto">
                    <div className="card-produto-actions">
                      <button
                        type="button"
                        className="card-produto-action-btn"
                        onClick={() => handleEditar(produto)}
                        aria-label="Editar produto"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="card-produto-action-btn card-produto-action-btn-delete"
                        onClick={() => handleExcluir(produto.id)}
                        aria-label="Excluir produto"
                      >
                        🗑️
                      </button>
                    </div>

                    <span className="card-icon">{produto.icon}</span>
                    <h3>{produto.nome}</h3>

                    <p className="card-estoque">
                      Estoque atual:{" "}
                      {produto.estoqueAtual !== undefined &&
                        produto.estoqueAtual !== null
                        ? `${produto.estoqueAtual} ${produto.unidade}`
                        : `0 ${produto.unidade}`}
                    </p>

                    <p className="card-desc">
                      Nível do estoque: <strong>{status.nivel}</strong>
                    </p>

                    <div className="buttons-group buttons-estoque">
                      <button
                        type="button"
                        className="btn btn-estoque btn-entrada"
                        onClick={() => abrirModalMovimento(produto, "entrada")}
                      >
                        Dar Entrada
                      </button>
                      <button
                        type="button"
                        className="btn btn-estoque btn-baixa"
                        onClick={() => abrirModalMovimento(produto, "baixa")}
                      >
                        Dar Baixa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="section">
          <h2 className="section-title">⚠️ Alertas Importantes</h2>

          <div className="cards-grid">
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <div key={alerta.id} className="card card-alerta">
                  <span className="card-icon">{alerta.icon}</span>
                  <h3>{alerta.titulo}</h3>
                  <p>{alerta.descricao}</p>
                </div>
              ))
            ) : (
              <div className="card card-alerta">
                <span className="card-icon">✅</span>
                <h3>Sem alertas no momento</h3>
                <p>Todos os produtos estão com estoque em nível adequado.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {produtoMovimento && (
        <div className="modal-movimento-overlay" onClick={fecharModalMovimento}>
          <div
            className="modal-movimento"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-movimento-titulo">
              {tipoMovimento === "entrada"
                ? "Dar Entrada em Estoque"
                : "Dar Baixa em Estoque"}
            </h3>

            <p className="modal-movimento-subtitulo">
              Produto: <strong>{produtoMovimento.nome}</strong>
            </p>

            <p className="modal-movimento-estoque-atual">
              Estoque atual:{" "}
              <strong>
                {produtoMovimento.estoqueAtual ?? 0} {produtoMovimento.unidade}
              </strong>
            </p>

            <div className="input-group modal-movimento-input">
              <label>
                Quantidade para{" "}
                {tipoMovimento === "entrada" ? "entrada" : "baixa"} (
                {produtoMovimento.unidade})
              </label>
              <input
                type="number"
                value={valorMovimento}
                onChange={(e) => setValorMovimento(e.target.value)}
                placeholder="Ex: 10"
                min="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    confirmarMovimento();
                  }
                }}
              />
            </div>

            <div className="modal-movimento-acoes">
              <button
                type="button"
                className="btn btn-estoque btn-cancelar-movimento"
                onClick={fecharModalMovimento}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={
                  tipoMovimento === "entrada"
                    ? "btn btn-estoque btn-entrada"
                    : "btn btn-estoque btn-baixa"
                }
                onClick={confirmarMovimento}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-bottom">
          <p>© 2025 AgroConnect. Transformando a agricultura.</p>
        </div>
      </footer>
    </div>
  );
}