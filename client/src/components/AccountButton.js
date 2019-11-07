import React from "react";
import { Link } from "react-router-dom";

class AccountButton extends React.Component {
  render() {
    const style = {
      margin: "15px",
      padding: "5px",
      fontSize: 14,
      borderRadius: "5px"
    };
    return (
      <Link style={style} onClick={this.props.isLoggedIn ? this.props.handleLogOut : this.props.handleLink} to={this.props.isLoggedIn ? "#" : "/login"}>{this.props.isLoggedIn ? "Log Out" : "Log In/Sign Up"}</Link>
    );
  }
}

export default AccountButton;