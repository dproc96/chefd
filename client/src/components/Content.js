import React from "react";

class Content extends React.Component {
  render() {
    const style = {
      gridArea: "content",
      padding: "0px 0px 30px 0px",
      minHeight: "80vh"
    };
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default Content;