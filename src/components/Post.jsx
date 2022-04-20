import React, { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import EditToggle from "./EditToggle";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Post = (props) => {
  const { id, avatar, first_name } = props;
  const match = useMatch("/");
  const [isLike, setIsLike] = useState("default");
  const clickLike = () => {
    setIsLike((prev) => !prev);
  };
  const navigate = useNavigate();
  console.log(isLike);
  return (
    <React.Fragment>
      <div className="w-[550px] bg-white overflow-hidden my-2 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex justify-between items-center">
          <div className="w-12">{first_name}</div>
          <EditToggle />
        </header>
        <div className="w-full h-[400px]  flex justify-center items-center overflow-hidden">
          <img width="100%" height="384px" src={avatar} alt={avatar} />
        </div>
        <footer className="w-full ">
          <section className="w-full h-10 px-3  flex justify-between">
            <div className="w-1/4 flex items-center space-x-2">
              <Checkbox
                {...label}
                icon={<FavoriteBorder onClick={clickLike} />}
                checkedIcon={<Favorite />}
                color={isLike ? "error" : "default"}
              />
              <div>댓글</div>
            </div>
            <div>{/* 즐겨찾기 */}</div>
          </section>
          <section>
            <div className="w-full px-3">
              <p className="font-semibold text-sm">좋아요 0개</p>
            </div>
          </section>
          <section className="w-full text-sm px-3">
            <span>오리 귀여워</span>
            <div> 더보기 ... 만들기</div>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600">
              <Link
                to={match ? `post/${id}` : "#"}
                state={{ id, avatar, first_name }}
              >
                댓글 3개 모두 보기
              </Link>
            </div>
            <div> 와 진짜 귀엽네 ??</div>
          </section>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Post;
