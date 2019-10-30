import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import LogIn from './pages/LogIn';

class App extends React.Component {
    state = {
        isLoggedIn: false,
        firstName: null,
        location: window.location.pathname
    };
    navLinks = [
        {
            path: "/",
            name: "Plan your week"
        },
        {
            path: "/pantry",
            name: "Edit your pantry"
        },
        {
            path: "/account",
            name: "My Account"
        },
    ];
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    handleLogIn = () => {
        const info = {
            email: this.state["login--email"],
            password: this.state["login--password"]
        }
        if (info.email && info.email.match(/.+@.+\..+/) && info.password) {
            //logic to be written by Dan and Giri together
        }
    }
    handleSignUp = () => {
        const info = {
            email: this.state["signup--email"],
            name: this.state["signup--name"],
            password: this.state["signup--password"],
            passwordReenter: this.state["signup--password-reenter"]
        }
        if (info.email.match(/.+@.+\..+/) && info.password && info.name && info.password === info.passwordReenter) {
            //logic to be written by Dan and Giri together
        }
    }
    handleLink = path => {
        this.setState({
            location: path
        })
    }
    render() {
        const style = {
            display: 'grid',
            gridTemplateRows: '50px 1fr',
            gridTemplateColumns: '300px 1fr',
            gridTemplateAreas: `
                'toolbar toolbar'
                'sidebar content'
            `,
            minHeight: '100vh'
        }
        return (
            <Router>
                <div style={style}>
                    <Toolbar handleLink={this.handleLink} isLoggedIn={this.state.isLoggedIn} firstName={this.state.firstName} />
                    <Sidebar handleLink={this.handleLink} location={this.state.location} navLinks={this.navLinks} />
                    <Content>
                        <Route exact path="/">

                        </Route>
                        <Route exact path="/login">
                            <LogIn handleInputChange={this.handleInputChange} handleLogIn={this.handleLogIn} />
                        </Route>
                    </Content>
                </div>
            </Router>
        )
    }
}

export default App;