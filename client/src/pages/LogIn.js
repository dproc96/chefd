import React from "react";
import LogInCard from "../components/LogInCard";
import SignUpCard from "../components/SignUpCard";
import theme from "../theme";
import { Redirect } from "react-router-dom";
import Color from "color";

class LogIn extends React.Component {
  render() {
    const cardStyle = {
      width: this.props.isMobile ? "80%" : 400,
      padding: 20,
      height: "max-content",
      backgroundImage: `linear-gradient(to bottom , ${Color(theme.darkBlue).lighten(0.1)} 65%, ${Color(theme.yellow).lighten(0.1)})`,
      margin: "30px 0px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "1px 1px 5px 5px rgba(16,117,179,0.2)",
      visibility: "hidden"
    };
    const style = {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap"
    };
    return (
      <div style={style}>
        {/* <Fade right> */}
          <LogInCard cardStyle={cardStyle} {...this.props} />
          <SignUpCard cardStyle={cardStyle} {...this.props} />
        {/* </Fade> */}
        {this.props.isLoggedIn && <Redirect to="/" />}
      </div>
    );
  }
}

export default LogIn;