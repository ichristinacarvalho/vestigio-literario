//Importações
import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const formNewsletter = document.getElementById("formNewsletter");

// Escuta o evento de "submit" 
if (formNewsletter) {
    formNewsletter.addEventListener("submit", async (evento) => {

        evento.preventDefault();

        // Capturar os valores 
        const nomeValor = document.getElementById("nome").value;
        const emailValor = document.getElementById("email").value;

        try {
            // Mapear a nova coleção no Firebase
            const colecaoNewsletter = collection(db, "newsletter");

            // Enviar o documento para a base de dados
            await addDoc(colecaoNewsletter, {
                nome: nomeValor,
                email: emailValor,
                data_inscricao: new Date().toISOString()
            });

            // Chama a rota do Vercel para disparar o e-mail
            try {
                await fetch('/api/boas-vindas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailValor, 
                        nome: nomeValor   
                    })
                });
                console.log("Aviso enviado para a agência de correios do Vercel!");
            } catch (erroEmail) {
                console.error("Erro ao chamar a API de e-mail:", erroEmail);
            }

            // Dar feedback visual e elegante ao leitor
            const mensagemSucesso = document.createElement("p");
            mensagemSucesso.innerHTML = "Cartas a caminho! Sua inscrição foi confirmada com sucesso. ✓";
            mensagemSucesso.style.color = "var(--cor-vinho)";
            mensagemSucesso.style.fontFamily = "var(--fonte-padrao)";
            mensagemSucesso.style.fontStyle = "italic";
            mensagemSucesso.style.marginTop = "15px";
            
            formNewsletter.appendChild(mensagemSucesso);
            formNewsletter.reset();

            // Faz a mensagem desaparecer suavemente após 5 segundos
            setTimeout(() => {
                mensagemSucesso.remove();
            }, 5000);

        } catch (erro) {
            console.error("Erro ao salvar inscrição:", erro);
            
            const mensagemErro = document.createElement("p");
            mensagemErro.innerHTML = "Puxa, ocorreu um erro de conexão. Tente novamente em alguns instantes.";
            mensagemErro.style.color = "var(--cor-tinta)";
            mensagemErro.style.fontFamily = "var(--fonte-padrao)";
            mensagemErro.style.marginTop = "15px";
            
            formNewsletter.appendChild(mensagemErro);
            
            setTimeout(() => {
                mensagemErro.remove();
            }, 5000);
        }
    });
}