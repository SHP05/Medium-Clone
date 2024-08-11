import { useNavigate, useParams } from "react-router-dom";

const CreatePostbtn = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const createPostHandler = () => {
    navigate(`/createpost/${id}`);
  };

  return (
    <>
      <div className="flex justify-center ">
        <button
          className="bg-gray-300 hover:bg-gray-400 w-52  my-5 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={createPostHandler}
        >
          <span>+ Create New Post</span>
        </button>
      </div>
    </>
  );
};

export default CreatePostbtn;
