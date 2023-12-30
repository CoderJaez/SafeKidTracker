import {boolean} from 'yup';
import {create} from 'zustand';

interface ICoordinatesState {
  position: number[];
  deviceStatus: boolean;
  setDeviceStatus: (status: boolean) => void;
  setPosition: (position: number[]) => void;
}

const useCoordinates = create<ICoordinatesState>()(set => ({
  position: [0, 0],
  deviceStatus: false,
  setPosition: (position: number[]) => set(() => ({position: position})),
  setDeviceStatus: (status: boolean) => set(() => ({deviceStatus: status})),
}));

export default useCoordinates;
