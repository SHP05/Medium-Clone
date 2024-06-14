import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import { FacebookShareButton , WhatsappShareButton } from "react-share";
import { FacebookIcon , WhatsappIcon } from "react-share";

const UserPost = () =>{

    const navigate = useNavigate();
    const { id } = useParams();
    const [posts, setposts] = useState([]);

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getuserpost/${id}`)
            .then(result => {
                setposts(result.data.Data);
                console.log(posts);
            })
            .catch(err => console.log(err))
    }

    const deletePostHandler = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:3001/deletepost/${id}`)
            .then(result =>{ 
                console.log(result)
                getUserPost();
            })
            .catch(err => console.log(err));
          
    }

    const TimeOfPost = (x) => {
        let Postday = new Date(x).getDate();
        let currDay = new Date().getDate();

        let PostMonth = new Date(x).getMonth();
        let currMonth = new Date().getMonth();

        let PostYear = new Date(x).getFullYear();
        let currYear = new Date().getFullYear();

        if (currYear - PostYear > 0)
            return currYear - PostYear;
        else if (currMonth - PostMonth)
            return currMonth - PostMonth;
        else
            return currDay - Postday;
    }

    const likeHandler = async (pid) => {
        console.log(pid, id);
        await axios.put('http://localhost:3001/addlikes', { id, pid })
            .then(result => console.log('Like is Added', result))
            .catch(err => console.log(err))
        getUserPost();
    }

    const savePostHandler = async (pid) => {
        await axios.put(`http://localhost:3001/savepost/${id}`, { id, pid })
            .then(result => console.log('Save Post', result))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserPost()
    },[]);

    return(
    <>
           <div className="flex posts mx-auto mb-5">
                            <ul className="grid lg:grid-cols-2 justify-center gap-4">
                                {
                                    posts.length === 0 ? (<h1> No Posts Found</h1>)
                                        : posts.map((p) => (
                                            <div key={p._id} className='flex max-[1000px]:flex-wrap shadow-sm hover:shadow-xl shadow-gray-900 rounded-2xl bg-[#191c24] mt-5 text-gray-500'>
                                                <div className="m-5">
                                                    <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                                    <ul className="flex mt-10">
                                                        <li className="cursor-pointer" onClick={() => savePostHandler(p._id)} ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> 
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
                                                        <li className="cursor-pointer" onClick={() => likeHandler(p._id)}><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>{p.likes.length} </li> 
                                                    </ul>
                                                </div>
                                                <div className="p-10">
                                                    <h1 className="flex">
                                                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                        <h3 className="mx-5 text-gray-200">UserName</h3>
                                                        <h3 className="justify-end text-gray-700">{TimeOfPost(p.postDate)} days ago</h3>
                                                    </h1>
                                                    <h1 className='text-left text-gray-200 font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                                    <p className='text-gray-500'>{p.shortDesc}</p>
                                                    <p>{p.desc}</p>
                                                    <h3>{p.catagory}</h3>
                                                    <div className="mt-5 -mb-5">
                                                        <ul className="flex gap-4">
                                                            <button className="bg-transparent rounded-xl w-28 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent" onClick={() => navigate(`/post/${id}/${p._id}`) } >
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
    </>
    )
}

export default UserPost;