import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const getTheme = () => {
  const LIGHT = "1";
  const DARK = "2";
  return LIGHT ? DARK : LIGHT;
};

export const themeState = atom({
  key: "themeMode",
  default: getTheme(),
  effects_UNSTABLE: [persistAtom],
});

export const profile = atom({
  key: "profile",
  default: [],
});
