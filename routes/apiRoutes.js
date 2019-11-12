const db = require("../models");
const Algorithm = require("../utils/algorithm");
const Scraper = require("../utils/scraper");
const PER_PAGE=10
const auth = require('../middleware/auth');
const Fetcher = require("../utils/fetcher");

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
    const recipes = await Fetcher.fetchArrayOfRecipes(ids);
    response.json(recipes);
  });
  
  app.post("/api/profile", auth, async(request, response)=>{
    const profile = request.body;
    db.Profile.updateOne({ owner: request.user._id }, profile, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      response.status(200).end();
    });
  });

  app.get("/api/profile", (req, res) => {
    db.Profile.find({ owner: request._id }, (error, data) => {
      if (error) {
        res.status(503).end()
      }
      res.json(data);
    })
  })



};

