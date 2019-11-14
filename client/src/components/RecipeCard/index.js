import React, { Component } from 'react';
import './RecipeCard.css';
import theme from '../../theme';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal';
import Color from 'color';

class RecipeCard extends Component {
  handleSelect = () => {
    this.props.handleLink("/")
    this.props.handleSelectRecipe(this.props.recipe);
  }
  render() {
    const style = {
      backgroundImage: `linear-gradient(to bottom right, ${Color(theme.red).mix(Color(theme.blue)).lighten(0.3)}, ${Color(theme.darkBlue)})`,
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
    const starClass = this.props.recipe && this.props.recipe.isFavorite ? "fas" : "far"
    return (
      <Fade top>
      {this.props.recipe ?
        <div {...props.card}>
          <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <i onClick={this.props.handleFavoriteUnfavorite} id={this.props.recipe._id} className={starClass + " fa-star"}></i>
            {this.props.day && <h4 style={{borderBottom: "1px solid " + theme.darkBlue, marginBottom: "5px"}}>{this.props.day}</h4>}
            <i style={{visibility: "hidden"}} className="far fa-star"></i>
          </div>
          <h4>{this.props.recipe.title}</h4>
          <img alt={this.props.recipe.title} {...props.img} />
          <div>
            <p>You have {this.props.recipe.ingredients.filter(x => {return x.isInPantry}).length} of {this.props.recipe.ingredients.length} ingredients</p>
          </div>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
            <a {...props.readMore}><button>Read More</button></a>
            {this.props.location === "/" && <button {...props.reshuffle}>Reshuffle</button>}
            {this.props.location === "/" && 
              <Link onClick={() => {this.props.handleLink("/searchrecipes")}} to ="/searchrecipes">
                <button {...props.choose}>Choose Yourself!</button>
              </Link>
            }
            {this.props.location === "/" &&
              <button {...props.block}>Block Off Day</button>
            }
            {this.props.location === "/searchrecipes" &&
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
        </div>}
      </Fade>   
    );
  }

}


export default RecipeCard;