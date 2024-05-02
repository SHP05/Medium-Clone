import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/NavbarResp';
import Sidebar from '../components/Home/SideBar';

const Post = () => {
    const { id, pid } = useParams();
    console.log(pid, id);
    const [postdata, setPostdata] = useState([]);

    const getPost = async () => {
        axios.get(`http://localhost:3001/getpost/${pid}`)
            .then(result => {
                console.log(result);
                setPostdata(result.data.data);
            })
            .catch(err => console.log(err))
    }

    const savePost = async () => {
        console.log("data");
        await axios.put(`http://localhost:3001/savepost/${id}`, { pid, id })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }
    const TimeOfPost = (x) => {
        let Postday = new Date(x).getDate();
        let currDay = new Date().getDate();

        return currDay - Postday;
    }
    useEffect(() => {
        getPost();
    })
    return (
        <>
            <Navbar />

            <div className='flex bg-gray-950 h-full'>
                <div className='flex-none fixed w-14'><Sidebar userId={id} /></div>
                <div className='bg-black mx-auto grow bg-fixed h-screen p-5'>
                    <div className="posts bg-[#191c24]  mx-auto text-white w-1/2 p-5 rounded-lg shadow-lg    align-middle">
                        <img src="" alt="post Image" className='h-32 mx-auto shadow-xl rounded-lg border ' />
                        <span className='flex'><p className='font-bold text-3xl' >{postdata.title}</p>
                        <p className="justify-end ml-5 text-gray-700">{TimeOfPost(postdata.postDate)} days ago</p></span>
                        <h3>{postdata.shortDesc}</h3>
                        <p className='underline'>Description</p>
                        <h3>{postdata.desc}</h3>
                        <h3>{postdata.catagory}</h3>
                        <button onClick={savePost}>Save Post</button>
                        <ul className="flex">
                            <li className="cursor-pointer" >
                                <i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>
                            </li> {/*<i class="fa-solid fa-bookmark"></i>*/}
                            <li className="cursor-pointer" ><i className="fa-solid fa-share-nodes fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i></li>
                            <li className="cursor-pointer" ><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i> </li> {/*<i class="fa-solid fa-heart"></i> */}
                        </ul>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Post;