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
    },[]);

    return(
        <>
            <div className=" flex flex-wrap gap-4">
                    <div className="profileImage">
                        <form>
                            <div className="relative w-32 h-32 ml-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <img src={`/Images/${profileimg}`} alt="" />
                            </div>

                            <input className="block w-20 text-sm ml-14 mt-5 text-gray-900 border"
                                type="file"
                                placeholder="Upload profile img"
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                    console.log(e.target.files[0]);
                                }}
                            />
                            <button type="submit" className="ml-12" onClick={uploadImgHandeler}>Update Image</button>
                        </form>
                    </div>
                    <div className="profileData mx-4">
                        <h1 className="text-4xl font-semibold my-5">{name}</h1>
                        <p className="text-xl my-5">{desc}</p>
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