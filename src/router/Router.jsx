import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Signup from "../pages/Signup";
import Header from "./Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
