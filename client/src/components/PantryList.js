import React from "react";
import Fade from "react-reveal";

class PantryList extends React.Component {
  render() {
    return (
      <div>
        {this.props.showTitle && <h3>Pantry</h3>}
        <Fade bottom cascade>
          <ul>
            {this.props.pantry.map((item, i) => {
              return <li style={{ margin: "5px 0px" }} key={i}>
                <i onClick={this.props.handleRemoveItemFromPantry} id={i} style={{ marginRight: "10px" }} className="close fas fa-times"></i>
                {item}
              </li>;
            })}
          </ul>
        </Fade>
      </div>
    );
  }
}

export default PantryList;