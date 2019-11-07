import React,{Component} from "react";
import API from '../utils/API.js';
import SearchForm from '../components/SearchForm';
import RecipeCard from "../components/RecipeCard";


class SearchRecipes extends Component {
  state = {
    search: "",
    recipes: [],
    error: "",

  };

  loadRecipes = () => {
    API.searchRecipesByTitle(this.state.search,2)
      .then(res =>
        //console.log(res.data)
        this.setState({ recipes: res.data })
      )
      .catch(err => console.log(err));
  };

  handleSubmitButton = event => {
    event.preventDefault();
    this.loadRecipes()
  };
  
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  render(){
    return(
      <div style={{textAlign: "center"}} className="SearchReipes">
        <SearchForm handleInputChange={this.handleInputChange} handleSubmitButton={this.handleSubmitButton} />
        {this.state.recipes.length ? (
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {this.state.recipes.map(recipe => {
              return <RecipeCard {...this.props} recipe={recipe}/>
            })}
          </div>

        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    )
  }


}


export default SearchRecipes