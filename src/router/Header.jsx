import { Link } from "react-router-dom";

import DarkMode from "../components/DarkMode";
import ProfileMenu from "../components/ProfileMenu";

const Header = () => {
  return (
    <div className="w-full  flex justify-center fixed z-50 shadow-md ">
      <div className=" re w-[550px] pl-2 h-12 bg-white/80 flex justify-between items-center rounded-md">
        <div className="">
          <Link to="/">
            <span className="font-mono font-semibold">🐭꿱스타그램</span>
          </Link>
        </div>
        <div>
          <DarkMode />
        </div>
        <div>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
