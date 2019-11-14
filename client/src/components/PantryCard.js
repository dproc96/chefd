import React from "react";
import theme from "../theme";
import PantryList from "./PantryList";
import Color from "color";

class PantryCard extends React.Component {
  render() {
    const style = {
      backgroundImage: `linear-gradient(to bottom , ${Color(theme.darkBlue).lighten(0.1)} 80%, ${Color(theme.yellow).lighten(0.1)})`,
      width: this.props.isMobile ? "80%" : 300,
      minHeight: 100,
      padding: "15px 15px 40px 15px",
      margin: 10,
      borderRadius: 15,
      textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
      boxShadow: "1px 1px 5px 5px rgba(16,117,179,0.2)"
    };
    return (
      <div style={style}>
        <PantryList {...this.props} />
      </div>
    );
  }
}

export default PantryCard;