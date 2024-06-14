import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/NavbarResp';
import Sidebar from '../components/Home/SideBar';
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";

const Post = () => {
    const { id, pid } = useParams();
    const [postdata, setPostdata] = useState([]);

    const getPost = async () => {
        axios.get(`http://localhost:3001/getpost/${pid}`)
            .then(result => {
                setPostdata(result.data.data);
            })
            .catch(err => console.log(err))
    }


    const savePost = async () => {
        await axios.put(`http://localhost:3001/savepost/${id}`, { pid, id })
            .then(result => console.log(result))
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

    useEffect(() => {
        getPost();
    },[])
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
                        <ul className="flex mt-4">
                            <li className="cursor-pointer" >
                                <i className="fa-regular fa-bookmark fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i>
                            </li>
                            <span className=" mx-2 mb-1">
                                <FacebookShareButton
                                    quote={postdata.title}
                                    hashtag="#React"
                                    url="https://www.facebook.com/"
                                    title="Send message on Facebook"
                                >
                                    <FacebookIcon size={32} round={true}></FacebookIcon>
                                </FacebookShareButton>
                            </span>

                            <span className=" mx-2 mb-1">
                                <WhatsappShareButton
                                    title={postdata.title}
                                    separator={postdata.title}
                                    url="https://web.whatsapp.com/"
                                >
                                    <WhatsappIcon size={32} round={true}></WhatsappIcon>
                                </WhatsappShareButton>
                            </span>
                            <li className="cursor-pointer" ><i className="fa-regular fa-heart fa-xl m-3" style={{ color: "rgb(229 231 235)" }}></i> {postdata.likes?.length}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Post;