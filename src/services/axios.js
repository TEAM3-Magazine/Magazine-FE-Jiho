import axios from "axios";

export const getToken = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  }
};
// 인스턴스 생성
let instance = axios.create({
  baseURL: import.meta.env.VITE_KEY,
});

instance.interceptors.request.use(async (config) => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  //getToken는 로컬 스토리지에 토큰이 있다면 반환한다 없다면 null 값 반환
  config.headers["authorization"] = await getToken();
  return config;
});

export { instance };
