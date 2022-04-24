import axios from "axios";

// 토근 생성후 header authorization에 넣을 값
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

// 인스턴스 동작시 정보 추가
instance.interceptors.request.use(async (config) => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  config.headers["authorization"] = await getToken();
  return config;
});

export { instance };
