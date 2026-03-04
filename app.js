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