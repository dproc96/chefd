const cheerio = require('cheerio');
const axios = require('axios');

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

module.exports = {
    scrapeSeriousEats: async function () {
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
                recipe.ingredients = ingredients;
            })
        };
        console.log(recipes)
    }
}

