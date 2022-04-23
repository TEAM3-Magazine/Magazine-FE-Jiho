import React from "react";
import { useLocation } from "react-router-dom";
import { getPostDetail } from "../api/query";

const PostDetail = () => {
  const location = useLocation();
  const { data } = getPostDetail(location?.state?.post_id);
  const detail = data?.data;
  return (
    <React.Fragment>
      <div className="w-[550px] bg-white overflow-hidden my-2 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex justify-between items-center">
          <div className="w-12"></div>
        </header>
        <div className="w-full h-[400px] flex justify-center items-center overflow-hidden">
          <img
            width="100%"
            height="384px"
            src={detail?.image_url}
            alt={detail?.image_url}
          />
        </div>
        <div className="w-full ">
          <section>
            <div className="w-full px-3">
              <p className="font-semibold text-sm">
                좋아요 {`${detail?.post_like?.length}개`}
              </p>
            </div>
          </section>
          <section className="w-full text-sm px-3 py-2">
            <span>{detail?.contents}</span>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600"></div>
          </section>
        </div>
        <footer className="w-full flex px-3">
          <div>{detail?.created_at?.substring(0, 16)}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default PostDetail;
