import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions'
import Icon from "react-native-vector-icons/Ionicons";
// import { Container } from './styles';
import { showNotification, createChannel } from './pushNotification';
const MyService = (props) => {
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
    var temp = "";
    var name = "";
    var localtime = "";
    var [isRunning, setIsRunning] = useState(false)
    var { dataName } = props;
    useEffect(() => {
      createChannel()
    }, [])
    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundJob.isRunning(); i++) {
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                    }
                };

                await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + dataName + '&days=3', options)
                    .then(response => response.json())
                    .then(response => {
                        temp = response.current.temp_c;
                        name = response.location.name;
                        localtime = response.location.localtime_epoch;
                    }
                    )
                    .catch(err => console.error(err));
                BackgroundJob.updateNotification({ taskTitle: "Nhiệt độ tại " + name + " bây giờ là: " + temp + "°C"})

                if (temp > 30) { 
                    showNotification("Thời tiết", "Thiệc sự là nóng quá đi mà. Đem cái máy lạnh ra đây coai!!")
                    BackgroundJob.updateNotification({ taskDesc: "Thiệc sự là nóng quá đi mà. Đem cái máy lạnh ra đây coai!!" }) }
                else if (temp <= 18 ){
                    showNotification("Thời tiết", "Đại zương cứu Em zới. Em lạnh quá à~")
                    BackgroundJob.updateNotification({ taskDesc: "Đại zương cứu Em zới. Em lạnh quá à~" + localtime })
                }else{
                    showNotification("Thời tiết", "Ngày hôm nay khá mát Đại Zương nhể...");
                    BackgroundJob.updateNotification({ taskDesc: "Ngày hôm nay khá mát Đại Zương nhể... " + localtime})
                }
                console.log(temp + ":" + i)
                console.log(name);
                await sleep(delay);
            }
        });
    };

    const options = {
        taskName: 'Example',
        taskTitle: 'Nhiệt độ bây giờ là :',
        taskDesc: 'Nóng quá. Cíu tớ đi',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        parameters: {
            delay: 300000,
        },
    };

    const startBackgroundService = async () => {
        await BackgroundJob.start(veryIntensiveTask, options);
    }
    const stopBackgroundService = async () => {
        await BackgroundJob.stop();
    }
    return (
        
        <SafeAreaView style={styles.container}>
            <View >
                <Text style = {styles.searchBy}>Search By</Text>
            </View>
            <TouchableOpacity>
                <Text style = {styles.By}>City</Text>
            </TouchableOpacity>
            <View style={styles.notification}>
                <TouchableOpacity onPress={() => {
                    if (BackgroundJob.isRunning()) {
                        setIsRunning(false)
                        stopBackgroundService()
                    } else {
                        setIsRunning(true)
                        startBackgroundService()
                    }

                }}>
                    {isRunning ? (<Icon name="notifications-off-outline" style={{ fontSize: 30 }} />)
                        : (<Icon name="notifications-outline" style={{ fontSize: 30 }} />)}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: "#000",
        marginVertical: 20,
        alignItems: "center",
        flexDirection: "row"
    },

    notification: {
       
        marginLeft: 200 
    },

    searchBy : {
        color: "#FFF",
        fontSize: 20,
        marginLeft: 10
    },

    By: {
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 20,
        fontSize: 20
    }
})

export default MyService;