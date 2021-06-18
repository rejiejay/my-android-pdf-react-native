/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View, Text, BackHandler } from 'react-native';
import Pdf from 'react-native-pdf';

import { goBack } from './../../router';
import { setFileCache, setFilePage } from './service';

export default class PDF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: false
        };

        this.isCache = false;
        this.page = 1;
    }

    componentDidMount() {
        const { uniformResourceLocator, page, isCache } = this.props;
        this.isCache = isCache || false;
        this.page = page || 1;
        this.setState({
            source: {
                uri: `https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/${uniformResourceLocator}`,
                cache: true,
            }
        });

        BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress);
    }

    hardwareBackPress() {
        goBack();
        return true;
    }

    onPageChanged(page) {
        const { uniformResourceLocator } = this.props;
        setFilePage(uniformResourceLocator, page)
    }

    setCache() {
        const { uniformResourceLocator } = this.props
        this.isCache = true;
        setFileCache(uniformResourceLocator);
    }

    render() {
        const { page, isCache } = this
        const { source } = this.state
        const self = this

        if (!source) return <View style={styles.container}><Text>正在加载...</Text></View>

        if (!isCache) {
            this.setCache();
        }

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    page={page}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        self.onPageChanged(page)
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
