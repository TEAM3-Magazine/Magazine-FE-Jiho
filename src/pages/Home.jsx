import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getPosts } from "../api/query";
import Post from "../components/Post";

const Home = () => {
  const { data: instar } = getPosts();
  const [counter, setCounter] = useState(10);
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
        <meta property="og:title" content="🐭 꿱스타그램"></meta>
        <meta property="og:description" content="우리들의 사진 추억" />
        <meta property="og:image" content="KakaoTalk_20220416_093108493.jpg" />
      </Helmet>
      <div className="w-full h-screen flex justify-center">
        <div>
          {instar?.data?.slice(0, counter).map((data) => {
            return <Post key={data.post_id} {...data} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
