import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../services/axios";

// const key = import.meta.env.VITE_KEY;

// export const getToken = (session) => {
//   let instance = axios.create({
//     baseURL: key,
//     headers: {
//       "content-type": "application/json;charset=UTF-8",
//       accept: "application/json,",
//       "Access-Control-Allow-Origin": "*",
//       Authorization: `${session}`,
//     },
//   });
//   return instance;
// };

export const postLogin = () => {
  return useMutation((login) => {
    return instance
      .post(`/user/login`, login)
      .then((res) => {
        let result = res.data;
        alert(result.msg);
        console.log(res);
        sessionStorage.setItem("token", result.token);
      })
      .catch((res) => {
        alert("로그인 실패");
        console.log(res);
      })
      .finally((res) => {
        const session = sessionStorage.getItem("token");
        // getToken(session);
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
        alert("회원가입 실패");
        return;
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
        let result = res.data;
        alert(result.msg);
        window.location.reload();
      })
      .catch(() => {
        alert("본인 아님");
        return;
      });
  });
};

export const postUpdate = (post_id) => {
  return useMutation((update) => {
    return instance
      .put(`/api/post/${post_id}`, update)
      .then((res) => {
        let result = res.data;
        alert(result.msg);
        window.location.reload();
      })
      .catch(() => {
        alert("본인 아님");
        return;
      });
  });
};
