import React from "react";
import NavLink from "./NavLink";
import theme from "../theme";

class Sidebar extends React.Component {
  render() {
    const style = {
      gridArea: "sidebar",
      backgroundColor: theme.blue,
      boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.3)",
      zIndex: 1,
      padding: "10px"
    };
    return (
      <div style={style}>
        {this.props.navLinks.map((navProps, i) => {
          return (
            <NavLink handleLogOut={this.props.handleLogOut} key={i} active={this.props.location === navProps.path} handleLink={this.props.handleLink} {...navProps} />
          );
        })}
      </div>
    );
  }
}

export default Sidebar;