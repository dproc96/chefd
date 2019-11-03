import React, { Component } from "react";
// import recipes from "./fakerecipes.json";
import RecipeCard from "../RecipeCard";
import "./RecipeCardList.css";

class RecipeCardList extends Component{
  render(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return(
      <div className="RecipeCardList">
        {this.props.recipes && this.props.recipes.map((recipe, i) => {
          const props = {
            handleDragEnd: this.props.handleDragEnd,
            handleDragOver: this.props.handleDragOver,
            handleDragCardStart: this.props.handleDragCardStart,
            handleBlockDay: this.props.handleBlockDay,
            handleReshuffle: this.props.handleReshuffle,
            handleSearchRecipes: this.props.handleSearchRecipes,
            day: days[i],
            recipe: recipe
          };
          return <RecipeCard {...props} value={i} key={i} />;
        })}
      </div>
    );
  }


}

// recipes.map(recipe => {
//    console.log(recipe);
//    return <RecipeCard name={recipe.name} key={recipe.id} imageSrc={recipe.image} ingredients={recipe.ingredients} />;
//  })

export default RecipeCardList;