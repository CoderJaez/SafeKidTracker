import {create} from 'zustand';

interface ICoordinatesState {
  position: number[];
  setPosition: (position: number[]) => void;
}

const useCoordinates = create<ICoordinatesState>()(set => ({
  position: [0, 0],
  setPosition: (position: number[]) => set(() => ({position: position})),
}));


export default useCoordinates