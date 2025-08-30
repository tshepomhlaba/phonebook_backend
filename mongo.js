const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("Usage: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tshepo:${password}@cluster0.ykxlxpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person
  .save()
  .then((result) => {
    console.log(`Added ${person.name} ${person.number} to phonebook`);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error saving person:", error);
    mongoose.connection.close();
  });
