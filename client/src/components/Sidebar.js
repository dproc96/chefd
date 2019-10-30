import React from 'react';
import NavLink from './NavLink';
import theme from '../theme';

class Sidebar extends React.Component {
    render() {
        const style = {
            gridArea: 'sidebar',
            backgroundColor: theme.darkBlue,
            boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.3)",
            zIndex: 1
        }
        return (
            <div style={style}>
                {this.props.navLinks.map(navProps => {
                    return (
                        <NavLink {...navProps} />
                    )
                })}
            </div>
        )
    }
}

export default Sidebar;