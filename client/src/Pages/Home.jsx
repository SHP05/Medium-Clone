import axios from "axios";
import "../index.css";
import Navbar from "../components/Navbar/NavbarResp";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PostList from "../components/Home/PostList";
import Sidebar from "../components/Home/SideBar";
import Filter from "../components/Home/Fiters";

const Home = () => {
  const { id } = useParams();

  const getUserData = async () => {
    await axios
      .get(`http://localhost:3001/getuser/${id}`)
      .then((result) => {
        console.log("Get User Data", result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex bg-black h-full ">
        <div className="flex-none fixed w-14">
          <Sidebar userId={id} />
        </div>
        <div className="grow p-10 mx-12">
          <PostList Id={id} />
        </div>
        <div className="flex-none w-64 mr-3 popular-post">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default Home;
