import React, { Component } from 'react';
import './RecipeCard.css'

class RecipeCard extends Component {
  render() {
    return (
      <div className="RecipeCard">
        <h4>{this.props.name}</h4>
        <img src={this.props.imageSrc} alt={this.props.name}/>
        <div className="row">
        <div className="col-12">
          <p>You are missing ingredients</p>
        </div>
        <div className="col-12">
        <button>Read More</button>
            <button>Reshuffle</button>
            <button>Choose Yourself!</button>
        </div>

    </div>
    </div>
    )
  }

}


export default RecipeCard