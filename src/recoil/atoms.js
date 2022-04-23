import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
// import { getInfo } from "../api/query";

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

export const getMyInfo = atom({
  key: "user_info",
  default: 0,
});

export const getSession = atom({
  key: "session",
  default: sessionStorage.getItem("token"),
});
