import React from "react";
import { TimelineLite } from "gsap";

class SignUpCard extends React.Component {
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
        <h2>Sign Up</h2>
        <input onChange={this.props.handleInputChange} name="signup--email" placeholder="Email Address..." />
        <input onChange={this.props.handleInputChange} name="signup--name" placeholder="First Name..." />
        <input type="password" onChange={this.props.handleInputChange} name="signup--password" placeholder="Password..." />
        <input type="password" onChange={this.props.handleInputChange} name="signup--password-reenter" placeholder="Re-Enter Password..." />
        <button onClick={this.props.handleSignUp}>Submit</button>
      </div>
    );
  }
}

export default SignUpCard;