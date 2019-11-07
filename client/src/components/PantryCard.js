import React from "react";
import theme from "../theme";
import PantryList from "./PantryList";

class PantryCard extends React.Component {
  render() {
    const style = {
      backgroundColor: theme.blueTranslucent,
      width: 300,
      minHeight: 100,
      padding: 15,
      margin: 10,
      borderRadius: 5
    };
    return (
      <div style={style}>
        <PantryList {...this.props} />
      </div>
    );
  }
}

export default PantryCard;