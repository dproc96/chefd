import React from "react";
import { TimelineLite } from "gsap";

class PantryList extends React.Component {
  elements = [];
  tween = new TimelineLite({ paused: true })
  componentDidUpdate(prevProps) {
    if (this.props.pantry.length > prevProps.pantry.length) {
      for (let i = prevProps.pantry.length; i < this.props.pantry.length; i++) {
        this.tween.fromTo(this.elements[i], {
          css: {
            opacity: 0,
            scale: 0.7
          }
        }, {
          duration: 0.5,
          delay: 0.2,
          ease: "elastic",
          css: {
            opacity: 1,
            scale: 1
          }
        }).play()
      }
    }
  }
  componentDidMount() {
    this.tween.staggerFromTo(this.elements, 0.5, {
      css: {
        opacity: 0,
        scale: 0.7
      }
    }, {
        duration: 0.5,
        delay: 0.2,
        ease: "elastic",
        css: {
          opacity: 1,
          scale: 1
        }
      }, 0.1).play()
  }
  render() {
    return (
      <div>
        {this.props.showTitle && <h3>Pantry</h3>}
          <ul>
            {this.props.pantry.map((item, i) => {
              return <li ref={li => {this.elements[i] = li}} style={{ margin: "5px 0px" }} key={i}>
                <i onClick={this.props.handleRemoveItemFromPantry} id={i} style={{ marginRight: "10px" }} className="close fas fa-times"></i>
                {item}
              </li>;
            })}
          </ul>
      </div>
    );
  }
}

export default PantryList;