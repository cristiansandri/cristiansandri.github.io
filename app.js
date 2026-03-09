// ==================== NOTAS ==================== //

 

// ==================== AUTOPLAY CARROSSEL ==================== //
let indiceAtual = 0;
let intervaloAutoPlay;

window.addEventListener("load", () => {
    iniciarAutoPlay();
});

function iniciarAutoPlay() {
    const projetosCaixa = document.querySelector(".projetos-caixa");
    const cards = document.querySelectorAll(".projetos-card");

    if (cards.length === 0) return;

    intervaloAutoPlay = setInterval(() => {
        indiceAtual++;

        if (indiceAtual >= cards.length) {
            indiceAtual = 0;
        }

        const card = cards[indiceAtual];
        const estilo = window.getComputedStyle(projetosCaixa);
        const gap = parseInt(estilo.gap) || 0;

        const posicaoScroll = card.offsetLeft - (projetosCaixa.offsetWidth / 2) + (card.offsetWidth / 2);

        projetosCaixa.scrollTo({
            left: posicaoScroll,
            behavior: "smooth"
        });
    }, 5000);
}



// ==================== PAUSA AO ARRASTAR ==================== //
const projetosCaixa = document.querySelector(".projetos-caixa");

let arrastando = false;
let posicaoInicialX;
let scrollInicial;
let deslocamentoTotal = 0;
let THRESHOLD_ARRASTO = 5;

projetosCaixa.addEventListener("pointerdown", (evento) => {
    arrastando = true;
    projetosCaixa.classList.add("dragging");

    posicaoInicialX = evento.pageX;
    scrollInicial = projetosCaixa.scrollLeft;
    deslocamentoTotal = 0;

    clearInterval(intervaloAutoPlay);
});

projetosCaixa.addEventListener("pointermove", (evento) => {
    if (!arrastando) return;

    evento.preventDefault();

    const posicaoAtualX = evento.pageX;
    deslocamentoTotal = Math.abs(posicaoAtualX - posicaoInicialX);

    const deslocamento = (posicaoAtualX - posicaoInicialX) * 1.5;

    projetosCaixa.scrollLeft = scrollInicial - deslocamento;
});

document.addEventListener("pointerup", () => {
    if (arrastando) {
        arrastando = false;
        projetosCaixa.classList.remove("dragging");
        iniciarAutoPlay();
    }
});

projetosCaixa.addEventListener("pointercancel", () => {
    arrastando = false;
    projetosCaixa.classList.remove("dragging");
    iniciarAutoPlay();
});




// ======== PERMITIR CLIQUE APENAS SE NÃO HOUVE ARRASTO =========== //
projetosCaixa.addEventListener("click", (evento) => {
    if (deslocamentoTotal > THRESHOLD_ARRASTO) {
        evento.preventDefault();
        evento.stopPropagation();
    }
}, { capture: true });



// ==================== Abrir e fechar POPUP ==================== //
const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
            iniciarCarrossel(modal);
        };
    });
});

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.close();
    });
});

const modais = document.querySelectorAll('dialog');
modais.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target ===modal) {
            modal.close();
        }
    });
});





// ==================== Carossel Popup ==================== //
function iniciarCarrossel(modalAtual) {
    const track = modalAtual.querySelector('.popup-carrossel-track');
    const botaoAntes = document.querySelector('.btn-popup.antes');
    const botaoProx = document.querySelector('.btn-popup.prox');

    if (!track) {
        return;
    }

    const slides = Array.from(track.children);

    let indexAtual = 0;

    function updateCarrossel() {
        track.style.transform = `translateX(-${indexAtual * 100}%)`;
    }

    indexAtual = 0;
    updateCarrossel();

    if (botaoProx) {
        botaoProx.onclick = (e) => {
            e.preventDefault();
            indexAtual = (indexAtual + 1) % slides.length;
            updateCarrossel();
        };
    }

    if (botaoAntes) {
        botaoAntes.onclick = (e) => {
            e.preventDefault();
            indexAtual = (indexAtual - 1 + slides.length) % slides.length;
            updateCarrossel();
        };
    }
}





// ==================== BOTÕES MANUAIS ==================== //
function moverCarrossel(direcao) {
    const carrossel = document.getElementById("carrossel");
    const card = carrossel.querySelector(".projetos-card");

    const estilo = window.getComputedStyle(carrossel);
    const gap = parseInt(estilo.gap) || 0;

    const larguraCard = card.offsetWidth + gap;

    carrossel.scrollBy({
        left: larguraCard * direcao,
        behavior: "smooth"
    });
}


// ==================== FORMULÁRIO ==================== //
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