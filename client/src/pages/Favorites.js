import React from 'react';
import RecipeCard from '../components/RecipeCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.props.pullFavorites();
  }
  render() {
    const style = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    };
    return (
      <div style={style}>
        {this.props.recipes.map(recipe => {
          return <RecipeCard handleFavoriteUnfavorite={this.props.handleFavoriteUnfavorite} isMobile={this.props.isMobile} recipe={recipe} />
        })}
      </div>
    );
  }
}

export default Favorites;