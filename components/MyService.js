import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions'


// import { Container } from './styles';

const MyService = (props) => {
    // var running = BackgroundJob.isRunning();
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
    var temp = "";
    var name = "";
    // var [city, setCity] = useState("");
    var { dataName } = props;
    // console.log(dataName);
    var [data, setData] = useState([]);
    // useEffect(() => {
    //     LoadWeather(dataName)
    // }, [])

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
        
                await fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + dataName + '&days=3', options)
                    .then(response => response.json())
                    .then(response => {
                        temp = response.current.temp_c;
                        name = response.location.name;
                    }
                    )
                    .catch(err => console.error(err));
                BackgroundJob.updateNotification({ taskTitle: "Nhiệt độ tại " + name + "bây giờ là: " +  temp})
                if (temp < 30) { BackgroundJob.updateNotification({ taskDesc: 'Lạnh quá. Cíu tớ đi' }) }
                else {
                    BackgroundJob.updateNotification({ taskDesc: "Thiệc sự là nóng quá đi mà. Đem cái máy lạnh ra đây coai!!" })
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

    const LoadWeather = async (cityName) => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Thua%20Thien%20Hue', options)
            .then(response => response.json())
            .then(response => {
                setData(response.location);
            }
            )
            .catch(err => console.error(err));
    };

    return (
        <View>
            <TouchableOpacity onPress={() => {
                startBackgroundService()
                
            }}>
                <Text>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                stopBackgroundService();
            }}>
                <Text>Stop</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MyService;