import React from "react";
import theme from "../theme";
import Color from "color";
import { TimelineLite } from "gsap";


class Account extends React.Component {
  element = null;
  tween = new TimelineLite({ paused: true })
  componentDidMount() {
    this.tween.fromTo(this.element, {
      css: {
        opacity: 0,
        scale: 0.7
      }
    }, {
        delay: 0.2,
        ease: "elastic",
        css: {
          visibility: "visible",
          scale: 1,
          opacity: 1
        },
        duration: 0.7,
      }).play()
  }
  render() {
    const style = {
      backgroundImage: `linear-gradient(to bottom right, ${Color(theme.red).mix(Color(theme.blue)).lighten(0.3)}, ${Color(theme.darkBlue)})`,
      width: this.props.isMobile ? "80%" : 300,
      minHeight: 100,
      padding: 15,
      margin: 10,
      borderRadius: 15,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      visibility: "hidden"
    };
    return (
      this.props.isLoggedIn ?
        // <Fade right>
          <div style={{display: "flex", justifyContent: "center"}}>
            <div ref={div => {this.element = div}} style={style}>
              <h3>{this.props.name}'s Account</h3>
              <h5>Email:</h5>
              <input name="emailEdit" onChange={this.props.handleInputChange} value={this.props.emailEdit} />
              <h5>Name:</h5>
              <input name="nameEdit" onChange={this.props.handleInputChange} value={this.props.nameEdit} />
              <h5>Password:</h5>
              <input type="password" name="passwordEdit" onChange={this.props.handleInputChange} placeholder="Change password..." value={this.props.passwordEdit} />
              <input type="password" name="passwordReenterEdit" onChange={this.props.handleInputChange} placeholder="Reenter password..." value={this.props.passwordReenterEdit} />
              <p style={{color: theme.red, display: this.props.error ? "auto" : "none"}}>{this.props.error}</p>
              <button onClick={this.props.handleUpdateUser}>Update Account</button>
            </div>
          </div>
        // </Fade>
        :
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4 style={{ alignSelf: "center" }}>You Must Be Logged In To Access This Page</h4>
        </div>
    );
  }
}

export default Account;