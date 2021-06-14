import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { getPdfSourceFileList, verifyLocalFileExist, getPdfFileSource } from './service';
import { navigate } from './../../router';

const styles = StyleSheet.create({
    container: {
        padding: 25
    }
});

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    async componentDidMount() {
        const pageNo = 1
        await this.initList(pageNo)
    }

    async initList(pageNo = 1) {
        const sourceList = await getPdfSourceFileList(pageNo)
        if (sourceList instanceof Error) throw sourceList

        const list = await verifyLocalFileExist(sourceList)
        if (list instanceof Error) throw list

        this.setState({ list })
    }

    async openPdf({ fileName, isLocal, page }) {
        const source = await getPdfFileSource({ fileName, isLocal })
        if (source instanceof Error) throw source

        navigationHandle('pdf', { source, page })
    }

    render() {
        const onPress = () => console.log('1')

        return (
            <>
                <TouchableOpacity
                    onPress={onPress} style={styles.container}
                >
                    <Text>Press Here123</Text>
                </TouchableOpacity>
                <Text>List</Text>
            </>
        );
    }
}

export default List;
