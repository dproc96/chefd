const db = require("../models");
const Algorithm = require("../utils/algorithm");

module.exports = app => {
  app.get("/api/recipes/external", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      response.json(data);
    });
  });

  app.get("/api/recipes/week", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      let recipes = Algorithm.selectSevenRecipes(data);
      response.json(recipes);
    });
  });

  app.get("/api/recipes/one", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      let recipes = Algorithm.selectRecipe(data);
      response.json(recipes);
    });
  });
};