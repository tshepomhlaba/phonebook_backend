// const mongoose = require("mongoose");

// const password = process.argv[2];

// const url = ``;

// mongoose.set("strictQuery", false);

// mongoose.connect(url);

// const PersonSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model("Person", PersonSchema);

// if(password) {
// if(process.argv.length === 3) {
//     Person.find({}).then((result) => {
//     result.forEach((person) => {
//       console.log(person);
//     });
//     mongoose.connection.close();
//   }).catch((error) => {
//     console.log("Error retrieving person:", error);
//     mongoose.connection.close();
//   });
// } else if (process.argv.length === 5) {
// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// });

//     person
//   .save()
//   .then((result) => {
//     console.log(`Added ${person.name} ${person.number} to phonebook`);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log("Error saving person:", error);
//     mongoose.connection.close();
//   });
// } else {
//   console.log("Usage: node mongo.js <password> <name> <number>, to create a new user entry")
//   console.log("Usage: node mongo.js <password>, to get all the user entries" )
//   process.exit(1);  
// }
// } else {
// console.log("Error: Please provide password")
//   process.exit(1);  
// }



