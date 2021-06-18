import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

import { getPdfSourceFileList } from './service';
import { navigate } from './../../router';

const styles = StyleSheet.create({
    page: {
        padding: 15,
        flex: 1,
    },
    item: {
        padding: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    container: {},
    refresh: {
        textAlign: 'center',
    },
});

const ListContainer = ({
    children,
    refresh = () => { }
}) => (
    <ScrollView style={styles.page}>
        <View style={styles.item} >
            <TouchableOpacity
                onPress={refresh}
            >
                <Text style={styles.refresh}>Forced Refresh</Text>
            </TouchableOpacity>
        </View>
        {children}
    </ScrollView>
)

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        this.initList();
    }

    async initList(isForcedRefresh = false) {
        const list = await getPdfSourceFileList(isForcedRefresh)
        if (list instanceof Error) throw list

        this.setState({
            list
        });
    }

    openPdf(pdf) {
        navigate('pdf', pdf);
    }

    render() {
        const { list } = this.state;

        if (list.length <= 0) {
            return (
                <ListContainer
                    refresh={() => this.initList(true)}
                >
                    <Text>暂无数据</Text>
                </ListContainer>
            );
        }

        return (
            <ListContainer
                refresh={() => this.initList(true)}
            >
                {list.map((item, key) => (
                    <View
                        key={key + item.eTag}
                        style={styles.item}
                    >
                        <TouchableOpacity
                            style={styles.container}
                            onPress={() => this.openPdf(item)}
                        >
                            <Text>{item.uniformResourceLocator.replace('pdf/', '')}</Text>
                            {!item.isCache && <Text>(未缓存)</Text>}
                        </TouchableOpacity>
                    </View>
                ))}
            </ListContainer>
        );
    }
}

export default List;
