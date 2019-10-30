import React from 'react';
import AccountButton from './AccountButton';
import theme from '../theme';

class Toolbar extends React.Component {
    render() {
        const style = {
            gridArea: 'toolbar',
            backgroundColor: theme.darkRed,
            zIndex: 2,
            borderBottom: "1px #777777 solid"
        }
        return (
            <div style={style}>
                {this.props.isLoggedIn && <h3>Hello {this.props.firstName}!</h3>}
                <AccountButton {...this.props} />
            </div>
        )
    }
}

export default Toolbar;