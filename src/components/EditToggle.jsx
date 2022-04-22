import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";

import { Link } from "react-router-dom";
import { postDelete, postUpdate } from "../api/query";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 18,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
};

const EditToggle = (props) => {
  const { post_id } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate, isError } = postDelete(post_id);
  const deletePost = () => {
    mutate({
      post_id: post_id,
    });
  };
  const { mutate: test } = postUpdate(post_id);
  const updatePost = () => {
    test({
      contents: "안녕",
      image_url: "hihi",
    });
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="display more actions"
        edge="end"
        color="inherit"
        onClick={handleOpen}
      >
        <MoreIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="border-y-8 leading-10">
          <span className="border-soild border-b-1 hover:scale-105 hover:ease-out hover:duration-100 cursor-pointer">
            <Link to="/write">게시물로 이동</Link>
          </span>

          <span className="border-soild border-b-1 hover:scale-105 hover:ease-out hover:duration-100 cursor-pointer">
            이미지 링크 복사
          </span>
          <span
            onClick={updatePost}
            className="border-soild border-b-1 hover:scale-105 hover:ease-out hover:duration-100 cursor-pointer"
          >
            수정
          </span>
          <span
            onClick={deletePost}
            className="border-soild border-b-1 hover:scale-105 hover:ease-out hover:duration-100 cursor-pointer"
          >
            삭제
          </span>
          <span
            onClick={handleClose}
            className=" hover:scale-105 hover:ease-out hover:duration-100 cursor-pointer"
          >
            취소
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default EditToggle;
