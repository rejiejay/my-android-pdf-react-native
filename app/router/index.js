import React from 'react';
import routes from './routes';

const navigationRef = React.createRef();

export const navigate = (route, props) => {
    navigationRef.current.navigate(route, props);
}

class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            stack: [
                routes[0]
            ]
        };
    }

    navigate(route, props) { }

    render() {
        const { stack } = this.state;

        const Screen = stack[0].screen
        const props = stack[0].props
        return <Screen 
            {...props}
        />
    }
}

export default () => <NavigationComponent ref={navigationRef} />
