import { useLocation } from "react-router-dom";
import { getTestDateDetail } from "../api/query";
import Post from "../components/Post";

const PostDetail = () => {
  const location = useLocation();
  console.log(location);
  const { data: detail } = getTestDateDetail(location.state?.id);
  const result = detail?.data?.data;
  console.log(result);
  return <Post {...location.state} />;
};

export default PostDetail;
