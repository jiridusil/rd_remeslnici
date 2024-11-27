import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "../firebaseConfig";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const SaveData = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const notify = () => toast.success("Data saved!", {
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

    const saveData = async () => {
        const db = getDatabase(app);
        console.log('db', db);
        const newPostKey = push(ref(db, 'user/'));
        set(newPostKey, {
            firstName: value1,
            lastName: value2
        })
    }

    return (
        <div>
            <input onChange={(e) => setValue1(e.target.value)} type="text" placeholder="Write something..." />
            <input onChange={(e) => setValue2(e.target.value)} type="text" placeholder="Write something2..." />
            <button onClick={() => { saveData(); notify(); }}>Save</button>
            <ToastContainer />
        </div >
    )
}