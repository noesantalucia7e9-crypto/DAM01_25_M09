async function conectaPOKEAPI() {
    try {
        const pokemonsrc = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        if (!pokemonsrc.ok) {
            throw new Error(`Error HTTP ${res.status}`);
        }
        const json = await pokemonsrc.json();
        muestraPokemon(json.value);
    }
    catch(error) {
        console.log("Error:", error)
    }

}

function muestraPokemon(){
    let pokemon = document.createElement("div")
    pokemon.textContent
}