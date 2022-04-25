import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../api/query";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    position: "absolute",
    top: 30,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function MyProfile() {
  const session = useRecoilValue(getSession);
  const navigate = useNavigate();
  const { data } = getInfo();
  const user = data?.data?.user_name;
  const profile = () => {
    if (session === null) {
      Swal.fire({
        text: "로그인 후 이용할 수 있습니다 🐭",
        position: "top",
        width: "24rem",
        showCancelButton: true,
        confirmButtonText: "로그인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate(`profile/${user}`);
    }
  };
  return (
    <Stack
      className="fixed right-3 bottom-36 w-14 h-14 cursor-pointer"
      direction="row"
      spacing={2}
      onClick={profile}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Remy Sharp"
          src="https://avatars.githubusercontent.com/u/79081800?v=4"
        />
      </StyledBadge>
    </Stack>
  );
}
