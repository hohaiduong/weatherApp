import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { width, height } from './utils';

import SearchCityName from './search';

const ItemLoad = () => {

    var [data, setData] = useState([]);
    var img = "";
    useEffect(() => {
        logWeather();

    }, []);
    const logWeather = () => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Thua%20Thien%20Hue&days=3', options)
            .then(response => response.json())
            .then(response => {
                setData(response);
                img = response.current.condition.icon;
            }
            )
            .catch(err => console.error(err));
    };

    return (
        <View><SearchCityName />
            <View style={styles.containerView}>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.textName}>{`${data.location.name}`}</Text>
                </View>
                <View style={styles.viewTemp}>
                    <Text style={styles.textTemp}> {`${data.current.temp_c}`} độ C</Text>
                    <Image source={`${img}`}></Image>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
                        <Image source={require('./img/cloud.jpg')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Mây: {`${data.current.cloud}`} </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/tocdogio.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Tốc độ gió: {`${data.current.wind_mph}`} </Text>
                    </View>
                </View>
                <View style={styles.viewFlexRow}>
                    <View style={styles.containerCenter}>
                        <Image source={require('./img/doam.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Độ ẩm: {`${data.current.humidity}`}% </Text>
                    </View>
                    <View style={[styles.containerCenter, { marginLeft: 50 }]}>
                        <Image source={require('./img/feelslike.png')} style={styles.imgItem}></Image>
                        <Text style={styles.textContent}>Cảm thấy: {`${data.current.feelslike_c}`} độ</Text>
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    containerView: {
        width: width,
        height: height,
        alignItems: "center"
    },

    containerCenter: {
        backgroundColor: "#87CEFA",
        alignItems: "center",
        // alignContent: "center",
        padding: 10,
        borderRadius: 10,
        width: 150,

    },

    viewTemp: {
        flexDirection: "row",
        marginTop: 100
    },
    viewFlexRow: {
        flexDirection: "row",
        marginTop: 100
    },


    textTemp: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "900"
    },
    textName: {
        fontSize: 20,
        color: "#FFF"
    },

    textContent: {
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