import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const getUserPost = () =>{

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

    const shareOnWhatsApp = (p) => {
        const text = encodeURIComponent(`Check out this blog post: ${p.title}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareByEmail = (p) => {
        const subject = encodeURIComponent('Check out this blog post');
        const body = encodeURIComponent(`I thought you might find this blog post interesting: ${p.title}`);
        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
    };

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

    const deletePostHandler = async (id) => {
        console.log(id);
        await axios.delete('http://localhost:3001/deletepost', id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        // getUserPost();    
    }
    return(
        <>
             <div className="flex posts mx-auto">
                            <ul className="grid lg:grid-cols-2 justify-center gap-4">
                                {
                                    posts.length === 0 ? (<h1> No Posts Found</h1>)
                                        : posts.map((p) => (
                                            <div key={p._id} className='flex max-[1000px]:flex-wrap shadow-sm hover:shadow-xl shadow-gray-900 rounded-2xl  mt-5 text-gray-500'>
                                                <div className="m-5">
                                                    <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                                    <ul className="flex mt-10">
                                                        <li className="cursor-pointer" onClick={() => savePostHandler(p._id)} ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> {/*<i class="fa-solid fa-bookmark"></i>*/}

                                                        <li>
                                                            <button className="sharebtn relative flex z-10 bg-gray-900  rounded-md p-2 opacity-50 hover:opacity-100 focus:outline-none focus:border-blue-500" title="click to enable menu">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="sharebtn h-6 w-6 text-blue-700">
                                                                    <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                            <div className="sharebtn-dropdown absolute mt-0 w-48 bg-white rounded-sm overflow-hidden shadow-lg z-20 hidden border border-gray-100">
                                                                <a href="#" title="Share on Facebook (NB! does not work in this demo)" className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100">
                                                                    <li className="cursor-pointer" onClick={() => { shareByEmail(p) }}><i className="fa-brands fa-square-whatsapp" style={{ color: "rgb(229 231 235)" }}></i></li>

                                                                    <span className="text-gray-600">Facebook</span>
                                                                </a>
                                                                <a href="#" title="Share on Twitter (NB! does not work in this demo)" className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100">
                                                                    <li className="cursor-pointer" onClick={() => { shareOnWhatsApp(p) }}><i className="fa-brands fa-square-whatsapp" style={{ color: "rgb(229 231 235)" }}></i></li>

                                                                    <span className="text-gray-600">Twitter</span>
                                                                </a>
                                                            </div>
                                                        </li>

                                                        <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                                                        <li className="cursor-pointer" onClick={() => likeHandler(p._id)}><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>{p.likes.length} </li> {/*<i class="fa-solid fa-heart"></i> */}
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
                                                            <button className="bg-transparent rounded-xl w-28 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent" onClick={() => { navigate(`/post/${id}/${p._id}`) }} >
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

export default getUserPost;