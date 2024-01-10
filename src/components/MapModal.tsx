import {View, StyleSheet, Modal, Alert} from 'react-native';
import React from 'react';
import Mapbox from '@rnmapbox/maps';
import useUserStore from '../store/Settings';
import {Button} from '@react-native-material/core';
import BlynkService from '../services/BlynkService';
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWtpbmkiLCJhIjoiY2xxaHNvamVuMWl5YTJqbm1qazliMnk5ayJ9.Vg7mtEFcNALLqAWAa76ChQ',
);
type PROPS = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const MapModal: React.FC<PROPS> = ({modalVisible, setModalVisible}) => {
  const {centerCoordinates, setCenterCoordinates} = useUserStore();
  const onRegionChangeComplete = async (region: any) => {
    // const point2 = region.geometry.coordinates;
    // const point1 = point(centerCoordinate);
    // const dist = distance(point1, point2);
    // Alert.alert('Distance travel', dist.toString());
    const coordinates = region.geometry.coordinates.join(',');
    const result = await BlynkService.updateCenterCoordinates(coordinates);
    if (result) {
      setCenterCoordinates(region.geometry.coordinates);
      Alert.alert('Pin location', 'Success!');
    }
  };
  return (
    <Modal visible={modalVisible}>
      <Button
        onPress={() => setModalVisible(!modalVisible)}
        title="Close"
        titleStyle={{fontSize: 11}}
        style={{width: 80, position: 'absolute', zIndex: 1, right: 15, top: 25}}
      />
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/streets-v12"
        onPress={onRegionChangeComplete}>
        <Mapbox.Camera
          centerCoordinate={centerCoordinates}
          zoomLevel={15}
          animationMode="moveTo"
        />
      </Mapbox.MapView>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    padding: 10,
  },
});
