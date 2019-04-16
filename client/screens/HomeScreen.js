import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.welcomeText}>Bem Vindo</Text>
                    <Text style={styles.infoText}>Escolha uma opção abaixo para fazer um pedido</Text>
                </View>
                <View style={styles.btnArea}>
                    <View style={styles.btnStyle}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Menu')}
                            title="Opções Prontas para Pedir!"
                            color="#BF3C2A"
                            type="outline"
                        />
                    </View>
                    <View style={styles.btnStyle}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Custom', {item:{recipe: []}})}
                            title="Para quem gosta do seu jeito!"
                            color="#FFDF1C"
                            type="outline"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
    },
    btnArea: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btnStyle: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
        paddingHorizontal: 12,
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },


    welcomeText: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingTop: 30,
    },
    infoText: {
        fontSize: 17,
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingTop: 15,
    },
});
