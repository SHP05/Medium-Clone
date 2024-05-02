import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom'
import Navbar from "../components/Navbar/NavbarResp";
import Sidebar from "../components/Home/SideBar";

const CreatePost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [shortDesc, setSortDesc] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [catagory, setCategory] = useState('');
    const [userName, setUserName] = useState('');
    const [userImg, setUserimg] = useState('');

    const navigate = useNavigate();
    const getUserData = async () => {
        await axios.get(`http://localhost:3001/getuser/${id}`)
            .then(result => {
                setUserName(result.data.name)
                setUserimg(result.data.img)
            })
            .catch(err => console.log(err))
    }

    const PostSubmitHandler = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/createpost/${id}`, {userName ,userImg ,title, shortDesc, desc, catagory, image })
            .then(result => console.log(result))
            .catch(err => console.log(err))
        navigate(`/user/${id}`)       
    }

    useEffect(()=>{
        getUserData()
    },[])
    return (
        <>
            <Navbar />
            <div className="flex bg-gray-950 h-full">
                <div className="flex-none fixed w-14"><Sidebar/></div>
                <div className="bg-gray-800 grow mx-20 ">
            <h1 className="text-white text-3xl font-bold text-center mb-3">📃 Create New Post 📃</h1>
            <form className="bg-gray-800 text-lg flex" onSubmit={PostSubmitHandler}>
                <div className="grid gap-6 mb-6 md:grid-cols-1 mx-auto w-2/3 border rounded-lg p-3 border-gray-500 shadow-2xl">
                    <label  htmlFor="post-title" className="block mb-1 font-medium text-gray-300 ">Post Title</label>
                    <input name="title" onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post Title" required />
                    
                    <label htmlFor="post-shortdesc" className="block mb-1 font-medium text-gray-300 ">Post Short Description</label>
                    <input name="shortDesc" onChange={(e) => setSortDesc(e.target.value)} type="text" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post Short Description" required />

                    <label htmlFor="message" className="block mb-1 font-medium text-gray-300 ">Describe Your Post</label>
                    <textarea name="desc" onChange={(e) => setDesc(e.target.value)} id="message" rows="4" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your blog here..."></textarea>

                    <label htmlFor="countries" className="block mb-1 font-medium text-gray-300 ">Select Post Category</label>
                    <select name="catagory" onChange={(e) => setCategory(e.target.value)} id="countries" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected className="bg-slate-800">Choose Category</option>
                        <option value="Technology" className="bg-slate-800">Technology</option>
                        <option value="Sports" className="bg-slate-800">Sports</option>
                        <option value="FR" className="bg-slate-800">Education</option>
                        <option value="Education" className="bg-slate-800">Bussiness</option>
                        <option value="Travel" className="bg-slate-800">Travel</option>
                        <option value="Gaming" className="bg-slate-800">Gaming</option>
                        <option value="Cripto" className="bg-slate-800">Cripto</option>
                        <option value="Hobbies" className="bg-slate-800">Hobbies</option>
                        <option value="History" className="bg-slate-800">History</option>
                    </select>

                    <label className="block mb-1 font-medium text-gray-300" htmlFor="default_size">Select front Image for your Blog</label>
                    <input name="image" onChange={(e) => setImage(toString(e.target.files[0]))} type="file" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="default_size"/>
                
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                </div>  
                
            </form>
            </div>
            </div>
           
        </>
    )
}
export default CreatePost;