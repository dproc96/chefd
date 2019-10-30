import React from 'react';
import theme from '../theme';

class Content extends React.Component {
    render() {
        const style = {
            gridArea: 'content',
            backgroundColor: theme.blue
        }
        return (
            <div style={style}>
                
            </div>
        )
    }
}

export default Content;