import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';


const FullCard = ({ DATA, UpdateData, navigation }) => {
    const dict = {
        "clear-day": require('./assets/images/clear-day.png'),
        "clear-night": require('./assets/images/clear-night.png'),
        "cloudy": require('./assets/images/cloudy.png'),
        "fog": require('./assets/images/fog.png'),
        "hail": require('./assets/images/hail.png'),
        "partly-cloudy-day": require('./assets/images/partly-cloudy-day.png'),
        "partly-cloudy-night": require('./assets/images/partly-cloudy-night.png'),
        "rain-snow-showers-day": require('./assets/images/rain-snow-showers-day.png'),
        "rain-snow-showers-night": require('./assets/images/rain-snow-showers-night.png'),
        "rain-snow": require('./assets/images/rain-snow.png'),
        "rain": require('./assets/images/rain.png'),
        "showers-day": require('./assets/images/showers-day.png'),
        "showers-night": require('./assets/images/showers-night.png'),
        "sleet": require('./assets/images/sleet.png'),
        "snow-showers-day": require('./assets/images/snow-showers-day.png'),
        "snow-showers-night": require('./assets/images/snow-showers-night.png'),
        "snow": require('./assets/images/snow.png'),
        "thunder-rain": require('./assets/images/thunder-rain.png'),
        "thunder-showers-day": require('./assets/images/thunder-showers-day.png'),
        "thunder-showers-night": require('./assets/images/thunder-showers-night.png'),
        "thunder": require('./assets/images/thunder.png'),
        "wind": require('./assets/images/wind.png'),
    }

    const current = (time) => {
        let index = parseInt(time.split(":")[0])
        return index
    }

    const index_now = current(DATA.currentConditions.datetime);

    const toMinutes = (time) => {
        let hours = Number(time.split(":")[0])
        let minutes = Number(time.split(":")[1])
        let output;
        if (hours > 0 && hours <= 12) {
            output = `${hours}:${minutes}AM`
        } else if (hours > 12) {
            output = `${hours - 12}:${minutes}PM`
        } else if (hours == 0) {
            output = `12:${minutes}AM`
        }
        return output
    }

    const toStandard = (time) => {
        let hours = Number(time.split(":")[0])
        let output;
        if (hours > 0 && hours <= 12) {
            output = hours + "AM";
        } else if (hours > 12) {
            output = (hours - 12) + "PM";
        } else if (hours == 0) {
            output = "12AM";
        }

        return output
    }

    const listData = [
        {
            text: "FEELS LIKE",
            img: require("./assets/card_images/celsius.png"),
            text2: Math.round(DATA.currentConditions.feelslike) + "°",
        },
        {
            text: "HUMIDITY",
            img: require("./assets/card_images/humidity.png"),
            text2: Math.round(DATA.currentConditions.humidity) + "%",
        },
        {
            text: "SUNRISE",
            img: require("./assets/card_images/sunrise.png"),
            text2: toMinutes(DATA.currentConditions.sunrise),
        },
        {
            text: "SUNSET",
            img: require("./assets/card_images/sunset.png"),
            text2: toMinutes(DATA.currentConditions.sunset),
        },
        {
            text: "PRESSURE",
            img: require("./assets/card_images/gauge.png"),
            text2: Math.round(DATA.currentConditions.pressure) + "hPa",
        }
        ,
        {
            text: "VISIBILITY",
            img: require("./assets/card_images/eye.png"),
            text2: Math.round(DATA.currentConditions.visibility) + " km"
        }
    ]

    const MiniCard = ({ item }) => {
        return (
            <View style={mini.card}>
                <Text style={mini.cardTxt}>{item.text}</Text>
                <Image style={mini.celsius} source={item.img} />
                <Text style={mini.cardTxt}>{item.text2}</Text>
            </View>
        )
    }


    return (
        <LinearGradient style={styles.container} colors={['#1D2671', '#C33764']}>

            <View style={styles.temp}>
                <Text style={styles.city}>Toronto</Text>
                <Text style={styles.tempDeg}>{Math.round(DATA.currentConditions.temp)}<Text style={styles.cel}>°</Text></Text>
                <Text style={styles.desc}>{DATA.currentConditions.conditions}</Text>
                <Text style={styles.highLows}>H:{Math.round(DATA.days[0].tempmax)} L:{Math.round(DATA.days[0].tempmin)}</Text>
                <Text style={styles.description}>{DATA.description}</Text>
            </View>

            <View style={styles.details}>
                <ScrollView style={styles.future} horizontal={true}>
                    <View style={mini.container}>
                        <Text style={mini.time}>Now</Text>
                        <Image source={dict[DATA.days[0].hours[index_now].icon]} />
                        <Text style={mini.deg}>{Math.round(DATA.currentConditions.temp)}°</Text>
                    </View>
                    {DATA.days[0].hours.slice(index_now + 1).map((info) =>
                        <View style={mini.container} key={info.datetime}>
                            <Text style={mini.time}>{toStandard(info.datetime)}</Text>
                            <Image source={dict[info.icon]} />
                            <Text style={mini.deg}>{Math.round(info.temp)}°</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={styles.rest}>
                <FlatList data={listData} numColumns={2} renderItem={MiniCard} />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    },
    temp: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    city: {
        fontSize: 35,
        color: "white"
    },
    tempDeg: {
        fontSize: 60,
        color: "white",
        fontWeight: "300"
    },
    cel: {
        color: "white",
        fontWeight: "200"
    },
    desc: {
        fontSize: 20,
        color: "white",
        fontWeight: "400"
    },
    description: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        padding: 5,
        margin: 10,
    },
    highLows: {
        fontSize: 20,
        color: "white",
        fontWeight: "400"
    },
    details: {
        flex: 1.5,
    },
    future: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.25)",
        margin: 10,
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 5,
        borderRadius: StyleSheet.hairlineWidth * 20,
    },
    rest: {
        flex: 2,
    },

});

const mini = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    time: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    deg: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.25)",
        margin: 10,
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 5,
        borderRadius: StyleSheet.hairlineWidth * 20,
        padding: 10,
        alignItems: "center",
        minWidth: "45%"

    },
    cardTxt: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    sun: {
        height: 100,
        width: 100
    },
    pressure: {
        height: 90,
        width: 90,
        margin: 10
    },
    celsius: {
        height: 80,
        width: 80,
        margin: 10
    },
    humidity: {
        height: 80,
        width: 80,
        margin: 10
    },
})

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});


export default connect(mapState, mapDispatch)(FullCard);