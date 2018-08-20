import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class SearchResults extends Component {
    static navigationOptions = {
        title: 'Результат',
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.cont}>
                <Text style={styles.text}>{params.dataSource}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'black',
    },
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});