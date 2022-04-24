import React from "react";
import Helmet from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostDetail } from "../api/query";

import CloseIcon from "@mui/icons-material/Close";

const PostDetail = () => {
  /* 해당 페이지 도착시 post_id 정보 확인 */
  const location = useLocation();
  const { data } = getPostDetail(location?.state?.post_id);
  const detail = data?.data;
  /* 뒤로가기 버튼 */
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램 | {`${detail?.post_id}`}</title>
      </Helmet>
      <div className="dark:bg-[#111111] sm:w-[100%] w-[550px] bg-white overflow-hidden my-4 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex items-center justify-end">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <CloseIcon className="dark:text-white" fontSize="large" />
          </div>
        </header>
        <div className="w-full h-[400px] flex justify-center items-center overflow-hidden">
          <img
            width="100%"
            height="384px"
            src={detail?.image_url}
            alt={detail?.image_url}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <section>
            <div className="w-full px-3">
              <p className="dark:text-white font-semibold text-sm">
                좋아요 {`${detail?.post_like?.length}개`}
              </p>
            </div>
          </section>
          <section className="dark:text-white w-full flex flex-col justify-center items-center text-sm px-3 py-2">
            <span>{detail?.contents}</span>
            <div className="mt-3">{`#오리 #졸귀`}</div>
            <div className="font-light text-gray-600"></div>
          </section>
        </div>
        <footer className="dark:text-white w-full flex flex-col justify-center items-center px-3">
          <div>{detail?.created_at?.substring(0, 16)}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default PostDetail;
