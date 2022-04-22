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
      alert(result.msg);
      sessionStorage.setItem("token", result.token);
    } catch {
      alert("로그인 실패");
      return;
    }
  });
};

/* 회원가입 */
export const postSignup = () => {
  return useMutation(async (signup) => {
    try {
      const res = await instance.post("/user/signup", signup);
      let result = res.data;
      alert(result.msg);
    } catch (err) {
      alert("회원가입 실패");
      return;
    }
  });
};

/* 게시글 작성 */
export const postWrite = () => {
  return useMutation(async (post) => {
    try {
      const res = await instance.post("/api/post", post);
      let result = res.data;
      alert(result.msg);
    } catch (res_1) {
      console.log(res_1);
    }
  });
};

/* 게시글 삭제 */
export const postDelete = (post_id) => {
  return useMutation(async (del) => {
    try {
      const res = await instance.delete(`/api/post/${post_id}`, del);
      let result = res.data;
      alert(result.msg);
    } catch {
      alert("본인 아님");
      return;
    }
  });
};

/* 해당 포스터 좋아요 */
export const postAddLike = (post_id) => {
  return useMutation(async (add) => {
    const res = await instance.post(`/api/post/${post_id}/like`, add);
    console.log(res);
  });
};

/* 해당 포스터 좋아요 취소 */
export const postUndoLike = (post_id) => {
  return useMutation(async (del) => {
    const res = await instance.delete(`/api/post/${post_id}/like`, del);
    console.log(res);
  });
};

/* 해당 포스터 수정 */
export const postUpdate = (post_id) => {
  return useMutation(async (update) => {
    try {
      const res = await instance.put(`/api/post/${post_id}`, update);
      let result = res.data;
      alert(result.msg);
    } catch {
      alert("본인 아님");
      return;
    }
  });
};
