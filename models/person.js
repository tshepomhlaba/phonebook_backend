const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: 3,
    reqiured: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        // Ensure at least length 8
        if (!v || v.length < 8) {
          return false;
        }
        // Regex: 2 or 3 digits, dash, then digits only
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXX`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
