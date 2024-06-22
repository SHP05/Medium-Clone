import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/NavbarResp'
import Sidebar from '../components/Home/SideBar'
import SavePostSkeleton from '../components/UI/SavePostPageSkeleton'
import DisplaySavedPost from '../components/User/DisplaySavedPost'
import { NotifyError } from '../components/UI/Notification'
import { ToastContainer } from 'react-toastify';


const SavedPosts = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const HandleSavePost = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/savedpost/${id}`,{
                headers:{
                    "authorization":`Barrer ${token}` 
                }
            });
            console.log(response.data.result);
            setPost(response.data.result);
        } catch (err) {
            console.log("Data not reached" + err);
            NotifyError("You are not Autherised please login again");
            NavigateToLogin();
        }
    }

    const NavigateToLogin = () =>{
        setTimeout(()=>{
            navigate('/login')
        },3000);
    }

    useEffect(() => {
        HandleSavePost();
    }, [id])

    return (
        <>
            <Navbar />
            <section className='flex bg-black text-white h-full'>
                <div className='flex-none fixed w-14'><Sidebar /></div>
                {
                post.length === 0 ? 
                <div className='grow p-10 mx-12'>
                    <SavePostSkeleton/>
                    <SavePostSkeleton/>
                    <SavePostSkeleton/>
                </div> 
                :<div className='grow p-10 mx-12'>
                    <h1 className='font-bold text-center text-2xl'>Saved Post</h1>
                    <DisplaySavedPost posts={post} message="You have not save any Post" />
                </div>
                }
            </section>
            <ToastContainer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce />
        </>
    )
}
export default SavedPosts;