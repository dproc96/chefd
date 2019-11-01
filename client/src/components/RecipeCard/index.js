import React, { Component } from 'react';
import './RecipeCard.css';
import theme from '../../theme';

class RecipeCard extends Component {
  render() {
    const style = {
      backgroundColor: theme.blue
    }
    return (
      <div style={style} className="RecipeCard">
        <h4>{this.props.name}</h4>
        <img src={this.props.imageSrc} alt={this.props.name} />
        <div>
          <p>You are missing ingredients</p>
        </div>
        <div>
          <button>Read More</button>
          <button>Reshuffle</button>
          <button>Choose Yourself!</button>
        </div>
      </div>
    )
  }

}


export default RecipeCard