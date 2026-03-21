import React, { useEffect, useRef, useState } from "react";
import "./OportunidadesResgate.css";

export default function OportunidadesResgate() {
  const [produtoSelecionado, setProdutoSelecionado] = useState("[Nome do Produto]");
  const [quantidade, setQuantidade] = useState("1");
  const [dataRetirada, setDataRetirada] = useState("");
  const [minDate, setMinDate] = useState("");
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
      `✅ Solicitação enviada! Você solicitou ${quantidade}kg do produto "${produtoSelecionado}" para retirada em ${dataRetirada}.`
    );

    if (modalInstance.current) {
      modalInstance.current.hide();
    }

    setQuantidade("1");
    setDataRetirada("");
  };

  return (
   <div className="oportunidades-resgate">
    <h1>Oportunidades de Resgate</h1>

    <button onClick={() => ordenarProdutos("vencimento")}>
      Ordenar por vencimento
    </button>

    <button onClick={() => abrirModal("Produto Exemplo")}>
      Abrir Modal
    </button>

    <div ref={modalRef} className="modal-box">
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
    </div>
  );
}
