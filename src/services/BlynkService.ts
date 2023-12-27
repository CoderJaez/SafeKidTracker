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
    return await new Promise<Boolean>((resolve, reject) => {
      axios
        .get(`isHardwareConnected?token=${token}`)
        .then(res => resolve(res.data))
        .catch(err => reject(false));
    });
  },
};

export default BlynkService;
