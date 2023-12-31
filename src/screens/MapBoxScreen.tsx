import {View, StyleSheet, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox from '@rnmapbox/maps';
import {point, destination, Position, distance} from '@turf/turf';
import BlynkService from '../services/BlynkService';
import useCoordinates from '../store/Coordinates';
import useUserStore from '../store/Settings';
import Marker from '../components/Marker';
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWtpbmkiLCJhIjoiY2xxaHNvamVuMWl5YTJqbm1qazliMnk5ayJ9.Vg7mtEFcNALLqAWAa76ChQ',
);
const MapBoxScreen: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Position[]>([]);
  const {getCoordinates, isDeviceConnected} = BlynkService;
  const {position, setPosition, deviceStatus, setDeviceStatus} =
    useCoordinates();
  const {user, boundary, centerCoordinates} = useUserStore();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        getCoordinates()
          .then(res => {
            if (!(position[0] == res.v1 && position[1] == res.v0))
              setPosition([res.v1, res.v0]);
          })
          .catch(err => console.log(err));
        const status: boolean = await isDeviceConnected();
        setDeviceStatus(status);
      } catch (error) {
        console.log('Error in getting coordinates and device status');
      }
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const point1 = point(centerCoordinates);
    let points: Position[] = [];
    let bearer = 15;
    for (let i = 0; i < 24; i++) {
      const point2 = destination(point1, boundary, bearer).geometry.coordinates;
      points.push(point2);
      bearer += 15;
    }
    setCoordinates(points);
  }, [boundary, centerCoordinates]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/streets-v12">
        <Mapbox.Camera
          centerCoordinate={centerCoordinates}
          zoomLevel={15}
          animationMode="moveTo"
        />

        <Mapbox.MarkerView id="marker-1" coordinate={position}>
          <Marker />
        </Mapbox.MarkerView>

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
