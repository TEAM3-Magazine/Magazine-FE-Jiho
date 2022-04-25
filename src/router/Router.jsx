import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TopScroll from "../layout/TopScroll";
import WriteForm from "../components/WriteForm";
import { themeState } from "../recoil/atoms";
import MyProfile from "../layout/MyProfile";

/* lazy lcp speed */
const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));

const Router = () => {
  const darkMode = useRecoilValue(themeState);
  return (
    <BrowserRouter>
      <nav
        className={
          darkMode === "2"
            ? "w-full flex flex-col items-center sm:w-full"
            : "dark w-full flex flex-col items-center"
        }
      >
        <Header />
        <nav className="w-[550px] sm:w-full absolute top-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </nav>
        <MyProfile />
        <TopScroll />
        <WriteForm number="2" />
      </nav>
    </BrowserRouter>
  );
};

export default Router;
