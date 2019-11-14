import React from 'react';
import RecipeCardList from '../components/RecipeCardList';

class MealPlan extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <RecipeCardList {...this.props} />
        <button style={{ width: "40%" }} onClick={this.props.generateGroceryList}>Generate Grocery List</button>
      </div>
    )
  }
}

export default MealPlan;