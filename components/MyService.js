import React, {useState}from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import BackgroundService from 'react-native-background-actions';

// import { Container } from './styles';

const MyService = () => {
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
    var temp = "";
    var [data, setData] = useState([]);
const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            temp = Math.floor(Math.random() * 20)
            if(temp < 10){BackgroundService.updateNotification({  taskDesc: 'Lạnh quá. Cíu tớ đi'})}
            else {
                BackgroundService.updateNotification({taskDesc: "Cái đéo gì?"})
            }
            console.log(temp)
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
        delay: 5000,
    },
};

const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
}
const stopBackgroundService = async () => {
    await BackgroundService.stop();
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

    await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityName + '$days=3', options)
        .then(response => response.json())
        .then(response => {
            setData(response.current);
        }
        )
        .catch(err => console.error(err));
};
  return (
    <View>
        <TouchableOpacity onPress={() => {
            startBackgroundService()
        }}>
            <Text>123</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            stopBackgroundService();
        }}>
            <Text>stop</Text>
        </TouchableOpacity>
    </View>
  );
}

export default MyService;