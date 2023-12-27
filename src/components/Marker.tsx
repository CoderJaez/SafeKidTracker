import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {marker_offline, marker_online} from '../constants/images';

type PROPS = {
  isDeviceOnline: boolean;
};

const Marker: React.FC<PROPS> = ({isDeviceOnline}) => {
  return (
    <View>
      <Image
        source={isDeviceOnline ? marker_online : marker_offline}
        style={styles.marker}
      />
    </View>
  );
};

export default Marker;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 40,
  },
  marker: {height: 30},
});
