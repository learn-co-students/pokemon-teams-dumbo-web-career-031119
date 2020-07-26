const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

// console.log(`${TRAINERS_URL}`)
const getPoks = () => {
    main.innerText = ''
    fetch(TRAINERS_URL).then((resp) => resp.json()).then((jresp) => {
        jresp.forEach(trainer => {

            let pokList = ''
            trainer.pokemons.forEach(poke => {
                const pokeLi = document.createElement('li')
                pokeLi.innerHTML += poke.nickname
                pokeLi.innerHTML += `${poke.nickname} (${poke.species})`
                const pokbutton = document.createElement('button')
                pokbutton.innerText = 'Release'
                pokbutton.className = 'release'
                pokbutton.dataset.id = poke.id
                pokeLi.append(pokbutton)
                pokList += pokeLi.outerHTML
                // pokList += `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
            });
            main.innerHTML += `<div class="card" data-id="1"><p>${trainer.name}</p>
        <button data-id="${trainer.id}" class='add'>Add Pokemon</button>
        <ul>${pokList}</ul></div>`
        });
    })
}
// postPok

getPoks()

main.addEventListener('click', (event) => {

    if (event.target.className == 'release') {
        event.target.parentElement.remove()
        fetch(`${POKEMONS_URL}/${event.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'trainer_id': `${event.target.dataset.id}`
            })
        })

    }

    if (event.target.className == 'add') {
        // console.log(event.target.parentElement.querySelector('ul').childElementCount)
        // console.log(event.target.parentElement.childElementCount)
        // if (event.target.parentElement.querySelector('ul').childElementCount < 6) {
        fetch(`${POKEMONS_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'trainer_id': event.target.dataset.id
                })
            }).then(resp => resp.json())
            .then((pokInfo) => {
                // if (!!pokInfo.id) {
                event.target.parentElement.querySelector('ul').innerHTML += `<li>${pokInfo.nickname} (${pokInfo.species}) <button class="release" data-pokemon-id="${pokInfo.id}">Release</button></li>`
                // }
            })
        // }
    }
})


// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon.
// Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.