const Algorithm = {
  rateRecipe(recipe) {
    let missingIngredients = 0;
    let ingredientsOwned = 0;
    for (let ingredient of recipe.ingredients) {
      if (!ingredient.isInPantry) {
        missingIngredients++;
      }
      else {
        ingredientsOwned++;
      }
    }
    recipe.score = Math.max(1, 50 - (5 * missingIngredients) + (2 * ingredientsOwned));
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
  selectRecipe(recipes, pantry) {
    recipes = this.checkPantry(recipes, pantry);
    recipes = recipes.map(this.rateRecipe);
    return recipes[this.selectRecipeIndex(recipes)];
  },
  selectSevenRecipes(recipes, pantry) {
    recipes = this.checkPantry(recipes, pantry);
    recipes = recipes.map(this.rateRecipe);
    results = [];
    for (let i = 0; i < 7; i++) {
      let index = this.selectRecipeIndex(recipes);
      results.push(recipes[index]);
      recipes.splice(index, 1);
    }
    return results;
  },
  checkPantry(recipes, pantry) {
    for (let recipe of recipes) {
      for (let ingredient of recipe.ingredients) {
        if (ingredient.ingredient) {
          let isInPantry = false;
          for (let item of pantry) {
            if (ingredient.ingredient.toLowerCase().indexOf(item.toLowerCase()) > -1) {
              isInPantry = true;
            }
          }
          ingredient.isInPantry = isInPantry;
        }
      }
    }
    return recipes;
  }
};

module.exports = Algorithm;