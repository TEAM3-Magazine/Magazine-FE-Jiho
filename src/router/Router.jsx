import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopScroll from "../components/TopScroll";
import WriteForm from "../components/WriteForm";
import Header from "./Header";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Signup = lazy(() => import("../pages/Signup"));
const Write = lazy(() => import("../pages/Write"));

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
            <Route path="write" element={<Write />} />
          </Routes>
        </nav>
        <WriteForm />
        <TopScroll />
      </nav>
    </HashRouter>
  );
};

export default Router;
