import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import MealPlan from './pages/MealPlan';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            firstName: null,
            location: window.location.pathname
        };
        this.getSevenMeals();
    }
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
    getSevenMeals = () => {
        axios.get(window.location.origin + "/api/recipes/week").then(results => {
            this.setState({recipes: results.data});
        }).catch(error => {
            console.log(error);
        })
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    handleReshuffle = event => {
        const index = event.target.value;
        const recipes = [...this.state.recipes];
        axios.get(window.location.origin + "/api/recipes/one").then(results => {
            recipes[index] = results.data;
            this.setState({recipes: recipes})
        }).catch(error => {
            console.log(error)
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
        if (info.email && info.email.match(/.+@.+\..+/) && info.password && info.name && info.password === info.passwordReenter) {
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
            gridTemplateRows: '50px 1fr 60px',
            gridTemplateColumns: '300px 1fr',
            gridTemplateAreas: `
                'toolbar toolbar'
                'sidebar content'
                'footer footer'
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
                            <MealPlan handleReshuffle={this.handleReshuffle} recipes={this.state.recipes} />
                        </Route>
                        <Route exact path="/login">
                            <LogIn handleInputChange={this.handleInputChange} handleLogIn={this.handleLogIn} />   
                        </Route>
                    </Content>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;