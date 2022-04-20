import { Link } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";

const Header = () => {
  return (
    <div className="w-[500px] h-24 bg-emerald-500 flex justify-between items-center mb-4">
      <div>
        <Link to="/">여기 Header야</Link>
      </div>
      <div>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
