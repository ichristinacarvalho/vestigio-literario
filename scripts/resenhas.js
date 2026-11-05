//Importações
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

//Função principal
async function carregarResenhas() {
    try {
        let referencia = collection(db, "resenhas");
        let documentos = await getDocs(referencia);

        //Limpa a prateleira antes de começar a colocar livros (evita duplicações)
        prateleira.innerHTML = "";

        // Variável para controlar qual é o primeiro livro 
        let isPrimeiro = true;

        //Abre a lista e processa cada livro
        documentos.forEach((doc) => {
            let livro = doc.data();

            //Define se o cartão leva a classe "active" 
            let classeAtiva = isPrimeiro ? "active" : "";
            isPrimeiro = false;

            //Constrói o HTML 
            let cartaoHTML = `
                <div class="carousel-item ${classeAtiva}">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-8 col-md-4 text-center mb-4 mb-md-0">
                        <img src="${livro.imagem}" class="img-fluid sombra-livro capa-padrao" alt="Capa de ${livro.titulo}">                        </div>
                        <div class="col-md-6 text-center text-md-start">
                            <span class="genero-livro">Ficção</span>
                            <h3 class="titulo-livro mt-2">${livro.titulo}</h3>
                            <p class="autor-livro">por <em>${livro.autor}</em></p>
                            <p class="resumo-livro mt-3">${livro.resumo}</p>
                            <a href="resenha.html?id=${doc.id}" class="btn-resenha mt-3">Leia a resenha completa <span class="seta">→</span></a>
                        </div>
                    </div>
                </div>
            `;

            prateleira.innerHTML += cartaoHTML;
        });

    } catch (error) {
        console.error("Erro ao carregar as resenhas!", error);
    }
}

const prateleira = document.querySelector(".carousel-inner");

// Executa a função
carregarResenhas();