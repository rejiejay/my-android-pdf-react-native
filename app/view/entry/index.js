import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'

import RootNavigator from './../../router/index';
import store from './../../redux';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Entry extends React.Component {
    render() {
        return <Provider store={store}>
            <View style={styles.container}>
                <RootNavigator />
            </View>
        </Provider>
    }
}

export default Entry;
