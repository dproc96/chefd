import React from "react";
import LogInCard from "../components/LogInCard";
import SignUpCard from "../components/SignUpCard";
import theme from "../theme";
import { Redirect } from "react-router-dom";
import Fade from 'react-reveal';
import Color from "color";

class LogIn extends React.Component {
  render() {
    const cardStyle = {
      width: this.props.isMobile ? "80%" : 400,
      padding: 20,
      height: "max-content",
      // backgroundColor: theme.blue,
      backgroundImage: `linear-gradient(to bottom right, ${Color(theme.red).mix(Color(theme.blue)).lighten(0.3)}, ${Color(theme.darkBlue)})`,
      margin: "30px 0px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "2px 2px 3px 3px rgba(0,0,0,0.3)",
    };
    const style = {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap"
    };
    return (
      <div style={style}>
        <Fade right>
          <LogInCard cardStyle={cardStyle} {...this.props} />
          <SignUpCard cardStyle={cardStyle} {...this.props} />
        </Fade>
        {this.props.isLoggedIn && <Redirect to="/" />}
      </div>
    );
  }
}

export default LogIn;