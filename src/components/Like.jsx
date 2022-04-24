import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getInfo, postAddLike, postUndoLike } from "../api/query";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";

const Like = (props) => {
  const { post_like, post_id } = props;
  const { mutate: addLike } = postAddLike(post_id);
  const { mutate: delLike } = postUndoLike(post_id);
  const { data } = getInfo();
  let user = data?.data.user_id;
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== undefined) {
      if (post_like.includes(user)) {
        setIsLike(true);
      }
    }
  }, [user]);
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
      alert("로그인 이후 이용 가능합니다");
      navigate("/login");
    }
  };
  return (
    <div onClick={likeToggle} className="w-1/4 flex items-center space-x-2 ">
      <FavoriteIcon
        className="cursor-pointer"
        color={isLike ? "error" : "disabled"}
      />
    </div>
  );
};

export default Like;
