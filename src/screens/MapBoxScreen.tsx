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
  const [centerCoordinate, setCenterCoordinate] = useState([123.4365, 7.8249]);
  const [currentCoordinates, setCurrentCoordinates] = useState([0, 0]);
  const {getCoordinates} = BlynkService;
  const {position, setPosition} = useCoordinates();
  const {user, boundary} = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      getCoordinates()
        .then(res => {
          setPosition([res.v1, res.v0]);
        })
        .catch(err => console.log(err));
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  // const onRegionChangeComplete = (region: any) => {
  //   // const point2 = region.geometry.coordinates;
  //   // const point1 = point(centerCoordinate);
  //   // const dist = distance(point1, point2);
  //   // Alert.alert('Distance travel', dist.toString());
  //   // setCurrentCoordinates(point2);
  // };

  useEffect(() => {
    const point1 = point(centerCoordinate);
    let points: Position[] = [];
    let bearer = 15;
    for (let i = 0; i < 24; i++) {
      const point2 = destination(point1, boundary, bearer).geometry.coordinates;
      points.push(point2);
      bearer += 15;
    }
    setCoordinates(points);
  }, [boundary]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/streets-v12">
        <Mapbox.Camera
          centerCoordinate={centerCoordinate}
          zoomLevel={12}
          animationMode="moveTo"
        />

        <Mapbox.MarkerView id="marker-1" coordinate={position}>
          <Marker isDeviceOnline={user.isConnected} />
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
