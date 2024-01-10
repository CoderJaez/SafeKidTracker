import {Provider} from '@react-native-material/core';
import axios from '../api/axios';
import {token} from '../constants';
import {Datastream} from '../types';
const BlynkService = {
  getCoordinates: async () => {
    return await new Promise<Datastream>((resolve, reject) => {
      axios
        .get(`getAll?token=${token}`)
        .then(res => {
          const response: Datastream = {
            v0: Number(res.data.v0),
            v1: Number(res.data.v1),
          };
          resolve(response);
        })
        .catch(err => {
          const response = err.response;
          reject(response);
        });
    });
  },
  isDeviceConnected: async () => {
    return await new Promise<boolean>((resolve, reject) => {
      axios
        .get(`isHardwareConnected?token=${token}`)
        .then(res => resolve(res.data))
        .catch(err => reject(false));
    });
  },
  updatePerimeter: async (value: number) => {
    return await new Promise<boolean>((resolve, reject) => {
      axios
        .get(`update?token=${token}&pin=V3&value=${value}`)
        .then(res => {
          console.log(res.status);
          resolve(true);
        })
        .catch(err => {
          console.log(err);
          reject(false);
        });
    });
  },
  updateCenterCoordinates: async (value: string) => {
    return await new Promise<boolean>((resolve, reject) => {
      axios
        .get(`update?token=${token}&pin=V2&value=${value}`)
        .then(res => {
          console.log(res.status);
          resolve(true);
        })
        .catch(err => {
          console.log(err);
          reject(false);
        });
    });
  },
};

export default BlynkService;
