import { useNavigate, useParams } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    return (
        <>
            <div className="flex my-32 p-5 justify-center slider">
                <ul className='flex-col justify-center bg-[#191c24] rounded-3xl'>
                    <li className="my-10 hover:bg-stone-100/20 p-3 rounded-full" onClick={()=>navigate(`/home/${id}`)} title=""><i className="fa-solid fa-house fa-xl icon" style={{color:"white", }}></i></li>   {/*#737373*/}
                    <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/user/${id}`)}><i className="fa-solid fa-user fa-xl justify-center ml-1" style={{color:"white"}}></i></li>
                    <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/savedpost/${id}`)}><i className="fa-solid fa-bookmark fa-xl ml-1" style={{color:"white"}}></i></li>
                    {/* <li className="my-10 hover:bg-stone-300/20 p-3 rounded-full" onClick={()=>navigate(`/user/${id}`)}><i className="fa-solid fa-ellipsis-vertical fa-xl fa-rotate-90 ml-2" style={{color:"white"}}></i></li> */}
                </ul>
            </div>
        </>
    )
}
export default Sidebar;