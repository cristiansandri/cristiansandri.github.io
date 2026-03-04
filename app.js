//Adicionar função de arrastar com mouse e noo mobile, alem de arrumar a animação para ir no smooth

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