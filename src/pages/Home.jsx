import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getPosts } from "../api/query";
import Post from "../layout/Post";

const Home = () => {
  /* 포스터 등록 정보 */
  const { data: instar } = getPosts();
  const [counter, setCounter] = useState(10);
  /* 무한 스크롤 throttle로 이동 랜더링 캔슬 */
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setCounter(counter + 5);
    }
  }, 100);
  const handleScroll = useCallback(_handleScroll, [counter]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);
  return (
    <React.Fragment>
      <Helmet>
        <title>꿱스타그램</title>
      </Helmet>
      <div className="w-full h-screen flex justify-center">
        <div>
          {instar?.slice(0, counter).map((data) => {
            return <Post key={data.post_id} {...data} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
