import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import MealPlan from './pages/MealPlan';
import GroceryList from './components/GroceryList';
import Pantry from './pages/Pantry';
import axios from 'axios';
import SearchRecipes from './pages/SearchRecipes';
import Modal from 'react-modal';
import theme from './theme';
import PantryList from './components/PantryList';

Modal.setAppElement('#root')

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            name: null,
            location: window.location.pathname,
            isGroceryListOpen: false,
            pantry: [],
            recipes: [],
            pantryItem: ""
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
        {
            path: "/favorites",
            name: "My Favorites"
        }
    ];
    closeGroceryList = () => {
        this.setState({isGroceryListOpen: false})
    }
    getSevenMeals = () => {
        axios.get(window.location.origin + "/api/recipes/week").then(results => {
            this.setState({ recipes: results.data }, this.checkPantry);
        }).catch(error => {
            console.log(error);
        })
    }
    generateGroceryList = (open = true) => {
        if (this.state.groceryList && open) {
            this.setState({
                isGroceryListOpen: open,
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
                                    checked: ingredient.isInPantry
                                };
                            }
                        }
                    }
                }
            }
            this.setState({
                isGroceryListOpen: open,
                groceryList: groceryList
            });
        }
    }
    checkPantry = () => {
        const recipes = [...this.state.recipes];
        const pantry = [...this.state.pantry];
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients) {
                if (ingredient.ingredient) {
                    let isInPantry = false
                    for (let item of pantry) {
                        if (ingredient.ingredient.toLowerCase().indexOf(item.toLowerCase()) > -1) {
                            isInPantry = true;
                        }
                    }
                    ingredient.isInPantry = isInPantry;
                }
            }
        }
        this.setState({
            recipes: recipes
        }, () => {this.generateGroceryList(this.state.isGroceryListOpen)})
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
            }, this.checkPantry)
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
            axios.post(window.location.origin + "/users/login", info).then(results => {
                this.setState({
                    isLoggedIn: true,
                    name: results.data.user.name,
                    token: results.data.token,
                    location: "/"
                })
            }).catch(error => {
                console.log(error);
            })
        }
    }
    handleLogOut = () => {
        axios.post(window.location.origin + "/users/logout", {}, {headers: {Authorization: `Bearer ${this.state.token}`}}).then(results => {
            this.setState({
                isLoggedIn: false,
                name: null,
                token: null
            })
            window.location.reload()
        }).catch(error => {
            console.log(error)
        })
    }
    handleSignUp = () => {
        const info = {
            email: this.state["signup--email"],
            name: this.state["signup--name"],
            password: this.state["signup--password"],
            passwordReenter: this.state["signup--password-reenter"]
        }
        if (info.email && info.email.match(/.+@.+\..+/) && info.password && info.name && info.password === info.passwordReenter) {
            delete info.passwordReenter;
            axios.post(window.location.origin + "/users/register", info).then(results => {
                this.setState({
                    isLoggedIn: true,
                    name: results.data.user.name,
                    token: results.data.token
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
    handleLink = path => {
        this.setState({
            location: path
        })
    }
    handleSearchLink = event => {
        const index = event.target.value;
        this.setState({ choosing: index });
    }
    handleSelectRecipe = recipe => {
        if (this.state.choosing) {
            const recipes = [...this.state.recipes];
            recipes[this.state.choosing] = recipe;
            this.setState({ recipes: recipes })
        }
    }
    handleAddItemToPantry = () => {
        const pantry = [...this.state.pantry];
        let item = this.state.pantryItem;
        item = item.slice(0, 1).toUpperCase() + item.slice(1);
        if (item) {
            pantry.push(item);
            this.setState({ 
                pantry: pantry,
                pantryItem: ""
            }, this.checkPantry)
        }
    }
    handleRemoveItemFromPantry = event => {
        const index = event.target.id;
        const pantry = [...this.state.pantry];
        pantry.splice(index, 1);
        this.setState({
            pantry: pantry
        }, this.checkPantry);
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
                width: "600px",
                maxWidth: "80%",
                left: "50%",
                marginLeft: "-300px",
                backgroundColor: theme.blue,
                textAlign: "center",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto",
                gridTemplateAreas: `
                    'pantry grocery'
                    'button button'
                `,
            },
            overlay: {
                zIndex: 4,
            }
        }
        const props = {
            toolbar: {
                handleLink: this.handleLink,
                isLoggedIn: this.state.isLoggedIn,
                handleLogOut: this.handleLogOut,
                firstName: this.state.name
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
                handleSearchLink: this.handleSearchLink,
                generateGroceryList: this.generateGroceryList,
                recipes: this.state.recipes,
                groceryList: this.state.groceryList
            },
            logIn: {
                handleInputChange: this.handleInputChange,
                handleLogIn: this.handleLogIn,
                handleSignUp: this.handleSignUp,
                isLoggedIn: this.state.isLoggedIn
            },
            groceryList: {
                groceryList: this.state.groceryList,
                handleGroceryChange: this.handleGroceryChange,
                handleCheckbox: this.handleCheckbox,
                style: {
                    gridArea: "grocery",
                    overflow: "scroll"
                }
            },
            pantryList: {
                pantry: this.state.pantry,
                handleRemoveItemFromPantry: this.handleRemoveItemFromPantry,
                showTitle: true,
                style: {
                    gridArea: "pantry",
                    borderRight: `2px solid ${theme.darkBlue}`,
                    overflow: "scroll"
                }
            },
            search: {
                handleSelectRecipe: this.handleSelectRecipe
            },
            pantry: {
                handleInputChange: this.handleInputChange,
                pantryItem: this.state.pantryItem,
                pantry: this.state.pantry,
                handleAddItemToPantry: this.handleAddItemToPantry,
                handleRemoveItemFromPantry: this.handleRemoveItemFromPantry,
                isLoggedIn: this.state.isLoggedIn
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
                            <SearchRecipes {...props.search} />
                        </Route>
                        <Route exact path="/pantry">
                            <Pantry {...props.pantry} />
                        </Route>
                    </Content>
                    <Footer />
                </div>
                <Modal style={modalStyle} isOpen={this.state.isGroceryListOpen}>
                    <PantryList {...props.pantryList} />
                    <GroceryList {...props.groceryList} />
                    <button style={{gridArea: "button", textAlign: "center"}} onClick={this.closeGroceryList}>Close List</button>
                </Modal>
            </Router>
        )
    }
}

export default App;