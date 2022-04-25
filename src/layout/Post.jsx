import React from "react";
import EditToggle from "../components/EditToggle";
import Like from "./Like";
import Time from "./Time";

const Post = (props) => {
  const { contents, image_url, user_name, post_id, post_like, created_at } =
    props;
  // 더블 터치 좋아요
  // const { mutate: addLike } = postAddLike(post_id);
  // const like = () => {
  //   addLike(
  //     {},
  //     {
  //       onSuccess: () => {
  //         console.log("좋아");
  //         setIsLike(true);
  //       },
  //       onSettled: () => queryClient.invalidateQueries("getPosts"),
  //     }
  //   );
  // };
  return (
    <React.Fragment>
      <div className="dark:bg-[#111111] sm:w-[100%] w-[550px] bg-white  my-4 rounded-lg flex flex-col justify-center items-center shadow-xl">
        <header className="w-full h-12 px-3 flex justify-between items-center">
          <div className="dark:text-white w-12 font-semibold">{user_name}</div>
          <EditToggle
            user_name={user_name}
            post_id={post_id}
            image_url={image_url}
            contents={contents}
          />
        </header>
        <div className="w-full h-[400px] flex justify-center items-center overflow-hidden">
          <img width="100%" height="384px" src={image_url} alt={image_url} />
        </div>
        <div className="w-full ">
          <section className="w-full h-10 px-1 flex justify-between">
            <Like post_like={post_like} post_id={post_id} />
          </section>
          <section>
            <div className="w-full px-3">
              <p className="dark:text-white font-semibold text-sm">
                좋아요 {`${post_like?.length}개`}
              </p>
            </div>
          </section>
          <section className="dark:text-white w-full text-sm px-3 py-2">
            <span>{contents}</span>
            <div className="dark:text-white mt-3">{`#인생샷 #${user_name}`}</div>
            {/* <div> 와 진짜 귀엽네 ??</div> */}
          </section>
        </div>
        <footer className="dark:text-white w-full flex px-3">
          <Time timestamp={created_at} />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Post;
