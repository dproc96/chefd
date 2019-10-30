import React from 'react';
import NavLink from './NavLink';
import theme from '../theme';

class Sidebar extends React.Component {
    render() {
        const style = {
            gridArea: 'sidebar',
            backgroundColor: theme.darkBlue
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