import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import MealPlan from './pages/MealPlan';
import GroceryList from './components/GroceryList';
import axios from 'axios';
import SearchRecipes from './pages/SearchRecipes';
import Modal from 'react-modal';
import theme from './theme';

Modal.setAppElement('#root')

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            firstName: null,
            location: window.location.pathname,
            isGroceryListOpen: false
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
    closeGroceryList = () => {
        this.setState({isGroceryListOpen: false})
    }
    getSevenMeals = () => {
        axios.get(window.location.origin + "/api/recipes/week").then(results => {
            this.setState({ recipes: results.data });
        }).catch(error => {
            console.log(error);
        })
    }
    generateGroceryList = () => {
        if (this.state.groceryList) {
            this.setState({
                isGroceryListOpen: true,
            });
        }
        else {
            const recipes = this.state.recipes;
            const groceryList = {};
            for (let recipe of recipes) {
                if (recipe) {
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient) {
                            if (groceryList.hasOwnProperty(ingredient.ingredient)) {
                                groceryList[ingredient.ingredient].amounts.push(`${ingredient.quantity && ingredient.quantity} ${ingredient.unit && ingredient.unit}`);
                            }
                            else {
                                groceryList[ingredient.ingredient] = {
                                    name: ingredient.ingredient,
                                    amounts: [`${ingredient.quantity ? ingredient.quantity : ""}${ingredient.quantity && ingredient.unit ? " " : ""}${ingredient.unit ? ingredient.unit : ""}`],
                                    checked: false
                                };
                            }
                        }
                    }
                }
            }
            this.setState({
                isGroceryListOpen: true,
                groceryList: groceryList
            });
        }
    }
    handleCheckbox = event => {
        const groceryList = this.state.groceryList;
        const ingredient = event.target.id;
        groceryList[ingredient].checked = !groceryList[ingredient].checked;
        this.setState({groceryList: groceryList});
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    handleGroceryChange = event => {
        const { name, value } = event.target;
        const groceryList = {...this.state.groceryList};
        groceryList[name].name = value;
        groceryList[name].amounts = [""];
        this.setState({
            groceryList: groceryList
        });
    }
    handleReshuffle = event => {
        const index = event.target.value;
        const recipes = [...this.state.recipes];
        axios.get(window.location.origin + "/api/recipes/one").then(results => {
            recipes[index] = results.data;
            this.setState({ 
                recipes: recipes,
                groceryList: null
            })
        }).catch(error => {
            console.log(error)
        })
    }
    handleBlockDay = event => {
        const index = event.target.value;
        const recipes = [...this.state.recipes];
        recipes[index] = null;
        this.setState({ 
            recipes: recipes,
            groceryList: null
        });
    }
    handleDragCardStart = event => {
        this.setState({
            dragging: event.target.id,
            draggedOver: event.target.id
        });
    }
    handleDragOver = event => {
        if (this.state.dragging) {
            if (event.target.id) {
                this.setState({ draggedOver: event.target.id })
            }
            else {
                this.setState({ draggedOver: this.state.dragging })
            }
            const recipes = [...this.state.recipes];
            const dragging = this.state.dragging;
            const draggedOver = this.state.draggedOver;
            const temp = recipes[dragging];
            recipes[dragging] = recipes[draggedOver];
            recipes[draggedOver] = temp;
            this.setState({
                recipes: recipes,
                dragging: draggedOver
            })
        }
    }
    handleDragEnd = event => {
        this.setState({
            dragging: null,
            draggedOver: null
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


    handleSearchRecipes=(value)=>{
        const index = value
        console.log(index)
        const recipes = [...this.state.recipes];
        recipes[index] = null;
        this.setState({ recipes: recipes });
        

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
        const modalStyle = {
            content: {
                width: "300px",
                maxWidth: "80%",
                left: "50%",
                marginLeft: "-100px",
                backgroundColor: theme.blue,
                textAlign: "center"
            },
            overlay: {
                zIndex: 4,
            }
        }
        const props = {
            toolbar: {
                handleLink: this.handleLink,
                isLoggedIn: this.state.isLoggedIn,
                firstName: this.state.firstName
            },
            sidebar: {
                handleLink: this.handleLink,
                location: this.state.location,
                navLinks: this.navLinks
            },
            mealPlan: {
                handleDragCardStart: this.handleDragCardStart,
                handleDragOver: this.handleDragOver,
                handleDragEnd: this.handleDragEnd,
                handleBlockDay: this.handleBlockDay,
                handleReshuffle: this.handleReshuffle,
                handleSearchRecipes: this.handleSearchRecipes,
                generateGroceryList: this.generateGroceryList,
                recipes: this.state.recipes,
                groceryList: this.state.groceryList
            },
            logIn: {
                handleInputChange: this.handleInputChange,
                handleLogIn: this.handleLogIn
            },
            groceryList: {
                groceryList: this.state.groceryList,
                handleGroceryChange: this.handleGroceryChange,
                handleCheckbox: this.handleCheckbox
            }
        }
        return (
            <Router>
                <div style={style}>
                    <Toolbar {...props.toolbar} />
                    <Sidebar {...props.sidebar} />
                    <Content>
                        <Route exact path="/">
                            <MealPlan {...props.mealPlan} />
                        </Route>
                        <Route exact path="/login">
                            <LogIn {...props.logIn} />
                        </Route>
                        <Route exact path="/searchrecipes">
                        <SearchRecipes/>
                        </Route>
                    </Content>
                    <Footer />
                </div>
                <Modal style={modalStyle} isOpen={this.state.isGroceryListOpen}>
                    <GroceryList {...props.groceryList} />
                    <button onClick={this.closeGroceryList}>Close List</button>
                </Modal>
            </Router>
        )
    }
}

export default App;