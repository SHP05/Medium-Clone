import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = (text) => toast.success(text, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
});
export  {Notify};