import {View, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox from '@rnmapbox/maps';
import {point, destination, Position, distance} from '@turf/turf';
import {Text} from '@react-native-material/core';

Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWtpbmkiLCJhIjoiY2xxaHNvamVuMWl5YTJqbm1qazliMnk5ayJ9.Vg7mtEFcNALLqAWAa76ChQ',
);
const MapBoxScreen: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Position[]>([]);
  const [centerCoordinate, setCenterCoordinate] = useState([123.4365, 7.8249]);
  const [currentCoordinates, setCurrentCoordinates] = useState([0, 0]);

  const onRegionChangeComplete = (region: any) => {
    const point2 = region.geometry.coordinates;
    const point1 = point(centerCoordinate);
    const dist = distance(point1, point2);
    Alert.alert('Distance travel', dist.toString());
    setCurrentCoordinates(point2);
  };

  useEffect(() => {
    const point1 = point(centerCoordinate);
    let points: Position[] = [];
    let bearer = 15;
    for (let i = 0; i < 24; i++) {
      const point2 = destination(point1, 4, bearer).geometry.coordinates;
      points.push(point2);
      bearer += 15;
    }
    setCoordinates(points);
  }, []);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        onPress={onRegionChangeComplete}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/streets-v12">
        <Mapbox.Camera
          centerCoordinate={centerCoordinate}
          zoomLevel={12}
          animationMode="moveTo"
        />
        <Mapbox.PointAnnotation id="marker" coordinate={centerCoordinate}>
          <View />
        </Mapbox.PointAnnotation>
        <Mapbox.PointAnnotation id="marker" coordinate={[123.436033, 7.827058]}>
          <View />
        </Mapbox.PointAnnotation>
        <Mapbox.PointAnnotation id="marker" coordinate={currentCoordinates}>
          <View />
        </Mapbox.PointAnnotation>

        <Mapbox.ShapeSource
          id="my-shape-id"
          shape={{
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [coordinates], // Center coordinates (longitude, latitude)
                },
                properties: {},
              },
            ],
          }}>
          <Mapbox.LineLayer
            id="line01"
            sourceID="source-line01"
            style={{
              lineColor: 'red',
              lineWidth: 2,
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
    </View>
  );
};

export default MapBoxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
  },
  map: {
    flex: 1,
  },
});
