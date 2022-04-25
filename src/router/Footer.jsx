import TopScroll from "../layout/TopScroll";
import WriteForm from "../components/WriteForm";
import MyProfile from "../layout/MyProfile";

const Footer = () => {
  return (
    <div className="w-full fixed z-50 flex flex-col sm:justify-center sm:bottom-0">
      <div className="flex fixed bottom-2 right-2 h-36 flex-col justify-between sm:w-full sm:right-0 sm:bottom-0 sm:bg-white sm:flex-row sm:h-12 sm:flex sm:justify-around sm:items-center sm:border-t-gray-800 sm:border-t-[1px]">
        <TopScroll />
        <WriteForm number="2" />
        <MyProfile />
      </div>
    </div>
  );
};

export default Footer;
