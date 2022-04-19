import { useLocation } from "react-router-dom";
import { getTestDateDetail } from "../api/query";
import Post from "../components/Post";

const PostDetail = () => {
  const location = useLocation();
  console.log(location);
  const { data: detail } = getTestDateDetail(location.state.id);
  const result = detail?.data?.data;
  console.log(result);
  return (
    <div className="w-full h-screen bg-cyan-200 flex justify-center">
      <Post {...location.state} />
    </div>
  );
};

export default PostDetail;
