//EJEMPLO MINIMO DE EXPRESS
// Importamos Express usando ES Modules
import express from "express";
//const { express } = require('express');

// Creamos la instancia de la aplicación Express
const app = express();

app.use(express.json());

// Definimos el puerto en una constante para facilitar su configuración
const PORT = 3000;

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

///////////////////////////////////////////////

let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// GET - Uno solo
app.get('/students/perId/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ message: "Not Found" });
  
  return res.status(200).json(student);

  });

// GET -En lista

app.get('/students', (req, res) => {
 const llista = students

 if (!llista) return res.status(404).json({message: "Llista no trobada"});
 
 return res.status(200).json(llista)
})

// POST - Crear
app.post('/students', (req, res) => {
const nuevoAlumno = req.body;

if(!nuevoAlumno.id||!nuevoAlumno.nombre||!nuevoAlumno.curso){
    return res.status(400).json({ message: "Faltan datos del alumno" });
}
if(students.find(s => s.id == nuevoAlumno.id)) return res.status(409).json({ message: "ID already exists" });

students.push(nuevoAlumno);

return res.status(201).json({ message: "Alumne creat" })
});

// DELETE - Borrar
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id !== req.params.id);
  res.status(204).send();
});