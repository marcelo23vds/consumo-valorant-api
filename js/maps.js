/* *****************************************************************************************
* Objetivo: Criar os cards dos mapas consumindo a api
* Data: 01/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* *****************************************************************************************/

'use strict'

const carrossel = document.getElementById("container-carrossel")
const botaoAnterior = document.getElementById("seta-esquerda")
const botaoProximo = document.getElementById("seta-direita")

//array que vai guardar os mapas retornados pela API
let mapas = []
let posicaoAtual = 0
//3 cards por vez
const cardsPorPagina = 3

const criarCards = () => {

  carrossel.innerHTML = ''

  // pega o grupo de mapas que deve aparecer agora
  const grupo = mapas.slice(posicaoAtual, posicaoAtual + cardsPorPagina)

  // para cada item/mapa, cria um elemento <a class="botao">
  grupo.forEach(item => {

    const card = document.createElement('a')
    card.className = 'botao'
    //ao clicar no card do mapa, é chamado o arquivo html acompanhado do parametro uuid do mapa clicado
    card.href = `map-details.html?id=${item.uuid}`

    //nome do mapa
    const nome = document.createElement('span')
    nome.textContent = item.displayName

    //div da foto
    const containerFoto = document.createElement('div')
    containerFoto.classList.add('item')

    //foto do mapa
    const foto = document.createElement('img')
    foto.src = `https://corsproxy.io/?url=${item.listViewIconTall}`

    containerFoto.appendChild(foto)
    card.appendChild(nome)
    card.appendChild(containerFoto)

    // adiciona o card ao carrossel
    carrossel.appendChild(card)
  })
}

const buscarMapas = async () => {

  // requisição da api
  const response = await fetch("https://corsproxy.io/?url=https://valorant-api.com/v1/maps/")
  const dados = await response.json()

  //data é o atributo do json da api que retorna todos os dados. 
  //utilizei o FILTER para pegar apenas os mapas principais, 
  //ou seja, que possuam o atributo tacticalDescription diferente de vazio
  mapas = dados.data.filter(mapa => mapa.tacticalDescription !== null)

  //inicia a renderização (começa em posicaoAtual = 0)
  posicaoAtual = 0
  criarCards()
}

buscarMapas()

//botoes de "navegação"

botaoProximo.addEventListener("click", () => {
  if (posicaoAtual + cardsPorPagina < mapas.length) {
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