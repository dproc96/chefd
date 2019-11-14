import React from "react";
import theme from "../theme";
import Color from "color";

class PantryInput extends React.Component {
  render() {
    const style = {
      backgroundImage: `linear-gradient(to bottom right, ${Color(theme.red).mix(Color(theme.blue)).lighten(0.3)}, ${Color(theme.darkBlue)})`,
      width: this.props.isMobile ? "80%" : 300,
      padding: 10,
      margin: 10,
      borderRadius: 15,
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