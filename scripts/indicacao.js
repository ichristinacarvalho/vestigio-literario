//Importações
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

// Mapeando os elementos 
let titulo = document.querySelector(".nome-livro");
let autor = document.querySelector(".autor-livro");
let resumo = document.querySelector(".resumo-livro");
let link = document.querySelector(".btn-leitura");
let image = document.querySelector(".img-indicacao");

// Função principal
async function carregarIndicacao() {
    try {
        let referencia = doc(db, "indicacao_mes", "atual");
        let documento = await getDoc(referencia);
        let livro = documento.data();
        
        console.log("Dados recebidos:", livro);

        // Substituindo os dados no HTML
        titulo.textContent = livro.titulo;
        autor.textContent = livro.autor;
        resumo.textContent = livro.resumo;
        image.src = livro.imagem;

        // Lógica do botão de resenha
if (livro.link && livro.link !== "#" && livro.link.trim() !== "") {
    // Cenário 1: A resenha existe
    link.href = livro.link;
    link.innerHTML = 'LEIA A RESENHA COMPLETA <span class="seta">→</span>';
    link.style.cursor = "pointer";
    link.style.opacity = "1";
    link.style.pointerEvents = "auto";
} else {
    // Cenário 2: Ainda não há resenha (link vazio ou "#")
    link.removeAttribute("href"); 
    link.textContent = "RESENHA EM BREVE";
    link.style.cursor = "not-allowed";
    link.style.opacity = "0.5";
    link.style.borderBottom = "none";
    link.style.color = "var(--cor-tinta)";
    link.style.pointerEvents = "none"; 
}

    } catch (error) {
        console.error("Erro ao carregar a função!", error);
    }
}

// Chamando a função
carregarIndicacao();