import React from 'react';
import { Link } from 'react-router-dom';

class NavLink extends React.Component {
    render() {
        return (
            <Link to={this.props.path}>{this.props.name}</Link>
        )
    }
}

export default NavLink;