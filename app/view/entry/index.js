import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './../../router/index';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Entry extends React.Component {
    render() {
        return <View style={styles.container}>
            <RootNavigator />
        </View>
    }
}

export default Entry;
