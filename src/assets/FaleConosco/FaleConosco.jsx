import { useState } from 'react';
import "./FaleConosco.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faPaperPlane, faUser, faEnvelope, faPhone, faTag, faComment } from '@fortawesome/free-solid-svg-icons';
function FaleConosco() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');



    return (
        <div className="fale-conosco-container">
            <div className="fale-conosco-card">
                <h2>Envie sua mensagem!</h2>
                <p>Preencha o formulário e nossa equipe AgroConnect responderá em breve.</p>

                <form>
                    <div className="input-group">
                        <label><FontAwesomeIcon icon={faUser} /> Nome</label>
                        <input type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                        <input type="email" placeholder="seu.email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label><FontAwesomeIcon icon={faPhone}/> Telefone</label>
                        <input type="text" placeholder="Somente números" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label><FontAwesomeIcon icon={faTag} /> Assunto</label>
                        <input type="text" placeholder="Selecione um assunto" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label><FontAwesomeIcon icon={faComment} /> Sua mensagem</label>
                        <textarea rows="4" placeholder="Escreva sua mensagem detalhada aqui..." value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
                    </div>

                    <button type="submit" className="btn-enviar">
                        Enviar Mensagem <FontAwesomeIcon icon={faRocket} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FaleConosco;