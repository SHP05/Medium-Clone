import axios from "axios";
import { Notify } from "./Notification";

const LikePostButton = ({id,length,liked}) =>{

    const likeHandler = async (pid) => {
        console.log(pid, id);
        await axios.put('http://localhost:3001/addlikes', { id, pid })
            .then(result => {
                console.log('Like is Added', result);
                result.data.message === "Post Liked" ? Notify("❤️ Post Liked") : Notify("Post DisLiked");
            })
            .catch(err => console.log(err));
            liked(true)
    }
    return(<>
        <li className="cursor-pointer" onClick={() =>likeHandler(id)}><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>{length} </li>
    </>)
}

export default LikePostButton;