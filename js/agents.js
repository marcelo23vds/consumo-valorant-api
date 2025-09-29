/* *****************************************************************************************
* Objetivo: Criar os cards dos agentes consumindo a api valorant
* Data: 29/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* *****************************************************************************************/

'use strict'

const carrossel = document.getElementById("container-carrossel")
const botaoAnterior = document.getElementById("seta-esquerda")
const botaoProximo = document.getElementById("seta-direita")

//array que vai guardar os agentes retornados pela API
let agentes = []
let posicaoAtual = 0
//3 cards por vez
const cardsPorPagina = 3

function criarCards() {

  // importante para não aparecer na tela com agentes da pagina anterior
  carrossel.innerHTML = ''

  // pega o grupo de agentes que deve aparecer agora
  const grupo = agentes.slice(posicaoAtual, posicaoAtual + cardsPorPagina)

  // para cada item/agente, cria um elemento <a class="botao">
  grupo.forEach(item => {
    const card = document.createElement('a')
    card.className = 'botao'
    card.href = '#'

    //nome do agente
    const nome = document.createElement('span');
    nome.textContent = item.displayName;

    //div da foto
    const containerFoto = document.createElement('div');
    containerFoto.classList.add('item');

    //foto do agente
    const foto = document.createElement('img')
    foto.src = item.displayIcon
    foto.alt = item.displayName

    containerFoto.appendChild(foto)
    card.appendChild(nome)
    card.appendChild(containerFoto)

    // adiciona o card ao carrossel
    carrossel.appendChild(card)
  });
}

async function buscarAgentes() {

  // requisição da api
  const res = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
  const agente = await res.json()

  //data é o atributo do json da api que retorna todos os dados
  agentes = agente.data

  // Inicializa a renderização (começa em posicaoAtual = 0)
  posicaoAtual = 0
  criarCards()
}

buscarAgentes()


//botoes de "navegação"

botaoProximo.addEventListener("click", () => {
  if (posicaoAtual + cardsPorPagina < agentes.length) {
    posicaoAtual += cardsPorPagina
    criarCards()
  }
})

botaoAnterior.addEventListener("click", () => {
  if (posicaoAtual - cardsPorPagina >= 0) {
    posicaoAtual -= cardsPorPagina
    criarCards()
  }
})