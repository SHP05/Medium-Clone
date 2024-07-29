import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DateOfPost from "../UI/Date";

const DisplaySavedPost = (Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [PostData, setPostData] = useState([]);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    setPostData(Props.posts);
    setMessage(Props.message);
    console.log(PostData);
  }, [Props.posts]);

  return (
    <>
      {PostData.length === 0 ? (
        <p className="text-white">{Message}</p>
      ) : (
        PostData.map((p) => (
          <div
            key={p._id}
            className="flex max-[1000px]:flex-wrap w-full text-white rounded-2xl bg-[#191c24] mt-5 border border-gray-600 shadow-lg shadow-gray-700 hover:border-gray-400 hover:shadow-xl"
          >
            {" "}
            {/*bg-slate-900*/}
            <div className="p-8 text-gray-500">
              <h1 className="flex">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <h3 className="mx-5 text-gray-200 text-xl">{p.name}</h3>
                <DateOfPost postDate={p.postDate} />
              </h1>
              <h1
                className="text-left text-gray-200 text-2xl font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer"
                onClick={() => {
                  navigate(`/post/${id}/${p._id}`);
                }}
              >
                {p.title}
              </h1>
              <p>Catagory : {p.catagory}</p>
              <p className="">{p.shortDesc}</p>
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

export default DisplaySavedPost;
