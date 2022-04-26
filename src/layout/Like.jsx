import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import React, { useEffect, useState } from "react";
import { getInfo, postAddLike, postUndoLike } from "../api/query";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Like = (props) => {
  const { post_like, post_id } = props;
  const { mutate: addLike } = postAddLike(post_id);
  const { mutate: delLike } = postUndoLike(post_id);
  const { data } = getInfo();
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  /* user 정보를 확인해 좋아요 누른 상태 저장 */
  let user = data?.user_id;
  useEffect(() => {
    if (user !== undefined) {
      if (post_like.includes(user)) {
        setIsLike(true);
      }
    }
  }, [user]);
  /* 좋아요 등록, 취소 비로그인 상태는 좋아요 클릭 금지 */
  const likeToggle = () => {
    if (data !== undefined) {
      if (isLike) {
        delLike(
          {},
          {
            onSuccess: () => {
              setIsLike(false);
            },
            onSettled: () => queryClient.invalidateQueries("getPosts"),
          }
        );
      } else {
        addLike(
          {},
          {
            onSuccess: () => {
              setIsLike(true);
            },
            onSettled: () => queryClient.invalidateQueries("getPosts"),
          }
        );
      }
    } else {
      Swal.fire({
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
  return (
    <div className="w-full flex items-center justify-between">
      <Checkbox
        {...label}
        onClick={likeToggle}
        icon={<FavoriteBorder color="error" />}
        checkedIcon={<Favorite color="error" />}
        checked={isLike}
        className="hover:scale-110 duration-200"
      />
      <Checkbox
        className="hover:scale-110 duration-200"
        {...label}
        icon={<BookmarkBorderIcon color="primary" />}
        checkedIcon={<BookmarkIcon color="primary" />}
      />
    </div>
  );
};

export default Like;
