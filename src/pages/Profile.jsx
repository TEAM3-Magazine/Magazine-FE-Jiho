import React from "react";
import { useMatch } from "react-router-dom";
import { getPosts } from "../api/query";
import PostDetail from "../layout/PostDetail";

const Profile = () => {
  /* 해당 유저 프로필 가져오기 */
  const user = useMatch("/profile/:id");
  const getUser = user?.params?.id;
  const { data: instar } = getPosts();
  const posts = instar?.data.filter((id) => id.user_name === getUser);
  return (
    <React.Fragment>
      <header className="flex sm:w-[100%] w-[550px] h-[120px] sm:h-[120px] border-b-2">
        <div className="flex w-full h-[120px] items-center ">
          <div className="w-[150px]  h-full flex items-center">
            <div className="w-20 h-20 bg-duck bg-center bg-cover rounded-full"></div>
          </div>
          <div className="sm:w-[100%] w-[400px] h-full ">
            <section className="bg-white py-2 flex flex-col space-y-2">
              <div className="text-xl font-semibold">{getUser}</div>
              <div className="flex justify-between h-full w-full  p-2">
                <div className="flex flex-col justify-center items-center">
                  <span className="font-light text-gray-400 text-xs">
                    게시물
                  </span>
                  <span> {posts?.length}</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-light text-gray-400 text-xs">
                    팔로워
                  </span>
                  <span>21.4만</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-light text-gray-400 text-xs">
                    팔로우
                  </span>
                  <span>4</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </header>

      {posts?.map((data, index) => {
        return <PostDetail key={index} {...data} />;
      })}
    </React.Fragment>
  );
};

export default Profile;
