import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/NavbarResp';
import Sidebar from '../components/Home/SideBar';
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import DateOfPost from '../components/UI/Date';
import SavePostButton from '../components/UI/SavePostButton';
import { ToastContainer } from 'react-toastify';
import LikePostButton from '../components/UI/LikePostButton';

const Post = () => {
    const { id, pid } = useParams();
    const [postdata, setPostdata] = useState([]);

    const getPost = async () => {
        axios.get(`http://localhost:3001/getpost/${pid}`)
            .then(result => {
                setPostdata(result.data.data);
                console.log(postdata);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getPost();
    }, [])
    return (
        <>
            <Navbar />

            <div className='flex bg-gray-950 h-full'>
                <div className='flex-none fixed w-14'><Sidebar userId={id} /></div>
                <div className='bg-black mx-auto grow bg-fixed h-screen p-5'>
                    <div className="posts bg-[#191c24]  mx-auto text-white w-1/2 p-5 rounded-lg shadow-lg    align-middle">
                        <img src="" alt="post Image" className='h-32 mx-auto shadow-xl rounded-lg border ' />
                        <span className='flex justify-between'>
                            <p className='font-bold text-3xl mt-5' >{postdata.title}</p>
                            <DateOfPost postDate={postdata.postDate} className=' ml-4' />
                        </span>
                        <h3>{postdata.shortDesc}</h3>
                        <p className='underline'>Description</p>
                        <h3>{postdata.desc}</h3>
                        <h3>{postdata.catagory}</h3>
                        <ul className="flex mt-4">

                            <SavePostButton pid={pid} saved={(v)=>{ v && getPost() }}/>
                            <LikePostButton id={postdata._id} length={postdata.likes?.length} liked={(v)=>{v && getPost()}} />
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
                        </ul>
                    </div>
                </div>
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
export default Post;