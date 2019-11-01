import React from 'react';
import RecipeCardList from '../components/RecipeCardList';

class MealPlan extends React.Component {
  render() {
    return (
      <div>
        <RecipeCardList {...this.props} />
      </div>
    )
  }
}

export default MealPlan;