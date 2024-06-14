import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Notify} from "../UI/Notification";

const DisplayPost = (Props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [PostData, setPostData] = useState([]);
    const [Message, setMessage] = useState("");

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getallpost`)
            .then(result => {
                // setPostData(result.data.data)
                setPostData(result.data.data);
                console.log(result.data.data);
            })
            .catch(err => console.log(err))
    }

    const TimeOfPost = (x) => {
        let postdate = new Date(x);
        let currdate = new Date();

        if (currdate.getFullYear() - postdate.getFullYear() === 0) {
            if (currdate.getMonth() - postdate.getMonth() === 0) {
                let x = currdate.getDate() - postdate.getDate();
                if (x === 0)
                    return "Today";
                else
                    return x + " Day's ago";
            }
            else {
                let x = currdate.getMonth() - postdate.getMonth();
                return x + " Month ago"
            }
        }
        else {
            let x = currdate.getFullYear() - postdate.getFullYear();
            return x + "year's ago"
        }

    }

    const likeHandler = async (pid) => {
        console.log(pid, id);
        await axios.put('http://localhost:3001/addlikes', { id, pid })
            .then(result => {
                console.log('Like is Added', result);
                result.data.message === "Post Liked" ? Notify("❤️ Post Liked") : Notify("Post DisLiked");
            })
            .catch(err => console.log(err));
            getUserPost();
    }

    const savePostHandler = async (pid) => {
        await axios.put(`http://localhost:3001/savepost/${id}`, { id, pid })
            .then(result => {
                console.log('Save Post', result);
                result.data.message === "Post Saved" ? Notify("✅ Post Saved") : Notify("Post UnSaved");
            })
            .catch(err => console.log(err));
            getUserPost();
    }

    useEffect(() => {
        setPostData(Props.posts);
        setMessage(Props.message);
        getUserPost();
        console.log(PostData);
    },[]);

    return (
        <>
            {
                PostData.length === 0 ? <p className="text-white">{Message}</p>
                    : PostData.map((p) => (
                        <div key={p.id} className='flex max-[1000px]:flex-wrap w-full text-white rounded-2xl bg-[#191c24] mt-5 '> {/*bg-slate-900*/}
                            <div className="m-5">
                                <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                <ul className="flex mt-10">
                                    <li className="cursor-pointer" onClick={() => savePostHandler(p._id)} ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> {/*<i class="fa-solid fa-bookmark"></i>*/}

                                    <span className="mx-2 mb-1">
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

                                    <li className="cursor-pointer" onClick={() =>likeHandler(p._id)}><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>{p.likes.length} </li> {/*<i class="fa-solid fa-heart"></i> */}
                                </ul>
                            </div>
                            <div className="p-8 text-gray-500">
                                <h1 className="flex">
                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    <h3 className="mx-5 text-gray-200 text-xl">{p.name}</h3>
                                    <h3 className="justify-end text-gray-700 text-xl">{TimeOfPost(p.postDate)}</h3>
                                </h1>
                                <h1 className='text-left text-gray-200 text-2xl font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                <p>Catagory : {p.catagory}</p>
                                <p className=''>{p.shortDesc}</p>
                                <p className=''>{p.desc}</p>
                            </div>
                        </div>
                    ))
            }
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

export default DisplayPost;

