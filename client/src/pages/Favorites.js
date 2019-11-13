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
      this.props.isLoggedIn ?
        <div style={style}>
          {this.props.recipes.map(recipe => {
            return <RecipeCard handleFavoriteUnfavorite={this.props.handleFavoriteUnfavorite} isMobile={this.props.isMobile} recipe={recipe} />
          })}
        </div>
        :
        <div style={style}>
          <h4 style={{ alignSelf: "center" }}>You Must Be Logged In To Access This Page</h4>
        </div>
    );
  }
}

export default Favorites;