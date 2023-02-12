import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import BackgroundService from 'react-native-background-actions';

// import { Container } from './styles';

const MyService = () => {
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).
const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};

const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
        taskDesc: "Alo"
    })
}
  return (
    <View>
        <TouchableOpacity onPress={() => {
            startBackgroundService()
        }}>
            <Text>123</Text>
        </TouchableOpacity>
    </View>
  );
}

export default MyService;