export const token = 'pRIEv5ZHzB28niwljCCPoo9PTrxSTbtb';

export const screens = {
  settings: 'Settings',
  maps: 'Maps',
};

export type RootStackParamList = {
  SettingScreen: undefined;
  MapBoxScreen: undefined;
};

export type MenuScreen = {
  id: number;
  label: String;
  screenName: keyof RootStackParamList;
};

export const Menu: MenuScreen[] = [
  {id: 1, label: 'Settings', screenName: 'SettingScreen'},
  {id: 1, label: 'Maps', screenName: 'MapBoxScreen'},
];
