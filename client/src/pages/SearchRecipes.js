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
    API.getWeeklyRecipes(this.state.search)
      .then(res =>
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

  // componentDidMount() {
  //   let recipeTitle=[]
  //   API.getAllRecipes()
  //     .then(res => 
  //       res.data.map(recipe=>{
  //         recipeTitle.push(recipe.title)
  //         return this.setState({ titles: recipeTitle })
  //       }))
  //     .catch(err => console.log(err));
    
  // }



  // componentDidMount() {
  //   let recipeTitle=[]
  //   API.getAllRecipes()
  //     .then(res =>
  //       console.log(res)
  //       // res.data.map(recipe=>{
  //       //   recipeTitle.push(recipe.title)
  //       // }),

  //       // this.setState({ title: res.data.title },
      
      
  //     .catch(err => console.log(err));
  // };



  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.getWeeklyRecipes(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data);
  //       }
  //       this.setState({ recipes: res.data, error: "" });
  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };



  render(){
    return(
      <div className="SearchReipes">
       <h1>SearchPage</h1>
        <SearchForm handleInputChange={this.handleInputChange} handleSubmitButton={this.handleSubmitButton} />
        {this.state.recipes.length ? (
          this.state.recipes.map(recipe => {
            return <RecipeCard recipe={recipe}/>
          })

        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    )
  }


}


export default SearchRecipes