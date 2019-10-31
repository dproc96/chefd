const Algorithm = {
  rateRecipe(recipe) {
    recipe.score = 1;
    return recipe;
  },
  selectRecipeIndex(recipes) {
    let total = 0;
    for (let recipe of recipes) {
      total += recipe.score;
    }
    const selection = Math.ceil(Math.random() * total);
    let i = 0;
    while (total > selection) {
      total -= recipes[i].score;
      i++;
    }
    return i;
  },
  selectRecipe(recipes) {
    recipes = recipes.map(this.rateRecipe);
    return recipes[this.selectRecipeIndex(recipes)];
  },
  selectSevenRecipes(recipes) {
    recipes = recipes.map(this.rateRecipe);
    results = [];
    for (let i = 0; i < 7; i++) {
      let index = this.selectRecipeIndex(recipes);
      results.push(recipes[index]);
      recipes.splice(index, 1);
    }
    return results;
  }
};

module.exports = Algorithm;