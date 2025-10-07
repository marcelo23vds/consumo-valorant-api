/* *****************************************************************************************
* Objetivo: Exibir informações do agente escolhido
* Data: 01/10/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* *****************************************************************************************/

'use strict'

//pega o id que veio da URL do arquivo -> "agents.js"
//window.location é um objeto do navegador que possui informações sobre a URL atual
//.search pega tudo que vem depois do ? na URL, exemplo: id=2323
let parametro = new URLSearchParams(window.location.search)
//capturando e armazenando apenas o conteudo dentro de id, exemplo 2323
let agenteId = parametro.get("id")

const carregarAgente = async () => {

    // o SENAI bloqueia o site da API do Valorant, então utilizar o prefixo -> https://corsproxy.io/?url=
    //                                                                  ou  -> https://api.allorigins.win/raw?url=
    const response = await fetch(`https://valorant-api.com/v1/agents/${agenteId}`)
    const dados = await response.json()
    const agente = dados.data

    //adicionando o nome do agente
    document.getElementById("nome-agente").textContent = agente.displayName
    //adicionando a foto grande do agente
    document.getElementById("foto").src = agente.fullPortrait
    //adicionando a descrição do agente
    document.getElementById("descricao").textContent = agente.description
}

carregarAgente()
