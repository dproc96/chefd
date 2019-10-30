import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

class App extends React.Component {
    state = {
        isLoggedIn: false,
        firstName: null
    };
    navLinks = [
        {
            path: "/",
            name: "Plan your week"
        }
    ];
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
                <Route exact path="/">
                    <div style={style}>
                        <Toolbar isLoggedIn={this.state.isLoggedIn} firstName={this.state.firstName}/>
                        <Sidebar navLinks={this.navLinks} />
                        <Content />
                    </div>
                </Route>
            </Router>
        )
    }
}

export default App;