import React from 'react';
import _ from 'lodash';

import routes from './routes';

const navigationRef = React.createRef();

export const navigate = (route, props) => {
    navigationRef.current.navigate(route, props);
}

export const goBack = () => {
    navigationRef.current.goBack();
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

    navigate(route, props) {
        const target = _.find(routes, ({ key }) => key === route);
        const { stack } = this.state;

        if (!target) {
            return console.error(new Error(`This route${route} is not caught any route`));
        }

        this.setState({
            stack: [
                {
                    ...target,
                    props
                },
                ...stack
            ]
        });
    }

    goBack() {
        const { stack } = this.state;

        if (stack.length > 1) {
            this.setState({
                stack: stack.filter((i, key) => key !== 0)
            });
        }
    }

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
