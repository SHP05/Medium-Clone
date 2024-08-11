import { useNavigate } from "react-router-dom"

function Error404Page() {
    const navigate = useNavigate();
    const moveBack = () =>{
        navigate('/');
    }
  return (
    <div className="flex flex-col h-screen justify-center text-center">
      <img src="/404-error.png" alt="" className="h-52 w-52 mx-auto" />
        <p className="text-5xl font-bold">Page Not Found</p><hr />
        <div className="flex justify-center text-center">
        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
        onClick={moveBack}>Go Back</button>

        </div>
    </div>
  )
}

export default Error404Page