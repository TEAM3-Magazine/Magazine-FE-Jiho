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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = postSignup();
  const onValid = (data) => {
    console.log(errors);
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
      </Helmet>
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold dark:text-white"> 회원가입 </h1>
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
            {...register("email")}
          />
          <TextField
            label="닉네임"
            type="text"
            variant="standard"
            required
            {...register("name")}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="standard"
            autoComplete="off"
            required
            {...register("password")}
          />
          <TextField
            label="비밀번호 체크"
            type="password"
            variant="standard"
            autoComplete="off"
            required
            {...register("passwordCheck")}
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
