import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Signup from "../pages/Signup";
import Header from "./Header";

const Router = () => {
  return (
    <HashRouter>
      <div className="w-screen bg-slate-700 flex flex-col items-center">
        <div className="min-w-max">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default Router;
