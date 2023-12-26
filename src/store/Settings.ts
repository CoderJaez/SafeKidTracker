import {create} from 'zustand';
import {User, Map} from '../types';

interface IUserState {
  user: User;
  map: Map;
  setMap: (map: Map) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<IUserState>()(set => ({
  user: {
    fullname: '',
    contact_no: '',
    location: [0, 0],
    isConnected: false,
  },
  map: {
    boundaries: 2,
  },
  setMap: (map: Map) => set(state => ({...state.map, map})),
  setUser: (user: User) => set(state => ({...state.user, user})),
}));

export default useUserStore;
