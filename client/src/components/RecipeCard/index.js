import React, { Component } from 'react';
import './RecipeCard.css';
import theme from '../../theme';

class RecipeCard extends Component {
  render() {
    const style = {
      backgroundColor: theme.blue,
    };
    return (   
      this.props.recipe ?
        <div onDragEnd={this.props.handleDragEnd} onDragEnter={this.props.handleDragOver} onDragStart={this.props.handleDragCardStart} id={this.props.value} draggable style={style} className="RecipeCard">
          <h4>{this.props.day} -- "{this.props.recipe.title}"</h4>
          <img onDragEnter={this.props.handleDragOver} id={this.props.value} draggable={false} src={this.props.recipe.image} alt={this.props.recipe.title} />
          <div>
            <p>You are missing ingredients</p>
          </div>
          <div>
            <a target="_blank" rel="noopener noreferrer" href={this.props.recipe.url}><button>Read More</button></a>
            <button onClick={this.props.handleReshuffle} value={this.props.value}>Reshuffle</button>
            <button>Choose Yourself!</button>
            <button onClick={this.props.handleBlockDay} value={this.props.value}>Block Off Day</button>
          </div>
        </div>
        :
        <div onDragEnd={this.props.handleDragEnd} onDragOver={this.props.handleDragOver} onDragStart={this.props.handleDragCardStart} id={this.props.value} draggable style={style} className="RecipeCard">
          <h4>{this.props.day} -- You have blocked off this day</h4>
          <button onClick={this.props.handleReshuffle} value={this.props.value}>Unblock</button>
        </div>
    );
  }

}


export default RecipeCard;