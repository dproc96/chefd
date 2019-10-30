import React from 'react';

class SignUpCard extends React.Component {
    render() {
        return (
            <div style={this.props.cardStyle}>
                <h2>Sign Up</h2>
                <input onChange={this.props.handleInputChange} name="signup--email" placeholder="Email Address..." />
                <input onChange={this.props.handleInputChange} name="signup--name" placeholder="First Name..." />
                <input type="password" onChange={this.props.handleInputChange} name="signup--password" placeholder="Password..." />
                <input type="password" onChange={this.props.handleInputChange} name="signup--password-reenter" placeholder="Re-Enter Password..." />
                <button onClick={this.props.handleSignUp}>Submit</button>
            </div>
        )
    }
}

export default SignUpCard;