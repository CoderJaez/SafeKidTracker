import axios from 'axios';
const live_url = 'https://blynk.cloud/external/api/';

export default axios.create({
  baseURL: live_url,
  timeout: 20000,
  headers: {'Content-Type': 'application/json'},
});

export const axiosPrivate = axios.create({
  baseURL: live_url,
  timeout: 20000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});
