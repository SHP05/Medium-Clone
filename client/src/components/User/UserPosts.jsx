import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import UserPostSkeleton from "../UI/UserPostSkeleton";
import { ToastContainer } from 'react-toastify';
import LikePostButton from "../UI/LikePostButton";
import SavePostButton from "../UI/SavePostButton";
import DateOfPost from "../UI/Date";

const UserPost = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [posts, setposts] = useState([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const token = localStorage.getItem('token');

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getuserpost/${id}`, {
            headers: {
                "authorization": `Barrer ${token}`
            }
        })
            .then(result => {
                setIsLoadingPost(false);
                setposts(result.data.Data);
                console.log(posts);
            })
            .catch(err => console.log(err))
    }

    const deletePostHandler = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:3001/deletepost/${id}`)
            .then(result => {
                setIsLoadingPost(false);
                console.log(result)
                getUserPost();
            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        getUserPost()
    }, []);

    return (
        <>
            {
                isLoadingPost && <UserPostSkeleton />
            }
            <div className="flex posts mx-auto mb-5">
                <ul className="grid lg:grid-cols-2 justify-center gap-4">
                    {
                        posts.length === 0 ? (<h1> No Posts Found</h1>)
                            : posts.map((p) => (
                                <div key={p._id} className='flex max-[1000px]:flex-wrap shadow-sm hover:shadow-xl shadow-gray-900 rounded-2xl bg-[#191c24] mt-5 text-gray-500'>
                                    <div className="m-5">
                                        <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                        <ul className="flex mt-10">
                                            <SavePostButton pid={p._id} saved={(v)=>{ v && getUserPost() }}/>
                                            <LikePostButton id={p._id} length={p.likes.length} liked={(v)=>{v && getUserPost()}}/>
                                            
                                            <span className=" mx-2 mb-1">
                                                <FacebookShareButton
                                                    quote={p.title}
                                                    hashtag="#React"
                                                    url="https://www.facebook.com/"
                                                    title="Send message on Facebook"
                                                >
                                                    <FacebookIcon size={32} round={true}></FacebookIcon>
                                                </FacebookShareButton>
                                            </span>

                                            <span className=" mx-2 mb-1">
                                                <WhatsappShareButton
                                                    title={p.title}
                                                    separator={p.title}
                                                    url="https://web.whatsapp.com/"
                                                >
                                                    <WhatsappIcon size={32} round={true}></WhatsappIcon>
                                                </WhatsappShareButton>
                                            </span>
                                        </ul>
                                    </div>
                                    <div className="p-10">
                                        <h1 className="flex">
                                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                            <h3 className="mx-5 text-gray-200">UserName</h3>
                                            <DateOfPost postDate={p.postDate}/>
                                        </h1>
                                        <h1 className='text-left text-gray-200 font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                        <p className='text-gray-500'>{p.shortDesc}</p>
                                        <p>{p.desc}</p>
                                        <h3>{p.catagory}</h3>
                                        <div className="mt-5 -mb-5">
                                            <ul className="flex gap-4">
                                                <button className="bg-transparent rounded-xl w-28 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent" onClick={() => navigate(`/post/${id}/${p._id}`)} >
                                                    See Post
                                                </button>
                                                <button
                                                    onClick={() => { deletePostHandler(`${p._id}`) }}
                                                    className="bg-transparent rounded-lg w-18 hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-3 border border-red-500 hover:border-transparent">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/updatepost/${id}/${p._id}`)}
                                                    className="bg-transparent rounded-lg w-18 hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-1 px-3 border border-yellow-500 hover:border-transparent">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </ul>
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
    )
}

export default UserPost;