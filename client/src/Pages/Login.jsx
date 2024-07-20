import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Link from '@mui/joy/Link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess, notifyWarning } from '../components/UI/Notification'

const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');



    const submitHandler = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                localStorage.setItem("name", result.data.name);
                localStorage.setItem("email", result.data.email);
                localStorage.setItem("token", result.data.token);
                console.log(result.data);
                const id = result.data.userId;
                notifySuccess();
                navigate(`/home/${id}`)
            })
            .catch(err => {
                console.log(err);
                notifyWarning();
            })
    }

    //email : sp@gmail.com
    //psw : sp123
    return (
        <>
            <div className="flex-wrap">
                <div className="flex">
                    <div className="imgContainer flex w-1/2">
                        <img src="auth1.jpg" alt="" className="h-fit" />
                    </div>
                    <form
                        onSubmit={submitHandler}
                        className="flex cardContainer w-1/2 justify-center">
                        <div className="w-96 h-auto rounded-lg my-auto p-10  bg-slate-300">
                            <h1 className="text-2xl font-bold mb-5">Login</h1>
                            <div className="mb-6">
                                <label
                                    className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input
                                    onChange={(e) => setemail(e.target.value)}
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com"
                                    required />
                            </div>
                            <div className="mb-6">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    name="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••"
                                    required />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit"><p className="p-2 my-4 border-2 border-blue-500 rounded-lg w-32 transition-colors hover:bg-blue-500 hover:text-white ">Login</p></button>
                            </div>

                            <Link rel="stylesheet" href="/signup">Create new Account</Link>
                            <br />
                            <Link rel="stylesheet" href="/">Back to Home Page</Link>
                        </div>
                    </form>
                </div >
            </div >
            <ToastContainer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </>
    );
}

export default Login;