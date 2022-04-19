import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../services/axios";

export const getTestData = () => {
  return useQuery("getTest", async () => {
    return await axios.get("https://reqres.in/api/users?page=2");
  });
};

export const getTestDateDetail = (id) => {
  return useQuery("getTestDetail", async () => {
    return await axios.get(`https://reqres.in/api/users/${id}`);
  });
};

export const getData = () => {
  return useQuery("getData", async () => {
    return await instance.get("/api/board");
  });
};

export const postSignup = () => {
  return useMutation((signup) => {
    return instance.post("/api/register", signup);
  });
};
