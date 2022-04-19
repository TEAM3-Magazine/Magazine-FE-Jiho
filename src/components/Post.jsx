import React from "react";
import { Link, useMatch } from "react-router-dom";

const Post = (props) => {
  const { id, avatar, first_name } = props;
  const match = useMatch("/");
  return (
    <React.Fragment>
      <div className="w-60 h-60 p-2 m-3 rounded-lg bg-red-200">
        <Link
          to={match ? `post/${id}` : "#"}
          state={{ id, avatar, first_name }}
        >
          <header>
            <div>{first_name}</div>
            <div>2022-04-19</div>
          </header>
          <div className="flex justify-center items">
            <img src={avatar} alt={avatar} className="w-42 h-42"></img>
          </div>
          <footer className="flex justify-between">
            <div>댓글 0개</div>
            <div>좋아요 0개</div>
          </footer>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Post;
