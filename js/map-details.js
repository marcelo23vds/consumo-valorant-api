/* *****************************************************************************************
* Objetivo: Exibir informações do mapa escolhido
* Data: 03/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* *****************************************************************************************/

'use strict'

//pega o id que veio da URL do arquivo -> "maps.js"
//window.location é um objeto do navegador que possui informações sobre a URL atual
//.search pega tudo que vem depois do ? na URL, exemplo: id=2323
let parametro = new URLSearchParams(window.location.search)
//capturando e armazenando apenas o conteudo dentro de id, exemplo 2323
let mapaId = parametro.get("id")

const carregarMapa = async () => {

    // o SENAI bloqueia o site da API do Valorant, então utilizar o prefixo -> https://corsproxy.io/?url=
    //                                                                  ou  -> https://api.allorigins.win/raw?url=
    const response = await fetch(`https://valorant-api.com/v1/maps/${mapaId}`)
    const dados = await response.json()
    const mapa = dados.data

    //adicionando o nome do mapa
    document.getElementById("nome-mapa").textContent = mapa.displayName
    //adicionando a foto 2d do mapa
    document.getElementById("mapa-2d").src = mapa.displayIcon
    //adicionando a foto grande do mapa
    document.getElementById("foto-mapa").src = mapa.splash
}

carregarMapa()
