# 📚 Vestígio Literário

![Página inicial do Vestígio Literário](img/preview.png)

=> <a href="https://vestigio-literario.vercel.app/">Acesse o site</a>

Bem-vindo ao repositório oficial do **Vestígio Literário**, uma plataforma digital voltada para o universo da leitura, compartilhamento de conteúdos e experiências literárias. Este projeto conta com uma arquitetura moderna que une front-end responsivo, banco de dados em nuvem e fluxos automatizados de comunicação.

---

## 🚀 Funcionalidades & Arquitetura

* **Interface Responsiva**: Design limpo e adaptado para proporcionar uma excelente experiência de leitura e navegação em qualquer dispositivo.
* **Armazenamento com Firebase**: Utilizado para gerenciar dados em tempo real e persistência de informações dos usuários/conteúdos.
* **Automação de E-mails com n8n**: Integração de fluxos automatizados para disparos e notificações de e-mails de forma dinâmica e eficiente.
* **Sistema de Newsletter Serverless:** Formulário de captação de leitores que salva os dados no Firestore e aciona uma rota de API no Vercel (backend) para o disparo imediato de um e-mail elegante de boas-vindas, sem depender de servidores ligados 24/7.
  
---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e ferramentas:

* **HTML5 / CSS3 / JavaScript (ES6+)**: Estruturação, estilização e interatividade da interface web.
* **Firebase**: Banco de dados e serviços em nuvem para gerenciamento de dados.
* **n8n**: Plataforma de automação de fluxo de trabalho para gerenciar as regras de envio de e-mails.
* **Git & GitHub**: Controle de versão, hospedagem e automação de deploys.
* **Vercel Serverless Functions (Node.js):** Criação de API própria para rodar o backend da aplicação sob demanda.
* **Nodemailer:** Integração com SMTP do Gmail para envio automatizado de e-mails.
