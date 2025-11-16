// Declara objeto que vai guardar os pokemons
const pokeApi = {}

// 
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Declara uma nova instancia da classe criada no arquivo "pokemon-model.js"
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Cria um array apenas com os nomes dos tipos do Pokémon (ex: ["grass", "poison"])
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // Pega somente o primeiro tipo do Pokémon (ex: "grass")
    const [type] = types

    // Declara os tipos do Pokemon na classe
    pokemon.types = types
    // Declara o tipo principal do Pokemon na classe
    pokemon.type = type

    // Declara o valor do atribudo que será a foto do Pokemon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Pega os detalhes do pokemon na API
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    // Transforma a resposta em um Json
        .then((response) => response.json())
        // Passa a resposta para a function
        .then(convertPokeApiDetailToPokemon)
}

// Função que puxa os dados dos pokemons, sendo 5 por vez
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // Url da API que puxa os pokemons, usando como parametros a quantidade atual já puxada ( offset ) e até qual nova quantidade deve ser passada (limit)
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Retona a resposta da API:
    return fetch(url)
        // - Após receber a resposta transforma em Json
        .then((response) => response.json())
        // - Pega somente o resultado do Json
        .then((jsonBody) => jsonBody.results)
        // - Pega cada Pokémon e cria uma promessa para buscar os detalhes dele.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // - Retorna uma única promise com um array contendo o resultado de cada detalhe do Pokémon.
        .then((detailRequests) => Promise.all(detailRequests))
        // Entrega a lista final com todos os Pokémons completos.
        .then((pokemonsDetails) => pokemonsDetails)
}
