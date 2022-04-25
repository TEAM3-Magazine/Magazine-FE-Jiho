import React from "react";
import EditToggle from "../components/EditToggle";

const PostDetail = (prop) => {
  /* 프로필 내용 포스터 */
  const { contents, created_at, image_url, post_like, user_name, post_id } =
    prop;
  return (
    <React.Fragment>
      <div className="dark:bg-[#111111] sm:w-[100%] w-[550px] bg-white overflow-hidden my-4 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex items-center justify-end">
          <EditToggle
            user_name={user_name}
            post_id={post_id}
            image_url={image_url}
          />
        </header>
        <div className="w-full h-[400px] sm:h-[300px] flex justify-center items-center overflow-hidden">
          <img width="100%" height="384px" src={image_url} alt={image_url} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <section>
            <div className="w-full px-3">
              <p className="dark:text-white font-semibold text-sm">
                좋아요 {post_like.length}개
              </p>
            </div>
          </section>
          <section className="dark:text-white w-full flex flex-col justify-center items-center text-sm px-3 py-2">
            <span>{contents}</span>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600"></div>
          </section>
        </div>
        <footer className="dark:text-white w-full flex flex-col justify-center items-center px-3">
          <div>{created_at}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default PostDetail;
