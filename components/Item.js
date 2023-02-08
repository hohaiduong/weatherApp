import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, TextInput, AppState } from 'react-native';
import { width, height } from './utils';

import Icon from "react-native-vector-icons/Ionicons";
const ItemLoad = () => {
    var [data, setData] = useState([]);
    var [loaded, setLoaded] = useState(false);
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        LoadWeather()
    }, [])

   

    const LoadWeather = async (cityName) => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q='+ cityName + '$days=3', options)
            .then(response => response.json())
            .then(response => {
                setData(response);
            }
            )
            .catch(err => console.error(err));
    };

    return (
        <View>
            <View style={styles.containerTextInput}>
                <TextInput
                    placeholder="Search City"
                    value={cityName}
                    onChangeText={setCityName}
                    style={{ fontSize: 20, marginLeft: 10 }}
                />
                <Icon onPress={() => LoadWeather(cityName)} name="search-outline" style={{ fontSize: 30, marginRight: 10 }}
                />
            </View>
            <View style={styles.containerView}>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.textName}>{`${data.location.name}`}</Text>
                </View>
                <View style={styles.viewTemp}>
                    <Image style={{ width: 70, height: 70 }} source={{ uri: "https:" + `${data.current.condition.icon}` }}></Image>
                    <Text style={styles.textTemp}> {`${data.current.temp_c}`} độ C</Text>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
                        <Image source={require('./img/cloud.jpg')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Mây: {`${data.current.cloud}`} </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/tocdogio.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Tốc độ gió: {`${data.current.wind_mph}`} mph</Text>
                    </View>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
                        <Image source={require('./img/doam.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Độ ẩm: {`${data.current.humidity}`}% </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/feelslike.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Cảm giác như: {`${data.current.feelslike_c}`} độ</Text>
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    containerTextInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        alignContent: "center",
        alignItems: "center",
        borderRadius:15
    },

    containerView: {
        width: width,
        height: height,
        alignItems: "center"
    },

    containerCenter: {
        backgroundColor: "#87CEEB",
        alignItems: "center",
        // alignContent: "center",
        padding: 10,
        borderRadius: 10,
        width: 150,
        opacity: 0.8

    },

    viewTemp: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 100
    },
    viewFlexRow: {
        flexDirection: "row",
        marginTop: 60
    },


    textTemp: {
        color: "black",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "900"
    },
    textName: {
        fontFamily: "Roboto",
        fontSize: 30,
        color: "#00008B"
    },

    textContent: {
        color: "black",
        textAlign: "center",
        fontSize: 20
    },

    imgItem: {
        width: 50,
        height: 50
    }

});
export default ItemLoad;

// 