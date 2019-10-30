import React from 'react';
import LogInCard from '../components/LogInCard';
import SignUpCard from '../components/SignUpCard';
import theme from '../theme';

class LogIn extends React.Component {
    render() {
        const cardStyle = {
            width: 400,
            padding: 20,
            height: "max-content",
            backgroundColor: theme.darkBlue,
            margin: "30px 0px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.3)"
        }
        const style = {
            display: "flex",
            justifyContent: "space-around",
        }
        return (
            <div style={style}>
                <LogInCard cardStyle={cardStyle} {...this.props} />
                <SignUpCard cardStyle={cardStyle} {...this.props} />
            </div>
        );
    }
}

export default LogIn;