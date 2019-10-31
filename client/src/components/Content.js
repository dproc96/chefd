import React from "react";

class Content extends React.Component {
  render() {
    const style = {
      gridArea: "content",
    };
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default Content;