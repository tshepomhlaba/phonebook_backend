require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

app.use(cors());
app.use(express.static("dist"));

let persons = [];

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status :response-time ms :body"));

app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("<p>Hello World</p>");
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// app.get("/info", (request, response) => {
//   response.send(
//     `<div>Phonebook has info for ${
//       persons.length
//     } people <br> <br> ${new Date()}  </div>`
//   );
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   const persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
