// ==================== AUTOPLAY CARROSSEL ==================== //
const todosCarrosseis = document.querySelectorAll(".projetos-caixa");

todosCarrosseis.forEach((carrossel) => {
    let indiceAtual = 0;
    let intervaloAutoPlay;
    let arrastando = false;
    let posicaoInicialX;
    let scrollInicial;
    let deslocamentoTotal = 0;
    let THRESHOLD_ARRASTO = 5;

    function iniciarAutoPlay() {
        const cards = carrossel.querySelectorAll(".projetos-card");
        if (cards.length === 0) return;

        clearInterval(intervaloAutoPlay);

        intervaloAutoPlay = setInterval(() => {
            indiceAtual++;

            if (indiceAtual >= cards.length) {
                indiceAtual = 0;
            }

            const card = cards[indiceAtual];
            const posicaoScroll = card.offsetLeft - (carrossel.offsetWidth / 2) + (card.offsetWidth / 2);

            carrossel.scrollTo({
                left: posicaoScroll,
                behavior: "smooth"
            });
        }, 10000);
    }

    window.addEventListener("load", iniciarAutoPlay);

    // ==================== PAUSA AO ARRASTAR ==================== //
    carrossel.addEventListener("pointerdown", (evento) => {
        clearInterval(intervaloAutoPlay);
        arrastando = true;
        carrossel.classList.add("dragging");

        posicaoInicialX = evento.pageX;
        scrollInicial = carrossel.scrollLeft;
        deslocamentoTotal = 0;
    });

    carrossel.addEventListener("pointermove", (evento) => {
        if (!arrastando) return;

        evento.preventDefault();

        const posicaoAtualX = evento.pageX;
        deslocamentoTotal = Math.abs(posicaoAtualX - posicaoInicialX);

        const deslocamento = (posicaoAtualX - posicaoInicialX) * 1.5;

        carrossel.scrollLeft = scrollInicial - deslocamento;
    });

    const finalizarArraste = () => {
        if (arrastando) {
            arrastando = false;
            carrossel.classList.remove("dragging");
            iniciarAutoPlay();
        }
    }


    carrossel.addEventListener("pointerup", finalizarArraste);
    carrossel.addEventListener("pointercancel", finalizarArraste);
    carrossel.addEventListener("pointerleave", finalizarArraste);



    // ======== PERMITIR CLIQUE APENAS SE NÃO HOUVE ARRASTO =========== //
    carrossel.addEventListener("click", (evento) => {
        if (deslocamentoTotal > THRESHOLD_ARRASTO) {
            evento.preventDefault();
            evento.stopPropagation();
        }
    }, { capture: true });

});



// ==================== Abrir e fechar POPUP ==================== //
const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
            document.body.classList.add('sem-scroll');
            iniciarCarrossel(modal);
        };
    });
});

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
            document.body.classList.remove('sem-scroll');
        };
    });
});

const modais = document.querySelectorAll('dialog');
modais.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
            document.body.classList.remove('sem-scroll');
        }
    });
});





// ==================== Carossel Popup ==================== //
function iniciarCarrossel(modalAtual) {
    const track = modalAtual.querySelector('.popup-carrossel-track');
    const botaoAntes = modalAtual.querySelector('.btn-popup.antes');
    const botaoProx = modalAtual.querySelector('.btn-popup.prox');

    if (!track || !botaoAntes || !botaoProx) return;

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
function moverCarrossel(direcao, idCarrossel) {
    const carrossel = document.getElementById(idCarrossel);
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