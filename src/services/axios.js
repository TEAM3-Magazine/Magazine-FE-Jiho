import axios from "axios";

let token = sessionStorage.getItem("token");
const key = import.meta.env.VITE_KEY;
console.log(key);
// 인스턴스 생성
let instance = axios.create({
  baseURL: key,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
    Authorization: `${token}`,
  },
});

export { instance };
