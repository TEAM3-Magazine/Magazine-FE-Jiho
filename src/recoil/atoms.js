import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/* 다크 모드 토글 구현 */
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

/* 현재 로그인 유저 세션 저장 */
export const getSession = atom({
  key: "session",
  default: sessionStorage.getItem("token"),
});
