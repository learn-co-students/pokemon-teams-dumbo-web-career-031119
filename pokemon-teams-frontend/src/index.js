const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

  loadTrainers()

  document.querySelector("main").addEventListener("click", (event) => {
    if (event.target.innerText === "Add Pokemon") {
      addNewPokemon(event.target.dataset.trainerId)
        .then((pokemon) => {
          if (pokemon.error) {
            alert(`Oops, we couldn't add a new pokemon to your team because: ${pokemon.error}`)
          }
          else {
            event.target.nextElementSibling.appendChild(createPokemonLi(pokemon))
          }
        })
    }
    else if (event.target.className === "release") {
      removePokemon(event.target.dataset.pokemonId)
        .then( () =>
          event.target.parentElement.remove()
        )
      }
  })

})

const loadTrainers = () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers
      .forEach(trainer => createTrainerCard(trainer, trainer.pokemons))
    )
}

const createTrainerCard = (trainer, pokemonArr) => {
  let trainerCard = document.createElement("div")
  trainerCard.classList.add("card")
  trainerCard.dataset.id = trainer.id

  let trainerCardName = document.createElement("p")
  trainerCardName.innerText = trainer.name

  let addPokemonButton = document.createElement("button")
  addPokemonButton.dataset.trainerId = trainer.id
  addPokemonButton.innerText = "Add Pokemon"

  let pokemonList = document.createElement("ul")

  trainerCard.appendChild(trainerCardName)
  trainerCard.appendChild(addPokemonButton)
  trainerCard.appendChild(pokemonList)
  addPokemonLis(trainerCard, pokemonArr)

  document.querySelector("main").appendChild(trainerCard)
}

const addPokemonLis = (trainerCard, pokemonArr) => {
  pokemonArr.forEach(pokemon => {
    trainerCard.children[2].appendChild(createPokemonLi(pokemon))
  })
}

const createPokemonLi = (pokemon) => {
  let pokemonLi = document.createElement("li")
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`

  let releaseButton = document.createElement("button")
  releaseButton.classList.add("release")
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = "Release"
  pokemonLi.appendChild(releaseButton)

  return pokemonLi
}

const addNewPokemon = (trainerId) => {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then(resp => resp.json())
}

const removePokemon = (pokemonId) => {
  return fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  })
}
