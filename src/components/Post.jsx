import React, { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";

const Post = (props) => {
  const { id, avatar, first_name } = props;
  const match = useMatch("/");
  const [isLike, setIsLike] = useState(false);
  const clickLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <React.Fragment>
      <div className="w-64 h-64 p-2 m-3 rounded-lg bg-red-200 flex flex-col justify-center items-center">
        <Link
          to={match ? `post/${id}` : "#"}
          state={{ id, avatar, first_name }}
        >
          <div className="flex justify-center items bg-slate-400  overflow-hidden">
            <img src={avatar} alt={avatar} className=""></img>
          </div>
          <div className="w-full h-11  flex flex-col items-center ">
            <div>{first_name}</div>
            <div>2022-04-19</div>
          </div>
        </Link>
        <footer className="w-full h-12 flex justify-center items-center mt-2">
          <div
            onClick={clickLike}
            className="flex justify-between items-center"
          >
            <IconButton
              aria-label="add to favorites"
              color={isLike ? "secondary" : "default"}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Post;
