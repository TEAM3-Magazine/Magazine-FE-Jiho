import React from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postLogin } from "../api/query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = postLogin();
  const navigate = useNavigate();
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
      <div className="w-full h-[calc(100vh-3rem)]  flex flex-col items-center justify-center absolute top-0">
        <h1 className="text-xl font-semibold"> 로그인 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="space-y-4 w-2/3 h-1/4 flex flex-col p-4 border-2 rounded-md bg-white"
        >
          <TextField
            id="standard-password-input"
            label="email"
            type="email"
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
            id="standard-password-input"
            label="password"
            type="password"
            variant="standard"
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
