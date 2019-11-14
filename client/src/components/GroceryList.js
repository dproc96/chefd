import React from "react";
import GroceryCheckbox from "./GroceryCheckbox";

class GroceryList extends React.Component {
  render() {
    const style = {
      lineHeight: 1.3,
      textAlign: "left"
    };
    const groceryList = [];
    for (let ingredient in this.props.groceryList) {
      let string = `${this.props.groceryList[ingredient].name}${this.props.groceryList[ingredient].amounts[0] ? ` (${this.props.groceryList[ingredient].amounts.join(", ")})` : ""}`;
      string = string.slice(0, 1).toUpperCase() + string.slice(1);
      groceryList.push(
        <div value={ingredient} key={ingredient}>
          <li value={string}>
            <GroceryCheckbox handleCheckbox={this.props.handleCheckbox} ingredient={ingredient} checked={this.props.groceryList[ingredient].checked} />
            <input onChange={this.props.handleGroceryChange} name={ingredient} type="text" style={{ display: "inline-block", textDecoration: this.props.groceryList[ingredient].checked ? "line-through" : "none"}} value={string} />
          </li>
        </div>
      );
    }
    groceryList.sort((a, b) => {
      if (a.props.value < b.props.value) {
        return -1;
      }
      if (a.props.value > b.props.value) {
        return 1;
      }
      return 0;
    });
    return (
      <div>
        <h3>Grocery List</h3>
        <ul style={style}>
          {groceryList}
        </ul>
      </div>
    );
  }
}

export default GroceryList;