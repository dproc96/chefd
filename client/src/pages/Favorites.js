import React from 'react';
import Axios from 'axios';
import RecipeCard from '../components/RecipeCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
    Axios.post(`${window.location.origin}/api/recipes/external`, { ids: this.props.favorites }).then(results => {
      this.setState({ recipes: results.data });
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    const style = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    };
    return (
      <div style={style}>
        {this.state.recipes.map(recipe => {
          return <RecipeCard isMobile={this.props.isMobile} recipe={recipe} />
        })}
      </div>
    );
  }
}

export default Favorites;