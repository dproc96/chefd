const mongoose = require("mongoose");

const RecipeExternalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  }
});

const RecipeExternal = mongoose.model("RecipeExternal", RecipeExternalSchema);

module.exports = RecipeExternal;