import { useState } from "react";
import "./FaleConosco.css";

export default function FaleConosco() {
  return (
    <>
      <nav>
        <div className="logo">
          <img
            src="/images/logo_horizontal_ofc.png"
            alt="AgroConnect Logo"
            className="logo-img"
          />
        </div>

        <ul className="nav-links">
          <li>
            <a href="/">Início</a>
          </li>
          <li>
            <a href="/cadastro">Cadastre-se</a>
          </li>
          <li>
            <a href="/fale-conosco">Fale Conosco</a>
          </li>
        </ul>
      </nav>

      <header>
        <div className="hero-content">
          <h1>Fale Conosco</h1>
          <p className="tagline">
            Dúvidas ou sugestões? Nossa equipe está pronta para te atender.
          </p>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="content-section">
            <div className="content-text">
              <h2>Mande uma mensagem</h2>

              {/* Informação de Telefone que faltava */}
              <p className="contato-direto">
                📞 <strong>Telefone:</strong> (99) 99999-9999 <br />
                📧 <strong>E-mail:</strong> contato@agroconnect.com
              </p>

              <form className="contato-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Seu Nome"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Seu E-mail"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Seu Telefone (ex: 99 99999-9999)"
                    className="input-field"
                  />
                </div>

                
                <div className="form-group">
                  <select className="input-field select-field">
                    <option value="">Selecione o Assunto</option>
                    <option value="duvida">Dúvida Técnica</option>
                    <option value="parceria">Parcerias</option>
                    <option value="suporte">Suporte ao Agricultor</option>
                    <option value="elogio">Sugestões ou Elogios</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Sua Mensagem"
                    className="input-field textarea"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar Agora
                </button>
              </form>
            </div>

            <div className="content-visual">💬</div>
          </div>
        </section>
      </main>

      
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre</h4>
            <ul>
              <li>
                <a href="#">Quem Somos</a>
              </li>
              <li>
                <a href="#">Nossa Missão</a>
              </li>
              <li>
                <a href="#">Carreiras</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Recursos</h4>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Documentação</a>
              </li>
              <li>
                <a href="#">Suporte</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacidade</a>
              </li>
              <li>
                <a href="#">Termos de Uso</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Conecte-se</h4>
            <ul>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
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
}
