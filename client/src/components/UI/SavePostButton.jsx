import axios from "axios";
import { Notify } from "./Notification";
import { useParams } from "react-router-dom";

const SavePostButton = ({ pid, saved }) => {
  const { id } = useParams();
  const savePostHandler = async (pid) => {
    await axios
      .put(`http://localhost:3001/savepost/${id}`, { id, pid })
      .then((result) => {
        console.log("Save Post", result);
        result.data.message === "Post Saved"
          ? Notify("✅ Post Saved")
          : Notify("Post UnSaved");
      })
      .catch((err) => console.log(err));
    saved(true);
  };

  return (
    <>
      <li className="cursor-pointer " onClick={() => savePostHandler(pid)}>
        <img
          src="/bookmark.png"
          style={{ height: "35px", marginBlockEnd: "6px" }}
          alt="Saved Post"
          className="hover:scale-90"
        />
      </li>{" "}
      {/*<i class="fa-solid fa-bookmark"></i> <i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>*/}
    </>
  );
};

export default SavePostButton;
