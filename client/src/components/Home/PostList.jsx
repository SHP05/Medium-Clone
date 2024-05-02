import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Topicbtn from "../UI/Topicbtn";
import DisplayPost from "./DisplayPosts";

const PostList = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [posts, setposts] = useState([]);
    const [filteredPosts, setfilteredPosts] = useState([]);

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getallpost`)
            .then(result => {
                setposts(result.data.data);
                console.log(result.data.data);
            })
            .catch(err => console.log(err))
    }

    const TimeOfPost = (x) => {
        let Postday = new Date(x).getDate();
        let currDay = new Date().getDate();

        return currDay - Postday;
    }

    const filterPostHandler = (cat) => {
        console.log('filter');
        let fP = posts.filter(i => i.catagory === cat);
        setfilteredPosts(fP);
        console.log(filteredPosts);
    }

    const [query, setQuery] = useState('');
    const [searchPost, setSearchPost] = useState([]);

    const searchPostHandler = () => {
        let fP = posts.filter(i => i.title === query);
        setSearchPost(fP);
        console.log(query);
    }

    const searchOnEnter = (x) =>{
        if(x === "Enter")
            searchPostHandler(query);
    }

    // const likeHandler = async (pid) => {
    //     console.log(pid, id);
    //     await axios.put('http://localhost:3001/addlikes', { id, pid })
    //         .then(result => console.log('Like is Added', result))
    //         .catch(err => console.log(err))
    //     getUserPost();
    // }

    // const savePostHandler = async (pid) => {
    //     await axios.put(`http://localhost:3001/savepost/${id}`, { id, pid })
    //         .then(result => console.log('Save Post', result))
    //         .catch(err => console.log(err))
    // }

    // // Share post
    // const shareOnWhatsApp = (p) => {
    //     const text = encodeURIComponent(`Check out this blog post: ${p.title}`);
    //     const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    //     window.open(whatsappUrl, '_blank');
    // };

    // const shareByEmail = (p) => {
    //     const subject = encodeURIComponent('Check out this blog post');
    //     const body = encodeURIComponent(`I thought you might find this blog post interesting: ${p.title}`);
    //     const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    //     window.location.href = mailtoUrl;
    // };

    useEffect(() => {
        getUserPost();
    },[]);
    return (
        <>
            <div className="flex-col">
                {/* Search bar */}
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-500 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="search" onKeyUp={(e)=>{searchOnEnter(e.key)}}  onChange={(e) => { setQuery(e.target.value) }}  className="block w-full p-3 ps-10 text-lg text-gray-400 border border-gray-500 rounded-lg bg-[#191c24] focus:ring-blue-500 focus:border-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required autoComplete="off"/>
                        <button type="submit" className="text-gray-950 absolute end-2.5 bottom-2.5   bg-white hover:bg-gray-500 hover:text-gray-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                {/* Filter Button */}

                {/* Card  Carousel */}
                {/* <Carousel /> */}

                <div>
                    <h2 className="text-4xl text-white my-5">Topics</h2>
                    <Topicbtn name="All" click={filterPostHandler} category="" />
                    <Topicbtn name="Technology" click={filterPostHandler} category="Technology" />
                    <Topicbtn name="Education" click={filterPostHandler} category="Education" />
                    <Topicbtn name="Sports" click={filterPostHandler} category="Sports" />
                    <Topicbtn name="Travel" click={filterPostHandler} category="Travel" />
                    <Topicbtn name="Gaming" click={filterPostHandler} category="Gaming" />
                    <Topicbtn name="Bussiness" click={filterPostHandler} category="Bussiness" />
                    <Topicbtn name="Art" click={filterPostHandler} category="Art" />
                    <Topicbtn name="Hobbies" click={filterPostHandler} category="Hobbies" />
                    <Topicbtn name="History" click={filterPostHandler} category="History" />
                    <Topicbtn name="Place" click={filterPostHandler} category="Place" />
                    <Topicbtn name="Cripto" click={filterPostHandler} category="Cripto" />
                </div>

                {/* Display search post */}
                <DisplayPost posts={filteredPosts} message=""/>
                <DisplayPost posts={searchPost} message=""/>
                <DisplayPost posts={posts} message="Posts Not Found"/>
                {
                    searchPost.length === 0 ? ""
                        : searchPost.map((p) => (
                            <div key={p.id} className='flex max-[1000px]:flex-wrap w-full shadow-xl hover:shadow-lg shadow-gray-900 rounded-2xl bg-slate-900 mt-5 '>
                                <div className="m-5">
                                    <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                </div>
                                <div className="p-8 text-gray-500">
                                    <h1 className="flex">
                                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <h3 className="mx-5 text-gray-200">{p.name}</h3>
                                        <h3 className="justify-end text-gray-700">{TimeOfPost(p.postDate)} days ago</h3>
                                    </h1>
                                    <h1 className='text-left text-gray-200 font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                    <p>Catagory : {p.catagory}</p>
                                    <p className=''>{p.shortDesc}</p>
                                    <p className=''>{p.desc}</p>
                                    <div className="mt-5 -mb-3">
                                        <ul className="flex">
                                            <li className="cursor-pointer" ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> {/*<i class="fa-solid fa-bookmark"></i>*/}
                                            <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                                            <li className="cursor-pointer" ><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i> </li> {/*<i class="fa-solid fa-heart"></i> */}
                                            <button className="bg-transparent  rounded-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent" onClick={() => { navigate(`/post/${id}/${p._id}`) }}>
                                                See Post
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                }
                {/* Display Filtered posts */}
                {/* {
                    filteredPosts.length === 0 ? ""
                        : filteredPosts.map((p) => (
                            <div key={p.id} className='flex max-[1000px]:flex-wrap w-full shadow-xl hover:shadow-lg shadow-gray-900 rounded-2xl bg-slate-900 mt-5 '>
                                <div className="m-5">
                                    <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                                </div>
                                <div className="p-8 text-gray-500">
                                    <h1 className="flex">
                                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <h3 className="mx-5 text-gray-200">{p.name}</h3>
                                        <h3 className="justify-end text-gray-700">{TimeOfPost(p.postDate)} days ago</h3>
                                    </h1>
                                    <h1 className='text-left text-gray-200 font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                                    <p>Catagory : {p.catagory}</p>
                                    <p className=''>{p.shortDesc}</p>
                                    <p className=''>{p.desc}</p>
                                    <div className="mt-5 -mb-3">
                                        <ul className="flex">
                                            <li className="cursor-pointer" ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> 
                                            <i class="fa-solid fa-bookmark"></i>
                                            <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                                            <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                                            <button className="bg-transparent  rounded-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent" onClick={() => { navigate(`/post/${id}/${p._id}`) }}>
                                                See Post
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                } */}
                {/* Display all posts */}
                {
                    // posts.length === 0 ? (<h1>Posts Not Found</h1>)
                    //     : posts.map((p) => (
                    //         <div key={p.id} className='flex max-[1000px]:flex-wrap w-full shadow-xl hover:shadow-lg shadow-gray-900 rounded-2xl bg-slate-900 mt-5 '>
                    //             <div className="m-5">
                    //                 <img src="" alt="user" className='w-32 h-32 rounded-2xl justify-start mx-auto shadow-md shadow-gray-700' />
                    //                 <ul className="flex mt-10">
                    //                             <li className="cursor-pointer" onClick={() => savePostHandler(p._id)} ><i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li> {/*<i class="fa-solid fa-bookmark"></i>*/}

                    //                             <li>
                    //                                 <button className="sharebtn relative flex z-10 bg-gray-900  rounded-md p-2 opacity-50 hover:opacity-100 focus:outline-none focus:border-blue-500" title="click to enable menu">
                    //                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="sharebtn h-6 w-6 text-blue-700">
                    //                                         <path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z">
                    //                                         </path>
                    //                                     </svg>
                    //                                 </button>
                    //                                 <div className="sharebtn-dropdown absolute mt-0 w-48 bg-white rounded-sm overflow-hidden shadow-lg z-20 hidden border border-gray-100">
                    //                                     <a href="#" title="Share on Facebook (NB! does not work in this demo)" className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100">
                    //                                     <li className="cursor-pointer" onClick={() => { shareByEmail(p) }}><i className="fa-brands fa-square-whatsapp" style={{ color: "rgb(229 231 235)" }}></i></li>

                    //                                         <span className="text-gray-600">Facebook</span>
                    //                                     </a>
                    //                                     <a href="#" title="Share on Twitter (NB! does not work in this demo)" className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100">
                    //                                     <li className="cursor-pointer" onClick={() => { shareOnWhatsApp(p) }}><i className="fa-brands fa-square-whatsapp" style={{ color: "rgb(229 231 235)" }}></i></li>

                    //                                         <span className="text-gray-600">Twitter</span>
                    //                                     </a>
                    //                                 </div>
                    //                             </li>

                    //                             <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                    //                             <li className="cursor-pointer" onClick={() => likeHandler(p._id)}><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>{p.likes.length} </li> {/*<i class="fa-solid fa-heart"></i> */}
                    //                         </ul>
                    //             </div>
                    //             <div className="p-8 text-gray-500">
                    //                 <h1 className="flex">
                    //                     <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    //                     <h3 className="mx-5 text-gray-200">{p.name}</h3>
                    //                     <h3 className="justify-end text-gray-700">{TimeOfPost(p.postDate)} days ago</h3>
                    //                 </h1>
                    //                 <h1 className='text-left text-gray-200 font-bold justify-center hover:font-extrabold hover:underline underline-offset-8 cursor-pointer' onClick={() => { navigate(`/post/${id}/${p._id}`) }}>{p.title}</h1>
                    //                 <p>Catagory : {p.catagory}</p>
                    //                 <p className=''>{p.shortDesc}</p>
                    //                 <p className=''>{p.desc}</p>
                    //             </div>
                    //         </div>
                    //     ))
                }
            </div>
        </>
    )
}
export default PostList;