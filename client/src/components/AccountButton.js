import React from 'react';
import { Link } from 'react-router-dom';

class AccountButton extends React.Component {
    render() {
        return (
            <Link to={this.props.isLoggedIn ? "#" : "/login"}>{this.props.isLoggedIn ? "Log Out" : "Log In/Sign Up"}</Link>
        )
    }
}

export default AccountButton;