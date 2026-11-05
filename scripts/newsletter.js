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
            //Mapear a nova coleção no Firebase
            const colecaoNewsletter = collection(db, "newsletter");
            
            //Enviar o documento
            await addDoc(colecaoNewsletter, {
                nome: nomeValor,
                email: emailValor,
                data_inscricao: new Date().toISOString() 
            });

            // Dispara o webhook do n8n em segundo plano
fetch("http://localhost:5678/webhook/697c28f0-631a-4223-8434-1f02232b251b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        nome: nomeValor,
        email: emailValor,
        tipo: "boas_vindas"
    })
}).catch(err => console.log("Aviso: Webhook falhou, mas inscrição foi salva.", err));

            //Dar feedback ao leitor e limpar a casa
            alert("Cartas a caminho! Sua inscrição foi confirmada com sucesso.");
            formNewsletter.reset(); 

        } catch (erro) {
            console.error("Erro ao salvar inscrição:", erro);
            alert("Puxa, ocorreu um erro de conexão. Tente novamente em alguns instantes.");
        }
    });
}