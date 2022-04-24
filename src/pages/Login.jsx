import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getInfo, postLogin } from "../api/query";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

const Login = () => {
  const { data } = getInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (data !== undefined) {
      alert("이미 로그인 상태입니다");
      navigate("/");
    }
  }, []);
  const { register, handleSubmit } = useForm();
  const { mutate } = postLogin();
  const onValid = (data) => {
    mutate(
      {
        user_email: data.email,
        user_password: data.password,
      },
      {
        onSettled: () => {
          navigate("/");
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램 | 로그인</title>
        <meta property="og:title" content="🐭 꿱스타그램"></meta>
        <meta property="og:description" content="우리들의 사진 추억" />
        <meta property="og:image" content="KakaoTalk_20220416_093108493.jpg" />
      </Helmet>
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold"> 로그인 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="space-y-4 flex flex-col p-4 border-2 rounded-md bg-white"
        >
          <TextField
            label="email"
            variant="standard"
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
