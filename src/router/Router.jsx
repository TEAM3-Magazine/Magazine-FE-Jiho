import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopScroll from "../components/TopScroll";
import WriteForm from "../components/WriteForm";
import Header from "./Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostDetail from "../pages/PostDetail";
import Write from "../pages/Write";

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
        <WriteForm/>
        <TopScroll />
      </nav>
    </HashRouter>
  );
};

export default Router;
