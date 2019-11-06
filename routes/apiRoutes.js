const db = require("../models");
const Algorithm = require("../utils/algorithm");
const Scraper = require("../utils/scraper");
const auth = require('../middleware/auth')

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

  app.post("/api/account/favouriterecipes", auth, async(req,res)=>{
    //create the association of the Useraccount with the user from auth
    const userAccount = new db.UserAccount({
      ...req.body,
      owner:req.user._id
    })
    try {
      await userAccount.save()
      res.status(201).send(userAccount)
    } catch (e) {
      res.status(400).send(e)
    }
  })

  app.post("/api/account/pantry", (req, res) => {


  })



};

