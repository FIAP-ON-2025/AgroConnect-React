import { useState } from 'react';
function FaleConosco() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Fale Conosco</h2>
            <form>
                <div>
                    <label>Nome:</label><br />
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>E-mail:</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>Mensagem:</label><br />
                    <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
                </div>
                <br />
                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    );
}
export default FaleConosco;