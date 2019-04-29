const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

  loadTrainers()

  document.querySelector("main").addEventListener("click", (event) => {
    if (event.target.innerText === "Add Pokemon") {
      // console.log(event.target.dataset.trainerId)
      addPokemon(event.target.dataset.trainerId)
        .then((pokemon) => {
          if (pokemon.error) {
            alert(`Oops, we couldn't add a new pokemon to your team because: ${pokemon.error}`)
          }
          else {
            createPokemonLi(event.target.parentElement, pokemon)
          }
          // event
        })
    }
    else if (event.target.innerText === "Release") {
      removePokemon(event.target.dataset.pokemonId)
        .then((pokemon) => {
          event.target.parentElement.remove()
        })
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
    createPokemonLi(trainerCard, pokemon)
  })
}

const createPokemonLi = (trainerCard, pokemon) => {
  let pokemonLi = document.createElement("li")
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`

  let releaseButton = document.createElement("button")
  releaseButton.classList.add("release")
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = "Release"
  pokemonLi.appendChild(releaseButton)

  trainerCard.children[2].appendChild(pokemonLi)
}

const addPokemon = (trainerId) => {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    },
    body: JSON.stringify({
      "trainer_id": trainerId
    })
  })
  .then(resp => resp.json())
}

const removePokemon = (pokemonId) => {
  return fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  })
  .then(resp => resp.json())
}

const removePokemonFromPage = (pokemon) => {
  debugger
}

//
// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
