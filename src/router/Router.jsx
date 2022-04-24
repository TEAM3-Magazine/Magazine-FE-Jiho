import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TopScroll from "../layout/TopScroll";
import WriteForm from "../components/WriteForm";
import { themeState } from "../recoil/atoms";

/* lazy lcp speed */
const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const PostDetail = lazy(() => import("../pages/PostDetail"));

const Router = () => {
  const darkMode = useRecoilValue(themeState);
  return (
    <BrowserRouter>
      <nav
        className={
          darkMode === "2"
            ? "w-full flex flex-col items-center"
            : "dark w-full flex flex-col items-center"
        }
      >
        <Header />
        <nav className="w-[550px] absolute top-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </nav>
        <WriteForm number="2" />
        <TopScroll />
      </nav>
    </BrowserRouter>
  );
};

export default Router;
