const db = require("../models");
const Algorithm = require("../utils/algorithm");
const Scraper = require("../utils/scraper");
const auth = require('../middleware/auth')
const PER_PAGE=10

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

 

  // app.get('/api/recipes/search', function (req, res) {

  //   const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  //   const nextOffset = offset + PER_PAGE;
  //   const previousOffset = offset - PER_PAGE < 1 ? 0 : offset - PER_PAGE;

  //   const recipes = []
  //   let query = `${request.query.q}`
  //   let regEx = new RegExp(query, 'gi')
  //   db.RecipeExternal
  //   .find({ "title": { "$regex": regEx }})
  //   .then(recipe =>{
  //     recipes.push(recipe)
  //     return recipes.slice(offset, offset + PER_PAGE);
 
  //   })

  //   const meta = {
  //     limit: PER_PAGE,
  //     next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
  //     offset: req.query.offset,
  //     previous: util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
  //     total_count: recipes.length,
  //   };
  //   console.log(recipes.length)

  //   var json = {
  //     meta: meta,
  //     paginatedRecipes: recipes.slice(offset, offset + PER_PAGE),
  //   };

  //    res.json(json);
  // });




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

  app.post("/api/profile", auth, async(req,res)=>{
    //create the association of the Favourite recipes with the user from auth
    const profile = new db.Profile({
      ...req.body,
      owner:req.user._id
    })
    db.Profile.update(req.body, (error, data) => {
      if (error) {
        response.status(503).end();
      }
      response.json({message: "User Profile"});
    });
    try {
      await profile.save()
      res.status(201).send(profile)
    } catch (e) {
      res.status(400).send(e)
    }
  });

  app.post("/api/account/pantry", (req, res) => {


  })



};

