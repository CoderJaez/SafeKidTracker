import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MapBoxScreen, SettingScreen} from '../screens';
import {screens} from '../constants';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName={screens.maps}>
      <Drawer.Screen name={screens.maps} component={MapBoxScreen} />
      <Drawer.Screen name={screens.settings} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
