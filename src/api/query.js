import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { instance } from "../services/axios";

/* 메인 페이지 포스트 리스트 30초마다 정보 실시간 업데이트*/
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
      sessionStorage.setItem("token", result.token);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "로그인 성공",
        text: "즐겁게 이용해주세요 😊",
        width: "24rem",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (err) {
      alert(err.response.data.msg);
      return;
    }
  });
};

/* 회원가입 */
export const postSignup = () => {
  return useMutation(async (signup) => {
    try {
      await instance.post("/user/signup", signup);
      Swal.fire({
        icon: "success",
        title: "회원가입 성공",
        width: "24rem",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (err) {
      Swal.fire({
        text: `${err.response.data.msg}`,
        position: "top",
        width: "24rem",
      });
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "포스터가 삭제 되었습니다!",
      });
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
      alert(err.response.data.msg);
    }
  });
};

/* 해당 포스터 수정 */
export const postUpdate = (post_id) => {
  return useMutation(async (update) => {
    try {
      await instance.put(`/api/post/${post_id}`, update);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "info",
        title: "포스터가 수정 되었습니다!",
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  });
};
