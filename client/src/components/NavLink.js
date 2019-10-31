import React from 'react';
import { Link } from 'react-router-dom';

class NavLink extends React.Component {
    handleClick = () => {
        this.props.handleLink(this.props.path)
    }
    render() {
        const style = {
            margin: "15px",
            fontSize: 18,
            display: "block"
        }
        if (this.props.active) {
            style.fontWeight = "700"
        }
        return (
            <Link style={style} onClick={this.handleClick} to={this.props.path}>{this.props.active && "| "}{this.props.name}</Link>
        )
    }
}

export default NavLink;