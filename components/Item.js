import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, TextInput, AppState } from 'react-native';
import { width, height, API_KEY } from './utils';

import Icon from "react-native-vector-icons/Ionicons";
<<<<<<< Updated upstream
import { AsyncStorage } from '@react-native-async-storage/async-storage';
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> Stashed changes
const ItemLoad = () => {
    var [data, setData] = useState([]);
    var [data2, setData2] = useState([]);
    var [dataIcon, setDataIcon] = useState([]);
<<<<<<< Updated upstream
=======
    var [jsonValue, setJsonValue] = useState("");
>>>>>>> Stashed changes
    //===============================================
    var [loaded, setLoaded] = useState(false);
    var [City, setCity] = useState("");
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        getData();
        LoadWeather(jsonValue);
    }, [jsonValue])

<<<<<<< Updated upstream
    const LoadWeather = async (cityName) => {
=======
    const LoadWeather = async (cityNamez) => {
>>>>>>> Stashed changes
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

<<<<<<< Updated upstream
        await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityName + '$days=3', options)
=======
        await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityNamez + '$days=3', options)
>>>>>>> Stashed changes
            .then(response => response.json())
            .then(response => {
                setData(response.location);
                setData2(response.current);
                setDataIcon(response.current.condition);
            }
            )
            .catch(err => console.error(err));
    };

<<<<<<< Updated upstream
    const setData3 = async () => {
        await AsyncStorage.setItem("@City", JSON.stringify(cityName));
    }

    useEffect(() => {
        getData();
        console.log(City);
    }, [])
    const getData = async () => {
        await AsyncStorage.getItem("@City")
            .then(
                value => {
                    if (value != null) {
                        setCity(value)
                    }
                }
            )
=======
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('City', jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('City');
            setJsonValue(JSON.parse(value));
            return value != null ? JSON.parse(value) : null; 
        } catch (e) {
            console.log(e)
        }
>>>>>>> Stashed changes
    }

    return (
        <View>
            <View style={styles.containerTextInput}>
                <TextInput
                    placeholder="Search City"
                    value={cityName}
                    onChangeText={setCityName}
                    style={{ fontSize: 20, marginLeft: 10 }}
                />
                <Icon onPress={() => [LoadWeather(cityName), storeData(cityName)]} name="search-outline" style={{ fontSize: 30, marginRight: 10 }}
                />
            </View>
            <View style={styles.containerView}>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.textName}>{`${data.name}`}</Text>
                </View>
                <View style={styles.viewTemp}>
                    <Image style={{ width: 70, height: 70 }} source={{ uri: "https:" + `${dataIcon.icon}` }}></Image>
                    <Text style={styles.textTemp}> {`${data2.temp_c}`} độ C</Text>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
<<<<<<< Updated upstream
                        <Image source={require('./img/cloud.jpg')} style={styles.imgItem}></Image>
=======
                        <Image source={require('./img/cloud.png')} style={styles.imgItem}></Image>
>>>>>>> Stashed changes
                        <Text style={styles.textContent}>Mây: {`${data2.cloud}`} </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/tocdogio.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Tốc độ gió: {`${data2.wind_mph}`} mph</Text>
                    </View>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
                        <Image source={require('./img/doam.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Độ ẩm: {`${data2.humidity}`}% </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/feelslike.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Cảm giác như: {`${data2.feelslike_c}`} độ</Text>
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
        borderRadius: 15
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
