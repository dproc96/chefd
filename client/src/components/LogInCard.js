import React from "react";
import theme from "../theme";
import { TimelineLite } from "gsap";

class LogInCard extends React.Component {
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
    return (
      <div ref={div => this.element = div} style={this.props.cardStyle}>
        <h2>Log In</h2>
        <input onChange={this.props.handleInputChange} name="login--email" placeholder="Email Address..." />
        <input onChange={this.props.handleInputChange} type="password" name="login--password" placeholder="Password..." />
        <p style={{ color: theme.red, display: this.props.error ? "block" : "none" }}>{this.props.error}</p>
        <button onClick={this.props.handleLogIn}>Submit</button>
      </div>
    );
  }
}

export default LogInCard;