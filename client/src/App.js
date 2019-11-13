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
import withSizes from 'react-sizes';
import Favorites from './pages/Favorites';
import API from './utils/API.js';
import paginate from 'paginate-array';
import Account from './pages/Account';

Modal.setAppElement('#root')

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("chefd-token");
        let name, email, pantry = [], favorites = [], isLoggedIn = false;
        if (token) {
            axios.get(window.location.origin + "/users/me", { headers: { Authorization: `Bearer ${token}` } }).then(results => {
                this.setState({
                    name: results.data.name,
                    email: results.data.email,
                    pantry: results.data.profile.pantry,
                    favorites: results.data.profile.favorites,
                    isLoggedIn: true
                })
            }).catch(error => {
                console.log(error)
            })
        }
        this.state = {
            location: window.location.pathname,
            token: token,
            name: name,
            emailEdit: email,
            nameEdit: name,
            isLoggedIn: isLoggedIn,
            isGroceryListOpen: false,
            pantry: pantry,
            recipes: [],
            search: "",
            searchStates: {
                search: "",
                recipes: [],
                error: "",
                size: 7,
                page: 1,
                currPage: null
            },
            favoriteRecipes: [],
            favorites: favorites,
            pantryItem: "",
            dropdownOpen: false
        };
        this.getSevenMeals();
        this.navLinks = [
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
    }
    closeGroceryList = () => {
        this.setState({ isGroceryListOpen: false })
    }
    getSevenMeals = () => {
        axios.post(window.location.origin + "/api/recipes/week", this.state.pantry).then(results => {
            this.setState({ recipes: results.data }, this.checkProfile);
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
        const recipesArrays = [[...this.state.recipes], [...this.state.searchStates.recipes], [...this.state.favoriteRecipes]];
        const pantry = [...this.state.pantry];
        for (let recipes of recipesArrays) {
            for (let recipe of recipes) {
                if (recipe) {
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
            }
        }
        this.setState({
            recipes: recipesArrays[0],
            searchStates: {
                ...this.state.searchStates,
                recipes: recipesArrays[1]
            },
            favoriteRecipes: recipesArrays[2]
        }, () => { this.generateGroceryList(this.state.isGroceryListOpen) })
    }
    checkFavorites = () => {
        const recipesArrays = [[...this.state.recipes], [...this.state.searchStates.recipes], [...this.state.favoriteRecipes]];
        for (let recipes of recipesArrays) {
            for (let recipe of recipes) {
                if (recipe) {
                    if (this.state.favorites.includes(recipe._id)) {
                        recipe.isFavorite = true;
                    }
                    else {
                        recipe.isFavorite = false;
                    }
                }
            }
        }
        this.setState({
            recipes: recipesArrays[0],
            searchStates: {
                ...this.state.searchStates,
                recipes: recipesArrays[1]
            },
            favoriteRecipes: recipesArrays[2]
        });
    }
    checkProfile = () => {
        this.checkPantry();
        this.checkFavorites();
    }
    loadRecipes = () => {
        API.searchRecipesByTitle(this.state.search)
            .then(recipes => {
                const { page, size } = this.state.searchStates;
                const currPage = paginate(recipes.data, page, size);
                this.setState({
                    searchStates: {
                        ...this.state.searchStates,
                        recipes: recipes.data,
                        currPage: currPage
                    }
                });
            })
            .catch(err => console.log(err));
    };
    handlePreviousPage = () => {
        const { page, size, recipes } = this.state.searchStates;

        if (page > 1) {
            const newPage = page - 1;
            const newCurrPage = paginate(recipes, newPage, size);

            this.setState({
                searchStates: {
                    ...this.state.searchStates,
                    page: newPage,
                    currPage: newCurrPage
                }
            });
        }
    }
    handleNextPage = () => {
        const { currPage, page, size, recipes } = this.state.searchStates;
        if (page < currPage.totalPages) {
            const newPage = page + 1;
            const newCurrPage = paginate(recipes, newPage, size);
            console.log(newCurrPage)
            this.setState({
                searchStates: {
                    ...this.state.searchStates,
                    page: newPage,
                    currPage: newCurrPage
                }
            });
            console.log(this.state)
        }
    }
    handleSearchButton = event => {
        event.preventDefault();
        this.loadRecipes()
    };
    handleCheckbox = event => {
        const groceryList = this.state.groceryList;
        const ingredient = event.target.id;
        groceryList[ingredient].checked = !groceryList[ingredient].checked;
        this.setState({ groceryList: groceryList });
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    handleGroceryChange = event => {
        const { name, value } = event.target;
        const groceryList = { ...this.state.groceryList };
        groceryList[name].name = value;
        groceryList[name].amounts = [""];
        this.setState({
            groceryList: groceryList
        });
    }
    handleReshuffle = event => {
        const index = event.target.value;
        const recipes = [...this.state.recipes];
        axios.post(window.location.origin + "/api/recipes/one", this.state.pantry).then(results => {
            recipes[index] = results.data;
            this.setState({
                recipes: recipes,
                groceryList: null
            }, this.checkProfile)
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
                localStorage.setItem("chefd-token", results.data.token);
                this.setState({
                    isLoggedIn: true,
                    name: results.data.user.name,
                    nameEdit: results.data.user.name,
                    emailEdit: results.data.user.email,
                    token: results.data.token,
                    location: "/",
                    favorites: [...results.data.user.profile.favorites],
                    pantry: [...results.data.user.profile.pantry],
                    error: null
                })
            }).catch(error => {
                this.setState({
                    error: error.response.data.message
                });
            })
        }
    }
    handleLogOut = () => {
        axios.post(window.location.origin + "/users/logout", {}, { headers: { Authorization: `Bearer ${this.state.token}` } }).then(results => {
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
                console.log(results)
                this.setState({
                    isLoggedIn: true,
                    name: results.data.user.name,
                    nameEdit: results.data.user.name,
                    emailEdit: results.data.user.email,
                    token: results.data.token,
                    favorites: results.data.profile.favorites,
                    pantry: results.data.profile.pantry
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
    handleLink = path => {
        this.setState({
            location: path,
            dropdownOpen: false
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
            this.setState({ 
                recipes: recipes,
                searchStates: {
                    ...this.state.searchStates,
                    recipes: [],
                    currPage: null
                }
            })
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
            }, () => {
                this.checkPantry();
                this.pushProfile();
            })
        }
    }
    handleRemoveItemFromPantry = event => {
        const index = event.target.id;
        const pantry = [...this.state.pantry];
        pantry.splice(index, 1);
        this.setState({
            pantry: pantry
        }, () => {
            this.checkPantry();
            this.pushProfile();
        });
    }
    handleDropdown = () => {
        const open = !this.state.dropdownOpen;
        this.setState({
            dropdownOpen: open
        });
    }
    handleFavoriteUnfavorite = event => {
        const _id = event.target.id;
        console.log(_id)
        const favorites = [...this.state.favorites];
        const index = favorites.indexOf(_id)
        if (index > -1) {
            favorites.splice(index, 1);
        }
        else {
            favorites.push(_id);
        }
        this.setState({
            favorites: favorites
        }, () => {
            this.checkFavorites();
            this.pushProfile();
            if (window.location.pathname === "/favorites") {
                this.pullFavorites();
            }
        });
    }
    handleUpdateUser = () => {
        const user = {
            email: this.state.emailEdit,
            name: this.state.nameEdit
        }
        if (this.state.passwordEdit && this.state.passwordEdit === this.state.passwordReenterEdit) {
            user.password = this.state.passwordEdit;
        }
        axios.patch(window.location.origin + "/users/", user, { headers: { Authorization: `Bearer ${this.state.token}` } }).then(results => {
            this.setState({
                name: results.data.name
            })
            console.log(results)
        }).catch(error => {
            console.log(error)
            this.setState({
                error: error.response.data.message
            });
        })
    }
    pushProfile = () => {
        const profile = {
            favorites: [...this.state.favorites],
            pantry: [...this.state.pantry]
        }
        axios.post(`${window.location.origin}/api/profile`, profile, { headers: { Authorization: `Bearer ${this.state.token}` } }).then(results => {

        }).catch(error => {
            console.log(error)
        })
    }
    pullFavorites = () => {
        axios.post(`${window.location.origin}/api/recipes/external`, { ids: this.state.favorites }).then(results => {
            const currPage = paginate(results.data, 1, 7);
            this.setState({ 
                favoriteRecipes: results.data,
                searchStates: {
                    ...this.state.searchStates,
                    currPage: currPage,
                    recipes: results.data
                }
            }, this.checkProfile);
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        if (this.props.isMobile && this.navLinks[1].path === "/pantry") {
            this.navLinks.splice(1, 0, { path: this.state.isLoggedIn ? "#" : "/login", name: this.state.isLoggedIn ? "Log Out" : "Log In/Sign Up" })
        }
        else if (!this.props.isMobile && this.navLinks[1].path !== "/pantry") {
            this.navLinks.splice(1, 1);
        }
        else if (this.navLinks[1].path !== "/pantry") {
            this.navLinks.splice(1, 1, { path: this.state.isLoggedIn ? "#" : "/login", name: this.state.isLoggedIn ? "Log Out" : "Log In/Sign Up" })
        }
        const style = {
            display: 'grid',
            gridTemplateRows: this.props.isMobile ? "auto" : '50px 1fr 60px',
            gridTemplateColumns: this.props.isMobile ? "auto" : '300px 1fr',
            gridTemplateAreas: this.props.isMobile ?
                `
                'toolbar'
                'sidebar'
                'content'
                'footer'
            `
                :
                `
                'toolbar toolbar'
                'sidebar content'
                'footer footer'
            `,
            minHeight: '100vh'
        }
        const modalStyle = {
            content: {
                width: this.props.isMobile ? "200px" : "600px",
                maxWidth: "80%",
                left: "50%",
                marginLeft: this.props.isMobile ? "-121px" : "-321px",
                backgroundColor: theme.blue,
                textAlign: "center",
                display: "grid",
                gridTemplateColumns: this.props.isMobile ? "1fr" : "1fr 1fr",
                gridTemplateRows: "auto",
                gridTemplateAreas: this.props.isMobile ?
                    `
                    'grocery'
                    'button'
                `
                    :
                    `
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
                isMobile: this.props.isMobile,
                handleLink: this.handleLink,
                isLoggedIn: this.state.isLoggedIn,
                handleLogOut: this.handleLogOut,
                firstName: this.state.name,
                handleDropdown: this.handleDropdown
            },
            sidebar: {
                isMobile: this.props.isMobile,
                handleLink: this.handleLink,
                location: this.state.location,
                navLinks: this.navLinks,
                handleLogOut: this.handleLogOut,
            },
            mealPlan: {
                isMobile: this.props.isMobile,
                handleDragCardStart: this.handleDragCardStart,
                handleDragOver: this.handleDragOver,
                handleDragEnd: this.handleDragEnd,
                handleBlockDay: this.handleBlockDay,
                handleReshuffle: this.handleReshuffle,
                handleSearchLink: this.handleSearchLink,
                generateGroceryList: this.generateGroceryList,
                handleLink: this.handleLink,
                location: this.state.location,
                recipes: this.state.recipes,
                groceryList: this.state.groceryList,
                handleFavoriteUnfavorite: this.handleFavoriteUnfavorite
            },
            logIn: {
                isMobile: this.props.isMobile,
                handleInputChange: this.handleInputChange,
                handleLogIn: this.handleLogIn,
                handleSignUp: this.handleSignUp,
                isLoggedIn: this.state.isLoggedIn,
                error: this.state.error
            },
            groceryList: {
                isMobile: this.props.isMobile,
                groceryList: this.state.groceryList,
                handleGroceryChange: this.handleGroceryChange,
                handleCheckbox: this.handleCheckbox,
                style: {
                    gridArea: "grocery",
                    overflow: "scroll"
                }
            },
            pantryList: {
                isMobile: this.props.isMobile,
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
                isMobile: this.props.isMobile,
                generateGroceryList: this.generateGroceryList,
                location: this.state.location,
                handleSelectRecipe: this.handleSelectRecipe,
                handleFavoriteUnfavorite: this.handleFavoriteUnfavorite,
                handleInputChange: this.handleInputChange,
                handleSubmitButton: this.handleSearchButton,
                handleLink: this.handleLink,
                nextPage: this.handleNextPage,
                previousPage: this.handlePreviousPage,
                state: this.state.searchStates,
                search: this.state.search,
                pullFavorites: this.pullFavorites
            },
            pantry: {
                isMobile: this.props.isMobile,
                handleInputChange: this.handleInputChange,
                pantryItem: this.state.pantryItem,
                pantry: this.state.pantry,
                handleAddItemToPantry: this.handleAddItemToPantry,
                handleRemoveItemFromPantry: this.handleRemoveItemFromPantry,
                isLoggedIn: this.state.isLoggedIn
            },
            favorites: {
                isMobile: this.props.isMobile,
                handleFavoriteUnfavorite: this.handleFavoriteUnfavorite,
                recipes: this.state.favoriteRecipes,
                pullFavorites: this.pullFavorites,
                isLoggedIn: this.state.isLoggedIn
            },
            account: {
                emailEdit: this.state.emailEdit,
                nameEdit: this.state.nameEdit,
                name: this.state.name,
                handleInputChange: this.handleInputChange,
                handleUpdateUser: this.handleUpdateUser,
                error: this.state.error
            }
        }
        return (
            <Router>
                <div style={style}>
                    <Toolbar {...props.toolbar} />
                    {(this.state.dropdownOpen || !this.props.isMobile) && <Sidebar {...props.sidebar} />}
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
                        <Route exact path="/favorites">
                            <Favorites {...props.favorites} />
                        </Route>
                        <Route exact path="/account">
                            <Account {...props.account} />
                        </Route>
                    </Content>
                    <Footer />
                </div>
                <Modal style={modalStyle} isOpen={this.state.isGroceryListOpen}>
                    {!this.props.isMobile && <PantryList {...props.pantryList} />}
                    <GroceryList {...props.groceryList} />
                    <div style={{ gridArea: "button", textAlign: "center" }}>
                        <button onClick={this.closeGroceryList}>Close List</button>
                    </div>
                </Modal>
            </Router>
        )
    }
}

const mapSizesToProps = ({ width }) => ({
    isMobile: width < 480
});

export default withSizes(mapSizesToProps)(App);