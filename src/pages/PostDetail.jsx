import { useLocation } from "react-router-dom";
import { getPostDetail } from "../api/query";
import Post from "../components/Post";

const PostDetail = () => {
  const location = useLocation();
  const post_id = location?.state.post_id;
  const { data } = getPostDetail(post_id);
  console.log(data);
  return <Post {...data?.data} />;
};

export default PostDetail;
