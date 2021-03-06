import React from "react";
import theme from "../theme";

class Footer extends React.Component {
  render() {
    const style = {
      backgroundColor: theme.darkBlue,
      gridArea: "footer",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontStyle: "oblique",
      padding: "10px 0px"
    };
    return (
      <div style={style}>
        <p>External recipes are scraped from Serious Eats</p>
      </div>
    );
  }
}

export default Footer;