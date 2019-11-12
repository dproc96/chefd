import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import RecipeCard from "../components/RecipeCard";

class SearchRecipes extends Component {

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
    );
  }

}
export default SearchRecipes;

