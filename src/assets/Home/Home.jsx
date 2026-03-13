import React from "react";
import "./Home.css";

export default function Home({ onNavigate }) {
  return (
    <>
      <nav>
        <div className="logo">
          <img
            src="/public-images/logo_horizontal_ofc.png"
            alt="AgroConnect"
            className="logo-img"
          />
        </div>

        <ul className="nav-links">
          <li><a onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</a></li>
          <li><a onClick={() => onNavigate('cadastro')} style={{ cursor: 'pointer' }}>Cadastre-se</a></li>
          <li><a onClick={() => onNavigate('fale-conosco')} style={{ cursor: 'pointer' }}>Fale Conosco</a></li>
        </ul>
      </nav>

      <header>
        <div className="hero-content">
          <h1>Transformando a Agricultura</h1>
          <p className="tagline">
            Combatendo a fome com tecnologia e inovação
          </p>
        </div>
      </header>

      <main>

        <section className="section" id="recursos">
          <h2 className="section-title">Sobre Nós</h2>

          <div className="cards-grid">

            <div className="card">
              <span className="card-icon">🌾</span>
              <h3>Sustentabilidade</h3>
              <p>
                Práticas agrícolas que respeitam o meio ambiente e garantem
                produtividade duradoura para as gerações futuras.
              </p>
            </div>

            <div className="card">
              <span className="card-icon">📊</span>
              <h3>Dados Inteligentes</h3>
              <p>
                Análise avançada de dados para otimizar colheitas,
                reduzir custos e aumentar a eficiência operacional.
              </p>
            </div>

            <div className="card">
              <span className="card-icon">🤝</span>
              <h3>Comunidade</h3>
              <p>
                Conecte-se com agricultores, pesquisadores e especialistas
                em uma rede colaborativa de impacto social.
              </p>
            </div>

            <div className="card">
              <span className="card-icon">📱</span>
              <h3>Tecnologia Acessível</h3>
              <p>
                Ferramentas digitais simples e intuitivas,
                projetadas para todos os níveis de experiência agrícola.
              </p>
            </div>

            <div className="card">
              <span className="card-icon">🎓</span>
              <h3>Educação Contínua</h3>
              <p>
                Acesso a cursos, webinars e recursos educacionais
                para aprimorar suas habilidades agrícolas.
              </p>
            </div>

            <div className="card">
              <span className="card-icon">🌍</span>
              <h3>Impacto Social</h3>
              <p>
                Contribuir para a redução da fome e o desenvolvimento
                sustentável das comunidades rurais.
              </p>
            </div>

          </div>
        </section>

        <section className="section" id="sobre">
          <div className="content-section">

            <div className="content-text">
              <h2>Nossa Missão</h2>

              <p>
                Na AgroConnect, acreditamos que a tecnologia e a inovação
                podem transformar a forma como cultivamos alimentos e
                combatemos a fome.
              </p>

              <p>
                Oferecemos soluções inteligentes que conectam agricultores
                e comunidade.
              </p>

              <div className="buttons-group">
                <button className="btn btn-primary">
                  Saiba Mais
                </button>

                <a onClick={() => onNavigate('cadastro')} className="btn btn-primary" style={{ cursor: 'pointer' }}>
                  Cadastre-se
                </a>
              </div>
            </div>

            <div className="content-visual">
              🚀
            </div>

          </div>
        </section>

        <section className="section" id="contato">
          <div className="content-section">

            <div className="content-visual">
              💬
            </div>

            <div className="content-text">
              <h2>Pronto para Começar?</h2>

              <p>
                Junte-se a milhares de agricultores que já estão
                transformando suas operações com AgroConnect.
              </p>

              <p>
                Receba suporte especializado, acesso a ferramentas
                avançadas e faça parte da comunidade.
              </p>

              <div className="buttons-group">
                <a onClick={() => onNavigate('fale-conosco')} className="btn btn-primary" style={{ cursor: 'pointer' }}>
                  Fale Conosco
                </a>
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
              <li><a href="#">Quem Somos</a></li>
              <li><a href="#">Nossa Missão</a></li>
              <li><a href="#">Carreiras</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Documentação</a></li>
              <li><a href="#">Suporte</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Conecte-se</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © 2025 AgroConnect. Todos os direitos reservados.
            Transformando a agricultura, combatendo a fome.
          </p>
        </div>
      </footer>
    </>
  );
};