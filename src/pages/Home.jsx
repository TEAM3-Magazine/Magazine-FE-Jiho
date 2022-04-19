import React from "react";
import { getTestData } from "../api/query";
import Post from "../components/Post";

import { getData } from "../api/query";
const Home = () => {
  getData();
  const { data: profile, isLoading } = getTestData();
  const result = profile?.data?.data;
  return (
    <React.Fragment>
      <div className="w-full h-screen bg-cyan-200 flex justify-center">
        <div>
          {isLoading
            ? "Loading"
            : result?.map((data) => {
                return <Post key={data.id} {...data} />;
              })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
