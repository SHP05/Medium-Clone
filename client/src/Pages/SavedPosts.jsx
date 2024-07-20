import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/NavbarResp";
import Sidebar from "../components/Home/SideBar";
import SavePostSkeleton from "../components/UI/SavePostPageSkeleton";
import DisplaySavedPost from "../components/User/DisplaySavedPost";
import { NotifyError } from "../components/UI/Notification";
import { ToastContainer } from "react-toastify";

const SavedPosts = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  const HandleSavePost = async () => {
    try {
      axios
        .get(`http://localhost:3001/savedpost/${id}`, {
          headers: {
            authorization: `Barrer ${token}`,
          },
        })
        .then((res) => {
          setIsLoadingPost(false);
          console.log(res.data.result);
          setPost(res.data.result);
        });
    } catch (err) {
      console.log("Data not reached" + err);
      NotifyError("You are not Autherised please login again");
      NavigateToLogin();
    }
  };

  const NavigateToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  useEffect(() => {
    HandleSavePost();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="flex bg-black text-white min-h-screen">
        <div className="flex-none fixed w-14">
          <Sidebar />
        </div>
        {isLoadingPost && <SavePostSkeleton />}
        {post.length === 0 ? (
          <div className="text-gray-500 flex mt-40 text-5xl font-bold w-full justify-center ml-20">
            {/* <img src="/createpost.png" className="h-80 w-72 animate-pulse" title="Create new Post"/> */}
            No Saved Post
          </div>
        ) : (
          <div className="grow p-10 mx-12">
            <h1 className="font-bold text-center text-2xl">Saved Post</h1>
            <DisplaySavedPost
              posts={post}
              message="You have not save any Post"
            />
          </div>
        )}
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
};
export default SavedPosts;
