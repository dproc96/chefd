const cheerio = require('cheerio');
const axios = require('axios');
const db = require('../models');
const ingredientParser = require("recipe-ingredient-parser-v2");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function quickParse(string) {
    let quantityTemp = string.match(/\d+ \d+\/\d+/)[0];
    console.log(quantityTemp)
    quantityTemp = quantityTemp.split(" ");
    quantityTemp[1] = quantityTemp[1].split("/");
    console.log(quantityTemp)
    let output = {quantity: parseInt(quantityTemp[0]) + (parseInt(quantityTemp[1][0]) / parseInt(quantityTemp[1][1]))};
    string = string.replace(/\d+ \d+\/\d+ /,"");
    output.unit = string.match(/.+ /)[0].replace(/ /,"");
    output.ingredient = string.replace(/.+ /,"");
    return output;
}

module.exports = {
    scrapeSeriousEats: async function () {
        console.log("Beginning scraping from Serious Eats...")
        let recipes = [];
        for (let i = 1; i < 101; i++) {
            await axios.get(`https://www.seriouseats.com/recipes/topics/meal/mains?page=${i}`).then(results => {
                const $ = cheerio.load(results.data);
                $("#recipes").find(".module").each((i, element) => {
                    const title = $(element).find(".title").text();
                    const url = $(element).find("a").first().attr("href");
                    const image = $(element).find("img").first().attr("data-src");
                    recipes.push({ title: title, url: url, image: image });
                })
            }).catch(error => {
                console.log(error)
            });
        }
        for (let recipe of recipes) {
            const ingredients = []
            await axios.get(recipe.url).then(results => {
                const $ = cheerio.load(results.data);
                $(".ingredient").each((i, element) => {
                    let text = $(element).text()
                    if (text.indexOf("For the") === -1) {
                        ingredients.push($(element).text())
                    }
                })
                recipe.ingredients = ingredients.map(ingredient => {
                    try {
                        ingredient = ingredientParser.parse(ingredient); 
                        ingredient.ingredient = ingredient.ingredient.replace(/ \(.+\)/, "").replace(/,.+/, "").replace(/to \w+ \w+ /, "");
                        return {quantity: ingredient.quantity, unit: ingredient.unit, ingredient: ingredient.ingredient};
                    }
                    catch {
                        console.log(ingredient);
                        try {
                            return quickParse(ingredient);   
                        } catch {
                            console.log("double fail")
                            return {quantity: 1, unit: null, ingredient: ingredient};
                        }
                    }
                });
            }).catch(error => {
                console.log(error)
            })
        };
        db.RecipeExternal.create(recipes, (error, data) => {
            if (error) {
                console.log(error);
            }
            console.log(data);
        })
    }
}
// const ingredientParser = require("recipe-ingredient-parser-v2");

// const test = [
//     "1 pound (450g) red kidney beans ",
//     "Kosher salt",
//     "1 tablespoon (15ml) vegetable oil or lard",
//     "1 pound (about 450g) cooked andouille sausage, cut into 1/2-inch disks",
//     "1 large onion, finely chopped (about 12 ounces; 340g)",
//     "1 green bell pepper, stemmed, seeded, and finely chopped (about 8 ounces; 225g)",
//     "4 ribs celery, finely chopped (about 8 ounces; 225g)",
//     "4 medium cloves garlic, minced",
//     "1/2 teaspoon to 1 tablespoon (3 to 15g) ground cayenne pepper (depending on how hot you like it)",
//     "1 teaspoon (about 4g) ground sage ",
//     "Freshly ground black pepper",
//     "1 smoked ham hock (optional)",
//     "8 ounces (225g) pickled pork shoulder or rind (optional; see note)",
//     "4 sprigs fresh thyme",
//     "3 bay leaves",
//     "Hot sauce, such as Crystal or Frank's, to taste",
//     "Cider vinegar, to taste (optional; see note)",
//     "Cooked white rice, for serving"
// ];

// console.log(test.map(ingredient => {
//     ingredient = ingredientParser.parse(ingredient);
//     ingredient.ingredient = ingredient.ingredient.replace(/ \(.+\)/, "").replace(/,.+/, "").replace(/to \w+ \w+ /, "");
//     return ingredient;
// }))
