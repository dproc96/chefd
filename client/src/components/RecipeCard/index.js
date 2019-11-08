import React, { Component } from 'react';
import './RecipeCard.css';
import theme from '../../theme';
import {Link} from 'react-router-dom'

class RecipeCard extends Component {
  handleSelect = () => {
    this.props.handleSelectRecipe(this.props.recipe);
  }
  render() {
    const style = {
      backgroundColor: theme.blueTranslucent,
      width: this.props.isMobile ? "80%" : 200
    };
    const props = {
      card: {
        onDragStart: this.props.handleDragCardStart,
        onDragEnter: this.props.handleDragOver,
        onDragEnd: this.props.handleDragEnd,
        id: this.props.value,
        draggable: true,
        style: style,
        className: "RecipeCard"
      },
      img: {
        onDragEnter: this.props.handleDragOver,
        id: this.props.value,
        src: this.props.recipe && this.props.recipe.image,
        draggable: false
      },
      readMore: {
        target: "_blank",
        rel: "noopener noreferrer",
        href: this.props.recipe && this.props.recipe.url
      },
      reshuffle: {
        onClick: this.props.handleReshuffle,
        value: this.props.value
      },
      choose: {
        onClick: this.props.handleSearchLink,
        value: this.props.value
      },
      block: {
        onClick: this.props.handleBlockDay,
        value: this.props.value
      },
      select: {
        value: this.props.value,
        onClick: this.handleSelect
      }
    };
    const title = `${this.props.day ? this.props.day + " -- " : ""}"${this.props.recipe && this.props.recipe.title}"`;
    return (   
      this.props.recipe ?
        <div {...props.card}>
          <h4>{title}</h4>
          <img alt={this.props.recipe.title} {...props.img} />
          <div>
            <p>You have {this.props.recipe.ingredients.filter(x => {return x.isInPantry}).length} of {this.props.recipe.ingredients.length} ingredients</p>
          </div>
          <div>
            <a {...props.readMore}><button>Read More</button></a>
            <button {...props.reshuffle}>Reshuffle</button>
            {window.location.pathname === "/" && 
              <Link to ="/searchrecipes">
                <button {...props.choose}>Choose Yourself!</button>
              </Link>
            }
            {window.location.pathname === "/" &&
              <button {...props.block}>Block Off Day</button>
            }
            {window.location.pathname !== "/" &&
              <Link to="/">
                <button {...props.select}>Select</button>
              </Link>
            }
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