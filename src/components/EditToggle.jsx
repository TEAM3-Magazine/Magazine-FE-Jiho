import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

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
  const { mutate } = postDelete(post_id);
  const deletePost = () => {
    mutate({
      post_id: post_id,
    });
  };
  const { mutate: test } = postUpdate(post_id);
  const updatePost = () => {
    test(
      {
        contents: "안녕",
        image_url:
          "https://firebasestorage.googleapis.com/v0/b/sparta-react-a36d6.appspot.com/o/images%2F%EC%B9%9C%EC%B9%A0%EB%9D%BC.jpg?alt=media&token=2a3d23dd-da66-4b87-bbba-256aad185ada",
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
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
        <Box sx={style} className="relative space-y-5 p-3">
          <div
            onClick={handleClose}
            className="absolute -top-9 right-0 cursor-pointer"
          >
            <CloseIcon fontSize="large" style={{ color: "white" }} />
          </div>
          <span className="border-soild border-b-1 cursor-pointer">
            <Link to="/write">게시물로 이동</Link>
          </span>

          <span className="border-soild border-b-1 cursor-pointer">
            이미지 링크 복사
          </span>
          <span
            onClick={updatePost}
            className="border-soild border-b-1 cursor-pointer"
          >
            수정
          </span>
          <span
            onClick={deletePost}
            className="border-soild border-b-1 cursor-pointer"
          >
            삭제
          </span>
          <span onClick={handleClose} className="cursor-pointer">
            취소
          </span>
        </Box>
      </Modal>
    </>
  );
};

export default EditToggle;
