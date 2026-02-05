const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]`;

function init() {


let infoCamisetas = JSON.parse(productosJSON);
const contenedor = document.querySelector(".contenedor-tienda");

for (let producto of infoCamisetas) {
  let div = document.createElement("article");
  div.className = "tarjeta";
  
  div.innerHTML = ` 
            <h2 class="nombreCamiseta"></h2>
            <img class="imagenCamiseta" src="" alt="Camiseta">
            <p class="descripcionCamiseta"></p>
            <p class="precioCamiseta"></p>
            <label>Talla:</label>
            <select class="talla">
                </select>
            <br>
            <input type="number" class="cantidad" value="1" min="1">
            <br>
            <button class="boton-agregar">Agregar al carrito</button>`;
  
  contenedor.appendChild(div);

  div.querySelector(".nombreCamiseta").textContent = producto.nombre;
  div.querySelector(".descripcionCamiseta").textContent = producto.descripcion;
  div.querySelector(".precioCamiseta").textContent = "Precio: " + producto.precioBase + "€";
  
  let primerColor = producto.colores[0];
  div.querySelector(".imagenCamiseta").src = producto.imagenes[primerColor];

  
  let selectTallas = div.querySelector(".talla");
  
  producto.tallas.forEach(talla => {
      let opcion = document.createElement("option");
      opcion.value = talla;
      opcion.textContent = talla;
      selectTallas.appendChild(opcion);
  });
}

}