const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// Devuelve JSON
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
}



const server = createServer((req, res) => {

  console.log(req.method, req.url);

  // GET /students
  if (req.method === "GET" && req.url === "/students") {
    return sendJson(res, 200, students);
  }

  // TODO 1: GET /students/:id
  // Buscamos la info de un alumno completo.
  if (req.method === "GET" && req.url.startsWith("/students/")) {

    // 1. Extraer el ID de la URL
    const urlParts = req.url.split("/");
    const studentId = urlParts[urlParts.length - 1];

    // 2. Buscar al alumno
    const student = students.find(s => s.id === studentId || s.id === parseInt(studentId));

    // 3. Configurar la cabecera de respuesta para JSON
    res.setHeader("Content-Type", "application/json");

    if (student) {
      // Escenario A: Alumno encontrado
      res.writeHead(200);
      res.end(JSON.stringify(student));
    } else {
      // Escenario B: Alumno no encontrado
      res.writeHead(404);
      res.end(JSON.stringify({
        error: "Student not found",
        message: `No se encontró ningún alumno con el ID: ${studentId}`
      }));
    }
  }









  // TODO 2: DELETE /students/:id
  if (req.method === "DELETE" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    const urlParts = req.url.split("/");
    const studentId = urlParts[urlParts.length - 1];

    // 2. Comprobar si existe
    const student = students.find(s => s.id === studentId || s.id === parseInt(studentId));

    //El estudiante existe
    if (student) {
      // 3. Eliminarlo del array
      // Escenario A: Alumno encontrado
      res.writeHead(204);
      students[student].delete

    }
    // 4. Si no existe → 404
    //El estudiante no existe
    else {
      res.writeHead(404);
      res.end(JSON.stringify({
        error: "Student not found",
        message: `No se encontró ningún alumno con el ID: ${studentId}`
      }));
    }
    // 5. Si se elimina → 204 (sin body)

  }





  
  // TODO 3: POST /students
  if (req.method === "POST" && req.url === "/students") {

    // 1. Leer el body con readBody() --> Es donde esta toda la info del nuevo alumno.
    // 2. Validar que tenga id, nombre y curso
    // 3. Comprobar que el id no esté repetido
    // 4. Añadir al array students
    // 5. Devolver 201 + alumno creado

  }

  // TODO 4: PUT /students/:id
  if (req.method === "PUT" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    // 2. Buscar alumno
    // 3. Si no existe → 404
    // 4. Leer body con readBody() --> Ahora será otra callback!!!
    // 5. Actualizar campos enviados
    // 6. Devolver 200 + alumno actualizado

  }



  // Si no coincide ningún endpoint
  sendJson(res, 404, { message: "Not Found" });

});


/* TODO: Crear función que lea el body y devuelva el JSON parseado
En Node puro, el body no viene empaquetado.
Llega en trozos.
Tenemos que montarlo nosotros.*/
function readBody(req, callback) {
  let body = "";

  req.on("data", chunk => {
    //Vamos obteniendo los trozos
    body += chunk;
  });

  req.on("end", () => {
    try {
      const alumnoNew = JSON.parse(body);
      //Aquí ya tenemos al alumno.
      callback(null, alumnoNew);
    } catch (err) {
      callback(err);
    }
  });
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

