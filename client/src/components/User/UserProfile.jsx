import { useState , useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";

const UserProfile = () =>{
    const {id} = useParams();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [posts, setposts] = useState([]);
    const [profileimg,setPImg] = useState(''); 
    const [file, setFile] = useState('');

    const getUserData = async () => {
        await axios.get(`http://localhost:3001/getuser/${id}`)
            .then(result => {
                setName(result.data.name)
                setDesc(result.data.desc)
                setPImg(result.data.img)
            })
            .catch(err => console.log(err))
    }

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getuserpost/${id}`)
            .then(result => {
                setposts(result.data.Data);
                console.log(posts);
            })
            .catch(err => console.log(err))
    }

    const uploadImgHandeler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('file',file)

        console.log(formdata);
        await axios.put(`http://localhost:3001/uploadimg/${id}`,
            formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserData()
        getUserPost()
    }, []);

    return(
        <>
            <div className=" flex flex-wrap gap-4">
                    <div className="profileImage ">
                        <form>
                            <div className="relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                {/* <svg className="absolute w-32 h-32 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg> */}
                                <img src={`/Images/${profileimg}`} alt="" />
                            </div>

                            <input className="block w-52 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                type="file"
                                placeholder="Upload profile img"
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                    console.log(e.target.files[0]);
                                }}
                            />
                            <button type="submit" onClick={uploadImgHandeler}>Update Image</button>
                        </form>
                    </div>
                    <div className="profileData">
                        <h1 className="text-4xl font-semibold">{name}</h1>
                        <p className="text-xl">{desc}</p>
                        {/* Edit Button */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Follow
                        </button>
                    </div>
                </div>
        </>
    )
}

export default UserProfile;