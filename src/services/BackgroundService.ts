// BackgroundService.ts

import {DeviceEventEmitter} from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import BlynkService from './BlynkService';

const sleep = (time: number) =>
  new Promise(resolve => setInterval(() => resolve(undefined), time));

const yourTask = async () => {
  console.log('Run background task');

  // Your background task logic goes here
  const isConnected = await BlynkService.isDeviceConnected();
  if (!isConnected)
    await BackgroundJob.updateNotification({
      taskTitle: 'Device offline',
      taskDesc: 'The Device is offline.',
    });
  // For example, simulate a task that takes 5 seconds
  await sleep(5000);

  console.log('Background task completed');
  console.log(BackgroundJob.isRunning());
};

import {Linking} from 'react-native';

Linking.addEventListener('url', handleOpenURL);

function handleOpenURL(evt: any) {
  // Will be called when the notification is pressed
  console.log(evt.url);
  // do something
}

const options = {
  taskName: 'ExampleTask',
  taskTitle: 'Example Task',
  taskDesc: 'Performing background task',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // Add this
  parameters: {
    delay: 3000,
  },
};

class BackgroundService {
  static start = () => {
    console.log('Starting background process');
    BackgroundJob.start(yourTask, options);
  };

  static stop = () => {
    BackgroundJob.stop();
  };
}

export default BackgroundService;
