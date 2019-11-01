import React, { Component } from "react";
// import recipes from "./fakerecipes.json";
import RecipeCard from "../RecipeCard";
import "./RecipeCardList.css";

class RecipeCardList extends Component{
  render(){
    return(
      <div className="RecipeCardList">
        {this.props.recipes && this.props.recipes.map(recipe => {
          return <RecipeCard name={recipe.title} key={recipe.url} url={recipe.url} imageSrc={recipe.image} ingredients={recipe.ingredients} />;
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