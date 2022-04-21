import React, { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import EditToggle from "./EditToggle";
import { useRecoilValue } from "recoil";
import { getSession } from "../recoil/atoms";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Post = (props) => {
  const { contents, image_url, user_name, post_id } = props;
  const match = useMatch("/");
  const [isLike, setIsLike] = useState("default");
  const session = useRecoilValue(getSession);
  const clickLike = () => {
    setIsLike((prev) => !prev);
  };
  //const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="w-[550px] bg-white overflow-hidden my-2 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex justify-between items-center">
          <div className="w-12">{user_name}</div>
          <EditToggle post_id={post_id} />
        </header>
        <div className="w-full h-[400px]  flex justify-center items-center overflow-hidden">
          <img width="100%" height="384px" src={image_url} alt={image_url} />
        </div>
        <footer className="w-full ">
          <section className="w-full h-10 px-1  flex justify-between">
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
          <section className="w-full text-sm px-3 py-2">
            <span>{contents}</span>
            <div> 더보기 ... 만들기</div>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600">
              <Link
                to={match ? `post/${post_id}` : "#"}
                state={{ contents, image_url, user_name, post_id }}
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
