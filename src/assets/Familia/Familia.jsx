import React from 'react';
import './Familia.css';

export default function Familia({ onNavigate, onReservar }) {
  const ofertasVerduras = [
    { id: 1, agricultor: 'Sítio São José', produto: 'Alface Crespa', preco: 'R$ 2,50' },
    { id: 2, agricultor: 'Fazenda Boa Vista', produto: 'Brócolis', preco: 'R$ 4,00' },
    { id: 3, agricultor: 'Sítio Campo Grande', produto: 'Espinafre', preco: 'R$ 3,00' },
  ];

  const [pedidoModal, setPedidoModal] = React.useState(null);
  const [quantidade, setQuantidade] = React.useState(1);
  const [coleta, setColeta] = React.useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 60);
    return now.toISOString().slice(0, 16);
  });
  const [modalPos, setModalPos] = React.useState({ left: 0, top: 0 });

  const abrirPedido = (oferta, e) => {
    const target = e?.currentTarget ?? null;
    let left = window.innerWidth / 2;
    let top = window.innerHeight / 2;

    if (target && typeof target.getBoundingClientRect === 'function') {
      const rect = target.getBoundingClientRect();
      left = rect.left + rect.width / 2 + window.scrollX;
      top = rect.top + window.scrollY;
    }

    setModalPos({ left, top });
    setPedidoModal(oferta);
    setQuantidade(1);
    const now = new Date();
    now.setMinutes(now.getMinutes() + 60);
    setColeta(now.toISOString().slice(0, 16));
  };

  const fecharPedido = () => setPedidoModal(null);

  const handleConfirmarPedido = () => {
    if (!pedidoModal) return;

    const nomeFamilia = 'Família Silva';
    const novaReserva = {
      id: Date.now(),
      prodNome: pedidoModal.produto,
      comerciante: nomeFamilia,
      agriNome: pedidoModal.agricultor,
      data: new Date().toLocaleString('pt-BR'),
      coletaProgramada: coleta,
      quantidade: Number(quantidade),
      contatoTel: '11999999999',
      whatsapp: '5511999999999',
    };

    try {
      localStorage.setItem('ultimaReservaFamilia', JSON.stringify(novaReserva));
    } catch (e) {
      // ignore
    }

    if (typeof onReservar === 'function') onReservar(novaReserva);

    alert(`Pedido confirmado: ${novaReserva.quantidade} x ${novaReserva.prodNome} (coleta: ${novaReserva.coletaProgramada})`);
    fecharPedido();
  };

  return (
    <>
      <nav>
        <div className="logo">
          <img src="./public-images/logo_horizontal_ofc.png" alt="AgroConnect Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li>
            <a onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>
              Início
            </a>
          </li>
          <li>
            <a onClick={() => onNavigate && onNavigate('fale-conosco')} style={{ cursor: 'pointer' }}>
              Fale Conosco
            </a>
          </li>
        </ul>
      </nav>

      <header>
        <div className="hero-content">
          <h1 style={{ fontSize: '3.5em' }}>Oportunidades de Resgate</h1>
          <p className="tagline" style={{ fontSize: '1.3em' }}>Alimentos de qualidade com preço justo!</p>
        </div>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Verduras com preço acessível</h2>

          <div className="cards-grid">
            {ofertasVerduras.map((oferta) => (
              <div key={oferta.id} className="card">
                <span className="card-icon">

                </span>
                <h3>{oferta.produto}</h3>
                <p><strong>Agricultor:</strong> {oferta.agricultor}</p>
                <p><strong>Preço:</strong> {oferta.preco}</p>
                <div style={{ marginTop: 12 }}>
                  <button type="button" className="btn btn-primary" onClick={(e) => abrirPedido(oferta, e)}>
                    Fazer pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {pedidoModal && (
        <>
          <div className="modal-backdrop" onClick={fecharPedido} />

          <div
            className="modal-popover"
            style={{
              position: 'fixed',
              left: modalPos.left,
              top: modalPos.top,
              transform: 'translate(-50%, -110%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-simples">
              <h2>Fazer pedido - {pedidoModal.produto}</h2>

              <form onSubmit={(e) => { e.preventDefault(); handleConfirmarPedido(); }}>
                <label>
                  Quantidade (un):
                  <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                </label>

                <label>
                  Data e hora da coleta:
                  <input type="datetime-local" value={coleta} onChange={(e) => setColeta(e.target.value)} />
                </label>

                <div className="modal-actions" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button type="button" className="btn" onClick={fecharPedido} style={{ background: '#e0e0e0' }}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Confirmar pedido</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
