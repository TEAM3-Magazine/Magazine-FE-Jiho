import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../services/axios";

export const postLogin = () => {
  return useMutation((login) => {
    return instance
      .post("/user/login", login)
      .then((res) => {
        let result = res.data;
        alert(result.msg);
        console.log(res);
        sessionStorage.setItem("token", result.token);
      })
      .catch((res) => {
        console.log(res);
      });
  });
};

export const postSignup = () => {
  return useMutation((signup) => {
    return instance
      .post("/user/signup", signup)
      .then((res) => {
        let result = res.data;
        alert(result.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getPosts = () => {
  return useQuery("getPosts", async () => {
    return await instance.get("/api/post");
  });
};

export const postWrite = () => {
  return useMutation((post) => {
    return instance.post("/api/post", post).then((res) => {
      let result = res.data;
      alert(result.msg);
      window.location.reload();
    });
  });
};

export const postDelete = (post_id) => {
  return useMutation((del) => {
    return instance
      .delete(`/api/post/${post_id}`, del)
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        let result = res.data;
        alert(result.msg);
        window.location.reload();
      });
  });
};
