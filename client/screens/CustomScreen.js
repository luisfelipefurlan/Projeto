import React from 'react';
import {FlatList, ScrollView, StyleSheet, View, Text} from 'react-native';
import axios from "axios";
import {ListItem} from "react-native-elements";
import _ from 'lodash';


export default class CustomScreen extends React.Component {
    static navigationOptions = {
        title: 'Do seu jeito',
    };

    state = {
        recipe: [],
        customRecipe: [],
        ingredients: [],
        customIngredients: {},
        price: 0,
    };

    componentDidMount() {
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                axios.get(`http://${Expo.Constants.manifest.extra.serverAddr}:5000/api/ingredients`)
                    .then(resp => {
                        const {data: {ingredients}} = resp;
                        const item = JSON.parse(JSON.stringify(this.props.navigation.getParam('item') || {recipe: []}));
                        this._buildObject(ingredients, item);
                    })
                    .catch(error => (console.log(error)));
            }
        );

    }

    _buildObject = (ingredients, item) => {
        let {recipe} = item;
        if (!recipe) recipe = [];
        let price = 0;
        let cIngredients = Object.assign({}, JSON.parse(JSON.stringify(ingredients)));
        recipe.forEach((item) => {
            const val = _.find(ingredients, {"id": item.id});
            cIngredients[item.id].qty += 1;
            price = price + val.value;
        });
        const priceWithDiscount = this._applyDiscount(recipe, price);
        const customIngredients = Object.keys(cIngredients).map(i => cIngredients[i]);
        this.setState({ingredients, customIngredients, recipe, price: priceWithDiscount});
    };

    _applyDiscount = (items = [], price = 0) => {
        const {ingredients} = this.state;
        const tmpArray = items.map((item) => {
            return item.id;
        });
        let priceWithDiscount = price;
        const qtyItems = _.countBy(tmpArray);
        let cIngredients = Object.assign({}, JSON.parse(JSON.stringify(ingredients)));

        if ((qtyItems["0"] > 0 && !!qtyItems["0"]) && (qtyItems["1"] === undefined || qtyItems["1"] === 0))
            priceWithDiscount *= 0.9;

        if ((qtyItems["2"] % 3) === 0) {
            let result = (qtyItems["2"] / 3);
            priceWithDiscount -= (cIngredients["2"].value * result);
        }
        if ((qtyItems["4"] % 3) === 0) {
            let result = (qtyItems["4"] / 3);
            priceWithDiscount -= (cIngredients["4"].value * result);
        }
        return priceWithDiscount;
    };

    _onPressItem = (item) => {
        let {recipe, ingredients} = this.state;
        if (!recipe) recipe = [];
        recipe.push({"id": item.id});
        this._buildObject(ingredients, {recipe});
    };

    _renderItem = ({item}) => {
        const {key, qty, value} = item;
        return <ListItem
            title={key}
            subtitle={`$ ${value.toFixed(2)}`}
            onPress={() => this._onPressItem(item)}
            badge={{value: qty}}
            bottomDivider
        />
    };

    render() {
        const {ingredients, customIngredients, price} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <FlatList
                        data={customIngredients}
                        renderItem={this._renderItem}
                        ListHeaderComponent={<Text style={styles.listHeader}>Lista de Ingredientes</Text>}
                    />
                </ScrollView>
                <View style={styles.priceArea}>
                    <Text style={styles.priceText}>{`Total: $ ${price.toFixed(2)}`}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    priceArea: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: '#fafafa',
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 17,
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'right',
    },
    listHeader: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.7)',
        textAlign: 'left',
        paddingHorizontal: 14,
        paddingVertical: 6,
        fontWeight: '500',
    },
});
