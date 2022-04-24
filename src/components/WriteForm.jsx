import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../Shared/firebase";
import { postUpdate, postWrite } from "../api/query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

const WriteBtn = (prop) => {
  const { post_id, number } = prop;
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const session = useRecoilValue(getSession);
  const navigate = useNavigate();
  const fileInput = useRef();
  /* 편집 버튼 유저 상태 확인 */
  const handleClickOpen = () => {
    if (session !== null) {
      setOpen(true);
    } else {
      alert("로그인 이후에 가능합니다");
      navigate("/login");
    }
  };
  const handleClose = () => {
    setOpen(false);
    setImgBase64("");
    setValue("contents", "");
  };
  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  /* 파일 파이어베이스 Storage 가공 */
  const onChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };
  /* 포스터 등록 이미지 필수 등록 */
  const { mutate: write, isError } = postWrite();
  const { mutate: update } = postUpdate(post_id);
  const onSubmit = (data) => {
    let image = fileInput.current.files[0];
    if (!image) {
      alert("이미지를 넣어주세요");
      return;
    }
    const _upload = storage.ref(`images/${image.name}`).put(image);
    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        if (isError) {
          alert("요청 실패");
          return;
        }
        if (number === "1") {
          update(
            {
              image_url: url,
              contents: data.contents,
            },
            {
              onSuccess: () => {
                setOpen(false);
                setImgBase64("");
                setValue("contents", "");
              },
              onSettled: () => queryClient.invalidateQueries("getPosts"),
            }
          );
        } else {
          write(
            {
              image_url: url,
              contents: data.contents,
            },
            {
              onSuccess: () => {
                setOpen(false);
                setImgBase64("");
                setValue("contents", "");
                setAlertOpen(true);
              },
              onSettled: () => queryClient.invalidateQueries("getPosts"),
              onError: () => {
                console.log("??");
              },
            }
          );
        }
      });
    });
  };
  return (
    <div className={`${post_id ? "" : "fixed"} bottom-4 right-4`}>
      <Fab
        size="medium"
        color="info"
        aria-label="edit"
        onClick={handleClickOpen}
      >
        <EditIcon fontSize="medium" />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {number === "1" ? "수정하기" : "새 게시물 만들기"}
        </DialogTitle>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="w-[520px] h-[520px] flex flex-col justify-center items-center">
            {imgBase64 === "" ? (
              <DialogContentText>사진을 등록해주세요</DialogContentText>
            ) : null}
            <label htmlFor="icon-button-file">
              <input
                type="file"
                id="icon-button-file"
                className="hidden"
                onChange={onChange}
                ref={fileInput}
                name={imgFile}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
            {imgBase64 ? (
              <img width="250px" height="250px" src={imgBase64}></img>
            ) : null}
            <TextField
              margin="dense"
              id="contents"
              label="내용 작성"
              type="text"
              fullWidth
              variant="standard"
              {...register("contents")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <strong>취소</strong>
            </Button>
            {number === "1" ? (
              <Button type="submit">
                <strong>수정</strong>
              </Button>
            ) : (
              <Button type="submit">
                <strong>업로드</strong>
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
      {number === "1" ? (
        <Snackbar
          open={alertOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        ></Snackbar>
      ) : (
        <Snackbar
          open={alertOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            게시물 등록 완료!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default WriteBtn;
