import React from "react";
import theme from "../theme";

class PantryInput extends React.Component {
  render() {
    const style = {
      backgroundColor: theme.blueTranslucent,
      width: this.props.isMobile ? "80%" : 300,
      padding: 10,
      margin: 10,
      borderRadius: 5,
      textAlign: "center"
    };
    return (
      <div style={style}>
        <input onChange={this.props.handleInputChange} name="pantryItem" value={this.props.value} placeholder="Enter ingredient you have..." />
        <button onClick={this.props.handleAddItemToPantry}>Add To Pantry</button>
      </div>
    );
  }
}

export default PantryInput;