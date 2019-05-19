const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', event => {
  runOnLoad()
})

// ========================================= -Functions Defined- ========================================= //

let mainTag = document.querySelector('main')
const initialFetch = () => {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      makeTrainerCards(trainer)
    })
  })
}

const makeTrainerCards = (trainer) => {
  let pokemonArr = trainer.pokemons;
  let liTags = '';
  pokemonArr.forEach(pokemon => {
    liTags += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  })
  let divTag = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}" class="add-pokemon">Add Pokemon</button>
  <ul>
  ${liTags}
  </ul>
  </div>`
  mainTag.innerHTML += divTag
}

const makeTrainerCardHtml = (trainer) => {
  return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul>

  </ul>
  </div>`
}

const makePokemonHtml = (pokemon) => {
  return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

const fetchPokemon = (trainerId) => {
  return fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  }).then(res => res.json())
}

const makeClicksWork = () => {
  mainTag.addEventListener('click', (event) => {
    if (event.target.className === 'add-pokemon') {
      let pokemonLiTags = event.target.parentElement.querySelectorAll('li')
      if (pokemonLiTags.length < 6) {
        console.log('You may add a Pokemon')
        fetchPokemon(event.target.dataset.trainerId)
        .then(pokemon => {
          event.target.parentElement.querySelector('ul').innerHTML += makePokemonHtml(pokemon)
        })
      }
    }
    else if (event.target.className === 'release') {
      let pokemonId = event.target.dataset.pokemonId
      event.target.parentElement.remove()
      fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: 'DELETE'
      })
    }
  })
}

const runOnLoad = () => {
  makeClicksWork()
  initialFetch()
}
