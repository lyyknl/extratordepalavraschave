import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalalavras = document.querySelector("#botao-palavrachave");

botaoMostraPalalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
    const texto = document.querySelector('#entrada-de-texto').value;
    const campoResultado = document.querySelector('#resultado-palavrachave');
    const palavrasChave = processaTexto(texto);

    campoResultado.textContent = palavrasChave.join(", ");
}
function processaTexto(texto) {
    let palavras = texto.split(/\P{L}+/u);

    for (let i in palavras) {
        palavras[i] = palavras[i].toLowerCase();
    }

    // Remove palavras ruins
    palavras = palavras.filter(palavra => !PALAVRAS_RUINS.has(palavra) && palavra.length > 2);

    const frequencias = contaFrequencias(palavras);
    let ordenadas = Object.keys(frequencias).sort(ordenasPalavra);

    function ordenasPalavra(p1, p2) {
        return frequencias[p2] - frequencias[p1];
    }

    return ordenadas.slice(0, 10);
function contaFrequencias(palavras) {
    const frequencias = {};
    for (let palavra of palavras) {
        if (palavra) {
            frequencias[palavra] = (frequencias[palavra] || 0) + 1;
        }
    }
    return frequencias;
}
}
