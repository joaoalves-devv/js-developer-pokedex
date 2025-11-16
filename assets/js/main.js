// Declarando a varivel que guarda a lista onde ficara armazenado os pokemons
const pokemonList = document.getElementById('pokemonList')
// Declarando a variavel para manipular o botão de paginação
const loadMoreButton = document.getElementById('loadMoreButton')

// Definindo Quantidade maxima de itens a serem exibidos ( referente apenas a pokemons da primeira geração )
const maxRecords = 151
//  Declarando itens a serem exibidos por vez (paginação)
const limit = 10
let offset = 0;

// Função para converter os parametros recebidos em um codigo html para ser exibido ao usuario
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Função para aumentar a quantidade de pokemons a serem exibidos na tela
function loadPokemonItens(offset, limit) {
    // Busca os novos pokemons a serem exibidos na API, junto da Quantidade e novo limit
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Transforma a listagem em HTML, e não coloca separação na parte "join('')"
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        // Pega a nova lista HTML e junta a já existente
        pokemonList.innerHTML += newHtml
    })
}

// Carrega a função para exibir a nova listagem
loadPokemonItens(offset, limit)

// Função onde aitva o carregamento de novos pokemons e verifica se o limite foi alcançado
loadMoreButton.addEventListener('click', () => {
    // Concatena o valor atual com o novo limit
    offset += limit
    // Define o valor de itens da proxima pagina
    const qtdRecordsWithNexPage = offset + limit

    // Verifica se a quantidade de itens da proxima pagina é maior que a quantidade total
    if (qtdRecordsWithNexPage >= maxRecords) {
        // Caso seja, ele pega o valor maximo e subtrai pelo atual, para ser exibido apenas a diferença
        const newLimit = maxRecords - offset
        // Carrega os novos pokemons
        loadPokemonItens(offset, newLimit)

        // Remove o botão para adicionar novos pokemons, pois já alcançou o limite
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Caso não tenha alcançado o limite, passa o valor normalmente
        loadPokemonItens(offset, limit)
    }
})