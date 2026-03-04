function enviarMensagem(event) {
    event.preventDefault()

    const nome = document.getElementById('nome');
    const mensagem = document.getElementById('mensagem');
    const telefone = '5542991088896';

    const texto = `Olá, me chamo ${nome}. Vi seu portifólio. E escrevi a seguinte mensagem: ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${telefone}/?t=${msgFormatada}`;

    window.open(url, '_blank');
}