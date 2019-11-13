import React from "react";
import theme from "../theme";

class LogInCard extends React.Component {
  render() {
    return (
      <div style={this.props.cardStyle}>
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