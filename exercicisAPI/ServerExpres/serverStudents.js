const express = require('express'); // Usamos require para evitar líos de configuración
const app = express();
const port = 3001;

// Esto es lo único "extra" necesario para que lea el body de los POST/PUT
app.use(express.json());

let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// GET - Listar
app.get('/students', (req, res) => {
  res.json(students);
});

// GET - Uno solo
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  student ? res.json(student) : res.status(404).json({ msg: "No existe" });
});

// POST - Crear
app.post('/students', (req, res) => {
  students.push(req.body);
  res.status(201).json(req.body);
});

// DELETE - Borrar
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id !== req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});