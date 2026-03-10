import React from 'react';
import "../../../AgroConnect/css/fale-conosco.css";
// Criando o componente FaleConosco
const FaleConosco = () => {
    return (
        <section className="container-fale-conosco"> 
            <h2>Fale Conosco</h2>
            <form>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" className="input-estilo" />
                
                <button type="submit">Enviar</button>
            </form>
        </section>
    );
};

export default FaleConosco;