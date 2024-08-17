import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/SignUp";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Post from "./Pages/Post";
import CreatePost from "./Pages/CreatePost";
import FronPage from "./Pages/FrontPage";
import UpdatePost from "./Pages/UpdatePost";
import SavedPosts from "./Pages/SavedPosts";
import ScrollTop from "./components/UI/ScrollTop";
import Applayout from "./components/UI/Applayout";
import Error404Page from "./Pages/Error404Page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FronPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Applayout />}>
            <Route path="/user/:id" element={<User />}></Route>
            <Route path="/home/:id" element={<Home />}></Route>
            <Route path="/post/:id/:pid" element={<Post />}></Route>
            <Route path="/createpost/:id" element={<CreatePost />}></Route>
            <Route path="/updatepost/:id/:pid" element={<UpdatePost />}></Route>
            <Route path="/savedpost/:id" element={<SavedPosts />}></Route>
          </Route>
          <Route path="*" element={<Error404Page />}></Route>
        </Routes>
        <ScrollTop />
      </BrowserRouter>
    </>
  );
}

export default App;
