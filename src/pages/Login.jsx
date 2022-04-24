import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Helmet from "react-helmet";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postLogin } from "../api/query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

const Login = () => {
  /* 최초 입장시 로그인 상태면 로그인 창 이용 불가 */
  const user = useRecoilValue(getSession);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      alert("로그인 상태에서는 로그인이 불가능합니다");
      navigate("/");
    }
  }, []);
  /* 로그인 폼 제출 */
  const { register, handleSubmit, setValue } = useForm();
  const { mutate } = postLogin();
  const onValid = (data) => {
    mutate(
      {
        user_email: data.email,
        user_password: data.password,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries("getPosts");
        },
      }
    );
    setValue("password", "");
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램 | 로그인</title>
        <meta property="og:title" content="🐭 꿱스타그램"></meta>
        <meta property="og:description" content="우리들의 사진 추억" />
        <meta
          property="og:image"
          content="https://velog.velcdn.com/images/jiho3894/post/44bba13c-dbe0-4915-8f0a-400f325c5ff0/image.jpg"
        />
      </Helmet>
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold"> 로그인 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-full space-y-4 flex flex-col m-8 p-4 border-2 rounded-md bg-white"
        >
          <TextField
            label="email"
            variant="standard"
            type="email"
            autoFocus
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "error",
              },
            })}
          />
          <TextField
            label="password"
            type="password"
            variant="standard"
            autoComplete="on"
            {...register("password", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "error",
              },
            })}
          />
          <Button type="submit" variant="contained">
            로그인
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
