//Importações
import { db } from "./firebase-config.js";
import { doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

console.log("Status do Banco de Dados:", db);

//Capturar o ID da URL
const parametrosURL = new URLSearchParams(window.location.search);
const idLivro = parametrosURL.get("id");

//Mapear os dados na tela
const divCabecalho = document.getElementById("cabecalho-livro");
const divTexto = document.getElementById("texto-resenha");

//Função principal
async function carregarResenha() {
    // Se não tiver ID na URL, volta para o início
    if (!idLivro) {
        window.location.href = "index.html";
        return;
    }

    try {
        // Pede ao Firebase APENAS o documento com este ID específico
        const referenciaLivro = doc(db, "resenhas", idLivro);
        const documento = await getDoc(referenciaLivro);

        if (documento.exists()) {
            const livro = documento.data();

            // Construir o cabeçalho (Capa e Infos)
            divCabecalho.innerHTML = `
            
                <div class="col-md-4 mb-4 mb-md-0 text-center moldura-vazada">
                <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}" class="img-fluid sombra-livro">
                </div>
                <div class="col-md-8">
                <a href="index.html" class="d-inline-block mb-4" style="color: var(--cor-vinho); text-decoration: none; font-family: var(--fonte-padrao); font-size: 0.9rem; font-weight: bold;">
                ← VOLTAR PARA O INÍCIO
                </a>
                    <span class="genero-livro d-block mb-2">${livro.genero || 'Gênero não definido'}</span>
                    <h1 class="titulo-livro mb-3" style="font-size: clamp(2.5rem, 5vw, 4rem);">${livro.titulo}</h1>
                    <p class="autor-livro mb-4 fs-4">por ${livro.autor}</p>
                </div>
            `;

            // Construir o texto da resenha 
            const textoFormatado = livro.texto_completo ? livro.texto_completo.replace(/\n/g, '<br><br>') : 'Resenha em construção...';

            divTexto.innerHTML = `
                <div class="texto-leitura" style="font-family: var(--fonte-padrao); font-size: 1.15rem; line-height: 1.8; color: var(--cor-tinta);">
                    ${textoFormatado}
                </div>
            `;

        } else {
            console.log("Livro não encontrado!");
            divCabecalho.innerHTML = "<p>Desculpe, não conseguimos encontrar esta resenha.</p>";
        }
    } catch (erro) {
        console.error("Erro ao buscar a resenha:", erro);
    }
}

//Função secundária
async function carregarComentarios() {
    const divComentarios = document.getElementById("lista-comentarios");

    try {
        const refComentarios = collection(db, "comentarios");
        const pesquisa = query(refComentarios, where("id_livro", "==", idLivro));
        let resultado = await getDocs(pesquisa);

        if (resultado.empty) {
            divComentarios.innerHTML = "<p class='text-muted'>Seja o primeiro a deixar um vestígio.</p>";
        } else {
            divComentarios.innerHTML = ""; // Limpa a mensagem de carregamento

            resultado.forEach((doc) => {
                const comentario = doc.data();

                divComentarios.innerHTML += `
                    <div class="comentario-caixa mb-4 p-3 border-bottom">
                    <h5 class="mb-1 nome-leitor">
                    ${comentario.nome_leitor}
                    <span class="data-leitor ms-2">${comentario.data}</span>
                    </h5>
                        <p class="text-muted mt-2" style="font-family: var(--fonte-padrao);">
                            ${comentario.texto}
                        </p>
                    </div>
                `;
            });
        }
    } catch (erro) {
        console.error("Erro ao procurar comentários:", erro);
    }
}


// Chamar a função quando a página carregar
carregarResenha();
carregarComentarios();