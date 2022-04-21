import React from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postSignup } from "../api/query";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, data, isSuccess, isError } = postSignup();
  const navigate = useNavigate();
  const onValid = (data) => {
    mutate({
      user_name: data.name,
      user_password: data.password,
      user_password_check: data.passwordCheck,
      user_email: data.email,
    });
  };
  console.log(data, isError);

  return (
    <React.Fragment>
      <div className="w-full h-screen flex flex-col items-center">
        <h1> 회원가입 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-1/2 flex flex-col p-4 border-2 rounded-md bg-white"
        >
          <TextField
            id="standard-basic"
            label="name"
            variant="standard"
            required
            {...register("name", {
              required: "name is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]/,
                message: "Only naver.com emails allowed",
              },
            })}
          />
          <TextField
            id="standard-basic"
            label="password"
            type="password"
            variant="standard"
            required
            {...register("password", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]/,
                message: "Only naver.com emails allowed",
              },
            })}
          />
          <TextField
            id="standard-password-input"
            label="passwordCheck"
            type="password"
            variant="standard"
            autoComplete="off"
            {...register("passwordCheck", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]/g,
                message: "not pattern",
              },
            })}
          />
          <TextField
            id="standard-password-input"
            label="email"
            type="email"
            variant="standard"
            autoComplete="off"
            {...register("email", {
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
