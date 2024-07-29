import axios from "axios";
import { Notify } from "./Notification";

const LikePostButton = ({ id, length, liked }) => {
  const likeHandler = async (pid) => {
    await axios
      .put("http://localhost:3001/addlikes", { id, pid })
      .then((result) => {
        console.log("Like is Added", result);
        result.data.message === "Post Liked"
          ? Notify("❤️ Post Liked")
          : Notify("Post DisLiked");
      })
      .catch((err) => console.log(err));
    liked(true);
  };
  return (
    <>
      <li
        className="cursor-pointer flex items-center justify-center "
        onClick={() => likeHandler(id)}
      >
        <img
          src="/thumbs-up.png"
          alt="like-img"
          style={{ height: "43px", marginBlockEnd: "6px" }}
          className="hover:scale-90"
        />
        {length}{" "}
      </li>
    </>
  );
};

export default LikePostButton;
