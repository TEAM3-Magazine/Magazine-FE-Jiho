import React from "react";
import { useForm } from "react-hook-form";
import { instance } from "../services/axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex flex-col items-center">
        <h1> 로그인 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-1/2 flex flex-col p-4 border-2 rounded-md bg-white"
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
            회원가입
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
