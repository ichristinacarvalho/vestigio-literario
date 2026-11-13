const nodemailer = require('nodemailer');

// Endereços que podem chamar esta API.
const ORIGENS_PERMITIDAS = [
    'https://vestigio-literario.vercel.app',
    'http://localhost:3000'
];

// Formato básico de e-mail: algo@algo.algo, sem espaços.
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Troca caracteres especiais para que o nome não vire código HTML dentro do e-mail.
function escaparHtml(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

module.exports = async function handler(req, res) {
    //Só aceita envio de formulário (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    //Só aceita chamadas vindas do próprio site
    const origem = req.headers.origin;
    if (!ORIGENS_PERMITIDAS.includes(origem)) {
        return res.status(403).json({ erro: 'Origem não autorizada.' });
    }

    const { email, nome, site } = req.body || {};

    if (site) {
        return res.status(200).json({ sucesso: true });
    }

    //Valida os dados recebidos
    if (typeof email !== 'string' || email.length > 254 || !REGEX_EMAIL.test(email)) {
        return res.status(400).json({ erro: 'E-mail inválido.' });
    }
    if (typeof nome !== 'string' || nome.trim().length === 0 || nome.length > 80) {
        return res.status(400).json({ erro: 'Nome inválido.' });
    }

    const nomeSeguro = escaparHtml(nome.trim());

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: '"Vestígio Literário" <vestigiioliterario@gmail.com>',
            to: email,
            subject: 'Bem-vindo ao Vestígio',
            html: `
                <div style="font-family: 'Georgia', serif; color: #333333; line-height: 1.8; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #fdfbf7; border: 1px solid #eaeaea; border-top: 4px solid #6b2c3a; border-radius: 4px;">

    <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #6b2c3a; font-weight: normal; margin: 0; font-size: 24px; letter-spacing: 1px;">Vestígio</h2>
        <span style="font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 2px;">Correspondência Literária</span>
    </div>

    <p style="font-size: 16px;">Olá, <strong>${nomeSeguro}</strong>,</p>

    <p style="font-size: 16px;">Esta é a primeira das nossas <em>Cartas deixadas pelo caminho</em>.</p>

    <p style="font-size: 16px;">O <strong>Vestígio</strong> nasceu da vontade de resgatar o ritmo calmo da leitura. Num mundo de excessos e urgências, este espaço é um pequeno refúgio criado para partilhar histórias, atmosferas e mundos que realmente merecem permanecer na nossa memória.</p>

    <p style="font-size: 16px; color: #6b2c3a; font-weight: bold; margin-top: 30px;">O que esperar desta correspondência?</p>

    <p style="font-size: 16px;">Como prometido: sem pressa e sem excesso. Todo dia 15 de cada mês, uma nova indicação de leitura chegará a esta caixa de entrada. Além disso, enviaremos avisos esporádicos quando publicarmos uma resenha nova no site.</p>

    <p style="font-size: 16px; background-color: #f4eee6; padding: 15px; border-left: 3px solid #6b2c3a; margin: 25px 0;">
        <em>Um pequeno pedido:</em> para garantir que as nossas cartas não se percam pelo caminho (ou caiam na aba de promoções), adicione este endereço de e-mail aos seus contatos.
    </p>

    <p style="font-size: 16px;">Se quiser, responda a este e-mail e conte-me: <strong>o que você está lendo no momento?</strong> Vou adorar saber &lt;3.</p>

    <p style="font-size: 16px; margin-top: 40px;">Boas leituras,<br>
    <strong style="color: #6b2c3a;">Isabella</strong><br>
    <span style="font-size: 14px; color: #777777;">Publicação Literária Independente</span></p>

</div>
            `
        });

        return res.status(200).json({ sucesso: true, mensagem: 'Carta entregue!' });

    } catch (erro) {
        console.error('Erro no envio:', erro);
        return res.status(500).json({ erro: 'Falha ao enviar a carta.' });
    }
};