import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingScreen, MapBoxScreen} from '../screens';
import {screens} from '../constants';
import React from 'react';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.maps}
      //   screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name={screens.maps}
        options={{headerShown: false}}
        component={MapBoxScreen}
      />
      <Stack.Screen name={screens.settings} component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
