import React from "react";
import { Link, useMatch } from "react-router-dom";
import EditToggle from "./EditToggle";
import Like from "./Like";

const Post = (props) => {
  const match = useMatch("/");
  const { contents, image_url, user_name, post_id, post_like, created_at } =
    props;
  return (
    <React.Fragment>
      <div className="w-[550px] bg-white overflow-hidden my-2 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex justify-between items-center">
          <div className="w-12">{user_name}</div>
          <EditToggle post_id={post_id} />
        </header>
        <div className="w-full h-[400px] flex justify-center items-center overflow-hidden">
          <img width="100%" height="384px" src={image_url} alt={image_url} />
        </div>
        <div className="w-full ">
          <section className="w-full h-10 px-1  flex justify-between">
            <Like post_like={post_like} post_id={post_id} />
            <div>{/* 즐겨찾기 */}</div>
          </section>
          <section>
            <div className="w-full px-3">
              <p className="font-semibold text-sm">
                좋아요 {`${post_like?.length}개`}
              </p>
            </div>
          </section>
          <section className="w-full text-sm px-3 py-2">
            <span>{contents}</span>
            <div> 더보기 ...</div>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600">
              <Link
                to={match ? `post/${post_id}` : "#"}
                state={{ contents, image_url, user_name, post_id }}
              >
                댓글 3개 모두 보기
              </Link>
            </div>
            {/* <div> 와 진짜 귀엽네 ??</div> */}
          </section>
        </div>
        <footer className="w-full flex px-3">
          <div>{created_at?.substring(0, 16)}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Post;
