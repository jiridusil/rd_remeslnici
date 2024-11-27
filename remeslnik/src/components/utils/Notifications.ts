import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
    
export const notify = () => toast.success('Data saved', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
});
