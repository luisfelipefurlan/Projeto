import React from 'react';
import {ScrollView, StyleSheet, Text, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from "axios";


export default class MenuScreen extends React.Component {
    static navigationOptions = {
        title: 'Cardápio',
    };

    state = {
        menu: []
    };


    componentDidMount(): void {
        axios.get(`http://${Expo.Constants.manifest.extra.serverAddr}:5000/api/menu`)
            .then(resp => {
                const {data: {menu}} = resp;
                this.setState({menu});
            })
            .catch(error => (console.log(error)));
    }

    _keyExtractor = (item, index) => item.id.toString();

    _onPressItem = (item) => {
        this.props.navigation.navigate('Custom', {item})
    };

    _renderItem = ({item}) => (
        <ListItem
            roundAvatar
            title={item.key}
            onPress={() => this._onPressItem(item)}
            chevron
            bottomDivider
        />
    );

    render() {
        const {menu} = this.state;
        return (
            <ScrollView style={style.scene}>
                <FlatList
                    // listKey={}
                    data={menu}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});

const style = StyleSheet.create({
    scene: {
        flex: 1,
        paddingTop: 25,
    },
    user: {
        width: '100%',
        backgroundColor: '#333',
        marginBottom: 10,
        paddingLeft: 25,
    },
    userName: {
        fontSize: 17,
        paddingVertical: 20,
        color: '#fff'
    }
});
