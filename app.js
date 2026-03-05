//Adicionar função de arrastar com mouse e no mobile, esconder os botões e arrastar com touch. Função de animação de rolagem a cada 5 segundos.

// Fazer o card levar para um link externo ou abrir popup a depender do tipo

// Adicionar pequenos icones indicando as ferramentas usadas para construir o objeto em questão

// Quando isso tudo estiver pronto, mudar o estilo da página
const carrossel = document.getElementById("carrossel");

let arrastando = false;
let posicaoInicialX;
let scrollInicial;

carrossel.addEventListener("pointerdown", (evento) => {
    arrastando = true;
    carrossel.classList.add("dragging");

    carrossel.setPointerCapture(evento.pointerId);

    posicaoInicialX = evento.pageX;
    scrollInicial = carrossel.scrollLeft;
});

carrossel.addEventListener("pointerleave", () => {
    arrastando = false;
    carrossel.classList.remove("dragging");
});

carrossel.addEventListener("pointerup", () => {
    arrastando = false;
    carrossel.classList.remove("dragging");
});

carrossel.addEventListener("pointermove", (evento) => {
    if (!arrastando) return;

    evento.preventDefault();

    const posicaoAtualX = evento.pageX;
    const deslocamento = (posicaoAtualX - posicaoInicialX) * 1.5;

    carrossel.scrollLeft = scrollInicial - deslocamento;
});


function moverCarrossel(direcao){
    const carrossel = document.getElementById("carrossel");
    const card = carrossel.querySelector(".projetos-card");

    const estilo = window.getComputedStyle(carrossel);
    const gap = parseInt(estilo.gap) || 0;;

    const larguraCard = card.offsetWidth + gap;

    carrossel.scrollBy({
        left: larguraCard * direcao,
        behavior: "smooth"
    });
}


function enviarMensagem(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5542991088896';

    const texto = `Olá, me chamo ${nome}. Vi seu portifólio: ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${telefone}/?text=${msgFormatada}`;

    window.open(url, '_blank');
}