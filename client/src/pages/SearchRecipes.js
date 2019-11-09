import React, { Component } from "react";
import API from '../utils/API.js';
import SearchForm from '../components/SearchForm';
import RecipeCard from "../components/RecipeCard";
import paginate from 'paginate-array';

class SearchRecipes extends Component {
  state = {
    search: "",
    recipes: [],
    error: "",
    size: 7,
    page: 1,
    currPage: null


  };

  loadRecipes = () => {
    API.searchRecipesByTitle(this.state.search)
      .then(recipes =>{
        console.log(recipes.data)
        const { page, size } = this.state;
        const currPage = paginate(recipes.data, page, size);
        console.log(currPage)
        this.setState({
          recipes:recipes,
          currPage: currPage
        });
        console.log(this.state)
      })
      .catch(err => console.log(err));
  };

  previousPage=() =>{
    const { currPage, page, size, recipes } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(recipes.data, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage=()=> {
    const { currPage, page, size, recipes } = this.state;
    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(recipes.data, newPage, size);
      console.log(newCurrPage)
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
      console.log(this.state)
    }
  }

  handleChange=(e)=> {
    const { value } = e.target;
    const { recipes, page } = this.state;

    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(recipes.data, newPage, newSize);

    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }

  handleSubmitButton = event => {
    event.preventDefault();
    this.loadRecipes()
  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  
  

  render() {
    const { page, size, currPage } = this.state;
    return (
      <div style={{ textAlign: "center" }} className="SearchReipes">
        <SearchForm handleInputChange={this.handleInputChange} handleSubmitButton={this.handleSubmitButton} />
        {currPage && 
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {currPage.data.map(recipe => {
            return <RecipeCard {...this.props} recipe={recipe} />
            })}
        </div>
        }
        {this.state.currPage ? (
        <div>
        <button style={{ width: "100px" }} onClick={this.previousPage}>Previous Page</button>
        <button style={{ width: "100px" }} onClick={this.nextPage}>Next Page</button>
        </div>
        ): (
            <h3>No Results to Display</h3>
          )}
      </div>
    )
  }

}
export default SearchRecipes

