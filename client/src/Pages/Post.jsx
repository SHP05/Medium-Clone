import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import DateOfPost from "../components/UI/Date";
import SavePostButton from "../components/UI/SavePostButton";
import { ToastContainer } from "react-toastify";
import LikePostButton from "../components/UI/LikePostButton";

const Post = () => {
  const { pid } = useParams();
  const [postdata, setPostdata] = useState([]);

  const getPost = async () => {
    axios
      .get(`http://localhost:3001/getpost/${pid}`)
      .then((result) => {
        setPostdata(result.data.data);
        console.log(postdata);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="flex bg-gray-950 h-full">
        <div className="bg-black mx-auto grow bg-fixed h-screen p-5">
          <div className="posts bg-[#191c24]  mx-auto text-white w-1/2 p-5 rounded-lg shadow-lg    align-middle">
            <img
              src={`http://localhost:3001/postimg/${postdata.image}`}
              alt="post Image"
              className="h-60 w-auto mx-auto shadow-xl rounded-lg"
            />

            <span className="flex justify-between">
              <p className="font-bold text-3xl mt-5">{postdata.title}</p>
              <DateOfPost postDate={postdata.postDate} className=" ml-4" />
            </span>

            <h3>Category : {postdata.catagory}</h3>
            <p className="mt-5">{postdata.shortDesc}</p>
            <p className="text-2xl mt-5">Description</p>
            <h3>{postdata.desc}</h3>

            <ul className="flex mt-4 justify-start gap-2 items-center">
              <span className=" mb-1 hover:scale-90">
                <FacebookShareButton
                  quote={postdata.title}
                  hashtag="#React"
                  url="https://www.facebook.com/"
                  title="Send message on Facebook"
                >
                  <FacebookIcon size={35} round={true}></FacebookIcon>
                </FacebookShareButton>
              </span>

              <span className=" mb-1 hover:scale-90">
                <WhatsappShareButton
                  title={postdata.title}
                  separator={postdata.title}
                  url="https://web.whatsapp.com/"
                >
                  <WhatsappIcon size={35} round={true}></WhatsappIcon>
                </WhatsappShareButton>
              </span>
              <SavePostButton
                pid={pid}
                saved={(v) => {
                  v && getPost();
                }}
              />
              <LikePostButton
                id={postdata._id}
                length={postdata.likes?.length}
                liked={(v) => {
                  v && getPost();
                }}
              />
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
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
export default Post;
