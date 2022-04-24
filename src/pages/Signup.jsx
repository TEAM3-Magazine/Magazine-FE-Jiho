import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getInfo, postSignup } from "../api/query";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

const Signup = () => {
  const { data } = getInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (data !== undefined) {
      alert("로그인 상태에서는 회원가입이 불가능합니다");
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = postSignup();
  const onValid = (data) => {
    mutate({
      user_email: data.email,
      user_name: data.name,
      user_password: data.password,
      user_password_check: data.passwordCheck,
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램 | 회원가입</title>
        <meta property="og:title" content="🐭 꿱스타그램"></meta>
        <meta property="og:description" content="우리들의 사진 추억" />
        <meta property="og:image" content="KakaoTalk_20220416_093108493.jpg" />
      </Helmet>
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold"> 회원가입 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="space-y-4 flex flex-col p-4 border-2 rounded-md bg-white"
        >
          <TextField
            label="Email"
            variant="standard"
            placeholder="Email"
            autoFocus
            required
            {...register("email", {
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@/g,
                message: "이메일에 @는 필수입니다",
              },
            })}
          />
          <span>{errors?.email?.message}</span>
          <TextField
            id="standard-basic"
            label="Nick Name"
            variant="standard"
            required
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
            label="Password"
            type="password"
            variant="standard"
            autoComplete="off"
            {...register("password", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "not pattern",
              },
            })}
          />
          <TextField
            label="Try Password"
            type="password"
            variant="standard"
            autoComplete="off"
            {...register("passwordCheck", {
              required: true,
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
