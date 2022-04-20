import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { getTestData } from "../api/query";
import Post from "../components/Post";
import CircularProgress from "@mui/material/CircularProgress";

// import { getData } from "../api/query";
const Home = () => {
  /* getData(); */
  const { data: profile, isLoading } = getTestData();
  const result = profile?.data?.data;
  const [counter, setCounter] = useState(10);
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setCounter(counter + 5);
    }
  }, 1000);
  const handleScroll = useCallback(_handleScroll, [counter]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center">
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            result?.slice(0, counter).map((data) => {
              return <Post key={data.id} {...data} />;
            })
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
