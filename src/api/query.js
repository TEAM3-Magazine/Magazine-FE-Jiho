import { useMutation, useQuery } from "react-query";
import { instance } from "../services/axios";

/* 메인 페이지 포스트 리스트 */
export const getPosts = () => {
  return useQuery("getPosts", () => {
    return instance.get("/api/post");
  });
};

/* 포스터 상세 페이지 */
export const getPostDetail = (post_id) => {
  return useQuery("postDetail", () => {
    return instance.get(`/api/post/${post_id}`);
  });
};

/* 유저 정보 가져오기 */
export const getInfo = () => {
  return useQuery("userInfo", () => {
    return instance.get("/user/userinfo");
  });
};

/* 로그인 */
export const postLogin = () => {
  return useMutation(async (login) => {
    try {
      const res = await instance.post(`/user/login`, login);
      let result = res.data;
      console.log(result);
      alert(result.msg);
      sessionStorage.setItem("token", result.token);
    } catch (err) {
      alert(err.response.data.msg);
    }
  });
};

/* 회원가입 */
export const postSignup = () => {
  return useMutation(async (signup) => {
    try {
      const res = await instance.post("/user/signup", signup);
      console.log(res);
      alert(result.msg);
    } catch (err) {
      console.log(err);
    }
  });
};

/* 게시글 작성 */
export const postWrite = () => {
  return useMutation(async (post) => {
    try {
      await instance.post("/api/post", post);
    } catch (err) {
      alert(err.response.data.msg);
    }
  });
};

/* 게시글 삭제 */
export const postDelete = (post_id) => {
  return useMutation(async (del) => {
    try {
      await instance.delete(`/api/post/${post_id}`, del);
    } catch (err) {
      alert(err.response.data.msg);
    }
  });
};

/* 해당 포스터 좋아요 */
export const postAddLike = (post_id) => {
  return useMutation(async (add) => {
    try {
      await instance.post(`/api/post/${post_id}/like`, add);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  });
};

/* 해당 포스터 좋아요 취소 */
export const postUndoLike = (post_id) => {
  return useMutation(async (del) => {
    try {
      await instance.delete(`/api/post/${post_id}/like`, del);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  });
};

/* 해당 포스터 수정 */
export const postUpdate = (post_id) => {
  return useMutation(async (update) => {
    try {
      await instance.put(`/api/post/${post_id}`, update);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  });
};
