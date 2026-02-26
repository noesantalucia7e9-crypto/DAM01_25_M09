async function conectaPOKEAPI(evento) {
    if (evento) {
        evento.preventDefault();
    }

    try {
        let textoBuscador = document.querySelector("#buscador").value.toLowerCase().trim();
        if (textoBuscador === "") return;

        let pokemonSeleccionado = "https://pokeapi.co/api/v2/pokemon/" + textoBuscador;
        const pokemonsrc = await fetch(pokemonSeleccionado);

        if (!pokemonsrc.ok) {
            throw new Error(`Error HTTP ${pokemonsrc.status}`);
        }

        const info = await pokemonsrc.json();
        muestraPokemon(info);
    }
    catch (error) {
        console.log("Error:", error);
        document.querySelector(".contenedor").innerHTML = `<p style="color:red; font-weight:bold;">¡Pokémon no encontrado!</p>`;
    }
}

function muestraPokemon(infoPokemon) {
    let contenedor = document.querySelector(".contenedor");
    contenedor.innerHTML = "";

    let nombre = infoPokemon.name;
    let id = infoPokemon.id;
    let imagen = infoPokemon.sprites.front_default;
    let sonido = infoPokemon.cries.latest;
    let altura = infoPokemon.height / 10;
    let expBase = infoPokemon.base_experience;

    // 1. Habilidades
    let habilidadesHTML = infoPokemon.abilities.map(hab => {
        let textoOculta = hab.is_hidden ? " <em>(Oculta)</em>" : "";
        return `<span class="etiqueta">${hab.ability.name}${textoOculta}</span>`;
    }).join('');

    // 2. Movimientos
    let movimientosHTML = infoPokemon.moves.map(mov => {
        return `<span class="etiqueta">${mov.move.name}</span>`;
    }).join('');

    // 3. Juegos / Versiones
    let juegosHTML = infoPokemon.game_indices.map(juego => {
        return `<span class="etiqueta">${juego.version.name}</span>`;
    }).join('');


    let tarjetaPokemon = document.createElement("div");
    tarjetaPokemon.className = "pokeCard";

    tarjetaPokemon.innerHTML = ` 
        <h2 class="nombrePokemon">${nombre} (#${id})</h2>
        <img class="imagenPokemon" src="${imagen}" alt="${nombre}">
        
        <audio controls src="${sonido}"></audio>

        <div class="infoBasica">
            <div><strong>Altura:</strong><br>${altura} m</div>
            <div><strong>Exp. Base:</strong><br>${expBase}</div>
        </div>

        <div style="text-align: left; margin-bottom: 15px;">
            <strong>Habilidades:</strong><br>
            <div style="margin-top: 5px;">${habilidadesHTML}</div>
        </div>

        <details>
            <summary>Movimientos (${infoPokemon.moves.length})</summary>
            <div class="listaDesplegable">${movimientosHTML}</div>
        </details>

        <details>
            <summary>Apariciones en Juegos (${infoPokemon.game_indices.length})</summary>
            <div class="listaDesplegable">${juegosHTML}</div>
        </details>
    `;

    contenedor.appendChild(tarjetaPokemon);
}

function main() {
    document.querySelector(".botonBuscar").addEventListener("click", conectaPOKEAPI);

    document.querySelector("#buscador").addEventListener("keypress", function (evento) {
        if (evento.key === "Enter") {
            conectaPOKEAPI(evento);
        }
    });
}

main();