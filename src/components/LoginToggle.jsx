import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

import Button from "@mui/material/Button";

const LoginToggle = () => {
  const navigate = useNavigate();
  /* 로그인 완료시 메뉴 버튼 변경 */
  const session = useRecoilValue(getSession);
  return (
    <React.Fragment>
      {session !== null ? (
        <Button
          onClick={() => {
            sessionStorage.removeItem("token");
            window.location.reload();
          }}
          color="primary"
          variant="outlined"
        >
          <p className="font-bold dark:text-white ">로그아웃</p>
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate("/login");
          }}
          color="primary"
          variant="outlined"
        >
          <p className="font-bold dark:text-white">로그인</p>
        </Button>
      )}
    </React.Fragment>
  );
};

export default LoginToggle;
