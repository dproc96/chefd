import React from 'react';

class AccountButton extends React.Component {
    render() {
        return (
            <button>{this.props.isLoggedIn ? "Log Out" : "Log In/Sign Up"}</button>
        )
    }
}

export default AccountButton;