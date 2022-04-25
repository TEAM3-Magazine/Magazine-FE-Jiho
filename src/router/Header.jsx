import { Link } from "react-router-dom";

import DarkMode from "../layout/DarkMode";
import LoginToggle from "../components/LoginToggle";

const Header = () => {
  return (
    <div className="w-full flex justify-center fixed z-50 shadow-lg">
      <div className="dark:bg-[#333333]/80 w-[550px] pl-2 h-12 bg-white/80 flex justify-between items-center">
        <div className="">
          <Link to="/">
            <span className="dark:text-white font-semibold">꿱스타그램</span>
          </Link>
        </div>
        <div>
          <DarkMode />
        </div>
        <div>
          <LoginToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
