import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import { ToastContainer } from "react-toastify";
import LikePostButton from "../UI/LikePostButton";
import SavePostButton from "../UI/SavePostButton";
import DateOfPost from "../UI/Date";
import { formateString } from "../../utils/utils";

const DisplayPost = (Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [PostData, setPostData] = useState([]);
  const [Message, setMessage] = useState("");

  const getUserPost = async () => {
    await axios
      .get(`http://localhost:3001/getallpost`)
      .then((result) => {
        // setPostData(result.data.data)
        setPostData(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setPostData(Props.posts);
    setMessage(Props.message);
    getUserPost();
  }, []);

  return (
    <>
      {PostData.length === 0 ? (
        <p className="text-white">{Message}</p>
      ) : (
        PostData.map((p) => (
          <div
            key={p._id}
            className="flex max-[1000px]:flex-wrap w-full border border-gray-600 shadow-lg shadow-gray-700 hover:border-gray-400 hover:shadow-lg text-white rounded-2xl bg-[#191c24] mt-5 border-gray-600 shadow-lg shadow-gray-700 hover:border-gray-400 hover:shadow-xl duration-500"
          >
            {" "}
            <div className="m-5">
              <img
                src={`http://localhost:3001/postimg/${p.image}`}
                alt="user"
                className="w-48 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700"
              />
              <ul className="flex mt-10 items-center gap-1">
                <span className="mx-1 mb-1 hover:scale-90">
                  <FacebookShareButton
                    quote={p.title}
                    hashtag="#React"
                    url="https://www.facebook.com/"
                    title="Send message on Facebook"
                  >
                    <FacebookIcon size={35} round={true}></FacebookIcon>
                  </FacebookShareButton>
                </span>

                <span className="mx-1 mb-1 hover:scale-90">
                  <WhatsappShareButton
                    title={p.title}
                    separator={p.title}
                    url="https://web.whatsapp.com/"
                  >
                    <WhatsappIcon size={35} round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                </span>

                <SavePostButton
                  pid={p._id}
                  saved={(v) => {
                    v && getUserPost();
                  }}
                />

                <LikePostButton
                  id={p._id}
                  length={p.likes.length}
                  liked={(v) => {
                    v && getUserPost();
                  }}
                />
              </ul>
            </div>
            <div className="p-8 text-gray-500">
              <h1 className="flex">
                {/* <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
                <a
                  href={`http://localhost:5173/user/${p.userId}`}
                  target="_blank"
                  rel="noreferrer"
                  // onClick={() =>
                  //   navigate(`http://localhost:5173/user/${p.userId}`)
                  // }
                >
                  {p.userName}
                </a>
                <p className="mx-5 text-gray-200 text-xl">{p.name}</p>
                <DateOfPost postDate={p.postDate} />
              </h1>
              <h1
                className="text-left text-gray-200 text-2xl font-bold justify-center hover:font-extrabold cursor-pointer"
                onClick={() => {
                  navigate(`/post/${id}/${p._id}`);
                }}
              >
                {p.title}
              </h1>
              <p>Catagory : {p.catagory}</p>
              <p className="">{formateString(p.shortDesc)}</p>
              <p className="">{formateString(p.desc)}</p>
            </div>
          </div>
        ))
      )}
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

export default DisplayPost;
