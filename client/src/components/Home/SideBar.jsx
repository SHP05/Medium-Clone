import { useNavigate } from "react-router-dom";


const Sidebar = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex my-10 mx-4 p-5 justify-center slider">
                <ul className='flex-col justify-center bg-[#191c24] rounded-3xl'>
                    <li className="my-10 hover:bg-stone-100/20 p-3 rounded-full" onClick={()=>navigate(`/home/${props.userId}`)}><i className="fa-solid fa-house fa-xl icon" style={{color:"white", }}></i></li>   {/*#737373*/}
                    <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/user/${props.userId}`)}><i className="fa-solid fa-user fa-xl justify-center ml-1" style={{color:"white"}}></i></li>
                    <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/user/${props.userId}`)}><i className="fa-solid fa-bookmark fa-xl ml-1" style={{color:"white"}}></i></li>
                    <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/user/${props.userId}`)}><i className="fa-solid fa-ellipsis-vertical fa-xl fa-rotate-90 ml-2" style={{color:"white"}}></i></li>
                </ul>
            </div>
        </>
    )
}
export default Sidebar;