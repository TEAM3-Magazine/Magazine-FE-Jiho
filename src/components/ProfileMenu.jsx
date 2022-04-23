import * as React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isToken = sessionStorage.getItem("token") ? true : false;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className=" w-14 h-14 flex">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle />
      </Button>
      {isToken ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ mt: "-10px", ml: "-40px" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setTimeout(() => {
                navigate("/");
              }, 0);
            }}
          >
            내 정보
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              sessionStorage.removeItem("token");
              setTimeout(() => {
                window.location.reload();
              }, 0);
            }}
          >
            로그아웃
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ mt: "-10px", ml: "-40px" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setTimeout(() => {
                navigate("/login");
              }, 0);
            }}
          >
            로그인
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setTimeout(() => {
                navigate("/signup");
              }, 0);
            }}
          >
            회원가입
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default ProfileMenu;
