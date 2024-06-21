import axios from "axios";
import { Notify } from "./Notification";
import { useParams } from "react-router-dom";

const SavePostButton = ({pid,saved}) =>{
    const { id } = useParams();
    const savePostHandler = async (pid) => {
        await axios.put(`http://localhost:3001/savepost/${id}`, { id, pid })
            .then(result => {
                console.log('Save Post', result);
                result.data.message === "Post Saved" ? Notify("✅ Post Saved") : Notify("Post UnSaved");
            })
            .catch(err => console.log(err));
            saved(true);
    }

    return(<>
        <li className="cursor-pointer" onClick={() => savePostHandler(pid)} ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> {/*<i class="fa-solid fa-bookmark"></i>*/}
    </>)
}

export default SavePostButton;