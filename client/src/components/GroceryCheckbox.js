import React from 'react';

class GroceryCheckbox extends React.Component {
    constructor() {
        super()
        this.state = {
            hover: false
        };
    }
    handleHover = () => {
        this.setState({ hover: true });
    } 
    handleHoverEnd = () => {
        this.setState({ hover: false });
    } 
  render() {
    const style = {
      backgroundColor: "#eeeeee",
      border: "1px solid #222222",
      width: "10px",
      height: "10px",
      display: "inline-block",
      marginRight: "10px",
      cursor: this.state.hover ? "cursor" : "auto"
    }
    return (
      <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverEnd} style={style}>

      </div>
    )
  }
}

export default GroceryCheckbox;