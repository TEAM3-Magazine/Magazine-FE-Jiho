import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { getInfo, postAddLike, postUndoLike } from "../api/query";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Like = (props) => {
  const { post_like, post_id } = props;
  const { mutate: addLike } = postAddLike(post_id);
  const { mutate: delLike } = postUndoLike(post_id);
  // const { data: userInfo } = getInfo();
  const [isLike, setIsLike] = useState(false);
  const test = () => {
    let a = post_like.findIndex((p) => p === userInfo?.data.user_id);
    return a === -1 ? setIsLike(false) : setIsLike(true);
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     test();
  //   }
  // }, [isLike]);
  // console.log(userInfo?.data.user_id, ":", post_like, ":", isLike);
  const likeToggle = () => {
    if (isLike) {
      delLike(
        {},
        {
          onSuccess: () => {
            setIsLike(false);
          },
        }
      );
    } else {
      addLike(
        {},
        {
          onSuccess: () => {
            alert("좋아요");
            setIsLike(true);
          },
        }
      );
    }
  };
  return (
    <div onClick={likeToggle} className="w-1/4 flex items-center space-x-2">
      <Checkbox
        {...label}
        icon={<FavoriteBorder color="error" />}
        checkedIcon={<Favorite color="error" />}
      />
    </div>
  );
};

export default Like;
