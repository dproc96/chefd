import React from "react";
import theme from "../theme";
import PantryList from "./PantryList";
import Color from "color";

class PantryCard extends React.Component {
  render() {
    const style = {
      // backgroundColor: theme.blueTranslucent,
      backgroundImage: `linear-gradient(to bottom right, ${Color(theme.red).mix(Color(theme.blue)).lighten(0.3)}, ${Color(theme.darkBlue)})`,
      width: this.props.isMobile ? "80%" : 300,
      minHeight: 100,
      padding: 15,
      margin: 10,
      borderRadius: 15
    };
    return (
      <div style={style}>
        <PantryList {...this.props} />
      </div>
    );
  }
}

export default PantryCard;