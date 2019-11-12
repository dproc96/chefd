import React, { Component } from "react";
// import API from '../utils/API.js';
import SearchForm from '../components/SearchForm';
import RecipeCard from "../components/RecipeCard";
// import paginate from 'paginate-array';

class SearchRecipes extends Component {
  state = {
    search: "",
    recipes: [],
    error: "",
    size: 7,
    page: 1,
    currPage: null
  };

  // loadRecipes = () => {
  //   API.searchRecipesByTitle(this.state.search)
  //     .then(recipes =>{
  //       const { page, size } = this.state;
  //       const currPage = paginate(recipes.data, page, size);
  //       this.setState({
  //         recipes:recipes,
  //         currPage: currPage
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  // previousPage=() =>{
  //   const { page, size, recipes } = this.state;

  //   if (page > 1) {
  //     const newPage = page - 1;
  //     const newCurrPage = paginate(recipes.data, newPage, size);

  //     this.setState({
  //       ...this.state,
  //       page: newPage,
  //       currPage: newCurrPage
  //     });
  //   }
  // }

  // nextPage=()=> {
  //   const { currPage, page, size, recipes } = this.state;
  //   if (page < currPage.totalPages) {
  //     const newPage = page + 1;
  //     const newCurrPage = paginate(recipes.data, newPage, size);
  //     console.log(newCurrPage)
  //     this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
  //     console.log(this.state)
  //   }
  // }

  // handleSubmitButton = event => {
  //   event.preventDefault();
  //   this.loadRecipes()
  // };

  // handleInputChange = event => {
  //   this.setState({ search: event.target.value });
  // };

  
  

  render() {
    const { currPage } = this.props.state;
    return (
      <div style={{ textAlign: "center" }} className="SearchReipes">
        <SearchForm handleInputChange={this.props.handleInputChange} handleSubmitButton={this.props.handleSubmitButton} />
        {currPage && 
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {currPage.data.map(recipe => {
            return <RecipeCard {...this.props} recipe={recipe} />
            })}
        </div>
        }
        {this.props.state.currPage ? (
        <div>
        <button style={{ width: "100px" }} onClick={this.props.previousPage}>Previous Page</button>
        <button style={{ width: "100px" }} onClick={this.props.nextPage}>Next Page</button>
        </div>
        ): (
            <h3>No Results to Display</h3>
          )}
      </div>
    )
  }

}
export default SearchRecipes

