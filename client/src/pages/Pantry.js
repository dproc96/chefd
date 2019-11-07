import React from "react";
import PantryCard from "../components/PantryCard";
import PantryInput from "../components/PantryInput";

class Pantry extends React.Component {
  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      minHeight: "100%",
      alignItems: "flex-start",
      padding: 20
    };
    return (
      this.props.isLoggedIn ?
        <div style={style}>
          <PantryCard handleRemoveItemFromPantry={this.props.handleRemoveItemFromPantry} pantry={this.props.pantry} />
          <PantryInput handleAddItemToPantry={this.props.handleAddItemToPantry} value={this.props.pantryItem} handleInputChange={this.props.handleInputChange} />
        </div>
        :
        <div style={style}>
          <h4 style={{alignSelf: "center"}}>You Must Be Logged In To Access This Page</h4>
        </div>
        
    );
  }
}

export default Pantry;