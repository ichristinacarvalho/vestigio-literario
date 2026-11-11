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

            // Dar feedback ao leitor e limpar a casa
            alert("Cartas a caminho! Sua inscrição foi confirmada com sucesso.");
            formNewsletter.reset();

        } catch (erro) {
            console.error("Erro ao salvar inscrição:", erro);
            alert("Puxa, ocorreu um erro de conexão. Tente novamente em alguns instantes.");
        }
    });
}