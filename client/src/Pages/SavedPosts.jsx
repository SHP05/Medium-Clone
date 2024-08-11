import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [isEmptyIcon, setIsEmptyIcon] = useState(false);

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
          if (res.data.result.length === 0) {
            setIsEmptyIcon(true);
          }
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
      <section className="flex bg-black text-white min-h-screen">
        {isLoadingPost ? (
          <SavePostSkeleton />
        ) : (
          <div className="grow p-10 mx-12">
            <h1 className="font-bold flex items-center justify-center text-center text-2xl">
              {isEmptyIcon ? (
                <img
                  src="/emptypost.png"
                  alt="Empty post Icon"
                  style={{ height: "150px" }}
                />
              ) : (
                "Saved Post"
              )}
            </h1>
            <DisplaySavedPost posts={post} message="" />
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
