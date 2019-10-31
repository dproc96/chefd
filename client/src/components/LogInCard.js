import React from "react";

class LogInCard extends React.Component {
  render() {
    return (
      <div style={this.props.cardStyle}>
        <h2>Log In</h2>
        <input onChange={this.props.handleInputChange} name="login--email" placeholder="Email Address..." />
        <input onChange={this.props.handleInputChange} name="login--password" placeholder="Password..." />
        <button onClick={this.props.handleLogIn}>Submit</button>
      </div>
    );
  }
}

export default LogInCard;