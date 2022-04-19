import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-16 bg-emerald-500 flex justify-between">
      <Link to="/">여기 Header야</Link>
      <Link to="/login">
        <p>로그인</p>
      </Link>
      <Link to="/signup">
        <p>회원가입</p>
      </Link>
    </div>
  );
};

export default Header;
