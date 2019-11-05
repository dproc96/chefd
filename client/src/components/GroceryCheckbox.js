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
      cursor: this.state.hover ? "pointer" : "auto",
      borderRadius: "2px",
      color: "#222222",
      fontSize: "8px",
      textAlign: "center"
    }
    return (
      <div id={this.props.ingredient} onClick={this.props.handleCheckbox} onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverEnd} style={style}>
        {this.props.checked && <i id={this.props.ingredient} className="fas fa-check"></i>}
      </div>
    )
  }
}

export default GroceryCheckbox;