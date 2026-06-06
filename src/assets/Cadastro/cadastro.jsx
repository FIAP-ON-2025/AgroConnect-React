import "../Cadastro/cadastro.css";

export default function Cadastro({ onNavigate }) {
  return (
    <>
      <nav>
        <div className="logo">
          <img
            src="./public-images/logo_horizontal_ofc.png"
            alt="AgroConnect Logo"
            className="logo-img"
          />
        </div>

        <ul className="nav-links">
          <li><a onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</a></li>
          <li><a onClick={() => onNavigate('cadastro')} style={{ cursor: 'pointer' }}>Cadastre-se</a></li>
          <li><a onClick={() => onNavigate('fale-conosco')} style={{ cursor: 'pointer' }}>Fale Conosco</a></li>
          <li><a onClick={() => onNavigate('Familia')} style={{ cursor: 'pointer' }}>Finalizar Cadastro</a></li>
        </ul>
      </nav>

      <header>
        <div className="hero-content">
          <h1 style={{ fontSize: "3.5em" }}>
            Seja Bem-Vindo(a) ao AgroConnect!
          </h1>

          <p className="tagline" style={{ fontSize: "1.3em" }}>
            Comece escolhendo seu perfil para preencher seus dados de cadastro!
          </p>
        </div>
      </header>

      <main>
        <section className="section" id="cadastro-form">
          <h2 className="section-title" style={{ fontSize: "2.2em" }}>
            📝 Seus Dados
          </h2>

          <div className="content-section form-center">
            <div className="card form-card">

              {/* PERFIL */}
              <div className="perfil-opcoes-grid">
                <label className="perfil-opcao">
                  <input type="radio" name="perfil" value="agricultor" defaultChecked />
                  <span className="perfil-opcao-span">
                    <i className="fa-solid fa-seedling"></i> Agricultor
                  </span>
                </label>

                <label className="perfil-opcao">
                  <input type="radio" name="perfil" value="comerciante" />
                  <span className="perfil-opcao-span">
                    <i className="fa-solid fa-store"></i> Comerciante
                  </span>
                </label>

                <label className="perfil-opcao">
                  <input type="radio" name="perfil" value="familia" />
                  <span className="perfil-opcao-span">
                    <i className="fa-solid fa-users"></i> Família Beneficiada
                  </span>
                </label>
              </div>

              {/* FORMULÁRIO */}
              <form>

                <div className="input-group">
                  <label htmlFor="nomeCompleto">
                    <i className="fa-solid fa-user"></i> Nome Completo
                  </label>
                  <input type="text" id="nomeCompleto" placeholder="Seu nome e sobrenome" required />
                </div>

                <div className="input-group">
                  <label htmlFor="documento">
                    <i className="fa-solid fa-id-card"></i> CPF ou CNPJ
                  </label>
                  <input type="text" id="documento" placeholder="Apenas números" required />
                </div>

                <div className="input-group">
                  <label htmlFor="email">
                    <i className="fa-solid fa-envelope"></i> E-mail
                  </label>
                  <input type="email" id="email" placeholder="seu.email@exemplo.com" required />
                </div>

                <div className="input-group">
                  <label htmlFor="senha">
                    <i className="fa-solid fa-lock"></i> Senha
                  </label>
                  <input type="password" id="senha" placeholder="Mínimo 8 caracteres" required />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmaSenha">
                    <i className="fa-solid fa-lock"></i> Confirmar Senha
                  </label>
                  <input type="password" id="confirmaSenha" placeholder="Repita sua senha" required />
                </div>

                <div className="input-group">
                  <label htmlFor="cep">
                    <i className="fa-solid fa-location-dot"></i> CEP
                  </label>
                  <input type="text" id="cep" placeholder="Apenas números" required />
                </div>

                <div className="input-group">
                  <label htmlFor="endereco">
                    <i className="fa-solid fa-map-marker-alt"></i> Endereço
                  </label>
                  <input type="text" id="endereco" required />
                </div>

                <div className="input-group">
                  <label htmlFor="telefone">
                    <i className="fa-solid fa-phone"></i> Telefone
                  </label>
                  <input type="text" id="telefone" placeholder="(DD) 9XXXX-XXXX" required />
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('Familia')}
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "30px", fontSize: "1.05em" }}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  Finalizar Cadastro
                </button>

              </form>

              <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.95em" }}>
                Já tem uma conta? <a onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}>Faça Login aqui</a>.
              </p>

            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-bottom">
          <p>
            © 2025 AgroConnect. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );

}
