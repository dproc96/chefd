import React from 'react';

class Logo extends React.Component {
  render() {
    const style = {
      fontFamily: "'Lobster', cursive",
      color: "#eeeeee",
      display: "flex",
      alignItems: "center",
      margin: "0px 20px"
    };
    const h3 = {
      fontFamily: "'Lobster', cursive",
      margin: "0px 10px",
      fontSize: "20px",
      letterSpacing: "1px"
    }
    return (
      <div style={style}>
        <h3 style={h3}>Chef'd Meal Planner</h3>
        {!this.props.isMobile && <img alt="Logo" style={{ width: 30 }} src="/images/chefd-logo.png" />}
      </div>
    )
  }
}

export default Logo;