import {
  View,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput, Text} from '@react-native-material/core';
import useUserStore from '../store/Settings';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Formik} from 'formik';
import {object, string, number} from 'yup';
import {User, Map} from '../types';
import MapModal from '../components/MapModal';

const userSchema = object({
  fullname: string().required('Fullname is required'),
  contact_no: string()
    .required('Contact number is required')
    .min(11, 'Invalid contact number'),
});

const boundarySchema = object({
  boundary: number().required('Boundary is required'),
});

const MapSetting: React.FC = () => {
  const {boundary, setBoundary, centerCoordinates} = useUserStore();
  const [modelVisible, setModalVisible] = useState(false);
  const initValue: Map = {
    boundary: boundary,
  };
  const onSubmitHandler = async ({boundary}: Map) => {
    try {
      setBoundary(boundary);
      Alert.alert('Boundary setup', 'Success');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <MapModal modalVisible={modelVisible} setModalVisible={setModalVisible} />
      <Text variant="h6" style={{marginBottom: 10}}>
        Setup your map's boundaries in Pagadian
      </Text>
      <Text variant="subtitle1">
        Note: These boundaries are the peremeter (in km) that your going setup
        in within the Pagadian City only.
      </Text>

      <Formik
        initialValues={initValue}
        validationSchema={boundarySchema}
        onSubmit={onSubmitHandler}>
        {({handleChange, values, handleBlur, handleSubmit, errors}) => (
          <>
            <Button
              title="Pin Location"
              titleStyle={{fontSize: 11}}
              onPress={() => setModalVisible(true)}
            />
            <TextInput
              label="Boundary"
              value={values.boundary.toString()}
              keyboardType="number-pad"
              placeholder="Enter boundary perimeter"
              onBlur={handleBlur('boundary')}
              onChangeText={handleChange('boundary')}
            />
            {errors.boundary && <Text color="red">{errors.boundary}</Text>}
            <Button
              title="Save"
              style={{marginTop: 10}}
              onPress={handleSubmit as any}
            />
          </>
        )}
      </Formik>
    </View>
  );
};
const ChildSetting: React.FC = () => {
  const {user, setUser} = useUserStore();

  const initValues: Omit<User, 'isConnected'> = {
    fullname: user?.fullname as string,
    contact_no: user?.contact_no as string,
  };

  const onSubmitHandler = ({
    fullname,
    contact_no,
  }: Omit<User, 'isConnected'>) => {
    const data = {
      fullname: fullname,
      contact_no: contact_no,
    };
    setUser(data as User);
    Alert.alert('Child info setup', 'Success!');
  };
  return (
    <View style={styles.container}>
      <Text variant="h6" style={{marginBottom: 10}}>
        Setup your child's information
      </Text>
      <Formik
        initialValues={initValues}
        validationSchema={userSchema}
        onSubmit={onSubmitHandler as any}>
        {({
          handleChange,
          values,
          handleBlur,
          handleSubmit,
          errors,
          isSubmitting,
        }) => (
          <>
            <TextInput
              placeholder="E.g. Jhon Doe"
              label="Fullname"
              value={values.fullname}
              onBlur={handleBlur('fullname')}
              onChangeText={handleChange('fullname')}
            />
            {errors.fullname && <Text color="red">{errors.fullname}</Text>}

            <TextInput
              placeholder="09151451010"
              label="Contact Number"
              onBlur={handleBlur('contact_no')}
              value={values.contact_no}
              onChangeText={handleChange('contact_no')}
            />
            {errors.contact_no && <Text color="red">{errors.contact_no}</Text>}

            <Button
              title="Save"
              style={{marginTop: 10}}
              onPress={handleSubmit as any}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const renderScene = SceneMap({
  childSetting: ChildSetting,
  mapSetting: MapSetting,
});

const SettingScreen: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([
    {key: 'childSetting', title: 'Child Settings'},
    {key: 'mapSetting', title: 'Map Settings'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
