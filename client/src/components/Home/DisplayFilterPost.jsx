import { useState } from "react";
import { useEffect } from "react";
import DisplaySavedPost from "../User/DisplaySavedPost";

const DisplayFilteredPost = ({ posts, message }) => {
    const [PostData, setPostData] = useState([]);
    const [Message, setMessage] = useState("");

    useEffect(() => {
        setPostData(posts);
        setMessage(message);
        console.log(PostData);
    }, [posts]);

    return (
        <>
           {
                PostData.length === 0 ? 
                <p>{message}</p>
                :<div className='grow p-10 mx-12'>
                    <h1 className='font-bold text-center text-2xl'>Saved Post</h1>
                    <DisplaySavedPost posts={PostData} message={Message} />
                </div>
                }
        </>
    )
}
export default DisplayFilteredPost;