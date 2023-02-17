import PushNotification from 'react-native-push-notification';

const createChannel = () => {
    PushNotification.createChannel({
        channelId: 'channel-id',
        channelName: 'my-channel'
    },
        (created) => console.log(`channel created ${created}`),
    )
}

const showNotification = (title, mess) => {
    PushNotification.localNotification({
        channelId: 'channel-id',
        channelName: 'my-channel',
        title: title,
        message: mess,
        autoCancel: true
    })
}


export { showNotification, createChannel};