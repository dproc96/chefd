const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  fetchArrayOfRecipes: async function(ids) {
    return new Promise (async function(resolve) {
        const recipes = [];
        for (let id of ids) {
          await db.RecipeExternal.find({_id: new mongoose.Types.ObjectId(id)}, (error, data) => {
            if (error) {
              console.log(error);
            }
            else {
              recipes.push(data[0]);
            }
          });
        }
        console.log(recipes)
        resolve(recipes);
    })
  }
};

