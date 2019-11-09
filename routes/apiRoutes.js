const db = require("../models");
const Algorithm = require("../utils/algorithm");
const Scraper = require("../utils/scraper");
<<<<<<< Updated upstream
const auth = require('../middleware/auth')
const PER_PAGE=10
=======
const auth = require('../middleware/auth');
const Fetcher = require("../utils/fetcher");
>>>>>>> Stashed changes

module.exports = app => {
  app.get("/api/recipes/external", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      response.json(data);
    });
  });

  app.post("/api/recipes/week", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      let recipes = Algorithm.selectSevenRecipes(data, request.body);
      response.json(recipes);
    });
  });


  //api for getting seven random recipes using title name
  app.get("/api/recipes/search", (request, response) => {
    let query = `${request.query.q}`
    let regEx = new RegExp(query, 'gi')
    //let page = `${request.query.page}`
    db.RecipeExternal
      .find({ "title": { "$regex": regEx } })
      .then(recipe => {
        response.json(recipe)
      })
  });

  app.post("/api/recipes/one", (request, response) => {
    db.RecipeExternal.find({}, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      let recipes = Algorithm.selectRecipe(data, request.body);
      response.json(recipes);
    });
  });

  app.put("/api/recipes/scrape", (request, response) => {
    db.RecipeExternal.deleteMany({}, error => {
      if (error) {
        console.log(error);
        response.status(503).end();
      }
      Scraper.scrapeSeriousEats();
      response.json({message: "Starting scrape"});
    });
  });

  app.post("/api/recipes/external", async function(request, response) {
    const ids = request.body.ids;
    console.log(ids);
    const recipes = await Fetcher.fetchArrayOfRecipes(ids);
    response.json(recipes);
  });
};

