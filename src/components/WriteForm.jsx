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
import { CircularProgress } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../shared/firebase";
import { postUpdate, postWrite } from "../api/query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";
import Swal from "sweetalert2";

const WriteBtn = (prop) => {
  const { post_id, number, image_url, contents } = prop;
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
      Swal.fire({
        title: "유저 정보가 없습니다",
        text: "로그인후 이용 가능합니다 🐭",
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
  const { mutateAsync: write, isError } = postWrite();
  const { mutateAsync: update } = postUpdate(post_id);
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    let image = fileInput.current.files[0];
    if (!image) {
      if (image_url === undefined) {
        setOpen(false);
        Swal.fire({
          text: "이미지를 넣어주세요 😢",
          position: "top",
          width: "24rem",
        }).then(() => {
          setOpen(true);
        });
        return;
      }
    }
    /* 업로드 중 로딩 창 */
    setLoading(true);
    /* 수정 창 업로드 창 이미지 값 다르게 표현 */
    const _upload = storage.ref(`images/${image?.name}`).put(image);
    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        if (isError) {
          alert("요청 실패");
          return;
        }
        if (number === "1") {
          if (image?.name !== undefined) {
            update(
              {
                image_url: url,
                contents: data.contents,
              },
              {
                onSuccess: () => {
                  /* 모달 open false 구상 props 전달 */
                  setOpen(false);
                  setImgBase64("");
                  setValue("contents", "");
                },
                onSettled: () => queryClient.invalidateQueries("getPosts"),
              }
            ).then(() => {
              setLoading(false);
            });
          } else {
            update(
              {
                image_url: image_url,
                contents: data.contents,
              },
              {
                onSuccess: () => {
                  /* 모달 open false 구상 props 전달 */
                  setOpen(false);
                  setImgBase64("");
                  setValue("contents", "");
                },
                onSettled: () => queryClient.invalidateQueries("getPosts"),
              }
            ).then(() => {
              setLoading(false);
            });
          }
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
            }
          ).then(() => {
            setLoading(false);
          });
        }
      });
    });
  };
  return (
    <div className={`${post_id ? "" : "fixed"} right-6 bottom-8`}>
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
          <DialogContent className="sm:w-full sm:h-full w-[520px] h-[520px] flex flex-col justify-center items-center">
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
            ) : image_url !== undefined ? (
              <img width="250px" height="250px" src={image_url}></img>
            ) : null}
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="내용 작성"
              fullWidth
              autoFocus
              defaultValue={contents}
              variant="standard"
              maxLength={255}
              style={{ width: 400, border: "2px solid" }}
              {...register("contents", {
                maxLength: 255,
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              <strong>취소</strong>
            </Button>
            {number === "1" ? (
              <Button type="submit" disabled={loading}>
                <strong>수정</strong>
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                <strong>업로드</strong>
              </Button>
            )}
            {loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
          </DialogActions>
        </form>
      </Dialog>
      {number === "1" ? null : (
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
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
