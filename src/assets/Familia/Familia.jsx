import React, { useEffect, useRef, useState } from "react";
import "./Familia.css";

export default function Familia() {
  const [produtoSelecionado, setProdutoSelecionado] = useState("[Nome do Produto]");
  const [quantidade, setQuantidade] = useState("1");
  const [dataRetirada, setDataRetirada] = useState("");
  const [minDate, setMinDate] = useState("");
  const [ordemAtiva, setOrdemAtiva] = useState("vencimento");

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);

    if (window.bootstrap && modalRef.current) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    }

    ordenarProdutos("vencimento");
  }, []);

  const ordenarProdutos = (criterio) => {
    setOrdemAtiva(criterio);
    console.log(`Ordenando produtos por: ${criterio}`);
  };

  const abrirModal = (nomeProduto) => {
    const today = new Date().toISOString().split("T")[0];
    setProdutoSelecionado(nomeProduto);
    setMinDate(today);

    if (modalInstance.current) {
      modalInstance.current.show();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quantidade || !dataRetirada) {
      alert("Por favor, preencha a quantidade e a data.");
      return;
    }

    alert(
      `✅ Solicitação enviada! Você solicitou ${quantidade}kg do produto "${produtoSelecionado}" para retirada em ${dataRetirada}. O Agricultor confirmará em breve.`
    );

    if (modalInstance.current) {
      modalInstance.current.hide();
    }

    setQuantidade("1");
    setDataRetirada("");
  };

  return (
    <>
      <nav>
        <div className="logo">
          <img
            src="../images/logo_horizontal_ofc.png"
            alt="AgroConnect Logo"
            className="logo-img"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="../index.html">Início</a>
          </li>
          <li>
            <a href="./fale-conosco.html">Fale Conosco</a>
          </li>
        </ul>
      </nav>

      <header>
        <div className="hero-content">
          <h1 style={{ fontSize: "3.5em" }}>Oportunidades de Resgate</h1>
          <p className="tagline" style={{ fontSize: "1.3em" }}>
            Alimentos de qualidade com preço justo!
          </p>
        </div>
      </header>

      <main>
        <section className="section" id="resgate-produtos">
          <h2 className="section-title" style={{ color: "var(--dark)" }}>
            Produtos em Destaque
          </h2>

          <div
            className="buttons-group d-flex gap-3 flex-wrap"
            style={{ marginBottom: "50px" }}
          >
            <button
              className={`btn filter-button ${
                ordemAtiva === "vencimento" ? "active" : ""
              }`}
              onClick={() => ordenarProdutos("vencimento")}
            >
              Mais Próximo do Vencimento
            </button>

            <button
              className={`btn filter-button ${
                ordemAtiva === "localizacao" ? "active" : ""
              }`}
              onClick={() => ordenarProdutos("localizacao")}
            >
              Mais Próximo de Você
            </button>
          </div>

          <div className="cards-grid">
            <div className="card resgate-card-urgente">
              <span className="card-icon">🍅</span>
              <h3>Tomates Frescos (URGENTE)</h3>
              <p>Vence em: <strong>2 Dias</strong></p>
              <p>Agricultor: Fazenda Esperança</p>

              <div>
                <p className="preco-original">R$ 5,50/kg</p>
                <p className="preco-resgate">R$ 2,50/kg</p>
              </div>

              <button onClick={() => abrirModal("Tomates Frescos (50 kg)")}>
                Resgatar
              </button>
            </div>
          </div>
        </section>
      </main>

      <div ref={modalRef} className="modal-simples">
        <h2>{produtoSelecionado}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <input
            type="date"
            min={minDate}
            value={dataRetirada}
            onChange={(e) => setDataRetirada(e.target.value)}
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
