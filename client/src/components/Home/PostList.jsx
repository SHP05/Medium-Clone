import axios from "axios";
import { useEffect, useState } from "react";
import Topicbtn from "../UI/Topicbtn";
import DisplayPost from "./DisplayPosts";
import Searching from "./Searching";
import HomePageSkeleton from "../UI/HomePageSkeleton";

const PostList = () => {

    const [posts, setposts] = useState([]);
    const [filteredPosts, setfilteredPosts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const getUserPost = async () => {
        await axios.get(`http://localhost:3001/getallpost`)
            .then(result => {
                setIsLoading(false);
                setposts(result.data.data);
                console.log(result.data.data);
            })
            .catch(err => console.log(err))
    }

    const filterPostHandler = (cat) => {
        let fP = posts.filter(i => i.catagory === cat);
        // setposts(fP)
        setfilteredPosts(fP);
        console.log(filteredPosts);
    }

    const HandleSearchPost = (data) =>{
        setfilteredPosts(data);
        console.log(filteredPosts);
    }

    useEffect(() => {
        getUserPost();
    },[]);
    
    return (
        <>
            <div className="flex-col">
                {/* Search Bar */}
                <Searching searchQuery={HandleSearchPost}/>
                
                {/* Filter Button */}
                <div>
                    <h2 className="text-4xl text-white my-5">Topic</h2>
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
                    <Topicbtn name="Cripto" click={filterPostHandler} category="Cripto" />
                </div>
                {
                    isLoading &&  <HomePageSkeleton/> 
                }
                {/* Display post */}
                {filteredPosts.length !== 0 && <DisplayPost posts={filteredPosts} message="No search post"/> }
                {posts.length !== 0 && <DisplayPost posts={posts} message="Posts Not Found"/> }
            </div>
        </>
    )
}
export default PostList;