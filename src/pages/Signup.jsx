import React from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postSignup } from "../api/query";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { mutate } = postSignup();
  const navigate = useNavigate();
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
      <div className="w-full h-screen flex flex-col items-center">
        <h1> 회원가입 </h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-1/2 flex flex-col p-4 border-2 rounded-md bg-white"
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
            id="standard-password-input"
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
            id="standard-password-input"
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
