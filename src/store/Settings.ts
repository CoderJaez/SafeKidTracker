import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {User, Map} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserState {
  user: User;
  boundary: number;
  setBoundary: (boundary: number) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      user: {
        fullname: '',
        contact_no: '',
        isConnected: false,
      },
      boundary: 3,
      setBoundary: (boundary: number) =>
        set(state => ({boundary: boundary})),
      setUser: (user: User) => set(state => ({...state.user, user})),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
