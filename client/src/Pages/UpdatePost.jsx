import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';


const UpdatePost = ()=>{
    const navigate = useNavigate();
    const  {id , pid}  = useParams();
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [shortDesc, setShortDesc] = useState('');    

    const getPost = async () => {
        console.log(pid);
        await axios.get(`http://localhost:3001/getpost/${pid}`)
            .then(result => {
                console.log(result.data.data);
                setTitle(result.data.data.title)
                setDesc(result.data.data.desc)
                setShortDesc(result.data.data.shortDesc)
                setImage(result.data.data.image)
                setCategory(result.data.data.catagory)
            })
            .catch(err => console.log(err))
    }
    const updatePostHandler = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:3001/updatepost`,{pid , desc , title , shortDesc ,category, image })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
        navigate(`/user/${id}`)
    }

    useEffect(()=>{    
        getPost()
    }
    ,[])
    return(
        <>
            <section className='bg-gray-950'>
            <div className='flex bg-gray-950 h-full'>
                <div className="bg-gray-800 grow mx-20">
            <h1 className="text-white text-3xl bg-gray-950 font-bold text-center p-3">📃 Update Your Post 📃</h1>
            <form className="bg-gray-950 text-lg flex" onSubmit={updatePostHandler}>
                <div className="grid gap-6 mb-6 md:grid-cols-1 mx-auto w-2/3 border rounded-lg p-3 border-gray-500 shadow-2xl">
                    <label  htmlFor="post-title" className="block mb-1 font-medium text-gray-300 ">Post Title</label>
                    <input name="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post Title"  />
                    
                    <label htmlFor="post-shortdesc" className="block mb-1 font-medium text-gray-300 ">Post Short Description</label>
                    <input name="shortDesc" defaultValue={shortDesc} onChange={(e) => setShortDesc(e.target.value)} type="text" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post Short Description"  />

                    <label htmlFor="message" className="block mb-1 font-medium text-gray-300 ">Describe Your Post</label>
                    <textarea name="desc" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} id="message" rows="4" className="bg-gray-500/25 border border-gray-500 text-gray-200 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your blog here..."></textarea>

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
                
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                </div>  
                
            </form>
            </div>
            </div>
            </section>
        </>
    )
}
export default UpdatePost