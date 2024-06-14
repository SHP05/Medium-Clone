// import axios from "axios";
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import ProfileUpdate from "../components/User/ProfileUpdate";
import Navbar from "../components/Navbar/NavbarResp";
import Sidebar from "../components/Home/SideBar";
import UserProfile from "../components/User/UserProfile";
import UserPost from "../components/User/UserPosts";
import CreatePostbtn from "../components/UI/CreatePostbtn";

const User = () => {
    const { id } = useParams();
    // const [posts, setposts] = useState([]);

    // const getUserPost = async () => {
    //     await axios.get(`http://localhost:3001/getuserpost/${id}`)
    //         .then(result => {
    //             setposts(result.data.Data);
    //             // console.log(posts);
    //         })
    //         .catch(err => console.log(err))
    // }

    // const uploadImgHandeler = async (e) => {
    //     e.preventDefault();
    //     const formdata = new FormData();
    //     formdata.append('file', file)

    //     console.log(formdata);
    //     await axios.put(`http://localhost:3001/uploadimg/${id}`,
    //         formdata,
    //         { headers: { "Content-Type": "multipart/form-data" } }
    //     )
    //         .then(result => console.log(result))
    //         .catch(err => console.log(err))
    // }

    return (
        <>
            <Navbar />
            <div className="flex bg-black min-h-screen">
                <div className="flex-none fixed w-14"><Sidebar userId={id} /></div>
                <div className="grow px-6 ml-14">
                    <div className="UserProfile bg-[#191c24] mt-7 h-fu text-white border border-gray-600 rounded-md p-5">
                            <UserProfile />
                        <div className="flex justify-end">
                            <ProfileUpdate id={id} />
                        </div>
                    </div>

                    <div className="bg-black mx-auto">
                        <CreatePostbtn/>
                        <UserPost />
                    </div>
                </div>
            </div>
        </>
    )
}

export default User;