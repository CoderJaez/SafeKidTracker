import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {marker_offline, marker_online} from '../constants/images';
import useCoordinates from '../store/Coordinates';

const Marker: React.FC = () => {
  const {deviceStatus} = useCoordinates();
  return (
    <View>
      {!deviceStatus ? (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Offline</Text>
        </View>
      ) : null}
      <Image
        source={deviceStatus ? marker_online : marker_offline}
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
  labelContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    marginLeft: 4,
  },
  label: {
    fontSize: 10,
    color: 'red',
  },
  marker: {height: 30},
});
