import React from "react";
import theme from "../theme";
import Color from "color";

class PantryInput extends React.Component {
  render() {
    const style = {
      backgroundImage: `linear-gradient(to bottom , ${Color(theme.darkBlue).lighten(0.1)} 50%, ${Color(theme.yellow).lighten(0.1)})`,
      width: this.props.isMobile ? "80%" : 300,
      padding: 10,
      margin: 10,
      borderRadius: 15,
      textAlign: "center",
      boxShadow: "1px 1px 5px 5px rgba(16,117,179,0.2)"
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