import './App.css'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Signup from './components/Auth/SignUp'
import Home from './Pages/Home';
import User from './Pages/User';
import Post from './Pages/Post';
import CreatePost from './Pages/CreatePost';
import FronPage from './Pages/FrontPage';
import UpdatePost from './Pages/UpdatePost';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<FronPage />}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/home/:id" element={<Home/>}></Route>
            <Route path="/user/:id" element={<User/>}></Route>
            <Route path="/post/:id/:pid" element={<Post/>}></Route>
            <Route path="/createpost/:id" element={<CreatePost />}></Route>
            <Route path="/updatepost/:id/:pid" element={<UpdatePost />}></Route>
=          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
