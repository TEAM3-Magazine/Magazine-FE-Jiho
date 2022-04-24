import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopScroll from "../components/TopScroll";
import WriteForm from "../components/WriteForm";

const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const PostDetail = lazy(() => import("../pages/PostDetail"));

const Router = () => {
  return (
    <HashRouter>
      <nav className="w-full flex flex-col items-center">
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
    </HashRouter>
  );
};

export default Router;
