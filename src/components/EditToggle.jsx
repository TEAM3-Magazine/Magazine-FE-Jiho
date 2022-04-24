import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { Link, useNavigate } from "react-router-dom";
import { getInfo, postDelete } from "../api/query";
import { queryClient } from "../main";
import WriteBtn from "./WriteForm";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

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
  const { post_id, image_url, user_name } = props;
  /* 유저 정보로 편집 정보 확인해서 UI 변경 */
  const { data } = getInfo();
  const user = data?.data.user_name;
  const [edit, setEdit] = React.useState(false);
  React.useEffect(() => {
    if (user !== undefined) {
      if (user_name === user) {
        setEdit(true);
      }
    }
  });
  /* 모달 토글 */
  const modalOpen = () => {
    if (session) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  /* 유저가 존재하지않으면 편집 불가 */
  const [open, setOpen] = React.useState(false);
  const session = useRecoilValue(getSession);
  const navigate = useNavigate();
  const handleOpen = () => {
    if (session) {
      setOpen(true);
    } else {
      alert("로그인 이후에 가능합니다");
      navigate("/login");
    }
  };
  /* 이미지 복사 */
  const textInput = React.useRef();
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand("copy");
    alert("이미지 URL 복사 완료");
  };
  /* 해당 포스터 삭제 useMutation */
  const { mutate } = postDelete(post_id);
  const deletePost = () => {
    mutate(
      {
        post_id: post_id,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries("getPosts");
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
        className="dark:text-white"
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
          <span className="border-soild border-b-1  hover:text-gray-500">
            <Link to={`post/${post_id}`}>
              <span className="cursor-pointer">게시물로 이동</span>
            </Link>
          </span>
          <div className="flex space-x-4 justify-center">
            <span className="relative duration-500 flex flex-col items-center border-soild border-b-1 cursor-pointer">
              <Fab
                onClick={copy}
                size="medium"
                color="inherit"
                aria-label="add"
                className="cursor-pointer "
              >
                <ContentCopyIcon />
              </Fab>
              <span className="absolute top-14  text-[10px] ">복사하기</span>
            </span>
            {edit ? (
              <>
                <span
                  onClick={modalOpen}
                  className="relative flex flex-col items-center border-soild border-b-1 cursor-pointer"
                >
                  <WriteBtn number="1" post_id={post_id} />
                  <span className="absolute top-14 text-[10px]">수정하기</span>
                </span>
                <span className="relative flex flex-col items-center border-soild border-b-1 cursor-pointer">
                  <Fab
                    onClick={deletePost}
                    size="medium"
                    color="error"
                    aria-label="add"
                    className="cursor-pointer"
                  >
                    <DeleteIcon />
                  </Fab>
                  <span className="absolute top-14 text-[10px]">삭제하기</span>
                </span>
              </>
            ) : null}
          </div>
          <input
            className="text-white opacity-0 pointer-events-none"
            ref={textInput}
            defaultValue={image_url}
          />
        </Box>
      </Modal>
    </>
  );
};

export default EditToggle;
