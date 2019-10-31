import React, { Component } from 'react';
import recipes from './fakerecipes.json'
import RecipeCard from '../RecipeCard';
import './RecipeCardList.css'

class RecipeCardList extends Component{
render(){
  return(
    <div className="RecipeCardList">
    {recipes.map(recipe=>{
      console.log(recipe)
     return <RecipeCard name={recipe.name} key={recipe.id} imageSrc={recipe.image} ingredients={recipe.ingredients}/>
    })}
    </div>
  )
}


}

export default RecipeCardList;