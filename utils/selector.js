const API = require('./API');
const Algorithm = require('./algorithm');

const Selector = {
    terms: ["beef", "chicken", "pork", "veggie", "pasta"],
    selectSevenRecipes: async function(parameters, terms = this.terms){
        let recipes = [];
        for (let term of terms) {
            let results = await API.getRecipes({...parameters, q: term});
            recipes = recipes.concat(results);
        }
        recipes = Algorithm.selectSevenRecipes(recipes);
        console.log(recipes)
    }
}

Selector.selectSevenRecipes({})