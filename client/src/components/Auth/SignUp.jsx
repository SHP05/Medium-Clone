import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Link from '@mui/joy/Link';


const Signup = () => {
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const navigate = useNavigate();
    const submitHandler = async (e) =>{
        e.preventDefault();
        console.log("event called");
        e.preventDefault()
        await axios.post("http://localhost:3001/signup", {email,name,password})
        .then((result)=>  console.log(result))
        .catch(e => console.log(e))
        console.log(email,password,name);
        navigate('/login')
    }
    return (
        <>
            <div className="flex-wrap  my-5">
                <div className="flex">
                    <div className="imgContainer flex w-1/2">
                        <img src="auth2.jpg" alt="" className="h-fit" />
                    </div>
                    <form 
                    onSubmit={submitHandler}
                    className="flex cardContainer w-1/2 justify-center">
{/* 
                        <input type="text" placeholder="UserName" onChange={(e) => {setname(e.target.value)}} required/>
                        <input type="text" placeholder="Email" onChange={(e) => {setemail(e.target.value)}} required/>
                        <input type="text" placeholder="******" onChange={(e) => {setpassword(e.target.value)}} required/>
                        <button type="submit">Signup</button> */}
                    <div >
                        <div className="w-96 h-auto rounded-lg my-auto p-10  bg-slate-300">
                            <h1 className="text-2xl font-bold mb-5">Signup</h1>
                            <div className="mb-6">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input 
                                onChange={(e)=> setname(e.target.value)}
                                type="name" 
                                id="name" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john" required />
                            </div>
                            <div className="mb-6">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input 
                                onChange={(e)=> setemail(e.target.value)}
                                type="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                            </div>
                            <div className="mb-6">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                onChange={(e)=> setpassword(e.target.value)}
                                type="password" 
                                id="password" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit"><p className="p-2 my-4 border-2 border-blue-500 rounded-lg w-32 transition-colors hover:bg-blue-500 hover:text-white ">Signup</p></button>
                            </div>
                            <div className="divide-y divide-slate-200">
                               <div className="text-center">
                               <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"/>
                                    </svg>
                                    Sign in with Github
                                </button>
                               </div>
                               <div className="text-center">
                               <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" />
                                    </svg>
                                    Sign in with Google
                                </button>
                               </div>
                               <Link rel="stylesheet" href="/login">Login , you have an account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Signup;