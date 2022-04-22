import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
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
