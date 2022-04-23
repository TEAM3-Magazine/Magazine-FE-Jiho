import React, { useEffect, useState } from "react";
import Favorite from "@mui/icons-material/Favorite";
import { getInfo, postAddLike, postUndoLike } from "../api/query";
import { queryClient } from "../main";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Like = (props) => {
  const { post_like, post_id } = props;
  const { mutate: addLike } = postAddLike(post_id);
  const { mutate: delLike } = postUndoLike(post_id);
  const { data } = getInfo();
  let user = data?.data.user_id;
  // console.log(post_like, post_id);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    if (user !== undefined) {
      if (post_like.includes(user)) {
        setIsLike(true);
      }
    }
  }, [user]);
  const likeToggle = () => {
    if (isLike) {
      delLike(
        {},
        {
          onSuccess: () => {
            console.log("싫어");
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
            console.log("좋아");
            setIsLike(true);
          },
          onSettled: () => queryClient.invalidateQueries("getPosts"),
        }
      );
    }
  };
  return (
    <div onClick={likeToggle} className="w-1/4 flex items-center space-x-2">
      <Favorite color={`${isLike ? "error" : ""}`} />
    </div>
  );
};

export default Like;
