/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

import Pdf from 'react-native-pdf';

export default class PDF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            page: 0
        };
    }

    componentDidMount() {
        const { source, page } = this.props
        this.setState({
            source: {
                uri: `data:application/pdf;base64,${source}`,
                cache: true,
            },
            page
        })
    }

    render() {
        const { source } = this.state

        if (!source) return <View style={styles.container}><Text>正在加载...</Text></View>

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    page={page}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={error => {
                        console.log(error);
                    }}
                    onPressLink={uri => {
                        console.log(`Link presse: ${uri}`);
                    }}
                    style={styles.pdf}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
