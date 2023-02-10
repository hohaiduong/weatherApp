import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const ItemLoad = () => {
    var [cityName, setCityName] = useState("");
    var [data, setData] = useState([]);
    var [data2, setData2] = useState([]);
    var [dataIcon, setDataIcon] = useState([]);
    var [dataVietNam] = useState(["Ha Noi", "Ho Chi Minh", "Hue",
        "Nha Trang", "Da Lat", "Da Nang"])
    var [filered, setFiltered] = useState(dataVietNam);
    //=============================================   
    var [isSearching, setIsSearching] = useState(false);
    var onSearch = (text) => {
        if (text) {
            setCityName(text);
            setIsSearching(true);

            const tempList = dataVietNam.filter(item => {
                if (item.match(text)) return item
            })
            setFiltered(tempList)
        } else {
            setCityName("")
            setIsSearching(false);
            setFiltered(dataVietNam);
        }
    }
    //===============================================
    var [loaded, setLoaded] = useState(false);
    var [City, setCity] = useState("");

    useEffect(() => {
        getData()
        LoadWeather(City)
    }, [City])

    const LoadWeather = async (cityName) => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityName + '$days=3', options)
            .then(response => response.json())
            .then(response => {
                setData(response.location);
                setData2(response.current);
                setDataIcon(response.current.condition);
            }
            )
            .catch(err => console.error(err));
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('City', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('City')
            setCity(JSON.parse(jsonValue));
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    return (
        <View>
            <View style={styles.containerTextInput}>
                <TextInput
                    placeholder="Search City"
                    value={cityName}
                    onChangeText={onSearch}
                    style={{ fontSize: 20, marginLeft: 10 }}
                />
                <Icon onPress={() => [LoadWeather(cityName), storeData(cityName),
                setIsSearching(false), setCityName("")]} name="search-outline"
                    style={{ fontSize: 30, marginRight: 10 }}
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
                        <Image source={require('./img/cloud.png')} style={styles.imgItem}></Image>
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
            {
                isSearching &&
                <View style={styles.containerSearch}>
                    <View>
                        {
                            filered.map(item => {
                                return (
                                    <ScrollView>
                                        <TouchableOpacity onPress={() => {
                                            [LoadWeather(item), storeData(item),
                                            setIsSearching(false), setCityName("")]
                                        }}>
                                            <Text style={styles.textItemSearch}>{item}</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            })
                        }
                    </View>
                </View>
            }
        </View>
    );

}

export default ItemLoad;
