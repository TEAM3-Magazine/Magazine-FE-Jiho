import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postSignup } from "../api/query";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { queryClient } from "../main";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

const Signup = () => {
  /* 최초 입장시 로그인 상태면 회원가입 창 이용 불가 */
  const user = useRecoilValue(getSession);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      alert("로그인 상태에서는 회원가입이 불가능합니다");
      navigate("/");
    }
  }, []);
  /* 회원가입 폼 제출 */
  const { register, handleSubmit } = useForm();
  const { mutate } = postSignup();
  const onValid = (data) => {
    mutate(
      {
        user_email: data.email,
        user_name: data.name,
        user_password: data.password,
        user_password_check: data.passwordCheck,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries("getPosts");
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램 | 회원가입</title>
        <meta property="og:title" content="🐭 꿱스타그램"></meta>
        <meta property="og:description" content="우리들의 사진 추억" />
        <meta
          property="og:image"
          content="https://velog.velcdn.com/images/jiho3894/post/44bba13c-dbe0-4915-8f0a-400f325c5ff0/image.jpg"
        />
      </Helmet>
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold"> 회원가입 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-full space-y-4 flex flex-col m-8 p-4 border-2 rounded-md bg-white"
        >
          <TextField
            label="이메일"
            variant="standard"
            type="email"
            autoFocus
            required
            {...register("email", {
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "이메일에 @는 필수입니다",
              },
            })}
          />
          <TextField
            label="닉네임"
            type="text"
            variant="standard"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "minLength 3",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "pattern error",
              },
            })}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="standard"
            autoComplete="off"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "최소 6자",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "not pattern",
              },
            })}
          />
          <TextField
            label="비밀번호 체크"
            type="password"
            variant="standard"
            autoComplete="off"
            {...register("passwordCheck", {
              required: true,
              minLength: {
                value: 6,
                message: "최소 6자",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "error",
              },
            })}
          />
          <Button type="submit" variant="contained">
            회원가입
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
