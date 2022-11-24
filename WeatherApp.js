import { StyleSheet, Text, View, ActivityIndicator, TouchableHighlight, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Card from './Card';
import FullCard from './FullCard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import { setLoading } from './redux/actions/index';
import { setRefresh } from './redux/actions/index';


const WeatherApp = ({ DATA, isLoading, refresh, setRefresh, setLoading, UpdateData }) => {
    const API = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/etobicoke?unitGroup=metric&key=H8WJ3NPKXDNA272K7BXP3RQKR&contentType=json"
    const Stack = createStackNavigator();
    const options = ({ navigation }) => ({
        headerRight: (props) =><TouchableHighlight onPress={() => { setRefresh(!refresh) }}><Image style={{marginRight:10}} source={require("./assets/refresh.png")} /></TouchableHighlight>
    })

    const fetchData = () => {
        setLoading(true);
        fetch(API)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();

            }).then(response => {
                UpdateData(response);
                console.log(response);
                setTimeout(() => { setLoading(false) }, 1000)

            }).catch((errorResponse) => {
                if (errorResponse.text) {
                    errorResponse.text().then(errorMessage => { })
                }
            })
    }
    useEffect(() => {
        fetchData()
    }, [refresh])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#C33764" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={options}>
                    <Stack.Screen name="Home" component={Card} />
                    <Stack.Screen name="Weather" component={FullCard} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapDispatch = { UpdateData, setLoading, setRefresh };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
    isLoading: store.dataReducer.isLoading,
    refresh: store.dataReducer.refresh
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});


export default connect(mapState, mapDispatch)(WeatherApp);