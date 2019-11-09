import React from "react";
import AccountButton from "./AccountButton";
import Logo from "./Logo";
import theme from "../theme";

class Toolbar extends React.Component {
  render() {
    const style = {
      gridArea: "toolbar",
      backgroundColor: theme.darkRed,
      zIndex: 2,
      borderBottom: "1px #777777 solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0px"
    };
    return (
      <div style={style}>
        {this.props.isMobile && <i style={{ padding: "0px 10px" }} onClick={this.props.handleDropdown} className="fas fa-bars"></i>}
        <Logo />
        {this.props.isLoggedIn && !this.props.isMobile && <h3 style={{margin: 0}}>Hello {this.props.firstName}!</h3>}
        {!this.props.isMobile && <AccountButton {...this.props} />}
        {this.props.isMobile && <i style={{ padding: "0px 10px", visibility: "hidden" }} className="fas fa-bars"></i>}
      </div>
    );
  }
}

export default Toolbar;