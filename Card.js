import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';

const Card = ({ DATA, UpdateData, navigation }) => {
    const dict = {
        "clear-day":require('./assets/images/clear-day.png'),
        "clear-night":require('./assets/images/clear-night.png'),
        "cloudy":require('./assets/images/cloudy.png'),
        "fog":require('./assets/images/fog.png'),
        "hail":require('./assets/images/hail.png'),
        "partly-cloudy-day":require('./assets/images/partly-cloudy-day.png'),
        "partly-cloudy-night":require('./assets/images/partly-cloudy-night.png'),
        "rain-snow-showers-day":require('./assets/images/rain-snow-showers-day.png'),
        "rain-snow-showers-night":require('./assets/images/rain-snow-showers-night.png'),
        "rain-snow":require('./assets/images/rain-snow.png'),
        "rain":require('./assets/images/rain.png'),
        "showers-day":require('./assets/images/showers-day.png'),
        "showers-night":require('./assets/images/showers-night.png'),
        "sleet":require('./assets/images/sleet.png'),
        "snow-showers-day":require('./assets/images/snow-showers-day.png'),
        "snow-showers-night":require('./assets/images/snow-showers-night.png'),
        "snow":require('./assets/images/snow.png'),
        "thunder-rain":require('./assets/images/thunder-rain.png'),
        "thunder-showers-day":require('./assets/images/thunder-showers-day.png'),
        "thunder-showers-night":require('./assets/images/thunder-showers-night.png'),
        "thunder":require('./assets/images/thunder.png'),
        "wind":require('./assets/images/wind.png'),
    }

    return (
        <TouchableHighlight onPress={()=>navigation.navigate("Weather")}>
            <LinearGradient style={styles.container} colors={['#1D2671', '#C33764']}>
                <View style={styles.temp}>
                    <Image source={dict[DATA.currentConditions.icon]}/>
                    <Text style={styles.txtTemp}>{Math.round(DATA.currentConditions.temp)}<Text style={styles.cel}>°</Text></Text>
                
                    {/* <Image source={dict['clear-day']}/>
                    <Text style={styles.txtTemp}>15<Text style={styles.cel}>°</Text></Text> */}
                </View>
                <View style={styles.info}>
                    <Text style={styles.city}>Toronto</Text>
                    <Text style={styles.desc}>{DATA.currentConditions.conditions}</Text>
                    
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        padding: 10,
        flexDirection: "row",
        borderColor: 'black',
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth * 5,
        borderRadius: StyleSheet.hairlineWidth * 15,
    },
    temp: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

    },
    desc: {
        fontSize: 20,
        padding: 5
    },
    info: {
        flex: 1,
        alignItems: "flex-end"
    },
    city: {
        fontSize: 25,
        fontWeight: "600"
    },
    txtTemp: {
        fontSize: 50,
    },

});

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});


export default connect(mapState, mapDispatch)(Card);