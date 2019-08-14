import React, {Component} from 'react';


const ThemeContext  = React.createContext();
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;


class Subject extends Component {
    render() {
        return (
            <ThemeConsumer>
                {
                    (theme) => (
                        <h1 style={{color: theme.mainColor}}>
                            {this.props.children}
                        </h1>
                    )
                }
            </ThemeConsumer>
        )
    }
}

const Paragraph = (props, context) => {
    return (
        <ThemeConsumer>
            {
                (theme) => (
                    <p style={{color: theme.textColor}}>
                        {props.children}
                    </p>
                )
            }
        </ThemeConsumer>
    )
}
export default Paragraph;
