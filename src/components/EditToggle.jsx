import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { Link } from "react-router-dom";
import { postDelete } from "../api/query";
import WriteBtn from "./WriteForm";
import { queryClient } from "../main";

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
    mutate(
      {
        post_id: post_id,
      },
      {
        onSettled: () => queryClient.invalidateQueries("getPosts"),
      }
    );
  };
  const modalOpen = () => {
    setOpen(true);
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
            <Link to={`post/${post_id}`}>게시물로 이동</Link>
          </span>

          <div className="flex space-x-4 justify-center">
            <span className="border-soild border-b-1 cursor-pointer">
              <Fab size="medium" color="inherit" aria-label="add">
                <ContentCopyIcon />
              </Fab>
            </span>
            <span
              onClick={modalOpen}
              className="border-soild border-b-1 cursor-pointer"
            >
              <WriteBtn number="1" post_id={post_id} />
            </span>
            <span
              onClick={deletePost}
              className="border-soild border-b-1 cursor-pointer"
            >
              <Fab size="medium" color="error" aria-label="add">
                <DeleteIcon />
              </Fab>
            </span>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditToggle;
