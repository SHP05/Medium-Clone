import axios from "axios";
import { useEffect, useState } from "react";
import Topicbtn from "../UI/Topicbtn";
import DisplayPost from "./DisplayPosts";
import Searching from "./Searching";
import HomePageSkeleton from "../UI/HomePageSkeleton";
import DisplayFilteredPost from "./DisplayFilterPost";

const PostList = () => {
  const [posts, setposts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserPost = async () => {
    await axios
      .get(`http://localhost:3001/getallpost`)
      .then((result) => {
        setIsLoading(false);
        setposts(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  const filterPostHandler = (cat) => {
    let fP = posts.filter((i) => i.catagory === cat);
    setfilteredPosts(fP);
    console.log(filteredPosts);
  };

  const HandleSearchPost = (data) => {
    setfilteredPosts(data);
    console.log(filteredPosts);
  };

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <>
      <div className="flex-col">
        {/* Search Bar */}
        <Searching searchQuery={HandleSearchPost} />

        {/* Filter Button */}
        <div>
          <h2 className="text-4xl text-white my-5">Topic</h2>
          <Topicbtn name="All" click={filterPostHandler} category="" />
          <Topicbtn
            name="Technology"
            click={filterPostHandler}
            category="Technology"
          />
          <Topicbtn
            name="Education"
            click={filterPostHandler}
            category="Education"
          />
          <Topicbtn name="Sports" click={filterPostHandler} category="Sports" />
          <Topicbtn name="Travel" click={filterPostHandler} category="Travel" />
          <Topicbtn name="Gaming" click={filterPostHandler} category="Gaming" />
          <Topicbtn
            name="Business"
            click={filterPostHandler}
            category="Business"
          />
          <Topicbtn name="Art" click={filterPostHandler} category="Art" />
          <Topicbtn
            name="Hobbies"
            click={filterPostHandler}
            category="Hobbies"
          />
          <Topicbtn
            name="History"
            click={filterPostHandler}
            category="History"
          />
          <Topicbtn name="Crypto" click={filterPostHandler} category="Crypto" />
        </div>
        {isLoading && <HomePageSkeleton />}
        {/* Display post */}
        <DisplayFilteredPost
          posts={filteredPosts}
          message="No Search post Found"
        />
        {posts.length !== 0 && (
          <DisplayPost posts={posts} message="Posts Not Found" />
        )}
      </div>
    </>
  );
};
export default PostList;
